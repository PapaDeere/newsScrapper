const cheerio = require('cheerio')
var request = require('request');

//hit nyt scrape data
var scrape = function(){
    return request("http://www.nytimes.com", function (error, response, body) {
    
    var articles = [];

    const $ = cheerio.load(body)
    $(".theme-summary").each(function (i, article){
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
    return articles;
  });
};


module.exports = scrape;
// load it into cheerio
// take all data push it into and array
//return that array from this file so we can store it into our db

