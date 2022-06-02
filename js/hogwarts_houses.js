
function redirectAnalyze(value){
	$("#analyzedHouse").val(value)
	analyseHouse()
	return true;
}


function analyseHouse(){
	var value = $("#analyzedHouse").val()
	$("#hogwarts_house_display").removeClass("gryffindor ravenclaw hufflepuff slytherin").addClass(value);
	$("#house_name").text(value.toUpperCase())

	var text =""
	switch(value){
		case "gryffindor":
		text = "Brave - Chivalrous - Courageous"
			break;
		case "ravenclaw":
		text = "Intelligent - Wise - Sharp"
			break;
		case "hufflepuff":
		text = "Loyal - Patient - Fair"
			break;
		case "slytherin": 
		text = "Cunning - Ambitious - Determined"
			break;
	}
	$("#house_description").text(text)
	displayData(value)
}


function displayData(house){
	let char_data = cleaned_path+"selected_chars.csv"
	let width = 900
	let height = 750
	const char_desc_name = document.getElementById("char_desc_name")
	// remove a previous svg plot if there was already one
	d3.select("#hogwarts_house_display").selectAll("svg").remove()
	//create the svg plot
	const svg = d3.select("#hogwarts_house_display")
		.append("svg")
		.attr("height", height)
		.attr("width", width)
		.append("g")
		.attr("transform","translate(0,0)")

	var defs = svg.append("defs")
		
	let radiusScale = d3.scaleSqrt().domain([1,7]).range([15,25])
	let simulation = d3.forceSimulation()
		.force("x", d3.forceX(width/2).strength(0.05))
		.force("y", d3.forceY(height/3).strength(0.1))
		.force("collide", d3.forceCollide(d=>radiusScale(d.books_featured_in.length)+1))


	d3.csv(char_data).then(d=>buildPlot(d))
	function buildPlot(data){
		var data = data.filter(d=>d.house.toLowerCase() == house.toLowerCase())

		defs.selectAll(".artist-pattern")
			.data(data)
			.enter().append("pattern")
			.attr("class","artist-pattern")
			.attr("id", d=>d.image_name)
			.attr("height","100%")
			.attr("width","100%")
			.attr("patternContentUnits","objectBoundingBox")
			.append("image")
			.attr("height",1)
			.attr("width",1)
			.attr("preserveAspectRatio", "none")
			.attr("xmlns:xlink","http://www.w3.org/1999/xlink")
			.attr("xlink:href",d=>char_images+d.image_name+ext_img)

		var circles = svg.selectAll(".chars")
			.data(data)
			.enter().append("circle")
			.attr("class","chars")
			.attr("r",d=>radiusScale(d.books_featured_in.length))
			.attr("fill",d=>"url(#"+d.image_name+")")
			.on("click",d=>{
				setupModal(d.srcElement.__data__, char_images, ext_img)
				$('#myModal').modal("show")
			})

		simulation.nodes(data).on('tick', ticked)

		function ticked(){
			circles.attr("cx", d=>d.x).attr("cy", d=>d.y)
		}
	}
}


function defaultIfEmpty(field, defaultVal="Unknown"){
	return ((field === "")? defaultVal:field)
}

function setupModal(char, imgFolder,imgExtension){
	// Change he character picture
	$("#char_picture").attr("src",imgFolder+char.image_name+imgExtension)
	$("#char_name").text(char.name)
	$("#char_birthday").val(defaultIfEmpty(char.birth))
	$("#char_death").val(defaultIfEmpty(char.death))
	$("#char_wand").val(formatWandText(char.core, char.wood, char.length))
	$("#char_patronus").val(defaultIfEmpty(char.patronus))
	$("#char_house").val(defaultIfEmpty(char.house))
	$("#char_hair").val(defaultIfEmpty(char.hair_color))
	$("#char_eye").val(defaultIfEmpty(char.eye_color))
	$("#char_species").val(defaultIfEmpty(char.species))
	$("#char_blood").val(defaultIfEmpty(char.ancestry))
	$("#char_gender").val(defaultIfEmpty(char.gender))

	addBookFeaturedIn(char.books_featured_in)
	addAssociations(char.associated_groups)
	addInteractions(char.connection_label)
}

function removeFirstAndLastChar(string){
	const len = string.length
	return string.substr(1,len-2)
}

// Convert string such as "[1, 2, 3]" to an array
function arrayStringToArray(arr, sep=", ", transformation = d=>d){	
	//remove first and last characters, i.e. '['' and ']' and split it on the sep character(s)
	return removeFirstAndLastChar(arr).split(sep).map(d=>transformation(d))
}

function addBookFeaturedIn(books){
	if(typeof(books)==="string"){
		books = arrayStringToArray(books)
	}	

	dico = {
		1:"Harry Potter and the Philosopher's Stone",
		2:"Harry Potter and the Chamber of Secrets",
		3:"Harry Potter and the Prisoner of Azkaban",
		4:"Harry Potter and the Goblet of Fire",
		5:"Harry Potter and the Order of Phoenix",
		6:"Harry Potter and the Half-Blood Prince",
		7:"Harry Potter and the Deathly Hallows"
	}

	$("#char_book_in").empty()
	books.forEach(d=>$("#char_book_in").append('<li class="list-group-item">'+dico[d]+'</li>'))
}

function addAssociations(associations){
	if(typeof(associations)==="string"){
		associations = arrayStringToArray(associations,", ", removeFirstAndLastChar)
	}
	$("#char_assoc_in").empty()
	associations.forEach(d=>$("#char_assoc_in").append('<li class="list-group-item">'+d+'</li>'))
}

function addInteractions(interactions){
	if(typeof(interactions)==="string"){
		interactions = arrayStringToArray(interactions, ", ", removeFirstAndLastChar)
	}
	$("#char_interact_with").empty()
	interactions.forEach(d=>$("#char_interact_with").append('<li class="list-group-item">'+d+'</li>'))
}


function formatWandText(core, wood, length){
	var str = ""
	if(core === "" && wood === "" && length===""){
		str = "Unknown"
	}else{
		var core = defaultIfEmpty(core, "Unknown core")
		var wood = defaultIfEmpty(wood, "unknown wood")
		var length = defaultIfEmpty(length, "unknown length")
		str = core+", "+wood+", "+length+"\""
	}
	return str
}
 