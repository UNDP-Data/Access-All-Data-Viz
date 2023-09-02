import styled from 'styled-components';

const CardEl = styled.a`
  flex-grow: 1;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  color: #232e3d;
  flex-shrink: 1;
  width: calc(33.33% - 6.33rem);
  min-width: 10rem;
  text-decoration: none;
  &:hover {
    background-color: rgba(255, 255, 255, 0.95);
  }
  @media (min-width: 1024px) {
    max-width: 25rem;
  }
`;

export function HomePageBanner() {
  return (
    <div className='undp-container'>
      <div
        style={{
          backgroundColor: '#083676',
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
            style={{ color: 'var(--white) !important' }}
          >
            Data Futures
            <br />
            Platform
          </h1>
          <h5
            className='undp-typography margin-bottom-08'
            style={{ color: 'var(--white) !important' }}
          >
            A global resource to empower policy decision-makers with the best of
            data and insights for a transformative impact.
          </h5>
          <div className='flex-div flex-wrap gap-07'>
            <CardEl href='/access-all-data'>
              <h2 className='undp-typography page-title'>300+</h2>
              <h5 className='undp-typography margin-bottom-00'>Indicators</h5>
            </CardEl>
            <CardEl href='/insights'>
              <h2 className='undp-typography page-title'>70+</h2>
              <h5 className='undp-typography margin-bottom-00'>Data Stories</h5>
            </CardEl>
            <CardEl href='/countries'>
              <h2 className='undp-typography page-title'>200+</h2>
              <h5 className='undp-typography margin-bottom-00'>
                Countries or Regions
              </h5>
            </CardEl>
          </div>
        </div>
      </div>
    </div>
  );
}
