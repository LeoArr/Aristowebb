const mysql = require('mysql');
const config = require('./app.config');

var database = {
    connection: mysql.createConnection({
        host     : config.db_host,
        user     : config.db_user,
        password : config.db_password,
        database : config.db_database
    }),
    getPosts: function(callback) {
        var sql = "SELECT * FROM posts ORDER BY posted_date DESC;";
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            callback({ success: true, data: result.map(res => toModel(res)) });
        });
    },
    getPost: function(callback, id) {
        var sql = "SELECT * FROM posts WHERE id=" + id + ";";
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            callback({ success: true, data: !!result ? toModel(result[0]) : result });
        });
    },
    createPost: function(callback, post) {
        var self = this;
        
        var sql = "INSERT INTO posts " + 
            "(posted_date,post_title,post_text,is_episode,episode_url)" + 
            "VALUES (NOW(),'" + post.title + "','" + post.text + "'," +
            (post.isEpisode ? 1 : 0) + ",'" + post.episodeUrl + "');";
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            self.getPost((_res) => {
                callback(_res);
            }, result.insertId);
        });
    },
    updatePost: function(callback, post) {
        var self = this;
        var sql = "UPDATE posts SET " + 
            "post_title='" + post.title + "', post_text='" + post.text + "', " +
            "is_episode=" + (post.isEpisode ? 1 : 0) + ", episode_url='" + post.episodeUrl + "' " +
            " WHERE id='" + post.id + "';";
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            self.getPosts((_res) => {
                callback(_res);
            }, post.id);
        });
    },
    deletePost: function(callback, id) {
        var sql = "DELETE FROM posts WHERE id=" + id + ";";
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            callback({ success: !!result.affectedRows });
        });
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
    selectToken: function(callback, token) {
        var sql = "SELECT * FROM tokens WHERE token='" + token + "';";
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            callback({ success: true, data: result });
        });
    },
    createToken: function(callback) {
        var token = Math.random().toString(36).substring(5);
        var tokenExsists = false;
        this.selectToken((result) => {
            tokenExsists = result.success;
        });
        while (tokenExsists) {
            token = Math.random().toString(36).substring(5);
            this.selectToken((result) => {
                tokenExsists = result.success;
            });
        }
        var sql = "INSERT INTO tokens (token, created_date) " +
            "VALUES ('" + token + "', NOW());";
        this.connection.query(sql, function (err, result) {
            if (err) return callback({ success: false, message: err });
            if (result.affectedRows > 0)
                callback({ success: true, data: token });
        });
    },
}

module.exports = database;