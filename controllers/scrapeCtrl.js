
const cheerio = require('cheerio')
var request = require('request');

//hit nyt scrape data
function scrape (cb){
  return request("http://www.nytimes.com", function (error, response, body) {

    var articles = [];

    const $ = cheerio.load(body)
    $(".theme-summary").each(function (i, article) {
      console.log($(this).children(".story-heading").children("a").attr("href"))
      var summary = $(this).children(".summary").text().trim();
      var headline = $(this).children(".story-heading").children("a").text().trim();
      var url = $(this).children(".story-heading").children("a").attr("href");

      var data = {
        summary: summary,
        headline: headline,
        url: url
      };

      articles.push(data);
    });
   cb(articles)
  });
};



module.exports = {
  getNYT: function(req, res){
   scrape(function(articles){
     res.json({articles: articles})
    }
  );
  }
}