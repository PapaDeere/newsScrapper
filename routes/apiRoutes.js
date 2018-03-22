var scrapeCtrl = require('../controllers/scrapeCtrl');
var db = require('../models')


module.exports = function(app){

  app.get('/', function (req, res) {
    db.Article.find({}).then(function(dbArticles){
      res.render("index", {articles: dbArticles})

    })
  })

  app.get("/api/scrape", scrapeCtrl.getNYT)

  app.post("/api/note/:articleId", function (req, res) {
    console.log(req.body);
    console.log(req.params.articleId);

    db.Note.create(req.body).then(function(dbNote) {
      console.log(dbNote);

      db.Article.findByIdAndUpdate(req.params.articleId, { $push: { notes: dbNote._id } }, { new: true }).then(function(resp){
        console.log(resp, "from find by id");
        res.end()
      })
      .catch(err)
      
    })
  })

  app.get("/api/note/:articleId", function (req, res) {
    // Find all users
    db.Article.find({ _id: req.params.articleId})
      // Specify that we want to populate the retrieved users with any associated notes
      .populate("notes")
      .then(function (dbArticle) {
        // If able to successfully find and associate all Users and Notes, send them back to the client
        res.json(dbArticle);
      })
      .catch(function (err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });


}