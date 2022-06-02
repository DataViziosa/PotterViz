/**
 * Return the string with the first letter in upper case
 * @param string the string to capitalize the first letter. 
 * 
 */
function capitalizeFirstLetter(string) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Display the tooltip over the selected point
 * @param d the information of the selection event
 * @param info the information of the spell casted
 * @param tooltip the tooltip object
 * 
 */
function showTooltip(d, info, tooltip){
 	var spellType = info['spellType']===""?"":" ("+info["spellType"]+")"
 	return tooltip.style("visibility", "visible")
              .style("left", d['pageX']+10+"px")
              .style("top", d['pageY']-80+"px")
              .html("<span style='font-weight:bold'>"+capitalizeFirstLetter(info['spell'])+"</span>"+spellType+"<br>Book: <span style='font-style:italic;'>"+bookName[info['bookId']]+"</span><br>\"..."+info['sentence']+"...\"")
 }


// Define useful dictionnaries
var colors = {1:"rgb(75, 160, 194,0.8)", 2:"rgb(84, 173, 137,0.8)", 3:"rgb(239, 183, 71,0.8)", 4:"rgb(233, 135, 55,0.8)", 5:"rgb(217, 71, 81,0.8)", 6:"rgb(220, 123, 176,0.8)",7:"rgb(118, 117, 187,0.8)"}
var colorsStroke = {1:"rgb(75, 160, 194,1.0)", 2:"rgb(84, 173, 137,1)", 3:"rgb(239, 183, 71,1)", 4:"rgb(233, 135, 55,1)", 5:"rgb(217, 71, 81,1)", 6:"rgb(220, 123, 176,1.0)",7:"rgb(118, 117, 187,1.0)"}
var bookName = {1:"Philosopher's Stone", 2:"Chamber of Secrets", 3:"Prisoner of Azkaban", 4:"Goblet of Fire", 5:"Order of the Phoenix", 6:"Half-Blood Prince", 7:"Deathly Hallows"}


// define over all constants
var spell_data = cleaned_path+"spellByBooke.csv"

var width =  1200
var height = 700
var margin = {left: 30, top: 40, bottom: 40, right: 40}


// add the svg object to html
var svg = d3.select("#spellByBookContainer")
			.append("svg")
			.attr("width", width+margin.right +margin.left+40)
			.attr("height", height+margin.top+margin.bottom)
			.append("g")
			.attr("transform","translate("+(40+margin.left)+","+margin.top+")")


// create the tooltip div 
const tooltip = d3.select("body")
	              .append("div")
	              .attr("id", "tooltip")
	              .style("visibility", "hidden")


d3.csv(spell_data).then(data=>{
	const counts = {}

	// create a dictionnry of count
	data.forEach(d=>{
		counts[d.spell] = counts[d.spell] ? counts[d.spell] + 1 : 1;
	})

	var sortedCounts = Object.keys(counts) // get the keys in the dictionnaries
							.map(d=>[d,counts[d]]) // map the keys to itself and its count
							.sort((d1,d2)=> d2[1]-d1[1]) // sort by count
							.filter(d=>d[1]>5) // filter out the spell with less than 5 occurences
							.map(d=>d[0]) // get the ke<
	
	
	var x0 = [0,68000] //@TODO should be replaced by the maximal line count
	var y0 = sortedCounts

	var x_sel_0 = x0[0]
	var x_sel_1 = x0[1]

	// y scale is ordinal 
	var yScale = d3.scalePoint()
				    .domain(y0)
				    .range([0, height])

    // xscale is linear in the number of lines 
	var xScale = d3.scaleLinear().domain(x0).range([0,width]) 

	// Create axis from the scale
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

	svg.append("text")      // text label for the x axis
        .attr("x", (width+margin.right+margin.left)/2 )
        .attr("y",height+margin.top )
        .attr("class","axisWhite")
        .style("text-anchor", "middle")
        .text("Line number in book");

    data = data.filter(x => sortedCounts.includes(x.spell))

    // Create all the points
	svg.selectAll("scatterPoints")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", d=> xScale(d.lineNb)) // x psition depends on the line in of the book
		.attr("cy", d=> yScale(d.spell)) // y-position is depending on the spell
		.attr("r", 10)
        .style("fill", d => colors[d.bookId]) // color depends on the book in which this spell is launched 
        .style("stroke-width", 3)
        .style("stroke",d=>colorsStroke[d.bookId])
        .on("click", d =>{
           showTooltip(d, d["srcElement"]["__data__"], tooltip) // show a superposed div with the books in which it appears and the context (the sentence)
       	})
       	.on("mouseover", d =>{
           showTooltip(d, d["srcElement"]["__data__"], tooltip) // show a superposed div with the books in which it appears and the context (the sentence)
       	})
     	.on("mouseout", function(){
           tooltip.style("visibility", "hidden") // remove the div
       })

 /**
  * Zoom in the plot depending on the selection
  * @param e the brush selection
  */
 function brushended(e) {
 	// get the selection boundary
    var s = e.selection

    if (!s) {
    	// if the selection is empty (e.g. when we double click for instance), reset to default value
        if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay)
            xScale.domain(x0)
            yScale.domain(y0)
            x_sel_0 = x0[0]
    		x_sel_1 = x0[1]
    } else {
    	// get the scale back 
        xScale.domain([s[0], s[1]].map(xScale.invert, xScale))
        svg.select(".brush").call(brush.move, null);
        x_sel_0 = xScale.domain()[0]+1000
    	x_sel_1 = xScale.domain()[1]
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
    svg.selectAll("circle")
    .transition(t)
    .attr("cx", d=> xScale(d.lineNb))
    .attr("cy", d=> yScale(d.spell))

    svg.selectAll("circle")
    .classed("out-boundary", function(d){
    	return !((d.lineNb >= x_sel_0) && (d.lineNb<=x_sel_1))
    })
    .classed("in-boundary", function(d){
    	return ((d.lineNb >= x_sel_0) && (d.lineNb<=x_sel_1))
    })
    
}
    

})