import { Tabs } from 'antd';
import { DataSetList } from '../Components/DataSetList';
import DataExplorer from '../Components/DataExplorer';
import { COUNTRIES_BY_UNDP_REGIONS } from '../Constants';
import { AboutPage } from '../AboutPage';
import { AggregatedRegionVisualization } from '../RegionVisualization';

interface Props {
  region?: string;
}

export function RegionApp(props: Props) {
  const { region } = props;
  const mainTabs = [
    {
      key: 'dataExplorer',
      label: 'Data Explorer',
      children: (
        <DataExplorer
          region={{
            code: region || 'WLD',
            name:
              COUNTRIES_BY_UNDP_REGIONS[
                COUNTRIES_BY_UNDP_REGIONS.findIndex(
                  d => d.region === `UNDP_${region}`,
                )
              ].name || 'World',
          }}
        />
      ),
    },
    {
      key: 'aggregatedDataExplorer',
      label: 'Aggregated Data Explorer',
      children: <AggregatedRegionVisualization UNDPRegion={region || 'WLD'} />,
    },
    {
      key: 'datasets',
      label: 'Datasets',
      children: <DataSetList />,
    },
    {
      key: 'about',
      label: 'About',
      children: <AboutPage id={region || 'AS'} region />,
    },
  ];
  return (
    <div className='undp-container'>
      {COUNTRIES_BY_UNDP_REGIONS.findIndex(
        d => d.region === `UNDP_${region}`,
      ) === -1 ? (
        <div
          className='undp-container'
          style={{
            backgroundColor: 'var(--gray-300)',
            padding: 'var(--spacing-07)',
            width: 'calc(100% - 4rem)',
          }}
        >
          <div>
            <h4
              className='undp-typography margin-bottom-03'
              style={{
                fontFamily: 'SohneBreit,ProximaNova,sans-serif',
                width: 'calc(100% - 4rem)',
              }}
            >
              We regret to inform you that the country you are inquiring about
              cannot be ascertained within our current digital framework. Our
              team is actively engaged in addressing this matter.
            </h4>
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              backgroundColor: 'var(--gray-300)',
              padding: 'var(--spacing-07)',
              width: 'calc(100% - 4rem)',
            }}
          >
            <div>
              <h2
                className='undp-typography margin-bottom-00'
                style={{
                  fontFamily: 'SohneBreit,ProximaNova,sans-serif',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {
                  COUNTRIES_BY_UNDP_REGIONS[
                    COUNTRIES_BY_UNDP_REGIONS.findIndex(
                      d => d.region === `UNDP_${region}`,
                    )
                  ].name
                }
              </h2>
            </div>
          </div>
          <Tabs
            defaultActiveKey='dataExplorer'
            className='undp-tabs subhead-tabs'
            items={mainTabs.map(d => ({
              label: d.label,
              key: d.key,
              children: d.children,
            }))}
          />
        </>
      )}
    </div>
  );
}
