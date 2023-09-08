# Access All Data Visualization in UNDP's Data Futures Platform
#### This project aims to provide interactive visualizations for exploring and analyzing multi dimensional data. [Click here to see the interface](https://zealous-sky-017344110.2.azurestaticapps.net).

## Table of Contents
* [Link for the visualization](#section-01)
* [Deployment](#deployment)
* [Steps to integrate the vis in static page](#section-02)
    * [Steps to integrate Main Viz](#section-02-01)
    * [Steps to integrate Country Level Viz](#section-02-02)
    * [Steps to integrate Regional Level Viz](#section-02-03)
    * [Steps to integrate Signature Solution Level Viz](#section-02-04)
    * [Customizing views for different countries, regions and signature solution](#section-02-05)
* [Pages on DFP where This Viz is Used](#section-03)
* [Related Repos](#section-04)
* [Global CSS Files and Repo](#section-05)
* [Build With](#section-06)
* [Installation](#section-07)
* [Local Deployment](#section-08)
* [Available Scripts](#section-09)
* [Tooling Setup](#section-10)

## Link for the visualization<a name="section-01"></a>
[https://zealous-sky-017344110.2.azurestaticapps.net](https://zealous-sky-017344110.2.azurestaticapps.net)

## Deployment<a name="deployment"></a>
The Production site deployed using Azure Static Web App and work flow can be found [here](https://github.com/UNDP-Data/Access-All-Data-Viz/blob/production/.github/workflows/azure-static-web-apps-zealous-sky-017344110.yml)

## Steps to Integrating the Visualization in the Data Future Platform or Any Other Page<a name="section-02"></a>
_Only editor and admins of Data Futures Platform are allowed to edit pages and embed the visualization in any page on data futures platform._

There are many type of visualization in this page:
* __Main visualization with all the data for all the country__
* __Country level visualization__
* __Regional level visualization__
* __Signature Solution level visualization__

### Main Visualization<a name="section-02-01"></a>

This is the parent visualization with all the data for all the countries. This visualization is used in teh __Access All Data__ page in DFP.

Main visualization `Access All Data` will be rendered within the following div on a static page:
```
<div data-bucket-embed></div>
```

_Key Features_
* Data Explorer: For visualizing all the data for the world. Allow user to visualize all the countries together or focus on a single country. 
* Aggregated Data Explorer: For visualizing all the aggregated data at the World level. (Future development: Allowing user to create there own country grouping)
* Datasets: List all the data used in teh visualization and allow user to download datasets in Excel format
___

### Country Level Visualization<a name="section-02-02"></a>

This is the visualization which are embedded in the country pages. 

This visualization will be rendered within the following div on a static page:

```
<div class="country~<Use Country Alpha-3 Code Here>" data-bucket-country-embed></div>
```

_The difference between country visualization and main visualization are as follow:_
* Country viz only uses the selected country data
* Country viz don't have maps, scatter plot, bar charts and multi-line chart

_Key Features_
* Data Explorer: For visualizing all the data for the country
* Sub National Data: For visualizing available sub-national data for the country (This tab only appear for the countries that have sub-national data available)
* SDG Tracker: For visualizing the SDG progress
* SDG Data Explorer: For exploring SDG related data organized based on SDGs and targets and indicators
* About: Description of the country and some key links if available
___

### Regional Level Visualization<a name="section-02-03"></a>

This is the visualization which are embedded in the regional pages. There four subcategories here:

#### Main regional level visualization

This visualization will be rendered within the following div on a static page:
```
<div class="region~<Use Region Code Here>" data-bucket-region-embed></div>
```

_The difference between this visualization and main visualization are as follow:_
* Country viz only uses the aggregated region data
* Country viz don't have maps, scatter plot, bar charts and multi-line chart

_This visualization is very similar to the Country Level visualization with some key difference:_
* Users have the ability to select a country they want to focus
* Summary visualization on the top are not categorized by signature solutions, but some key data points are used for this

_Key Features_
* Data Explorer: For visualizing all the data for the region. Allow user to visualize all the countries within the region together or focus on a single country. 
* Aggregated Data Explorer: For visualizing all the aggregated data at the region level. (Future development: Allowing user to create there own country grouping)
* Datasets: List all the data used in teh visualization and allow user to download datasets in Excel format
* About: Description of the region and some key links if available

Available values of region code in the class element:
* AP (for Asia and the Pacific)
* AS (for Arab States)
* ECA (for Europe and Central Asia)
* LAC (for Latin America and the Caribbean)
* SSA (for Sub Saharan Africa)
___

### Signature Solution Level Visualization<a name="section-02-04"></a>
This is the visualization which are embedded in the signature solution pages. There three subcategories here:

#### With the visualization data filtered by signature solutions

This visualization will be rendered within the following div on a static page:
```
<div class="signatureSolution~<Use Signature Solution Here>" data-bucket-ss-embed></div>
```

_Key Features_
* Data Explorer: For visualizing all the data related to a signature solution. Allow user to visualize all the countries together or focus on a single country. 
* Datasets: List all the data used in teh visualization and allow user to download datasets in Excel format
* About: Description of the region and some key links if available

_This visualization is very similar to the Main visualization the only difference are available data sets under the selected signature solution category are shown_

Available values for Signature solutions in the class element (Note: _Replace ` ` with a `+`_):
* Poverty+and+Inequality
* Environment
* Gender
* Energy
* Resilience
* Governance

___

Apart from the mentioned `div` above the following `script` and `link` needs to be added to the `head` or in the embed code
```
<script defer src="<Link to the Visualization Mentioned Above>/static/js/main.js"></script>
<link rel="stylesheet" href="https://undp-data.github.io/stylesheets-for-viz/style/mainStyleSheet.css" />
<link rel="stylesheet" href="https://undp-data.github.io/stylesheets-for-viz/style/StyleForGraphingInterface.css" />
<link rel="stylesheet" href="https://undp-data.github.io/stylesheets-for-viz/style/StyleForGraph.css" />
```

### Customizing views for different countries, regions and signature solution<a name="section-02_05"></a>

The code let to easily customizing certain elements based on countries, regions and signature solutions where the visualization is embedded. The section that can easily be customized for different countries, regions and signature solutions are:
* About Section
* Key Indicator (the cards on the top) in the Data Explorer
* Default view of the main Data Explorer visualization
* Header Area

#### Customizing 'About' section

To edit the About section for countries, regions and signature solution one needs to edit [AboutText.tsx](./src/AboutText.tsx) in the `src` folder

__Data Structure for the file__

Key | DataType | Description
--- | --- | --- 
title| `string` | Title of the page
id | `string` | This is used as an identifier to determine which object belong to which page. _Available values_: For region - `AP`, `SSA`, `AS`, `ECA`, `LAC`; For Signature Solutions - `Poverty and Inequality`, `Environment`, `Gender`, `Energy`,`Resilience`,`Governance`; For countries - Use the Alpha-3 ISO country codes.
bodyText | `HTMLDivElement` | This define what gets rendered in the body section. Please note: For countries, a descriptive paragraph is added by default based on key data points; and this `bodyText` get added to the descriptive text.
resources | `{source: string; link: string}[]` | This defines the links and resources that are shown at the end of the about text. Please note: For countries, link to the country page is added by default. If no resources need to be added please use an empty array.

![About Description](/readMeImgs/AboutText.jpg)

#### Customizing 'Key Indicators' in Data Explorer

To customize the 'Key Indicators' in Data Explorer for countries, regions and signature solution one needs to edit [TopCards.tsx](./src/TopCards.tsx) in the `src` folder

__Data Structure for the file__

Key | DataType | Description
--- | --- | --- 
id | `string` | This is used as an identifier to determine which object belong to which page. _Available values_: For region - `AP`, `SSA`, `AS`, `ECA`, `LAC`; For Signature Solutions - `Poverty and Inequality`, `Environment`, `Gender`, `Energy`,`Resilience`,`Governance`; For countries - Use the Alpha-3 ISO country codes. Please note: `id: Default` is used to define the card that are shown for all the pages that are not mentioned in this file. Also the card on the country pages default to the Regional Bureau they belong to if the card for the country are not specifically defined.   
cards | `{vizType: string; settings: Object}[]` | This defines the card are shown. The key value pair `settings` object depends on the `vizType`. Available value for `visType` are: `lineChart`, `stackedLineChart`, `dotPlot`, `valueCard`.

![Key Indicator Area](/readMeImgs/KeyIndicators.jpg)

#### Customizing Default view of the main Data Explorer visualization

To customize the default view of the main Data Explorer visualization for countries, regions and signature solution one needs to edit [DefaultViewsForDataExplorer.tsx](./src/DefaultViewsForDataExplorer.tsx) in the `src` folder

__Data Structure for the file__

Key | DataType | Description
--- | --- | --- 
id | `string` | This is used as an identifier to determine which object belong to which page. _Available values_: For region - `AP`, `SSA`, `AS`, `ECA`, `LAC`; For Signature Solutions - `Poverty and Inequality`, `Environment`, `Gender`, `Energy`,`Resilience`,`Governance`; For countries - Use the Alpha-3 ISO country codes. Please note: `id: default` is used to define the card that are shown for all the pages that are not mentioned in this file. Also the card on the country pages default to the Regional Bureau they belong to if the card for the country are not specifically defined. For the topics for viva topics pages - Use the name of the topic.   
firstMetric | `string` | This defines default value of the first metric. Use the `dataKey` value from the [`indicator-metadata`](https://github.com/UNDP-Data/Indicators-MetaData) to identify the appropriate indicator .
secondMetric | `string` | This defines default value of the secondary metric. Use the `dataKey` value from the [`indicator-metadata`](https://github.com/UNDP-Data/Indicators-MetaData) to identify the appropriate indicator. Can be `undefined` if the `graphType` is `map`, `barGraph`, `trendLine`, `multiCountryTrendLine`, or `dataList`.
colorMetric | `string` | This defines default value of the color metric. Use the `dataKey` value from the [`indicator-metadata`](https://github.com/UNDP-Data/Indicators-MetaData) to identify the appropriate indicator. Can be `undefined`.This is only applicable if the `graphType` is `barGraph`, or `scatterPlot`.
graphType | `string` | This defines default graph. Available values - `map`, `scatterPlot`, `barGraph`, `trendLine`, `multiCountryTrendLine`, or `dataList`.

![Main Viz](/readMeImgs/MainViz.jpg)

#### Customizing Header Area

To customize Header Area for regions and signature solution one needs to edit [IntroductionText.tsx](./src/IntroductionText.tsx) in the `src` folder. Please note: The header of Countries cannot be edited.

__Data Structure for the file__

Key | DataType | Description
--- | --- | --- 
title| `string` | Title of the page
id | `string` | This is used as an identifier to determine which object belong to which page. _Available values_: For region - `AP`, `SSA`, `AS`, `ECA`, `LAC`; For Signature Solutions - `Poverty and Inequality`, `Environment`, `Gender`, `Energy`,`Resilience`,`Governance`.   
bodyText | `HTMLDivElement` | This define what gets rendered in the body section.

![Header](/readMeImgs/Header.jpg)

## Pages on DFP Where the Visualization is Used<a name="section-03"></a>
* [Access All Data](https://data.undp.org/explore-all-data/)
* [Signature Solution - Poverty and Inequality](https://data.undp.com/topics/poverty-and-inequality)
* [Signature Solution - Resilience](https://data.undp.com/topics/resilience)
* [Signature Solution - Governance](https://data.undp.com/topics/governance)
* [Signature Solution - Energy](https://data.undp.com/topics/energy)
* [Signature Solution - Environment](https://data.undp.com/topics/environment)
* [Signature Solution - Gender Equality](https://data.undp.com/topics/gender-equality)
* This is also used in the Country pages in DFP. For ex. [here](https://data.undp.com/countries/AFG)
* This is also used in the Regional pages in DFP. For ex. [here](https://data.undp.com/countries/AFG)

## Related Repos<a name="section-04"></a>
* [__Indicators-MetaData__](https://github.com/UNDP-Data/Indicators-MetaData): This is the metadata sheet for indicators used in the visualization
* [__country-taxonomy-from-azure__](https://github.com/UNDP-Data/country-taxonomy-from-azure): This is data sheet with meta data for Countries
* [__Access-All-Data-Data-Repo__](https://github.com/UNDP-Data/Access-All-Data-Data-Repo): This is the data sheet for visualization
* [__stylesheet-for-viz__](https://github.com/UNDP-Data/stylesheets-for-viz): Repo which defines the css settings for the project

## Global CSS for UI and Graphs<a name="section-05"></a>
__Git Repo__: https://github.com/UNDP-Data/stylesheets-for-viz

__Link for stylesheets__
* https://undp-data.github.io/stylesheets-for-viz/style/mainStyleSheet.css
* https://undp-data.github.io/stylesheets-for-viz/style/StyleForGraphingInterface.css
* https://undp-data.github.io/stylesheets-for-viz/style/StyleForGraph.css

## Build with<a name="section-06"></a>
* __React__: Used as MVC framework.
* __styled-components__: Utilizes tagged template literals and the power of CSS, allows to write actual CSS code to style the components in JS/TS.
* __Various D3 Libraries__: Used for visualizations, adding interaction and reading the csv data file.
* __MapLibre__: This is package for creating sub-national maps.
* __AntD__: For UI elements like dropdown, buttons, checkbox, and slider.
* __dom-to-image__: Used to allow users to download images of various visualization views they create.
* __lodash__: Used for manipulating and iterating arrays and objects.
* __xlsx__: Used to allow users download xlsx format for data.
* __react-csv__: Used to allow users download csv format for data.
* __undp-viz-colors__: This is package for defining the visualization color palette.

## Installation<a name="section-07"></a>
This project uses `npm`. For installation you will need to install `node` and `npm`, if you don't already have it. `node` and `npm` can be installed from [here](https://nodejs.org/en/download/).

To install the project, simply clone the the repo and them run `npm install` in the project folder. You can use terminal on Mac and Command Prompt on Windows.

This project is bootstrapped with [`Vite`](https://vitejs.dev/) and was created using `npm create vite@latest` command.

Run the terminal or command prompt and then run the following

```
git clone https://github.com/UNDP-Data/Access-All-Data-Viz.git
cd Access-All-Data-Viz
npm install
```

## Local Development<a name="section-08"></a>
To start the project locally, you can run `npm run dev` in the project folder in terminal or command prompt.

This is run the app in development mode. Open [http://localhost:5173/](http://localhost:5173/) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Available Scripts<a name="section-09"></a>
* `npm run dev`: Executes `vite` and start the local server for local deployment.
* `npm run build`: Executes `tsc && vite build` and builds the app for production and deployment.

## Tooling Setup<a name="section-10"></a>
This project uses ESLint integrated with prettier, which verifies and formats your code so you don't have to do it manually. You should have your editor set up to display lint errors and automatically fix those which it is possible to fix. See [http://eslint.org/docs/user-guide/integrations](http://eslint.org/docs/user-guide/integrations).

This project is build in Visual Studio Code, therefore the project is already set up to work with. Install it from [here](https://code.visualstudio.com/) and then install this [eslint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and you should be good to go.

