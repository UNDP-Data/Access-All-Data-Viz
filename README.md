# Access All Data Visualization in UNDP's Data Futures Platform

This project aims to provide interactive visualizations for exploring and analyzing multi dimensional data. [Click here to see the interface](https://data.undp.org/explore-all-data/).

## Features
* Load and display data for around 200 different indicators.
* Interactively filter to focus on specific trends and patterns.
* Display data in a variety of chart types, including bar charts, line charts, scatter plots, maps and more.
* Provide intuitive interaction to allow users to explore the data at their own pace.

__Link for the visualization__
[https://undp-vaccine-equity-dashboard.netlify.app/](https://undp-vaccine-equity-dashboard.netlify.app/)

__Pages Where the Visualization is Used__
* [Access All Data](https://data.undp.org/explore-all-data/)
* [Signature Solution - Poverty and Inequality](https://data.undp.com/topics/poverty-and-inequality)
* [Signature Solution - Resilience](https://data.undp.com/topics/resilience)
* [Signature Solution - Governance](https://data.undp.com/topics/governance)
* [Signature Solution - Energy](https://data.undp.com/topics/energy)
* [Signature Solution - Environment](https://data.undp.com/topics/environment)
* [Signature Solution - Gender Equality](https://data.undp.com/topics/gender-equality)
* This is also used in the Country pages in DFP. For ex. [here](https://data.undp.acsitefactory.com/countries/AFG)

## Related Repos
* [__Indicators-MetaData__](https://github.com/UNDP-Data/Indicators-MetaData): This is the metadata sheet for indicators unsed in the visualization
* [__country-taxonomy-from-azure__](https://github.com/UNDP-Data/country-taxonomy-from-azure): This is data sheet with meta data for Countries
* [__Access-All-Data-Data-Repo__](https://github.com/UNDP-Data/Access-All-Data-Data-Repo): This is the data sheet for visualziation
* [__stylesheet-for-viz__](https://github.com/UNDP-Data/stylesheets-for-viz): Repo which defines the css settings for the project

## Global CSS for UI and Graphs
__Git Repo__: https://github.com/UNDP-Data/stylesheets-for-viz

__Link for stylesheets__
* https://undp-data.github.io/stylesheets-for-viz/style/mainStyleSheet.css
* https://undp-data.github.io/stylesheets-for-viz/style/StyleForGraphingInterface.css
* https://undp-data.github.io/stylesheets-for-viz/style/StyleForGraph.css

## Build with
* __React__: Used as MVC framework.
* __CRACO__: Used to configure different scripts (See Available Scripts for more details)
* __styled-components__: Utilises tagged template literals and the power of CSS, allows to write actual CSS code to style the components in JS/TS.
* __Various D3 Libraries__: Used for visualizations, adding interaction and reading the csv data file.
* __AntD__: For UI elements like dropdown, buttons, checkbox, and slider.
* __dom-to-image__: Used to allow users to download images of various visualization views they create.
* __lodash__: Used for manipulating and iterating arrays and objects.
* __xlsx__: Used to allow users download xlsx format for data.
* __react-csv__: Used to allow users download csv format for data.
* __undp-viz-colors__: This is package for defining the visualization color palette.

## Installation
This project uses `npm`. For installation you will need to install `node` and `npm`, if you don't already have it. `node` and `npm` can be installed from [here](https://nodejs.org/en/download/).

To install the project, sinply clone the the repo and them run `npm install` in the project folder. You can use terminal on Mac and Command Prompt on Windows.

Run the terminal or command prompt and then run the following

```
git clone https://github.com/UNDP-Data/Access-All-Data-Viz.git
cd Access-All-Data-Viz
npm install
```

## Local Development
To start the project locally, you can run `npm run start` in the project folder in terminal or command prompt.

This is run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Available Scripts
Craco is used to add a cofiguration layer for CRA. The primary function is to stop the `build` to have optimized chunks of the built script. _This make the using the script in the Wordpress easier._ The configuration file for Craco is placed in the root folder and called `craco.config.js`
* `npm run build`: Executes `craco build` and builds the app without chunking the main js script file.
* `npm run start`: Executes `craco start` and start the local server for local deployment.
* `npm install`: Installs all the dependencies.

## Tooling Setup
This project uses ESLint integrated with prettier, which verifies and formats your code so you don't have to do it manually. You should have your editor set up to display lint errors and automatically fix those which it is possible to fix. See [http://eslint.org/docs/user-guide/integrations](http://eslint.org/docs/user-guide/integrations).

This project is build in Visual Studio Code, therefore the project is already set up to work with. Install it from [here](https://code.visualstudio.com/) and then install this [eslint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and you should be good to go.

## Future Scope
* Migrate from CRA to Vite for better developer experience

## Author
Design and development: [**Mustafa Saifee**](mailto:mustafa.saifee@undp.org)