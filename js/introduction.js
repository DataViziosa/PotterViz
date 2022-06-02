const NUMBER_OF_BOOKS = 7;
const UNITS_SOLD = 522;
const NUMBER_OF_TRANSLATIONS = 90;
const NUMBER_OF_MOVIES = 8;
const BOX_OFFICE = 7113;
const NUMBER_OF_SPELLS = 0;

/**
  To be called when entering the introduction page for the first time
*/
function displayKeyFigures() {
  const arr = [NUMBER_OF_BOOKS, UNITS_SOLD, NUMBER_OF_TRANSLATIONS, NUMBER_OF_MOVIES, BOX_OFFICE];

  let key_figures = d3.selectAll(".key-figures").data(arr)

  key_figures.enter()
    .append("div")
    .attr("font-family", "HPFont")
    .merge(key_figures)
    .transition()
    .duration(2000)
    .tween("tweenme", function(d, i) {
      return function(t) {
        this.textContent = d3.interpolateRound(0, d)(t);
      }
  })
}