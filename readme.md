# Project Title

Application Name :  `co2-calculator`

## Getting Started
Prerequisites: 
* NodeJS - version 8+
* Windows 10 

## Build this project

1) unzip the folder
2) navigate to the  extracted folder  in command prompt 
3) Install all node dependancies, run command - `npm install`
4) Install the module globally using command :  `npm install -g . `
5) Check if the app is accessible now from command prompt, type the following in command prompt : `co2-calculator` , you should see aplication details

## Get Carbon emission details:
1) Set the Environment variable for auth token 
  -  a) Rertrive an Auth token from :https://openrouteservice.org
  -  b) search for "edit system  environment variables" in windows search, open the result, click on "environment variables" button 
  -  c)Click on the "New" button under  system environment variables
  -  d)Mention Variable name as "ORS_TOKEN"
  -  e)Paste your auth token from https://openrouteservice.org in the variable value field
  -  f)click OK to exit
2) Open a new command prompt 
3) Try running app :  `co2calculator -s Bangalore   -e Mysore  -t small-diesel-car `
