import { DotPlot } from './DotPlot';
import { IndicatorSimplifiedDataType } from '../../../Types';

interface Props {
  data: IndicatorSimplifiedDataType;
  regions: string[];
}

export function Graph(props: Props) {
  const { data, regions } = props;
  return (
    <div
      className='flex-div flex-wrap'
      style={{ justifyContent: 'space-between', flexGrow: 1 }}
    >
      {regions.map((d, i) =>
        data.countryData[
          data.countryData.findIndex(el => el['Alpha-3 code'] === d)
        ].data.length > 0 ? (
          <div key={i} style={{ width: 'calc(50% - 0.5rem)' }}>
            <DotPlot
              value={
                data.countryData[
                  data.countryData.findIndex(el => el['Alpha-3 code'] === d)
                ].data[
                  data.countryData[
                    data.countryData.findIndex(el => el['Alpha-3 code'] === d)
                  ].data.length - 1
                ].value
              }
              year={
                data.countryData[
                  data.countryData.findIndex(el => el['Alpha-3 code'] === d)
                ].data[
                  data.countryData[
                    data.countryData.findIndex(el => el['Alpha-3 code'] === d)
                  ].data.length - 1
                ].year
              }
              region={`${
                data.countryData[
                  data.countryData.findIndex(el => el['Alpha-3 code'] === d)
                ]['Country or Area']
              }${d.includes('UNDP_') ? '*' : ''}`}
            />
          </div>
        ) : null,
      )}
    </div>
  );
}
