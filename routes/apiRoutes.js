var scrapeCtrl = require('../controllers/scrapeCtrl');


module.exports = function(app){
  app.get("/api/scrape", scrapeCtrl.getNYT)
}