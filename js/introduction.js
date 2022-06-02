/*d3.selectAll("key_figures")
    .append('div')
    .transition()
    .duration(5000)
    .tween("tweenme", function(d, i) {
      return function(t) {
        this.textContent = d3.interpolateRound(0, 25)(t);
      }
    });*/

//d3.selectAll(".key_figures")


var arr = ["string1","string2","string3","string4","string5"];

/*var selected = d3.selectAll('.key-figures').data(arr)

selected.enter()
  .append("p")
  .merge(selected)
  .text(function(d){
    console.log("HERHE")
  return d;
});*/

let key_figures = d3.selectAll(".key-figures")

key_figures.append("div")
  .transition()
  .duration(5000)
  .tween("tweenme", function(d, i) {
    return function(t) {
      this.textContent = d3.interpolateRound(0, 25)(t);
    }
  });



/*transition.tween("attr.fill", function() {
    const i = d3.interpolateRgb(this.getAttribute("fill"), "blue");
    return function(t) {
      this.setAttribute("fill", i(t));
    };
  });*/
