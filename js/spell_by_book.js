var data = "http://localhost:8888/data/"
var spell_data = data+"cleaned/spellByBooke.csv"

var width =  1200
var height = 900
var margin = {left: 90, top: 80, bottom: 50, right: 20};

var svg = d3.select("#spellByBook")
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform","translate("+margin.left+","+margin.right+")")

const tooltip = d3.select("body")
              .append("div")
              .attr("id", "tooltip")
              .style("visibility", "hidden")

d3.csv(spell_data).then(data=>{
	const counts = {}

	data.forEach(d=>{
		counts[d.spell] = counts[d.spell] ? counts[d.spell] + 1 : 1;
	})

	console.log(Object.keys(counts).length)
	var sortedCounts = Object.keys(counts).map(d=>[d,counts[d]]).sort((d1,d2)=> d2[1]-d1[1]).filter(d=>d[1]>5).map(d=>d[0])

	
	var colors = {7:"#ff0000", 1:"#db0000", 2:"#b60000", 3:"#920000", 4:"#6d0000", 5:"#490000", 6:"#240000"}
	var bookName = {1:"Philosopher's Stone", 2:"Chamber of Secrets", 3:"Prisoner of Azkaban", 4:"Goblet of Fire", 5:"Order of the Phoenix", 6:"Half-Blood Prince", 7:"Deathly Hallows"}
	console.log(sortedCounts.length)

	var yScale = d3.scaleBand()
				    .domain(sortedCounts)
				    .range([0, sortedCounts.length*20])

	var xScale = d3.scaleLinear().domain([0,68000]).range([100,1100]) 

	var xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("d"))
    var yAxis = d3.axisLeft().scale(yScale)

	function zoomed() {
	  svg.select(".x.axis").call(xAxis);
	  svg.select(".y.axis").call(yAxis);
	}

	function capitalizeFirstLetter(string) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}

    var zoom = d3.zoom()
	    //.x(xScale)
	    //.y(yScale)
	    .scaleExtent([1, 10])
	    .on("zoom", zoomed);



    svg.append("g")
       .attr("transform", "translate(0, "+ (height - margin.bottom) + ")")
       .attr("id", "x-axis")
       .call(xAxis)

    svg.append("g")
       .attr("transform", "translate("+ (margin.left)+", 0)")
       .attr("id", "y-axis")
       .call(yAxis)

    console.log(sortedCounts)
    data = data.filter(x => sortedCounts.includes(x.spell))
    console.log(data)
	svg.selectAll("scatterPoints")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", d=> xScale(d.lineNb))
		.attr("cy", d=> yScale(d.spell))
		.attr("r", 10)
        .style("fill", d => colors[d.bookId])
        .style("opacity", 0.8)
        .on("click", d =>{
           showTooltip(d, d["srcElement"]["__data__"])
       	})
       	.on("mouseover", d =>{
           showTooltip(d, d["srcElement"]["__data__"])
       	})
     	.on("mouseout", function(){
           tooltip.style("visibility", "hidden")
       })

     function showTooltip(d, info){
     	var spellType = info['spellType']===""?"":" ("+info["spellType"]+")"
     	return tooltip.style("visibility", "visible")
                  .style("left", d['pageX']+10+"px")
                  .style("top", d['pageY']-80+"px")
                  .html("<span style='font-weight:bold'>"+capitalizeFirstLetter(info['spell'])+"</span>"+spellType+"<br>Book: <span style='font-style:italic;'>"+bookName[info['bookId']]+"</span><br>\"..."+info['sentence']+"...\"")
     }
})