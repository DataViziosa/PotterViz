# PotterViz
## Deliverables
- The goal of the [first milestone](deliverables/milestone1.md) was to define the project and perform an [exploratory data analysis](python/exploratory_data_analysis.ipynb). 
- In the second [second milestone](deliverables/milestone2.md), we are asked to give more details about the visualisations we want to make.
- For the third and final milestone, we are asked to produce the visualization ([available on this link](https://dataviziosa.github.io/PotterViz/)), one [screencast presentation](https://youtu.be/f7uepJAP_5w) and finally a [process book](deliverables/process_book.pdf) explaining how we arrive to that result. 

## File structure
The structure of our folders is as follows: 
```
├── assets                                      # Folders with asset we used 
├── css                                         # All the css files we used in the project                                 
├── data                                        # All the data used throughout the project
    ├── cleaned                                 # All the cleaned files (by our python script)
    ├── hp_networks                             # files coming from the HPNetworks github
    ├── hpbooks                                 # Text of the Harry Potter books
    ├── hpcollection                            # Collection of files coming from the HPCollection database 
    ├── images                                  # All the data images of our visualization
        ├── book_cover                          # The book cover images  
        ├── characters                          # Images of all the considered chaacters 
        ├── houses_logo                         # The houses images
        ├── hp_logo                             # One image with the written logo for each of the Harry Potter and Fantastic Beasts movies
        ├── movies                              # The movie covers 
    ├── movies                                  # Movie screenplays and movie information
├── deliverables                                # Folder containing the different deliverables of the semester
├── fonts                                       # The different custom fonts related to the Harry Potter universe
├── js                                          # All the js file we used in the project
├── images                                      # The different images used throughout the website
├── music                                       # A subset of the Harry Potter music used in the website
├── python                                      # All the python files used to scrap and process our data
    ├── association_network.ipynb               # Process and create the association network
    ├── environment.yml                         # The environement.yml to execute the python script in the same environement as us
    ├── exploratory_data_analysis.ipynb         # Notebook with the exploratory data analysis
    ├── sentiment_analysis_movie_script.ipynb   # Sentiment analysis notebook 
    ├── spell_by_book.ipynb                     # Count the spell by book notebook
    ├── web_scraping.ipynb                      # Notebook with all the web scraping methods
    ├── word_cloud.ipynb                        # Notebook to create the word_cloud visualisation, i.e. select the list of words that will be used later on
├── webfonts                                    # FontAwesome fonts 
├── index.html
├── LICENSE
└── README.md
```

## Conda Environment
We have prepared a conda environment, named `potterviz`, with all the Python packages that you might need for the exam. You can install it with the following command:   
`conda env create -f environment.yml`

Once installed, to activate the environment, please use `conda activate potterviz`. To use it in Jupyter, please initiate Jupyter from a terminal with adaexam as the active conda environment. Alternatively, you can add the conda environment as a custom kernel by using the following command:   
`python -m ipykernel install --user --name=potterviz`

## Datasets used 
- [Harry Potter Collection](https://github.com/theDavidBarton/the-harry-potter-database) contains a lot of information about characters, potions, spells and books. 
- We enhance the book dataset (in the previous bullet) with more information about [sales](https://en.wikipedia.org/wiki/List_of_best-selling_books) and [translations](https://en.wikipedia.org/wiki/Harry_Potter_in_translation)
- [Harry Potter network](https://github.com/dpmartin42/Networks/tree/master/Harry%20Potter) describing the network of interactiosn between characters.
- [Harry Potter Books content](https://github.com/formcept/whiteboard/tree/master/nbviewer/notebooks/data/harrypotter) containing the texts of all the Harry Potter books. 
- [Harry Potter movies](https://www.kaggle.com/kornflex/harry-potter-movies-dataset) containing information about the movies as well as the transcript that can be useful for advanced analysis.
- Top 40 favourite Harry Potter characters based on [this article ](https://www.theguardian.com/childrens-books-site/2011/aug/30/snape-favourite-harry-potter-character).
- The images and musics used are not copyright-free, that's why we put the name of the authors or the link to the original owner of the images in the respective source.md files for [images](images/source.md) and [music](music/source.md).

## Display our visualization locally
You can either see our visualization [here](https://dataviziosa.github.io/PotterViz/) or you can display it locally. To do so, you will need to install [MAMP](https://www.mamp.info/en/mac/) which is a local web hoster. This will allow you to run an Apache Server locally and therefore, to be able to load files from disk without any complaints from the browser. Note that you have to change the path at exactly 5 locations to be able to run the code locally:
- In main.css, you have to change the path to /PotterViz/ to / at every location (lines 70, 74, 78, 82)
- Similarly, in sentiment_analysis.css at line 71.
Then, you just need to setup MAMP to point to the foler in which the visualization is stored and you will be able to display the visualization locally. 

For a better experience, please use the website in **fullscreen mode**.

## Authors
The contributors to this project are:
- [Alessio Verardo](https://github.com/AlessioVerardo)
- [Emna Fendri](https://github.com/Emna-FENDRI)
- [Stephane Selim](https://github.com/stefnans)
