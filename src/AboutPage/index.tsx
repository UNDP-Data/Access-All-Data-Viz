import { ABOUT_TEXT_LINKS } from '../AboutText';
import { COUNTRIES_FULL_NAME_BY_UNDP_REGION } from '../Constants';

interface Props {
  id: string;
  region: boolean;
}

export function AboutPage(props: Props) {
  const { id, region } = props;
  const data = ABOUT_TEXT_LINKS[ABOUT_TEXT_LINKS.findIndex(d => d.id === id)];
  return (
    <div className='undp-container'>
      <div className='flex-div flex-wrap'>
        <div
          style={{
            width: 'calc(50% - 0.5rem)',
            minWidth: '20rem',
            flexGrow: 1,
          }}
        >
          <h2 className='undp-typography'>{data.title}</h2>
          {region ? (
            <div className='flex-div flex-wrap'>
              {COUNTRIES_FULL_NAME_BY_UNDP_REGION[
                COUNTRIES_FULL_NAME_BY_UNDP_REGION.findIndex(
                  d => d.region === id,
                )
              ].countries.map((d, i) => (
                <div className='undp-chip' key={i}>
                  {d}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div
          style={{
            width: 'calc(50% - 0.5rem)',
            minWidth: '20rem',
            flexGrow: 1,
          }}
        >
          {data.bodyText}
          <div className='margin-top-09'>
            <h3 className='undp-typography'>Resources</h3>
            {data.resource.map((d, i) => (
              <div className='margin-bottom-05' key={i}>
                <a
                  href={d.link}
                  target='_blank'
                  className='undp-style'
                  rel='noreferrer'
                >
                  {d.source}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
