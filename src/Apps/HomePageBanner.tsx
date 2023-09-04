import styled from 'styled-components';

const CardEl = styled.a`
  flex-grow: 1;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 2rem;
  color: var(--white);
  flex-shrink: 1;
  width: calc(33.33% - 6.33rem);
  min-width: 10rem;
  text-decoration: none;
  background-image: none !important;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
  @media (min-width: 1024px) {
    max-width: 25rem;
  }
`;

const CardH2 = styled.h2`
  color: var(--white) !important;
  line-height: 1.09;
  text-shadow: none;
  letter-spacing: 0.05rem;
  font-size: 4rem !important;
  margin-top: 0;
  margin-bottom: 0 !important;
`;

export function HomePageBanner() {
  return (
    <div className='undp-container'>
      <div
        style={{
          backgroundColor: '#013B60',
          backgroundImage:
            'radial-gradient(at 67% 61%, hsla(210, 76%, 67%, 1) 0, hsla(210, 76%, 67%, 0) 70%),radial-gradient(at 94% 51%, hsla(204, 84%, 38%, 1) 0, hsla(204, 84%, 38%, 0) 70%),radial-gradient(at 48% 56%, hsla(204, 84%, 38%, 1) 0, hsla(204, 84%, 38%, 0) 70%)',
          width: '100%',
        }}
      >
        <div
          style={{
            padding: 'var(--spacing-13) var(--spacing-07)',
          }}
        >
          <h1
            className='undp-typography margin-bottom-05'
            style={{ color: 'var(--white)' }}
          >
            Data Futures
            <br />
            Platform
          </h1>
          <h5
            className='undp-typography margin-bottom-08'
            style={{ color: 'var(--white)' }}
          >
            A global resource to empower policy decision-makers with the best of
            data and insights for a transformative impact.
          </h5>
          <div className='flex-div flex-wrap gap-07'>
            <CardEl href='/access-all-data'>
              <CardH2 className='undp-typography page-title'>300+</CardH2>
              <p className='undp-typography margin-bottom-00'>Indicators</p>
            </CardEl>
            <CardEl href='/insights'>
              <CardH2 className='undp-typography page-title'>70+</CardH2>
              <p className='undp-typography margin-bottom-00'>Data Stories</p>
            </CardEl>
            <CardEl href='/countries'>
              <CardH2 className='undp-typography page-title'>200+</CardH2>
              <p className='undp-typography margin-bottom-00'>
                Countries or Regions
              </p>
            </CardEl>
          </div>
        </div>
      </div>
    </div>
  );
}
