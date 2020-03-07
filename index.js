let env = process.env.NODE_ENV || 'development';

let settings = require('./config/settings')[env];

const app = require('express')();
app.use(require('cookie-parser')());
require('./config/database')(settings);
require('./config/express')(app);
require('./config/routes')(app);
// require('./config/passport')();
require('./utilities/error-handler')(app);
app.listen(settings.port);
console.log(`News API listening on ${settings.port}...`);