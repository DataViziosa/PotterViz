## Milestone 2

### General structure and comments
We will need the following 2 lectures throughout the whole projects, therefore we will only mention them once and not under each visualisation.

 - The web development and D3 lectures as the visualisation is the central goal of the project.
 - The lecture on storytelling, since it will be important to understand how to write the story in a interesting and interactive way.

More generally, we will use `fullpage.js` to provide a good experience for the user. We will also use `Boostrap` as the CSS library since it provides easy-to-use built-in components.

Our core website will be composed of the following visualisations. 
### Hogwarts houses
<img align="left" width="300" height="150" src="images/houses.png"></img>
Hogwarts houses is a very central subject as well as the entry point of the student in the Wizarding world. Each student will be sorted into one of the 4 Hogwarts houses when (s)he starts his/her scholarship. Since a lot of new students are sorted each year in the different houses, it can be hard to keep track of who belongs to which house. The aim of this visualisation is precisely to help the reader to explore interactively the different houses. We will start with a “menu” section (not shown here) which will simply allow the user to click on one of the 4 houses (s)he wants to investigate. 

The second part of the visualisation will be more challenging but also more complete and interesting, it will display the different character in the selected house. Each character will be represented by a circle. When we click on a character, a side information bar will appear with all the character related information. Moreover, the size of the circle describing the character will depend on the importance of the character throughout the book series, i.e. the size will depend on the number of book each character appears. 

> We will need to use the Bubble Diagram features from D3 (for the second part of the visualisation),  the “menu” can be done using vanilla Javascript and we will need the lectures on D3 and Javascript. 

### Character networks
<img align="right" width="300" height="150" src="images/network.png"></img>
After the investigation of the houses, we may want to get more insights about the characters. For this purpose, we will have two different but related network visualisations.
The first one will display a network of the association between characters, i.e. a network with an edge between any two characters if they were in the same group of people (or association) throughout the saga. This visualisation will have a filtering feature allowing us to visually keep only the associations we want to investigate. Furthermore, when clicking on one node, we will display the character information sidebar presented earlier. Finally, when clicking on some edge, we will be shown all the association that the two characters have in common.
 
The second and related view of the character network, will show a graph based on the interactions, i.e. two characters have a link between them if they interact at one point in the series. This second view will also allow us to display the information sidebar as before.

> For these visualisations, we will probably need the lecture on graphs as well as the D3 library on graphs. (e.g. Hierarchical edge bundling).

### Spells
<img align="right" width="300" height="150" src="images/spellPiechart.png"></img>

### Wands
<img align="right" width="300" height="150" src="images/characterToWand.png"></img>

