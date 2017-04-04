var request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs')

var all_images = []
request('https://www.pexels.com/search/porsche/', function(err,res,body){
  if(!err && res.statusCode === 200){
        var $ = cheerio.load(body);
        $('img', 'div.photos').each(function(){
          var image = $(this).attr('src')
          all_images.push(image)
        });
        for(var i = 0; i<all_images.length; i++){
          request(all_images[i]).pipe(fs.createWriteStream('images/porsche' + i + '.jpg'))
        }
  }

});
