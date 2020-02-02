const mysql = require('mysql');
const config = require('./app.config');

const toTask = function(task) {
    if (!task) return null;
    return {
        id: task.id,
        title: task.task_title,
        description: task.task_description,
        points: task.points,
        moreThanOne: !!task.more_than_one.readUIntLE(0, 1),
        completors: task.completors
    }
}

const toCat = function(cat) {
    if (!cat) return null;
    return {
        id: cat.id,
        name: cat.cat_name
    }
}

const toMessage = function(mes){
    if (!mes) return null;
    return {
        id: mes.id,
        author: mes.author,
        message: mes.m_text,
        image: mes.m_image,
        posted: mes.posted_date
    }
}

var database = {
    connection: mysql.createConnection({
        host     : config.db_host,
        user     : config.db_user,
        password : config.db_password,
        database : config.db_database
    }),
    getTasks: function(callback) {
        var sql = "SELECT * FROM tasks;";
        var conn = this.connection;
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            var iSql = "SELECT * FROM completions INNER JOIN cats ON completions.cat_id = cats.id;"
            conn.query(iSql, function (iErr, iResult) {
                if (iErr) return callback({ success: false, message: iErr });
                result.forEach(res => {
                    res.completors = [];
                    res.completors = iResult.filter(function (comp) {
                        return comp.task_id == res.id;
                    }).map(comp => comp.cat_name);
                });
                callback({ success: true, data: result.map(res => toTask(res)) });
            });
        });
    },
    newTask: function(callback, task) {
        var sql = "INSERT INTO tasks (task_title, task_description, points, more_than_one) VALUES ";
        sql += "('" + task.title + "', '" + task.description + "', " + task.points + ", " + !task.exclusive + ")";
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            callback({ success: true });
        });
    },
    getCats: function(callback, id) {
        var sql = "SELECT * FROM cats;";
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            callback({ success: true, data: result.map(res => toCat(res)) });
        });
    },

    getTimetable: function(callback) {
        var sql = "SELECT timetable FROM timetable WHERE id = 1;"
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            callback({ success: true, data: result[0].timetable });
        });
    },

    getMessages: function(callback) {
        var sql = "SELECT * FROM messages ORDER BY posted_date DESC;"
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            callback({ success: true, data: result.map(res => toMessage(res)) });
        });
    },

    deleteMessage: function(callback, id) {
        var sql = "DELETE FROM messages WHERE id=" + id + ";";
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            callback({ success: true, });
        });
    },

    updateTimetable: function(callback, newText) {
        var sql = "UPDATE timetable SET timetable = '" + newText + "' WHERE id = 1"; 
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            callback({ success: true });
        });
    },

    getHighScore: function(callback, id) {
        // var sql = "SELECT * FROM completions INNER JOIN cats ON cats.id = completions.cat_id INNER JOIN tasks ON tasks.id = completions.task_id;";
        var sql = "SELECT cats.cat_name as name, SUM(tasks.points) as score FROM completions ";
        sql += "INNER JOIN cats ON cats.id = completions.cat_id "
        sql += "INNER JOIN tasks ON tasks.id = completions.task_id GROUP BY cats.id "
        sql += "ORDER BY score DESC;"
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            callback({ success: true, data: result });
        });
    },

    addCompletor: function(callback, completion) {
        var sql = "INSERT INTO completions (task_id, cat_id) VALUES (" + completion.taskId + ", " + completion.catId + ");";
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            return callback({ success: true });
        })
    },

    addMessage: function(callback, message) {
        var sql = "INSERT INTO messages (author, m_text, posted_date, m_image) VALUES ('" + message.author + "', '" + message.message + "', NOW(), '" + message.image + "');";
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            return callback({ success: true });
        })
    },

    isAuthenticated: function(callback, token) {
        var sql = "SELECT * FROM tokens WHERE token='" + token + "';";
        this.connection.query(sql, function (err, result) {
            if (err) return callback(false);
            if (result.length > 0)
                callback(true);
            else
                callback(false);
        });
    },
}

module.exports = database;