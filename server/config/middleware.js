var morgan 	   = require('morgan'),
	bodyParser = require('body-parser');

// test with directly file read
module.exports = function(app, express) {
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(express.static(__dirname + '/../../'));
	
	// Set up routing table
	// app.get("/data", function(req, res, next) {
	// 	// Functionality
	// 	// loop through
	// 	executionContent(req, res, next);
	// });
	
	// app.post("/data", function(req, res, next) {
	// 	executionContent(req, res, next)
	// });

	// app.get("/data/raw", function(req, res, next) {
	// 	// readLineByLine(req, res, next);
	// 	res.json(globalLocTable);
	// 	next();
	// });
	// readLargeFileInBatch();
}