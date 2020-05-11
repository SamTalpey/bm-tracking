# bm-tracking
WPI IQP for the British Museum Interpretation Team to utilize for visitor evaluation

# General Summary

First a floor plan must be made using software such as Microsoft Visio, and saved in an image file format (e.g. PNG, JPEG, etc). This floor plan must have display numbers marked for each display that is to be tracked. After the image is saved, it must be opened in a photo manipulation software such as Microsoft Paint. The user will then record the pixel size of the image into the configuration file, as well as the pixel coordinates of each individual display number. The coordinates must have the headers “display”, “x”, and “y” in order to be read by the program. These coordinates should be saved as a CSV file from any spreadsheet program, and then placed along with the floor plan image into the same folder as the webpage (i.e. the Github repository). Both the names of these files should also be recorded in the configuration file.
Following creation of a floor plan image and corresponding coordinates, the user must then create the survey they wish to use. If the user wishes to change the survey in the application, they may copy the survey JSON from the configuration file into the JSON editor of the SurveyJS creator site. They may then change whatever aspects they like, and recopy the JSON data back to the configuration file. To make a new survey, simply use the creator.
Once all information is copied into the configuration file and into the directory, the user can connect to the app through a network connection, and begin utilizing the app either online or offline. The user can freely switch between live observations and exit surveys, with a responsive floor plan to track where visitors are. All observations are automatically tagged with the current name and an accurate timestamp upon creation. Whenever the user is ready to upload, they can send all of their collected data to an online spreadsheet at the press of a button, where it will be automatically processed and inserted into organized sheets. Figure 7 below shows what the application looks like after completing an exit survey.

# Configuration details

The file config.js contains all of the information that may change based on what floorplan or survey is used. Each variable has the following meaning:
* exitSurveyJSON: The JSON notation for the exit survey. Edit this using SurveyJS creator.
* observationJSON: The JSON notation for the observation form. Edit this using SurveyJS creator.
* spreadsheetURI: The URI for the google spreadsheet script deployed as a web app. Found in sheets through tools->script editor
* coordFileName: The name of the CSV file containing your coordinate data for the floorplan
* imageFileName: The name of the floorplan image file
* imageWidth: The width of the image in pixels
* imageHeight: The height of the image in pixels
* imageScale: Factor to scale the image by on the page, mainly for keepingthe picture from being too large
* markerRadius: The radius of the marker on the floorplan. Measured in pixels, but should be left alone if possible

# Google Sheets Macro
Attatched to the end of the config file, is commented code labeled as a google sheets macro. This is code for a basic web app to receive the data being sent from this page. To deploy it correctly, follow these steps:
1. Create a new google spreadsheet
2. Select Tools->Script Editor
3. Paste all the commented code into the Code.gs file and save
4. Select Publish->Deploy as web app...
5. Project version: "new", Execute the app: "Me", Who has access to the app: "Anyone, even anonymous"*
  Please note that this will issue a security notification to the google account, however it does not risk access to the file for the script itself. While anyone may call the script, nobody but the owner may edit it. This allows volunteers to use the app
6. Select Deploy
7. Copy the link, and paste it into the config file variable spreadsheetURI
8. Set up the spreadsheet so that there are 2 sheets. The program will place observation into the first, and the survey resultsd into the second
9. Add headers manually, as only data is copied to spreadsheet
