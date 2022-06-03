var char_data_sa = cleaned_path+"selected_chars.csv"

var movie_id_to_name = {
	1: "Harry Potter and the Philosopher's Stone",
	2: "Harry Potter and the Chamber of Secrets",
	3: "Harry Potter and the Prisoner of Azkaban",
	4: "Harry Potter and the Gobelt of Fire",
	5: "Harry Potter and the Order of the Phoenix",
	6: "Harry Potter and the Half-Blood Prince",
	7: "Harry Potter and the Deathly Hallows Part 1",
	8: "Harry Potter and the Deathly Hallows Part 2"
}

displayMovie(1)
var width_sa = 1000

function returnListOfChaptersInMovie(data){
	var last_chapter = ""
	var cur_id = 0
	var cur_nb = 0
	var cur_total = 0
	var set_chars = new Set()
	var cur_max = -2.0
	var cur_min = 2.0

	var chapters = []

	for(k in data){
		var d = data[k]
		var score = parseFloat(d.polarity_score)

		if(last_chapter == d.chapter){
			cur_nb += 1
			cur_total += 1
			set_chars.add(d.character)
			cur_max = (score > cur_max) ? score : cur_max
			cur_min = (score < cur_min) ? score : cur_min
		} else{
			if(cur_id!=0){
				chapters.push({
					id: cur_id,
					name: last_chapter,
					nb_dialog: cur_nb,
					start_diag: cur_total-cur_nb,
					chars: set_chars,
					min: cur_min,
					max: cur_max
				})
			}
			cur_id += 1
			cur_nb = 1
			cur_total += 1
			cur_max = score
			cur_min = score
			last_chapter = d.chapter
			set_chars = new Set()
			set_chars.add(d.character)
		}
	}
	chapters.push({
					id: cur_id,
					name: last_chapter,
					nb_dialog: cur_nb,
					start_diag: cur_total-cur_nb,
					chars: set_chars,
					min: cur_min,
					max: cur_max
				})
	return [chapters, cur_total]
}

// class representing a polyarity score plot
class PolarityScore{
	constructor(){
		// define all the basic values of the plot
		this.data = []
		this.xScale = d3.scaleLinear()
		this.yScale = d3.scaleLinear()
		this.width = width_sa
		this.height = 300
		this.svg = d3.select("#sentimentAnalysisPlot")
						.append("svg")
						.attr("width", this.width)
						.attr("height", this.height)

	  	
	  	this.margin = {top: 20, right: 30, bottom: 30, left: 50}

	  	this.xAxis = d3.axisBottom(this.xScale).tickSize(2)
		this.yAxis = d3.axisLeft().scale(this.yScale).tickSize(2)

		

		this.tooltip_rectangle = d3.select("body")
	              .append("div")
	              .attr("id", "tooltip_rectangle")
	              .style("visibility", "hidden")
	}

	/**
	 * 
	 * 
	 * 
	 */
	displayRectangleTooltip(d, info, tooltip_rectangle){
	 	return tooltip_rectangle.style("visibility", "visible")
	              .style("left", d['pageX']+30+"px")
	              .style("top", d['pageY']-80+"px")
	              .html("<span style='font-weight:bold'>Speaker: "+info['character']+"<br></span>Score: "+info['polarity_score']+"<br><br>«"+info['dialog']+"»")
	}

	changeData(data){
		var tot_line = data.length
		this.data = [...data]
		this.xScale.domain([1, tot_line]).range([this.margin.left, this.width - this.margin.right])
		this.yScale.domain([-1,1]).range([ this.height - this.margin.bottom, this.margin.top])
		this.svg.html("")

	    //Append group and insert axis
	    this.svg.append("g")
	    	.attr("class", "axisWhite")
	    	.call(this.xAxis)

	    this.svg.append("g")
		   .attr("class", "axis axis--y") // assign an axis class
		   .attr("transform", "translate("+ (this.margin.left)+", 0)")
		   .call(this.yAxis);

		this.ytitle = this.svg.append("text")      // text label for the x axis
					        .attr("x", -this.height/2)
					        .attr("y",this.margin.top)
					        .attr("class","axisWhite")
					        .attr("transform","rotate(-90)")
					        .style("text-anchor", "middle")
					        .text("Polarity score")



		this.svg.append("path")
	      .datum(data)
	      .attr("fill", "none")
	      .attr("stroke", "#fff")
	      .attr("stroke-width", 1)
	      .attr("class", "line-plot-scene")
	      .attr("d", d3.line()
	      	.curve(d3.curveBasis) 
	        .x(d=>this.xScale(d.id))
	        .y(d=>this.yScale(d.polarity_score))
          )

        this.svg.append("line")          // attach a line
		    .style("stroke","white")// colour the line
		    .attr("x1", this.xScale(1))     // x position of the first end of the line
		    .attr("y1", this.yScale(0))      // y position of the first end of the line
		    .attr("x2", this.xScale(tot_line))   // x position of the second end of the line
		    .attr("y2", this.yScale(0))

        var rect = this.svg.selectAll(".rect-pol-score")
        		.data(data)
        		.enter()
        		.append("rect")
        		.attr("x", d=> this.xScale(parseInt(d.id)-0.5))
        		.attr("y", d=> {
        			var score = parseFloat(d.polarity_score)
        			if(score > 0.0){
        				return this.yScale(score)
        			}
        			return 0
        		})
        		.attr("width", d => 0)
        		.attr("height", d => 0)
        		.attr("class", "rect-pol-score")
        		.on("mouseover",d => {
        			this.displayRectangleTooltip(d, d.srcElement.__data__, this.tooltip_rectangle)
        		})
        		.on("mouseout", d => {
        			this.tooltip_rectangle.style("visibility", "hidden")
        		})
        rect.exit().remove()
        this.addRectangleScene(data)
	}

	addRectangleScene(data){
		var chapters = returnListOfChaptersInMovie(data)
		this.svg.selectAll(".rect-movie")
					.data(chapters[0])
					.enter()
					.append("rect")
					.attr("class", "rect-movie")
					.attr("x", d => this.xScale(d.start_diag))
        			.attr("y", d => this.yScale(1))
					.attr("width", d => this.xScale(d.start_diag+d.nb_dialog)-this.xScale(d.start_diag))
					.attr("height", d => -this.yScale(1)+this.yScale(-1))
	}

	showRectangle(highlighted_chapter){
		this.svg.selectAll(".rect-movie").each(
		    function(){
		        var elt = d3.select(this)
		        elt.classed("rect-movie-tmpsel", elt._groups[0][0].__data__.name == highlighted_chapter)
		    }
		)
	}

	changeScale(x_low, x_high){
		//Update xAxis scale
		this.xScale.domain([x_low, x_high])
			.range([0, this.width])

	  //Call axes
	  var t =this.svg.transition()
	    .duration(500)
	    .ease(d3.easeLinear)
	    .call(this.xAxis)


	

	   this.svg.selectAll(".line-plot-scene")
	   		.transition(t)
	   		.attr("d", d3.line()
			    .x(d=> this.xScale(d.id))
			    .y(d=> this.yScale(d.polarity_score))
		    )
		    .style("visibility","hidden")

		this.svg.selectAll(".rect-movie")
				.attr("visibility", "hidden")

		this.svg.selectAll(".rect-pol-score")
	   		.transition(t)
	   		.attr("x", d=> this.xScale(parseInt(d.id)-0.5))
    		.attr("y", d=> {
    			var score = parseFloat(d.polarity_score)
    			if(score > 0.0){
    				return this.yScale(score)
    			}else{
    				return this.yScale(0)
    			}
    		})
    		.attr("width", d=>{
        			var idInt = parseInt(d.id)
        			return this.xScale(idInt+0.5)-this.xScale(idInt-0.5)
			})
			.attr("height", d=>{
				var score = parseFloat(d.polarity_score)
    			if(score > 0.0){
    				return this.yScale(0)-this.yScale(score)
    			}else{
    				return -this.yScale(0)+this.yScale(score)
    			}
			})
	}
}

var pol = new PolarityScore()

/**
 * Generate a div with all the character in that scene. 
 * @param char_set the set of all characters in the scene
 */
function charInScene(char_set){
	var char_list = Array.from(char_set)
	var container = d3.select("#charInScene")

	d3.csv(char_data_sa).then(d=>buildPlot(d))
	function buildPlot(char_data){
		var char_data = char_data.filter(d=> char_list.includes(d.name))
		container.html("");

		var divs = container.selectAll(".chars-scene")
			.data(char_data)
			.enter()
			.append("div")
			.attr("class","chars-scene col-4 col-md-3 inline-block")
			.on("mouseover",d=>{
				var char_name = d.srcElement.__data__.name
				d3.select("#sentimentAnalysisPlot").selectAll(".rect-pol-score").each(
				    function(){
				        var elt = d3.select(this)
				        elt.classed("hightlighted-tmp", elt._groups[0][0].__data__.character===char_name)
				    }
				) 
			})
			.on("mouseout", d=> {
				d3.select("#sentimentAnalysisPlot").selectAll(".rect-pol-score").each(
					 function(){
				        var elt = d3.select(this)
				        elt.classed("hightlighted-tmp", false)
				    })
			})
			.on("click", d => {
				var char_name = d.srcElement.__data__.name
				d3.select("#sentimentAnalysisPlot").selectAll(".rect-pol-score").each(
				    function(){
				        var elt = d3.select(this)
				        elt.classed("highlighted", elt._groups[0][0].__data__.character===char_name)
				    }
				) 
			})
		var imgs = divs.append("img")
					   .attr('src', d=>char_images+d.image_name+ext_img)
					   .attr("width", 50)
					   .attr("height", 50)
					   .attr("class", "chars-img inline-block")

		var names = divs.append("h5")
						.text(d=>d.name)
						.attr("class", "chars-name inline-block")


		divs.exit().remove()
	}
}

function displayScenes(data, pol){

	function displaySceneTooltip(d, info, tooltip_sentiment){
	 	return tooltip_sentiment.style("visibility", "visible")
	              .style("left", d['pageX']+30+"px")
	              .style("top", d['pageY']-80+"px")
	              .html("<span style='font-weight:bold'>"+info['name']+" ("+info['nb_dialog']+")<br>Min polarity score: "+info['min']+"<br>Max polarity score: "+info['max']+"</span>")
	}
	var arr_chapters = returnListOfChaptersInMovie(data)
	var chapters = arr_chapters[0]
	var cur_total = arr_chapters[1]
	

	var tooltip_sentiment = d3.select("body")
	              .append("div")
	              .attr("id", "tooltip_scene")
	              .style("visibility", "hidden")


	var svgScene = d3.select("#sentimentAnalysisMenu")
						.attr("width", width_sa)
						.attr("height", 150)
	svgScene.html("")


	// y scale is ordinal 
	var xScale = d3.scaleLinear()
				    .domain([1,cur_total])
				    .range([0, width_sa])

	var rects = svgScene.selectAll(".menu-block")
						.data(chapters)
						.enter()
						.append("rect")
						.attr("width", d=>{
							return xScale(d.start_diag+d.nb_dialog)-xScale(d.start_diag)
						})
						.attr("height", 150)
						.attr('class', 'menu-block')
						.attr('y', d=> 0)
						.attr('x', d=> xScale(d.start_diag))
						.on("click",d=> {
							var sceneData = d.srcElement.__data__
							charInScene(sceneData.chars)
							pol.changeScale(sceneData.start_diag, sceneData.nb_dialog+sceneData.start_diag)
							pol.ytitle.text("")
						})
						.on("mouseover", d => {
							pol.showRectangle( d.srcElement.__data__.name)
				           displaySceneTooltip(d, d["srcElement"]["__data__"], tooltip_sentiment) // show a superposed div with the books in which it appears and the context (the sentence)
				       	})
				     	.on("mouseout", function(){
				     		pol.showRectangle("")
				           tooltip_sentiment.style("visibility", "hidden") // remove the div
				       })

}


function displayMovie(movieNb){
	$("#charInScene").html("")
	d3.csv(cleaned_path+"sentimentMovie.csv").then(d=>{
		var movie_name = movie_id_to_name[movieNb]
		var data = d.filter(x=> x.movie == movie_name)

		pol.changeData(data)
		displayScenes(data, pol)
	})
}