const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const routes = require('./routes')
const config = require('./app.config');
const cors = require('cors');

// logging body parser (middleware) Handles bad JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var allowedOrigins = ['http://localhost:4200',
					'http://vldp.se',
					'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop'];
app.use(cors({
	origin: function (origin, callback) {
		if (!origin) return callback(null, true);
		if (allowedOrigins.indexOf(origin) === -1) {
			var msg = 'CORS policy block.';
			return callback(new Error(msg), false);
		}
		return callback(null, true);
	}
}));

routes(app);

//Start server
const port = config.api_port;
app.listen(port, () => console.log("Listedning on port " + port));