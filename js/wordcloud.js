// Resource: https://gist.github.com/owendall/050c15188f7285ddb5b243e1e169272c
// Simple animated example of d3-cloud - https://github.com/jasondavies/d3-cloud
// Based on https://github.com/jasondavies/d3-cloud/blob/master/examples/simple.html

// Encapsulate the word cloud functionality
function wordCloud(selector) {
  //var fill = d3.scale.category20();
  //var fill = d3.scaleOrdinal(d3.schemeCategory10);
  // Custom color palette of 20 unique colors (https://sashamaps.net/docs/resources/20-colors/)
  /*colors = [
    '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
    '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe',
    '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000',
    '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff'
  ]*/

  var palette = ["#1AC3A6", "#34CF7A","#41A1E1", "#A667BF", "#F2C500","#EA8B1D", "#EB5D49", "#475B6F", "#ECF0F1", "#9FAEAF"]


  //Construct the word cloud's SVG element
  var svg = d3.select(selector).append("svg")
      .attr("width", 500)
      .attr("height", 500)
      .append("g")
      .attr("transform", "translate(250,250)");


  //Draw the word cloud
  function draw(words) {
      var cloud = svg.selectAll("g text")
                      .data(words, function(d) { return d.text; })

      //Entering words
      cloud.enter()
          .append("text")
          .style("font-family", "HPFont")
          .style("fill", function(d, i) { return palette[i % 10]; })
          //.style("fill", "white")
          .attr("text-anchor", "middle")
          .attr('font-size', 1)
          .text(function(d) { return d.text; })

      //Entering and existing words
      .merge(cloud).transition()
              .duration(600)
              .style("font-size", function(d) { return d.size + "px"; })
              .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
              })
              .style("fill-opacity", 1);

      //Exiting words
      cloud.exit()
          .transition()
              .duration(200)
              .style('fill-opacity', 1e-6)
              .attr('font-size', 1)
              .remove();
  }


  //Use the module pattern to encapsulate the visualisation code. We'll
  // expose only the parts that need to be public.
  return {

      //Recompute the word cloud for a new set of words. This method will
      // asycnhronously call draw when the layout has been computed.
      //The outside world will need to call this function, so make it part
      // of the wordCloud return value.
      update: function(words) {
          d3.layout.cloud().size([500, 500])
              .words(words)
              .padding(5)
              .rotate(function() { return ~~(Math.random() * 2) * 90; })
              // TODO: change with Harry Potter
              .font("HPFont")
              .fontSize(function(d) { return d.size; })
              .on("end", draw)
              .start();
      }
  }

}

//const booksTopWords = require("../data/cleaned/word_cloud.json");
const booksTopWords = {
  '0': [
    'quirrell',           'flamel',
    'mr dursley',         'troll',
    'professor quirrell', 'norbert',
    'ronan',              'mrs dursley',
    'piers',              'nicolas',
    'firenze',            'turban',
    'mr ollivander',      'bane',
    'ollivander',         'unicorn',
    'gotten',             'nimbus two',
    'nicolas flamel',     'griphook',
    'two thousand',       'nimbus two thousand',
    'flint',              'nimbus',
    'house cup',          'mr potter',
    'sorcerer',           'scabbers',
    'get yer',            'third floor'
  ],
  '1': [
    'chamber secrets',   'secrets',
    'lockhart',          'dobby',
    'riddle',            'myrtle',
    'diary',             'gilderoy',
    'gilderoy lockhart', 'colin',
    'justin',            'heir',
    'basilisk',          'moaning myrtle',
    'fawkes',            'lucius',
    'elf',               'ernie',
    'sir dobby',         'borgin',
    'aragog',            'mr borgin',
    'lucius malfoy',     'mandrakes',
    'myrtle bathroom',   'heir slytherin',
    'riddle diary',      'attacks',
    'hospital wing',     'fifty years'
  ],
  '2': [
    'prisoner',     'azkaban',
    'lupin',        'professor lupin',
    'pettigrew',    'sirius',
    'scabbers',     'crookshanks',
    'dementors',    'buckbeak',
    'trelawney',    'professor trelawney',
    'marge',        'firebolt',
    'aunt marge',   'hogsmeade',
    'dementor',     'stan',
    'peter',        'boggart',
    'sirius black', 'map',
    'hippogriff',   'rat',
    'expecto',      'ern',
    'james',        'rosmerta',
    'lesson',       'patronus'
  ],
  '3': [
    'moody',         'bagman',       'crouch',
    'cedric',        'mr crouch',    'winky',
    'krum',          'karkaroff',    'sirius',
    'dobby',         'wormtail',     'maxime',
    'madame maxime', 'rita',         'fleur',
    'madame',        'diggory',      'tournament',
    'skeeter',       'rita skeeter', 'beauxbatons',
    'task',          'elf',          'frank',
    'durmstrang',    'triwizard',    'eaters',
    'death eaters',  'champion',     'viktor'
  ],
  '4': [
    'potter order',         'order phoenix',
    'phoenix',              'umbridge',
    'sirius',               'professor umbridge',
    'luna',                 'lupin',
    'kreacher',             'harry potter order',
    'cho',                  'tonks',
    'moody',                'death eaters',
    'eaters',               'trelawney',
    'dementors',            'prophecy',
    'angelina',             'bellatrix',
    'james',                'grawp',
    'dobby',                'elf',
    'department mysteries', 'mundungus',
    'professor trelawney',  'kingsley',
    'department',           'marietta'
  ],
  '5': [
    'prince',             'half blood',
    'slughorn',           'riddle',
    'prime minister',     'scrimgeour',
    'prime',              'ogden',
    'luna',               'kreacher',
    'tonks',              'eaters',
    'death eaters',       'prophecy',
    'horcrux',            'borgin',
    'zabini',             'bellatrix',
    'lupin',              'horcruxes',
    'narcissa',           'fleur',
    'dark lord',          'eater',
    'death eater',        'sirius',
    'professor slughorn', 'hastily',
    'hepzibah',           'room requirement'
  ],
  '6': [
    'deathly',      'griphook',      'luna',
    'kreacher',     'lupin',         'eaters',
    'death eaters', 'horcrux',       'bellatrix',
    'fleur',        'locket',        'greyback',
    'tonks',        'aberforth',     'grindelwald',
    'bathilda',     'scrimgeour',    'yaxley',
    'ollivander',   'muriel',        'horcruxes',
    'doge',         'elder',         'tent',
    'gregorovitch', 'lily',          'death eater',
    'eater',        'godric hollow', 'kingsley'
  ]
}


// Get the array of top words of a book and adjust the size according to the ranking
function getWords(i) {
    return booksTopWords[i]
            .map(function(d, i) {
                return {text: d, size: 10 + ((30.0 - i) / 30.0) * 60};
            })
}

//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords(vis, i) {
    i = i || 0;

    data = getWords(i)
    vis.update(data)
    //setTimeout(function() { showNewWords(vis, i + 1)}, 2000)
}

// Insert books
/*const books = [1, 2, 3, 4, 5, 6, 7]

const miniBookGallerySelector =
  d3.select("#mini-book-gallery")
  .data(books);

miniBookGallerySelector.enter()
  .merge(miniBookGallerySelector).append("img")
    .attr("src", (d) => `data/images/book_cover/hp${d}.jpeg`)
    .attr("class", "mini-book")
    .on("mouseover", (d, i) => console.log(i));*/

/*d3.select("#ok")
  .data(booksSrcs)
  .enter()
  .append("img")
    .attr("src", "data/images/book_cover/hp1.jpeg")
    .attr("class", "mini-book")
    .on("mouseover", (d, i) => console.log(i));*/

/*d3.selectAll(".mini-book")
  .data(books)
  .join("text")
  .text(d => d)
  .on("mouseover", (d, i) => console.log(i));*/

//Create a new instance of the word cloud visualisation.
var myWordCloud = wordCloud("#wordcloud");

//Start cycling through the demo data
showNewWords(myWordCloud);
