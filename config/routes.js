const articleRoutes = require('../routes/article');

module.exports = (app) => {
    app.use('/article', articleRoutes)
};