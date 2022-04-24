
let datapath = "http://localhost:8888/data/"
let char_data = datapath+"cleaned/selected_chars.csv"
let char_images = datapath + "images/characters/"
let interaction_network = datapath+ "cleaned/interaction_network.json"
let association_network = datapath+ "cleaned/association_network.json"
let ext_img = ".png"

const defaultEdgeColor = "rgba(200,200,200,0.2)"
const notSelectedEdgeColor = "rgba(220,220,220,0.2)"
const selectedEdgeColor = "rgba(140,140,140,1)"
const selectedNodeColor = "rgba(140,140,140,1)"
const notSelectedNodeColor = "rgba(220,220,220,0.2)"


class SigmaGraph{
  constructor(container){
    self.container = container
    self.edges = []
    self.nodes = []
    self.s = null



    // src: https://github.com/jacomyal/sigma.js/issues/715
    sigma.classes.graph.addMethod('neighbors', function(nodeId) {
      var k,
        neighbors = {},
        index = this.allNeighborsIndex[nodeId] || {};
    
      for (k in index)
        neighbors[k] = this.nodesIndex[k];
    
      return neighbors;
      });
  }

  

  create_nodes(nodes){
    nodes.forEach(node => {
      self.nodes.push({
        id:node.id,
        label:node.name,
        x:node.x,
        y:node.y,
        color:selectedNodeColor,
        size:4,
        node_data:node
      })
    })
  }

  create_edges(edges){
    edges.forEach(edge=>{
      self.edges.push({
        id:edge.id,
        source: edge.source,
        target:edge.target,
        color:defaultEdgeColor
      })
    })
  }

  create_network(graph){
    this.create_nodes(graph.nodes)
    this.create_edges(graph.edges)


    console.log(self.edges)
    console.log(self.nodes)
    self.g = {nodes:self.nodes, edges:self.edges}
    var s = new sigma(
    {
      graph:self.g,
      renderer: {
        container: document.getElementById('sigma-container'),
        type: 'canvas'
      },
      settings: {
       labelColor: 'node',
       minEdgeSize: 0.1,
       maxEdgeSize: 2,
       minNodeSize: 5,
       maxNodeSize: 5,
       drawLabels: false,
      }
    })

    self.s = s
    
    s.refresh()
  
    s.graph.nodes().forEach(function(n) {
      n.originalColor = n.color;
      });
    s.graph.edges().forEach(function(e) {
      e.originalColor = e.color;
    });

    s.bind('outNode', e => {
      s.graph.nodes().forEach(n => {
          n.color = "#FF0000"
      })
    })
    s.bind('clickNode', e => {
      var curId = e.data.node.id
      var neighbors = s.graph.neighbors(curId)
      neighbors[curId] = 0
      s.graph.nodes().forEach(n => {
        if (n.id in neighbors) {
          n.color = selectedNodeColor
        } else{
          n.color = notSelectedNodeColor
        }
      })

      s.graph.edges().forEach(e=>{
        if(e.source == curId || e.target == curId){
          e.color =  selectedEdgeColor
        }else{
          e.color = notSelectedEdgeColor
        }
      })
      console.log(e.data.node)
      console.log(s.graph.neighbors(e.data.node.id))
      s.refresh()
    })
    s.bind('rightClickNode',e => {
      setupModal(e.data.node.node_data, char_images, ext_img)
      $('#myModal').modal("show")
      s.refresh()
    })

    
    s.bind('clickEdge',e => {
      console.log("coucou")
      s.refresh()
    })

    s.bind('overNode', e => {
      
    })
  }
}

var sigmaGraph = new SigmaGraph(interaction_network)

d3.json(association_network).then(d=>{
  sigmaGraph.create_network(d)
})




