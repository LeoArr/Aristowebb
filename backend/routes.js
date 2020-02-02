const config = require('./app.config');
const database = require('./database');
const multer = require('multer');
var path = require('path');
const uuidv1 = require('uuid/v1');

function authenticate(password) {
    return !!password && (password == config.token || password == config.admin_token);
}
// SET STORAGE
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, 'public'))
	},
	filename: function (req, file, cb) {
		cb(null, uuidv1())
	}
})

var upload = multer({ storage: storage })

const configureRoutes = function(app) {
    app.use((req, res, next) => {
        res.set('Content-Type', 'application/json');
        if (req.method == 'GET') {
            next();
        } else {
            if (authenticate(req.headers.authorization)) {
                next();
            } else {
                res.status(403);
                res.send({ success: false, message: 'None shall pass'});
            }
        }
    });

    app.post('/completion', (req, res) => {
        database.addCompletor((result) => {
            res.send(result);
        }, req.body);
    });

    app.post('/message', (req, res) => {
        database.addMessage((result) => {
            res.send(result);
        }, req.body);
    });

    app.delete('/message/:id', (req, res) => {
        database.deleteMessage((result) => {
            res.send(result);
        }, req.params.id);
    });

    app.get('/task', (req, res) => {
        database.getTasks((result) => {
            res.send(result);
        });
    });

    app.post('/task', (req, res) => {
        database.newTask((result) => {
            res.send(result);
        }, req.body)
    });

    app.get('/messages', (req, res) => {
        database.getMessages((result) => {
            res.send(result);
        });
    });

    app.get('/high-score', (req, res) => {
        database.getHighScore((result) => {
            res.send(result);
        });
    });

    app.get('/timetable', (req, res) => {
        database.getTimetable((result) => {
            res.send(result);
        });
    });

    app.put('/timetable', (req, res) => {
        database.updateTimetable((result) => {
            res.send(result);
        }, req.body.text);
    });


    app.get('/cat', (req, res) => {
        database.getCats((result) => {
            res.send(result);
        });
    });

    app.get('/is-authenticated', (req, res) => {
        res.send({ success: authenticate(req.headers.authorization)})
    });

    app.get('/authenticate', (req, res) => {
        let password = req.headers.authorization;
        if (!!password && (password == config.password)) {
            res.send({
                success: true,
                data: config.token,
                message: ''
            });
        } else if (!!password && password == config.admin_password) {
            res.send({
                success: true,
                data: config.admin_token,
                message: ''
            })
        } else {
            res.send({
                success: false,
            })
        }
    });

    app.post('/upload', upload.single('file'), (req, res, next) => {
        const file = req.file
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            res.send({ success: false })
            return;
        }
        res.send({ success: true, data: file.filename })
    })
}

module.exports = configureRoutes;