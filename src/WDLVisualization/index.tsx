import { LoginBannerForTabs } from '../Components/LoginBannerForTabs';
import DataExplorer from './DataExplorer';

interface Props {
  loginState: boolean;
  link: string;
  countryCode?: string;
}

export function WDLVisualization(props: Props) {
  const { loginState, link, countryCode } = props;
  return (
    <div className='undp-container max-width-1980'>
      {loginState ? (
        <>
          <div className='padding-left-06 padding-right-06'>
            <div
              className='margin-top-07 flex-div flex-wrap flex-vert-align-center flex-space-between'
              style={{
                padding: '1.25rem',
                backgroundColor: 'var(--gray-200)',
                border: '1px solid var(--gray-300)',
                borderRadius: '0.25rem',
              }}
            >
              <h5 className='undp-typography margin-bottom-00'>
                To explore the data more see the WDL data explorer tool
              </h5>
              <a
                href='/tools/world-data-lab-data-explorer'
                className='undp-button button-primary button-arrow'
                style={{
                  textDecoration: 'none',
                  width: 'fit-content',
                }}
              >
                Learn more
              </a>
            </div>
          </div>
          <DataExplorer countryCode={countryCode} />
        </>
      ) : (
        <LoginBannerForTabs link={link} />
      )}
    </div>
  );
}
