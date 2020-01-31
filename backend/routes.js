const config = require('./app.config');

function authenticate(password) {
    return !!password && (password == config.token || password == config.admin_token);
}

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

    // app.get('/post', (req, res) => {
    //     database.getPosts((result) => {
    //         res.send(result);
    //     });
    // });

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
}

module.exports = configureRoutes;