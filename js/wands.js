/*google.charts.load("current", {packages:["sankey"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'Weight');
    data.addRows([
        [ 'Albus Dumbledore', 'Thestral tail hair', 1 ],
        [ 'Hermione Granger', 'Dragon heartstring', 1 ],
        [ 'Harry Potter', 'Phoenix feather', 1 ],
        [ 'Draco Malfoy', 'Veela hair', 1 ],
        [ 'Cedric Diggory', 'Unicorn hair', 1 ],
        [ 'Neville Longbottom', 'Unicorn hair', 1 ],
        [ 'Quirinus Quirrell', 'Unicorn hair', 1 ],
        [ 'Bellatrix Lestrange', 'Dragon heartstring', 1 ],
        [ 'Dolores Umbridge', 'Dragon heartstring', 1 ],
        [ 'Lucius Malfoy', 'Dragon heartstring', 1 ],
        [ 'Garrick Ollivander', 'Dragon heartstring', 1 ],

        [ 'Minerva McGonagall', 'Dragon heartstring', 1 ],

        [ 'Ronald Diggory', 'Unicorn hair', 1 ],
        [ 'Tom Riddle', 'Phoenix feather', 1 ],
        [ 'Celestina Warbeck', 'Phoenix feather', 1 ],
        [ 'Fleur Delacour', 'Phoenix feather', 1 ]


    ]);

    // Set chart options
    var options = {
        width: 600,
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.Sankey(document.getElementById('sankey_multiple'));
    //document.body.style.backgroundColor = "black";
    chart.draw(data, options);
}
*/