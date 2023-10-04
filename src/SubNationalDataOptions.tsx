import { format } from 'd3-format';
import UNDPColorModule from 'undp-viz-colors';

export const SUB_NATIONAL_DATA_OPTIONS = [
  {
    id: 'electricityAccess',
    title: 'Electricity Access',
    countryID: 'iso_3',
    regionID: 'adm2_name',
    pmTilesSource:
      'pmtiles://https://undpngddlsgeohubdev01.blob.core.windows.net/admin/rural_urban_District_Electricity_Access_20230421004438.pmtiles',
    options: [
      {
        label: 'Access to Reliable Energy Services (%)',
        id: 'percentAccess',
        sourceLayer: 'tmpl3ue0da4',
        hasID: 'PopAccess2020',
        binning: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        colorScale: UNDPColorModule.divergentColors.colorsx10,
        fillSettings: [
          'let',
          'percentAccess',
          ['/', ['get', 'PopAccess2020'], ['get', 'TotPopulation']],
          [
            'interpolate',
            ['linear'],
            ['var', 'percentAccess'],
            0,
            UNDPColorModule.divergentColors.colorsx10[0],
            0.0999,
            UNDPColorModule.divergentColors.colorsx10[0],
            0.1,
            UNDPColorModule.divergentColors.colorsx10[1],
            0.1999,
            UNDPColorModule.divergentColors.colorsx10[1],
            0.2,
            UNDPColorModule.divergentColors.colorsx10[2],
            0.2999,
            UNDPColorModule.divergentColors.colorsx10[2],
            0.3,
            UNDPColorModule.divergentColors.colorsx10[3],
            0.3999,
            UNDPColorModule.divergentColors.colorsx10[3],
            0.4,
            UNDPColorModule.divergentColors.colorsx10[4],
            0.4999,
            UNDPColorModule.divergentColors.colorsx10[4],
            0.5,
            UNDPColorModule.divergentColors.colorsx10[5],
            0.5999,
            UNDPColorModule.divergentColors.colorsx10[5],
            0.6,
            UNDPColorModule.divergentColors.colorsx10[6],
            0.6999,
            UNDPColorModule.divergentColors.colorsx10[6],
            0.7,
            UNDPColorModule.divergentColors.colorsx10[7],
            0.7999,
            UNDPColorModule.divergentColors.colorsx10[7],
            0.8,
            UNDPColorModule.divergentColors.colorsx10[8],
            0.8999,
            UNDPColorModule.divergentColors.colorsx10[8],
            0.9,
            UNDPColorModule.divergentColors.colorsx10[9],
            1,
            UNDPColorModule.divergentColors.colorsx10[9],
          ],
        ],
        mouseOverInfoFunction: (d: any) => {
          return (
            <div
              style={{
                fontSize: '0.875rem',
              }}
            >
              <p
                className='undp-typography margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d.adm2_name}{' '}
                <span style={{ color: 'var(--gray-500)' }}>
                  ({d.adm1_name})
                </span>
              </p>
              <p
                className='undp-typography bold margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {((d.PopAccess2020 / d.TotPopulation) * 100).toFixed(1)}%
              </p>
            </div>
          );
        },
      },
      {
        label: 'No. People With No Access to Reliable Energy Services',
        id: 'popNoAccess',
        hasID: 'PopAccess2020',
        sourceLayer: 'tmpl3ue0da4',
        binning: [100, 1000, 100000, 500000, 1000000, 1000000000],
        colorScale: UNDPColorModule.sequentialColors.negativeColorsx06,
        fillSettings: [
          'let',
          'popNoAccess',
          ['-', ['get', 'TotPopulation'], ['get', 'PopAccess2020']],
          [
            'interpolate',
            ['linear'],
            ['var', 'popNoAccess'],
            0,
            UNDPColorModule.sequentialColors.negativeColorsx06[0],
            99.99,
            UNDPColorModule.sequentialColors.negativeColorsx06[0],
            100,
            UNDPColorModule.sequentialColors.negativeColorsx06[1],
            999.99,
            UNDPColorModule.sequentialColors.negativeColorsx06[1],
            1000,
            UNDPColorModule.sequentialColors.negativeColorsx06[2],
            99999.99,
            UNDPColorModule.sequentialColors.negativeColorsx06[2],
            100000,
            UNDPColorModule.sequentialColors.negativeColorsx06[3],
            499999.99,
            UNDPColorModule.sequentialColors.negativeColorsx06[3],
            500000,
            UNDPColorModule.sequentialColors.negativeColorsx06[4],
            999999.99,
            UNDPColorModule.sequentialColors.negativeColorsx06[4],
            1000000,
            UNDPColorModule.sequentialColors.negativeColorsx06[5],
            1000000000,
            UNDPColorModule.sequentialColors.negativeColorsx06[5],
          ],
        ],
        mouseOverInfoFunction: (d: any) => {
          return (
            <div
              style={{
                fontSize: '0.875rem',
              }}
            >
              <p
                className='undp-typography margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d.adm2_name}{' '}
                <span style={{ color: 'var(--gray-500)' }}>
                  ({d.adm1_name})
                </span>
              </p>
              <p
                className='undp-typography bold margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {format('~s')(d.TotPopulation - d.PopAccess2020).replace(
                  'G',
                  'B',
                )}
              </p>
            </div>
          );
        },
      },
    ],
    countries: [
      'STP',
      'GNQ',
      'CMR',
      'GAB',
      'COG',
      'CAF',
      'COD',
      'UGA',
      'KEN',
      'SSD',
      'ETH',
      'SOM',
      'IDN',
      'MYS',
      'AGO',
      'NAM',
      'BWA',
      'ZAF',
      'ZMB',
      'RWA',
      'BDI',
      'TZA',
      'MWI',
      'ZWE',
      'MOZ',
      'COM',
      'MDG',
      'LSO',
      'SWZ',
      'SYC',
      'MUS',
      'TLS',
      'PNG',
      'SLB',
      'VUT',
      'ECU',
      'COL',
      'GUY',
      'SUR',
      'PER',
      'BOL',
      'ARG',
      'PRY',
      'URY',
      'MAR',
      'DZA',
      'MLI',
      'BFA',
      'CIV',
      'GHA',
      'TGO',
      'TUN',
      'LBY',
      'NER',
      'TCD',
      'BEN',
      'NGA',
      'SDN',
      'EGY',
      'JOR',
      'IRQ',
      'ERI',
      'DJI',
      'TJK',
      'MNG',
      'PAK',
      'IND',
      'NPL',
      'BTN',
      'BGD',
      'LKA',
      'MMR',
      'LAO',
      'VNM',
      'THA',
      'KHM',
      'HKG',
      'KOR',
      'PHL',
      'FSM',
      'MHL',
      'MEX',
      'GTM',
      'SLV',
      'BLZ',
      'HND',
      'NIC',
      'PAN',
      'JAM',
      'HTI',
      'DOM',
      'PRI',
      'LCA',
      'GRD',
      'TTO',
      'CPV',
      'MRT',
      'SEN',
      'GMB',
      'GNB',
      'GIN',
      'SLE',
      'LBR',
    ],
  },
  {
    id: 'populationData',
    title: 'Population Data',
    countryID: 'iso_3',
    regionID: 'adm2_name',
    pmTilesSource:
      'pmtiles://https://undpngddlsgeohubdev01.blob.core.windows.net/admin/rural_urban_District_Electricity_Access_20230421004438.pmtiles',
    options: [
      {
        label: 'Population (2015)',
        id: 'TotPopulation',
        sourceLayer: 'tmpl3ue0da4',
        hasID: 'TotPopulation',
        binning: [
          10000, 50000, 100000, 500000, 1000000, 2500000, 5000000, 7500000,
          10000000, 1000000000,
        ],
        colorScale: UNDPColorModule.sequentialColors.neutralColorsx10,
        fillSettings: [
          'interpolate',
          ['linear'],
          ['get', 'TotPopulation'],
          0,
          UNDPColorModule.sequentialColors.neutralColorsx10[0],
          9999.99,
          UNDPColorModule.sequentialColors.neutralColorsx10[0],
          10000,
          UNDPColorModule.sequentialColors.neutralColorsx10[1],
          49999.99,
          UNDPColorModule.sequentialColors.neutralColorsx10[1],
          50000,
          UNDPColorModule.sequentialColors.neutralColorsx10[2],
          99999.99,
          UNDPColorModule.sequentialColors.neutralColorsx10[2],
          100000,
          UNDPColorModule.sequentialColors.neutralColorsx10[3],
          499999.99,
          UNDPColorModule.sequentialColors.neutralColorsx10[3],
          500000,
          UNDPColorModule.sequentialColors.neutralColorsx10[4],
          999999.99,
          UNDPColorModule.sequentialColors.neutralColorsx10[4],
          1000000,
          UNDPColorModule.sequentialColors.neutralColorsx10[5],
          2499999.99,
          UNDPColorModule.sequentialColors.neutralColorsx10[5],
          2500000,
          UNDPColorModule.sequentialColors.neutralColorsx10[6],
          4999999.99,
          UNDPColorModule.sequentialColors.neutralColorsx10[6],
          5000000,
          UNDPColorModule.sequentialColors.neutralColorsx10[7],
          7499999.99,
          UNDPColorModule.sequentialColors.neutralColorsx10[7],
          7500000,
          UNDPColorModule.sequentialColors.neutralColorsx10[8],
          9999999.99,
          UNDPColorModule.sequentialColors.neutralColorsx10[8],
          10000000,
          UNDPColorModule.sequentialColors.neutralColorsx10[9],
          1000000000,
          UNDPColorModule.sequentialColors.neutralColorsx10[9],
        ],
        mouseOverInfoFunction: (d: any) => {
          return (
            <div
              style={{
                fontSize: '0.875rem',
              }}
            >
              <p
                className='undp-typography margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d.adm2_name}{' '}
                <span style={{ color: 'var(--gray-500)' }}>
                  ({d.adm1_name})
                </span>
              </p>
              <p
                className='undp-typography bold margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {format('~s')(d.TotPopulation).replace('G', 'B')}
              </p>
            </div>
          );
        },
      },
      {
        label: 'Rural Population % (2015)',
        id: 'percentRuralPop',
        sourceLayer: 'tmpl3ue0da4',
        hasID: 'TotPopRural',
        binning: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        colorScale: UNDPColorModule.sequentialColors.neutralColorsx10,
        fillSettings: [
          'let',
          'percentRuralPop',
          ['/', ['get', 'TotPopRural'], ['get', 'TotPopulation']],
          [
            'interpolate',
            ['linear'],
            ['var', 'percentRuralPop'],
            0,
            UNDPColorModule.sequentialColors.neutralColorsx10[0],
            0.0999,
            UNDPColorModule.sequentialColors.neutralColorsx10[0],
            0.1,
            UNDPColorModule.sequentialColors.neutralColorsx10[1],
            0.1999,
            UNDPColorModule.sequentialColors.neutralColorsx10[1],
            0.2,
            UNDPColorModule.sequentialColors.neutralColorsx10[2],
            0.2999,
            UNDPColorModule.sequentialColors.neutralColorsx10[2],
            0.3,
            UNDPColorModule.sequentialColors.neutralColorsx10[3],
            0.3999,
            UNDPColorModule.sequentialColors.neutralColorsx10[3],
            0.4,
            UNDPColorModule.sequentialColors.neutralColorsx10[4],
            0.4999,
            UNDPColorModule.sequentialColors.neutralColorsx10[4],
            0.5,
            UNDPColorModule.sequentialColors.neutralColorsx10[5],
            0.5999,
            UNDPColorModule.sequentialColors.neutralColorsx10[5],
            0.6,
            UNDPColorModule.sequentialColors.neutralColorsx10[6],
            0.6999,
            UNDPColorModule.sequentialColors.neutralColorsx10[6],
            0.7,
            UNDPColorModule.sequentialColors.neutralColorsx10[7],
            0.7999,
            UNDPColorModule.sequentialColors.neutralColorsx10[7],
            0.8,
            UNDPColorModule.sequentialColors.neutralColorsx10[8],
            0.8999,
            UNDPColorModule.sequentialColors.neutralColorsx10[8],
            0.9,
            UNDPColorModule.sequentialColors.neutralColorsx10[9],
            1,
            UNDPColorModule.sequentialColors.neutralColorsx10[9],
          ],
        ],
        mouseOverInfoFunction: (d: any) => {
          return (
            <div
              style={{
                fontSize: '0.875rem',
              }}
            >
              <p
                className='undp-typography margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d.adm2_name}{' '}
                <span style={{ color: 'var(--gray-500)' }}>
                  ({d.adm1_name})
                </span>
              </p>
              <p
                className='undp-typography bold margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {((d.TotPopRural / d.TotPopulation) * 100).toFixed(1)}%
              </p>
            </div>
          );
        },
      },
      {
        label: 'Urban Population % (2015)',
        id: 'percentUrbanPop',
        hasID: 'TotPopUrban',
        sourceLayer: 'tmpl3ue0da4',
        binning: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        colorScale: UNDPColorModule.sequentialColors.neutralColorsx10,
        fillSettings: [
          'let',
          'percentUrbanPop',
          ['/', ['get', 'TotPopUrban'], ['get', 'TotPopulation']],
          [
            'interpolate',
            ['linear'],
            ['var', 'percentUrbanPop'],
            0,
            UNDPColorModule.sequentialColors.neutralColorsx10[0],
            0.0999,
            UNDPColorModule.sequentialColors.neutralColorsx10[0],
            0.1,
            UNDPColorModule.sequentialColors.neutralColorsx10[1],
            0.1999,
            UNDPColorModule.sequentialColors.neutralColorsx10[1],
            0.2,
            UNDPColorModule.sequentialColors.neutralColorsx10[2],
            0.2999,
            UNDPColorModule.sequentialColors.neutralColorsx10[2],
            0.3,
            UNDPColorModule.sequentialColors.neutralColorsx10[3],
            0.3999,
            UNDPColorModule.sequentialColors.neutralColorsx10[3],
            0.4,
            UNDPColorModule.sequentialColors.neutralColorsx10[4],
            0.4999,
            UNDPColorModule.sequentialColors.neutralColorsx10[4],
            0.5,
            UNDPColorModule.sequentialColors.neutralColorsx10[5],
            0.5999,
            UNDPColorModule.sequentialColors.neutralColorsx10[5],
            0.6,
            UNDPColorModule.sequentialColors.neutralColorsx10[6],
            0.6999,
            UNDPColorModule.sequentialColors.neutralColorsx10[6],
            0.7,
            UNDPColorModule.sequentialColors.neutralColorsx10[7],
            0.7999,
            UNDPColorModule.sequentialColors.neutralColorsx10[7],
            0.8,
            UNDPColorModule.sequentialColors.neutralColorsx10[8],
            0.8999,
            UNDPColorModule.sequentialColors.neutralColorsx10[8],
            0.9,
            UNDPColorModule.sequentialColors.neutralColorsx10[9],
            1,
            UNDPColorModule.sequentialColors.neutralColorsx10[9],
          ],
        ],
        mouseOverInfoFunction: (d: any) => {
          return (
            <div
              style={{
                fontSize: '0.875rem',
              }}
            >
              <p
                className='undp-typography margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d.adm2_name}{' '}
                <span style={{ color: 'var(--gray-500)' }}>
                  ({d.adm1_name})
                </span>
              </p>
              <p
                className='undp-typography bold margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {((d.TotPopUrban / d.TotPopulation) * 100).toFixed(1)}%
              </p>
            </div>
          );
        },
      },
    ],
    countries: [
      'STP',
      'GNQ',
      'CMR',
      'GAB',
      'COG',
      'CAF',
      'COD',
      'UGA',
      'KEN',
      'SSD',
      'ETH',
      'SOM',
      'IDN',
      'MYS',
      'AGO',
      'NAM',
      'BWA',
      'ZAF',
      'ZMB',
      'RWA',
      'BDI',
      'TZA',
      'MWI',
      'ZWE',
      'MOZ',
      'COM',
      'MDG',
      'LSO',
      'SWZ',
      'SYC',
      'MUS',
      'TLS',
      'PNG',
      'SLB',
      'VUT',
      'ECU',
      'COL',
      'GUY',
      'SUR',
      'PER',
      'BOL',
      'ARG',
      'PRY',
      'URY',
      'MAR',
      'DZA',
      'MLI',
      'BFA',
      'CIV',
      'GHA',
      'TGO',
      'TUN',
      'LBY',
      'NER',
      'TCD',
      'BEN',
      'NGA',
      'SDN',
      'EGY',
      'JOR',
      'IRQ',
      'ERI',
      'DJI',
      'TJK',
      'MNG',
      'PAK',
      'IND',
      'NPL',
      'BTN',
      'BGD',
      'LKA',
      'MMR',
      'LAO',
      'VNM',
      'THA',
      'KHM',
      'HKG',
      'KOR',
      'PHL',
      'FSM',
      'MHL',
      'MEX',
      'GTM',
      'SLV',
      'BLZ',
      'HND',
      'NIC',
      'PAN',
      'JAM',
      'HTI',
      'DOM',
      'PRI',
      'LCA',
      'GRD',
      'TTO',
      'CPV',
      'MRT',
      'SEN',
      'GMB',
      'GNB',
      'GIN',
      'SLE',
      'LBR',
    ],
  },
  {
    id: 'mpi',
    title: 'Multidimensional Poverty',
    countryID: 'ISO',
    regionID: 'region',
    pmTilesSource:
      'pmtiles://https://raw.githubusercontent.com/UNDP-Data/Access-All-Data-Viz/production/public/data/PMTiles/adm_Export_jso_FeaturesToJSO.pmtiles',
    options: [
      {
        label: 'Multidimensional Poverty Index',
        id: 'MPI',
        binning: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1],
        hasID: 'MPI',
        sourceLayer: 'adm_Export_jso_FeaturesToJSO',
        colorScale: UNDPColorModule.sequentialColors.negativeColorsx07,
        fillSettings: [
          'interpolate',
          ['linear'],
          ['get', 'MPI'],
          0,
          UNDPColorModule.sequentialColors.negativeColorsx07[0],
          0.0999,
          UNDPColorModule.sequentialColors.negativeColorsx07[0],
          0.1,
          UNDPColorModule.sequentialColors.negativeColorsx07[1],
          0.1999,
          UNDPColorModule.sequentialColors.negativeColorsx07[1],
          0.2,
          UNDPColorModule.sequentialColors.negativeColorsx07[2],
          0.2999,
          UNDPColorModule.sequentialColors.negativeColorsx07[2],
          0.3,
          UNDPColorModule.sequentialColors.negativeColorsx07[3],
          0.3999,
          UNDPColorModule.sequentialColors.negativeColorsx07[3],
          0.4,
          UNDPColorModule.sequentialColors.negativeColorsx07[4],
          0.4999,
          UNDPColorModule.sequentialColors.negativeColorsx07[4],
          0.5,
          UNDPColorModule.sequentialColors.negativeColorsx07[5],
          0.5999,
          UNDPColorModule.sequentialColors.negativeColorsx07[5],
          0.6,
          UNDPColorModule.sequentialColors.negativeColorsx07[6],
          1,
          UNDPColorModule.sequentialColors.negativeColorsx07[6],
        ],
        mouseOverInfoFunction: (d: any) => {
          return (
            <div
              style={{
                fontSize: '0.875rem',
              }}
            >
              <p
                className='undp-typography margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d.region}{' '}
                <span style={{ color: 'var(--gray-500)' }}>({d.country})</span>
              </p>
              <p
                className='undp-typography bold margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d.MPI}
              </p>
            </div>
          );
        },
      },
      {
        label: 'Headcount Ratio (%)',
        id: 'headcountRatio',
        hasID: 'Headcount Ratio (H, %)',
        sourceLayer: 'adm_Export_jso_FeaturesToJSO',
        binning: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        colorScale: UNDPColorModule.sequentialColors.negativeColorsx10,
        fillSettings: [
          'interpolate',
          ['linear'],
          ['get', 'Headcount Ratio (H, %)'],
          0,
          UNDPColorModule.sequentialColors.negativeColorsx10[0],
          9.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[0],
          10,
          UNDPColorModule.sequentialColors.negativeColorsx10[1],
          19.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[1],
          20,
          UNDPColorModule.sequentialColors.negativeColorsx10[2],
          29.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[2],
          30,
          UNDPColorModule.sequentialColors.negativeColorsx10[3],
          39.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[3],
          40,
          UNDPColorModule.sequentialColors.negativeColorsx10[4],
          49.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[4],
          50,
          UNDPColorModule.sequentialColors.negativeColorsx10[5],
          59.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[5],
          60,
          UNDPColorModule.sequentialColors.negativeColorsx10[6],
          69.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[6],
          70,
          UNDPColorModule.sequentialColors.negativeColorsx10[7],
          79.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[7],
          80,
          UNDPColorModule.sequentialColors.negativeColorsx10[8],
          89.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[8],
          90,
          UNDPColorModule.sequentialColors.negativeColorsx10[9],
          100,
          UNDPColorModule.sequentialColors.negativeColorsx10[9],
        ],
        mouseOverInfoFunction: (d: any) => {
          return (
            <div
              style={{
                fontSize: '0.875rem',
              }}
            >
              <p
                className='undp-typography margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d.region}{' '}
                <span style={{ color: 'var(--gray-500)' }}>({d.country})</span>
              </p>
              <p
                className='undp-typography bold margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d['Headcount Ratio (H, %)']}%
              </p>
            </div>
          );
        },
      },
      {
        label: 'Poverty Intensity (%)',
        id: 'intensity',
        hasID: 'Intensity (A, %)',
        sourceLayer: 'adm_Export_jso_FeaturesToJSO',
        binning: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        colorScale: UNDPColorModule.sequentialColors.negativeColorsx10,
        fillSettings: [
          'interpolate',
          ['linear'],
          ['get', 'Intensity (A, %)'],
          0,
          UNDPColorModule.sequentialColors.negativeColorsx10[0],
          9.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[0],
          10,
          UNDPColorModule.sequentialColors.negativeColorsx10[1],
          19.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[1],
          20,
          UNDPColorModule.sequentialColors.negativeColorsx10[2],
          29.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[2],
          30,
          UNDPColorModule.sequentialColors.negativeColorsx10[3],
          39.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[3],
          40,
          UNDPColorModule.sequentialColors.negativeColorsx10[4],
          49.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[4],
          50,
          UNDPColorModule.sequentialColors.negativeColorsx10[5],
          59.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[5],
          60,
          UNDPColorModule.sequentialColors.negativeColorsx10[6],
          69.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[6],
          70,
          UNDPColorModule.sequentialColors.negativeColorsx10[7],
          79.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[7],
          80,
          UNDPColorModule.sequentialColors.negativeColorsx10[8],
          89.999,
          UNDPColorModule.sequentialColors.negativeColorsx10[8],
          90,
          UNDPColorModule.sequentialColors.negativeColorsx10[9],
          100,
          UNDPColorModule.sequentialColors.negativeColorsx10[9],
        ],
        mouseOverInfoFunction: (d: any) => {
          return (
            <div
              style={{
                fontSize: '0.875rem',
              }}
            >
              <p
                className='undp-typography margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d.region}{' '}
                <span style={{ color: 'var(--gray-500)' }}>({d.country})</span>
              </p>
              <p
                className='undp-typography bold margin-bottom-00'
                style={{
                  fontSize: '0.875rem',
                }}
              >
                {d['Intensity (A, %)']}%
              </p>
            </div>
          );
        },
      },
    ],
    countries: [
      'AFG',
      'MRT',
      'WSM',
      'NGA',
      'UGA',
      'IND',
      'LKA',
      'MWI',
      'NPL',
      'PRY',
      'NAM',
      'AGO',
      'GHA',
      'PSE',
      'MDV',
      'SYC',
      'THA',
      'SLE',
      'NPL',
      'BTN',
      'PAK',
      'GIN',
      'KEN',
      'LSO',
      'LBR',
      'LBY',
      'MDG',
      'MLI',
      'MAR',
      'MOZ',
      'NER',
      'BTN',
    ],
  },
];
