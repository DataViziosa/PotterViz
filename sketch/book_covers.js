/*
	Run the action when we are sure the DOM has been loaded
	https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
	Example:
	whenDocumentLoaded(() => {
		console.log('loaded!');
		document.getElementById('some-element');
	});
*/
function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

/*const ArtSlices = (images, align) => {
  const height = 450,
    xSteps = d3.range(0, width, width / images.length);
  //console.log(xSteps)
  const regularScale = d3
    .scaleIdentity()
    .range(0, width)
    .domain(xSteps);
  const svg = d3
    .select(DOM.svg(width, height))
    .attr("viewBox", `0, 0, ${width}, ${height}`)
    .attr('width', '100%')
    .attr("min-width", '100%')
    .attr("height", 'height');

  const g = svg
    .append("g")
    .attr('width', '100%')
    .attr("transform", `translate(${margin.left},${margin.top})`);

  var imageSlides = g
    .selectAll("image")
    .data(images)
    .join("image")
    .attr("xlink:href", d => d)
    .attr("preserveAspectRatio", `${align} ${meetOrSlice}`);

  defaultScale();

  function defaultScale() {
    imageSlides
      //.transition()
      .attr("x", (d, i) => regularScale(xSteps[i]))
      .attr("y", 0)
      .attr("width", (d, i) => width / images.length)
      .attr("height", height);
  }

  svg.on("pointermove", function(e, d, i) {
    return handleMove(d3.pointer(e));
  });
  // .on("touchmove", function(e, d, i) {
  //   return handleMove(d3.touches(e)[0]);
  // });
  // .on("mouseout touchend", defaultScale);

  function handleMove(mouse) {
    xFisheye.focus(mouse[0]); // yFisheye(mouse[1]);
    imageSlides
      .attr("x", (d, i) => xFisheye(xSteps[i]))
      .attr("height", height)
      .attr("width", (d, i) => {
        let x1 = xFisheye(xSteps[i + 1]);
        if (!x1) x1 = width;
        return x1 - xFisheye(xSteps[i]);
      });
    //.attr("preserveAspectRatio",`${align} none`)
  }

  return svg.node();
}*/

const ArtSlices = (images) => {
    var width = 500;
    var height = 500;

    //Create SVG element
    var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    //Create line element inside SVG
    svg.append("line")
       .attr("x1", 100)
       .attr("x2", 500)
       .attr("y1", 50)
       .attr("y2", 50)
       .attr("stroke", "white");
}

whenDocumentLoaded(() => {

	// prepare the data here
  const IMAGE1 = "../data/images/Aberforth_Dumbledore.png"
  const IMAGE2 = "../data/images/Alaster_Mad-Eye_Moody.png"
  const IMAGE3 = "../data/images/Albus_Dumbledore.png"
  const IMAGE4 = "../data/images/Alice_Longbottom.png"
  const IMAGE5 = "../data/images/Aragog.png"
  const IMAGES = [IMAGE1, IMAGE2, IMAGE3, IMAGE4, IMAGE5]

	//console.log(data);

	//ArtSlices(IMAGES, "xMid")
  ArtSlices(IMAGES);
});
