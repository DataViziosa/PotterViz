//let base_path = "http://localhost:80/"
//let base_path = "https://dataviziosa.github.io/PotterViz/"

let base_path = (window.location.href.includes("index.html") ? window.location.href.substr(0,window.location.href.indexOf("index.html")) : window.location.href)
let data_path = base_path + "data/"
let cleaned_path = data_path+ "cleaned/"
let char_images = data_path+"images/characters/"
let ext_img = ".png"

let color_chart = ["#1AC3A6", "#34CF7A", "#41A1E1", "#A667BF", "#F2C500","#EA8B1D", "#EB5D49", "#475B6F", "#ECF0F1", "#9FAEAF"]
