$(function(){

var num = 100;

var idName;
var catDiv;

$('.summon-cats').on('click',function(){
  $.ajax({
    url: 'http://bitkittens.herokuapp.com/cats.json',
    method: 'GET',
    data: { number : num },
    dataType: 'json',
  }).done(function(data){

    var catDivs = ['#cat1','#cat2','#cat3'];
    var catDivCreator = function() {
      for (i = 4; i < (num + 1); i++) {
        idName = 'cat' + i;
        catDiv = $('<div>').attr('id',idName).addClass('cat-box').attr('style','left: ' + Math.random()*300 + 'px; top: ' + Math.random()*400 + 'px;');
        $('main').append(catDiv);
        catDivs.push('#' + idName);
        console.log(catDivs);
      }
    }
    catDivCreator();
    var counter = 0;
    var cats = data["cats"];
    catHolder = {};
    cats.forEach(function(cat){
      if (catHolder[cat.id] === undefined) {
        catHolder[cat.id] = 1;
        var catImage = $('<img>').attr('src',cat.photo).attr('alt',"Photo of" + cat.name)
        var finalCatDiv = $(catDivs[counter]).html(catImage);
        counter++;
      }
      else {
        catHolder[cat.id] = catHolder[cat.id]+1;
      }
      })
      Object.keys(catHolder).forEach(function(key){
        var listItem = $('<li>').html(key + ': ' + catHolder[key]);
        $('ul').append(listItem);
      })
    })
  })
})
