function capitalizeFirstLetter(string) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
}

function showTooltip(d, info, tooltip){
 	var spellType = info['spellType']===""?"":" ("+info["spellType"]+")"
 	return tooltip.style("visibility", "visible")
              .style("left", d['pageX']+10+"px")
              .style("top", d['pageY']-80+"px")
              .html("<span style='font-weight:bold'>"+capitalizeFirstLetter(info['spell'])+"</span>"+spellType+"<br>Book: <span style='font-style:italic;'>"+bookName[info['bookId']]+"</span><br>\"..."+info['sentence']+"...\"")
 }



var colors = {1:"rgb(75, 160, 194,0.8)", 2:"rgb(84, 173, 137,0.8)", 3:"rgb(239, 183, 71,0.8)", 4:"rgb(233, 135, 55,0.8)", 5:"rgb(217, 71, 81,0.8)", 6:"rgb(220, 123, 176,0.8)",7:"rgb(118, 117, 187,0.8)"}
var colorsStroke = {1:"rgb(75, 160, 194,1.0)", 2:"rgb(84, 173, 137,1)", 3:"rgb(239, 183, 71,1)", 4:"rgb(233, 135, 55,1)", 5:"rgb(217, 71, 81,1)", 6:"rgb(220, 123, 176,1.0)",7:"rgb(118, 117, 187,1.0)"}
var bookName = {1:"Philosopher's Stone", 2:"Chamber of Secrets", 3:"Prisoner of Azkaban", 4:"Goblet of Fire", 5:"Order of the Phoenix", 6:"Half-Blood Prince", 7:"Deathly Hallows"}


var data = "http://localhost:80/data/"
var spell_data = data+"cleaned/spellByBooke.csv"

var width =  1200
var height = 750
var margin = {left: 40, top: 40, bottom: 40, right: 40}


var svg = d3.select("#spellByBookContainer")
			.append("svg")
			.attr("width", width+margin.right +margin.left)
			.attr("height", height+margin.top+margin.bottom)
			.append("g")
			.attr("transform","translate("+margin.left+","+margin.top+")")



const tooltip = d3.select("body")
	              .append("div")
	              .attr("id", "tooltip")
	              .style("visibility", "hidden")


d3.csv(spell_data).then(data=>{
	const counts = {}

	data.forEach(d=>{
		counts[d.spell] = counts[d.spell] ? counts[d.spell] + 1 : 1;
	})

	var sortedCounts = Object.keys(counts).map(d=>[d,counts[d]]).sort((d1,d2)=> d2[1]-d1[1]).filter(d=>d[1]>5).map(d=>d[0])
	
	
	var x0 = [0,68000]
	var y0 = sortedCounts

	var yScale = d3.scalePoint()
				    .domain(y0)
				    .range([0, height])

	var xScale = d3.scaleLinear().domain(x0).range([0,width]) 

	var xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("d"))
    var yAxis = d3.axisLeft().scale(yScale)

	
    var brush = d3.brushX().on("end", brushended),
    idleTimeout,
    idleDelay = 350;

	svg.append("g")
	   .attr("class", "brush")
	   .call(brush);

  	svg.append("g")
	   .attr("class", "axis axis--x")
	   .attr("transform", "translate("+margin.left+", "+(-margin.left)+")")
	   .call(xAxis);

	svg.append("g")
	   .attr("class", "axis axis--y") // assign an axis class
	   .attr("transform", "translate("+ (margin.left-10)+", 0)")//"+margin.top+")")
	   .call(yAxis);

    data = data.filter(x => sortedCounts.includes(x.spell))

	svg.selectAll("scatterPoints")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", d=> xScale(d.lineNb))
		.attr("cy", d=> yScale(d.spell))
		.attr("r", 10)
        .style("fill", d => colors[d.bookId])
        .style("stroke-width", 3)
        .style("stroke",d=>colorsStroke[d.bookId])
        .on("click", d =>{
           showTooltip(d, d["srcElement"]["__data__"], tooltip)
       	})
       	.on("mouseover", d =>{
           showTooltip(d, d["srcElement"]["__data__"], tooltip)
       	})
     	.on("mouseout", function(){
           tooltip.style("visibility", "hidden")
       })


function catAxis(){

}

 function brushended(e) {
    var s = e.selection;
    if (!s) {
        if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
            xScale.domain(x0);
            yScale.domain(y0)
    } else {
        xScale.domain([s[0], s[1]].map(xScale.invert, xScale))
        svg.select(".brush").call(brush.move, null);
    }
    zoom()
}

function idled() {
    idleTimeout = null;
}

function zoom() {
    var t = svg.transition().duration(750);
    svg.select(".axis--x").transition(t).call(xAxis);
    svg.select(".axis--y").transition(t).call(yAxis);
    svg.selectAll("circle").transition(t)
    .attr("cx", d=> xScale(d.lineNb))
    .attr("cy", d=> yScale(d.spell))
}
    

})