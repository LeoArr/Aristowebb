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
    getCats: function(callback, id) {
        var sql = "SELECT * FROM cats;";
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            callback({ success: true, data: result.map(res => toCat(res)) });
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
        var sql = "INSERT INTO completions (task_id, cat_id) VALUES (" + completion.taskId + ", " + completion.catId + ")";
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            return callback({ success: true });
        })
    },

    // createPost: function(callback, post) {
    //     var self = this;
        
    //     var sql = "INSERT INTO posts " + 
    //         "(posted_date,post_title,post_text,is_episode,episode_url)" + 
    //         "VALUES (NOW(),'" + post.title + "','" + post.text + "'," +
    //         (post.isEpisode ? 1 : 0) + ",'" + post.episodeUrl + "');";
    //     this.connection.query(sql, function (err, result) {
    //         if (err) return callback({ success: false, message: err });
    //         self.getPost((_res) => {
    //             callback(_res);
    //         }, result.insertId);
    //     });
    // },
    // updatePost: function(callback, post) {
    //     var self = this;
    //     var sql = "UPDATE posts SET " + 
    //         "post_title='" + post.title + "', post_text='" + post.text + "', " +
    //         "is_episode=" + (post.isEpisode ? 1 : 0) + ", episode_url='" + post.episodeUrl + "' " +
    //         " WHERE id='" + post.id + "';";
    //     this.connection.query(sql, function (err, result) {
    //         if (err) return callback({ success: false, message: err });
    //         self.getPosts((_res) => {
    //             callback(_res);
    //         }, post.id);
    //     });
    // },
    // deletePost: function(callback, id) {
    //     var sql = "DELETE FROM posts WHERE id=" + id + ";";
    //     this.connection.query(sql, function (err, result) {
    //         if (err) return callback({ success: false, message: err });
    //         callback({ success: !!result.affectedRows });
    //     });
    // },
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