/* eslint-disable jsx-a11y/iframe-has-title */
import { CountryListType, CountryTaxonomyDataType } from '../Types';
import VisualizationEl from './Visualization';

interface Props {
  regionList: string[];
  countryTaxonomy: CountryListType[];
  taxonomyData: CountryTaxonomyDataType[];
  countryCode?: string;
}

export function RegionVisualization(props: Props) {
  const { regionList, countryTaxonomy, taxonomyData, countryCode } = props;
  return (
    <div>
      <VisualizationEl
        taxonomyData={taxonomyData}
        regionList={regionList}
        countryList={countryTaxonomy}
        countryCode={countryCode}
      />
    </div>
  );
}
