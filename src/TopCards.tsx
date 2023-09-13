import UNDPColorModule from 'undp-viz-colors';

export const TOP_CARDS = [
  {
    id: 'Default',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Population, total',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Population, total',
        },
      },
      {
        vizType: 'stackedLineChart',
        settings: {
          dataKey: ['Rural Population, total', 'Urban Population, total'],
          strokeWidth: 1,
          lineColors: [
            UNDPColorModule.categoricalColors.locationColors.rural,
            UNDPColorModule.categoricalColors.locationColors.rural,
          ],
          graphTitle: 'Urban and Rural Population',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'GHG emission',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Greenhouse Gas Emission',
          suffix: 'MtC02e',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
          suffix: '%',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey: 'Access to electricity (% of population)',
          graphTitle: 'People with access to electricity',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Primary energy consumption per capita, measured in kilowatt-hours',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Primary energy consumption per capita, measured in kilowatt-hours',
          suffix: 'kWh',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Inequality Index-Gender Inequality Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Inequality Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Human development index (HDI)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Human Development Index',
        },
      },
    ],
  },
  {
    id: 'Poverty and Inequality',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
          suffix: '%',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey: 'Vulnerable persons covered by social assistance',
          graphTitle: 'Vulnerable persons covered by social assistance',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Inequality-adjusted HDI',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Inequality-adjusted Human Development Index',
        },
      },
    ],
  },
  {
    id: 'Energy',
    cards: [
      {
        vizType: 'dotPlot',
        settings: {
          dataKey: 'Access to electricity (% of population)',
          graphTitle: 'People with access to electricity',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey:
            'Access to clean fuels and technologies for cooking  (% of population)',
          graphTitle:
            'People with access to clean fuels and technologies for cooking',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Renewable energy consumption (% of total final energy consumption)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Renewable energy consumption (% of total final energy consumption)',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Energy imports, net (% of energy use)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Energy imports (% of energy use)',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Primary energy consumption per capita, measured in kilowatt-hours',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Primary energy consumption per capita, measured in kilowatt-hours',
          suffix: 'kWh',
        },
      },
    ],
  },
  {
    id: 'Environment',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'GHG emission',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Greenhouse Gas Emission',
          suffix: 'MtC02e',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Emission levels associated with GHG target set by (I)NDCs',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Emission levels associated with GHG target set by (I)NDCs',
          description: true,
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Reduced Mean Daily CO2 Emissions; percent change',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Reduced Mean Daily CO2 Emissions; percent change',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Population, total',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Population, total',
        },
      },
      {
        vizType: 'stackedLineChart',
        settings: {
          dataKey: ['Rural Population, total', 'Urban Population, total'],
          strokeWidth: 1,
          lineColors: [
            UNDPColorModule.categoricalColors.locationColors.rural,
            UNDPColorModule.categoricalColors.locationColors.rural,
          ],
          graphTitle: 'Urban and Rural Population',
        },
      },
    ],
  },
  {
    id: 'Gender',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Inequality Index-Gender Inequality Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Inequality Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Gender Inequality Index-Labour force participation rate, female (% ages 15 and older)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Labour force participation rate, female (% ages 15 and older)',
          suffix: '%',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey:
            'Gender Inequality Index-Share of seats in parliament (% held by women)',
          graphTitle: 'Share of seats in parliament (% held by women)',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey:
            'Proportion of women subjected to physical and/or sexual violence in the last 12 months (% of women age 15-49)',
          dotColor: 'var(--dark-red)',
          graphTitle: 'No. of women subjected to violence in last 12 months ',
        },
      },
    ],
  },
  {
    id: 'Governance',
    cards: [
      {
        vizType: 'dotPlot',
        settings: {
          dataKey: 'Individuals using the Internet (% of population)',
          graphTitle: 'People with access to internet',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Inequality in income',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Inequality in income',
          suffix: '',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Inequality in life expectancy',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Inequality in life expectancy',
          suffix: '',
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'CPIA Public sector management and institutions',
          graphTitle: 'Public Sector Management and Institutions Index',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Strength of legal rights index (0=weak to 12=strong)',
          graphTitle: 'Strength of legal rights index',
          description: true,
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Youth Unemployment (% of total labor force ages 15-24)',
          suffix: '%',
        },
      },
    ],
  },
  {
    id: 'Resilience',
    cards: [
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Refugee population by country or territory of asylum',
          graphTitle: 'Refugee population by country or territory of asylum',
          description: false,
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Population ages 65 and above (% of total population)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Population ages 65 and above (% of total population)',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Rural Population, total',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Rural Population, total',
          suffix: '',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Urban Population, total',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Urban Population, total',
          suffix: '',
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'International migrant stock at mid-year (both sexes)',
          graphTitle: 'International Migrant Stock at Mid-Year, total',
          description: true,
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dotColor: 'var(--dark-red)',
          dataKey: "Women's share of population ages 15+ living with HIV (%)",
          graphTitle: 'Population Living with HIV, share of women ages 15+',
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey:
            'Prevalence of Mental health disorders: Both (age-standardized percent)',
          graphTitle:
            'Prevalence of Mental Health Disorders, both sexes age-standardized percent',
          description: false,
          suffix: '%',
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey:
            'Proportion of local governments that adopt and implement local disaster risk reduction (DRR) strategies in line with national disaster risk reduction strategies (%)',
          graphTitle:
            'Proportion of local governments that adopt and implement local disaster risk reduction strategies in line with national disaster risk reduction strategies (%)',
          description: false,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'External Peace',
          graphTitle: 'External Peace Score',
          description: false,
        },
      },
    ],
  },
  {
    id: 'AP',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Multidimensional Poverty Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Multidimensional Poverty Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Human development index (HDI)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Human Development Index',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey: 'Individuals using the Internet (% of population)',
          graphTitle: 'People with access to internet',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Gender Inequality Index-Labour force participation rate, female (% ages 15 and older)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Female labour force participation rate',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Youth Unemployment (% of total labor force ages 15-24)',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Population, total',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Population, total',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
          suffix: '%',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey:
            'Access to clean fuels and technologies for cooking  (% of population)',
          graphTitle:
            'People with access to clean fuels and technologies for cooking',
        },
      },
    ],
  },
  {
    id: 'SSA',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gross National Income Per Capita (2017 PPP$)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gross National Income Per Capita (2017 PPP$)',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Human development index (HDI)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Human Development Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'GINI index (World Bank estimate)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'GINI Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Inequality Index-Gender Inequality Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Inequality Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Population, total',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Population, total',
        },
      },
    ],
  },
  {
    id: 'LAC',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Population, total',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Population, total',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'GDP per capita, PPP (current international $)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'GDP per capita, PPP (current international $)',
          prefix: 'US $',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gross domestic product, constant prices, percent change',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'GDP, Percent change',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Human development index (HDI)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Human Development Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'GINI index (World Bank estimate)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'GINI Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Inequality Index-Gender Inequality Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Inequality Index',
        },
      },
    ],
  },
  {
    id: 'ECA',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Poverty headcount ratio at $6.85 a day (2017 PPP) (% of population)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Poverty headcount ratio at $6.85 a day (2017 PPP), % of population',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Renewable energy consumption (% of total final energy consumption)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Renewable energy consumption (% of total final energy consumption)',
          suffix: '%',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey:
            'Gender Inequality Index-Share of seats in parliament (% held by women)',
          graphTitle: 'Share of seats in parliament (% held by women)',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Proportion of informal employment in non-agriculture employment (% of total employment in non-agriculture)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Informal Employment in Non-Agriculture Employment, percent',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'MSME employment (% total)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Persons employed by MSMEs as a percent of total employed',
          suffix: '%',
        },
      },
    ],
  },
  {
    id: 'AS',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Human development index (HDI)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Human development index (HDI)',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Development Index (value)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Development Index (GDI)',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey:
            'Gender Inequality Index-Share of seats in parliament (% held by women)',
          graphTitle: 'Share of seats in parliament (% held by women)',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Unemployment, youth total (% of total labor force ages 15-24) (modeled ILO estimate)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Youth Unemployment (% of total labor force ages 15-24)',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Poor persons covered by social protection systems',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Percentage of poor persons covered by social protection systems',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Inequality-adjusted HDI',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Inequality-adjusted Human Development Index',
        },
      },
    ],
  },
  {
    id: 'PAK',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Inequality Index-Gender Inequality Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Inequality Index',
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Rule of Law: Estimate',
          graphTitle: 'Rule of Law Index',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'CPIA Public sector management and institutions',
          graphTitle: 'Public Sector Management and Institutions Index',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'CPIA policies for social inclusion/equity cluster average',
          graphTitle: 'Social Inclusion and Equity Index',
          description: true,
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Labor force with advanced education (% of total working-age population with advanced education)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Proportion of Labour Force with Advanced Education',
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'CPIA structural policies cluster average (1=low to 6=high)',
          graphTitle: 'Structural Policies Index',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Government Effectiveness: Estimate',
          graphTitle: 'Government Effectiveness Index',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Voice and Accountability (estimate)',
          graphTitle: 'Voice and Accountability Index',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Refugees and IDPs Pressure on State',
          graphTitle: 'Refugees and IDPs Score',
          description: true,
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Natural Capital, USD per capita',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Natural capital',
          prefix: 'US $',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Government Debt',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Net debt as percent of GDP',
          suffix: '%',
        },
      },
    ],
  },
  {
    id: 'GEO',
    cards: [
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Government Effectiveness: Estimate',
          graphTitle: 'Government Effectiveness Index',
          description: true,
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gross domestic product, constant prices, percent change',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'GDP, Percent change',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Poverty headcount ratio at $3.65 a day (2017 PPP) (% of population)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Poverty headcount ratio at $3.65 a day (2017 PPP) (% of population)',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Gender Inequality Index-Maternal mortality ratio (deaths per 100,000 live births)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Maternal mortality ratio (deaths per 100,000 live births)',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Inequality Index-Gender Inequality Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Inequality Index',
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Strength of legal rights index (0=weak to 12=strong)',
          graphTitle: 'Strength of legal rights index',
          description: true,
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Carbon dioxide emissions per capita (production) (tonnes)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Carbon dioxide emissions production per capita, tonnes',
          suffix: 't',
        },
      },
    ],
  },
  {
    id: 'KGZ',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Human development index (HDI)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Human Development Index',
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Government Effectiveness: Estimate',
          graphTitle: 'Government Effectiveness Index',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Rule of Law: Estimate',
          graphTitle: 'Rule of Law Index',
          description: true,
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Inequality Index-Gender Inequality Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Inequality Index',
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Climate Risks Index Score',
          graphTitle: 'Climate Risks Index Score',
          description: true,
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'GDP per capita, PPP (current international $)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'GDP per capita, PPP (current international $)',
          prefix: 'US $',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Poverty headcount ratio at $3.65 a day (2017 PPP) (% of population)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Poverty headcount ratio at $3.65 a day (2017 PPP) (% of population)',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Primary energy consumption per capita, measured in kilowatt-hours',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Primary energy consumption per capita, measured in kilowatt-hours',
          suffix: 'kWh',
        },
      },
      {
        vizType: 'dotPlot',
        settings: {
          dataKey: 'Individuals using the Internet (% of population)',
          graphTitle: 'People with access to internet',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Share of Informal employment by sex and age (%), Total, 15 and above',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Share of Informal employment',
          suffix: '%',
        },
      },
    ],
  },
  {
    id: 'UZB',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gross domestic product, constant prices, percent change',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'GDP, Percent change',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Multidimensional Poverty Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Multidimensional Poverty Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Carbon dioxide emissions per capita (production) (tonnes)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Carbon dioxide emissions production per capita, tonnes',
          suffix: 't',
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Climate Change Readiness Score',
          graphTitle: 'Climate Change Readiness Score',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Climate Vulnerability Ranking',
          graphTitle: 'Climate Vulnerability Ranking',
          description: true,
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Inequality Index-Gender Inequality Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Inequality Index',
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Government Effectiveness: Estimate',
          graphTitle: 'Government Effectiveness Index',
          description: true,
        },
      },
      {
        vizType: 'valueCard',
        settings: {
          dataKey: 'Rule of Law: Estimate',
          graphTitle: 'Rule of Law Index',
          description: true,
        },
      },
    ],
  },
  {
    id: 'MNE',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Population, total',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Population, total',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Human development index (HDI)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Human Development Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Poverty headcount ratio at $2.15 a day (2017 PPP) (% of population)',
          suffix: '%',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Inequality Index-Gender Inequality Index',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Inequality Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'GHG emission',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Greenhouse Gas Emission',
          suffix: 'MtC02e',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey:
            'Primary energy consumption per capita, measured in kilowatt-hours',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle:
            'Primary energy consumption per capita, measured in kilowatt-hours',
          suffix: 'kWh',
        },
      },
    ],
  },
  {
    id: 'SRB',
    cards: [
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'GDP per capita, PPP (current international $)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'GDP per capita, PPP (current international $)',
          prefix: 'US $',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Human development index (HDI)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Human Development Index',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Carbon dioxide emissions per capita (production) (tonnes)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Carbon dioxide emissions production per capita, tonnes',
          suffix: 't',
        },
      },
      {
        vizType: 'lineChart',
        settings: {
          dataKey: 'Gender Development Index (value)',
          strokeWidth: 1,
          lineColor: '#232E3D',
          graphTitle: 'Gender Development Index (GDI)',
        },
      },
    ],
  },
];
