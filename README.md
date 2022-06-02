# PotterViz
## Motivation
## Deliverables
- The goal of the [first milestone](deliverables/milestone1.md) was to define the project and perform an [exploratory data analysis](python/exploratory_data_analysis.ipynb). 
- In the second [second milestone](deliverables/milestone2.md), we are asked to give more details about the visualisations we want to make.

## File structure
The structure of our folders is as follows: 
```
├── assets
├── css
├── data
├── deliverables
├── fonts
├── images
├── music
├── plugins
├── js

├── helper
    ├── autoencoder_helper.py             # Helper function to extract feature from patches using the auto-encoder
    ├── const.py                          # All the constants used throughout the project
    ├── datasets_image.py                 # Data augmentation for the FCN and Unet neural networks
    ├── datasets_patch.py                 # Datasets for the Autoencoder network
    ├── image.py                          # Functions to handle images
    ├── loading.py                        # all the loading functions for training and testing dataset
    ├── metrics.py                        # Functions to assess performance of our datasets
    ├── neural_net.py                     # Functions related to the training of the datasets
    ├── predictions.py                    # functions to predict whether a pixel is a road or background in the test data
    ├── submission.py                     # Functions used to create submissions for AICrowd
    ├── visualisations.py                 # Functions used to make differnet visualisations of the images
├── models
    ├── autoencoder.py                    # The architecture of the auto-encoder neural network described in section 2.2.2 of the report
    ├── FCNet.py                          # The Fully convolutional network architecture described in part 2.2.4 of the report
    ├── features_extraction.py            # Functions used to extract features from image or image patch
    ├── UNet.py                           # The UNet architecture architecture described in part 2.2.3 of the report
├── output
    ├── features                          # Features outputed by the autoencoder neural network. 
    ├── weights                           # Save of the different weights output during the training of our networks
├── autoencoder.ipynb                     # Notebook detailling the implementation and results of the autoencoder
├── baseline.ipynb                        # Initial data exploration and baseline model training
├── neural_net_training.ipynb             # Notebook used to train our neural netwokrs
├── report.pdf                            # The report of the project
├── requirements.txt                      # List of all the packages (and versions) needed to run our project
└── README.md
```
## Authors
The contributors to this project are:
- [Emna Fendri](https://github.com/Emna-FENDRI)
- [Stephane Selim](https://github.com/stefnans)
- [Alessio Verardo](https://github.com/AlessioVerardo)
