google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawPieChart)

function drawPieChart() {
    var data = google.visualization.arrayToDataTable([
        ['Spell', 'Percentage'],
        ['Charm',     157],
        ['Healing Spell',      3],
        ['Conjuration',      7],


        [' Curse', 25],
        [' Hex', 21],
        ['Transfiguration',    26],
        ['Other',  14]
    ])

    var options = {
        title: 'Repartition of Spell types',
        backgroundColor: 'transparent'
    }

    var chart = new google.visualization.PieChart(document.getElementById('piechart'))
    chart.draw(data, options)
}