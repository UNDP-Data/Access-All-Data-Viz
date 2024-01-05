import { DisaggregationMetaDataType } from '../../Types';
import IndicatorListComponent from './IndicatorListComponent';

interface Props {
  indicators: DisaggregationMetaDataType[];
  updateIndicator: (_d: DisaggregationMetaDataType) => void;
  closeModal: () => void;
}

function IndicatorListModal(props: Props) {
  const { indicators, updateIndicator, closeModal } = props;
  const disaggregationBy = [
    'Gender',
    'Urban/Rural',
    'Age',
    'Poverty line',
    'Education level',
    'Employment sector',
    'Vulnerable group',
    'Climate scenario',
    'Healthcare facility type',
    'UHC dimension',
  ];
  return (
    <>
      {disaggregationBy.map((d, i) => (
        <div key={i}>
          <IndicatorListComponent
            title={`${d} (${
              indicators.filter(el => el.DisaggregationType === d).length
            })`}
            indicators={indicators.filter(el => el.DisaggregationType === d)}
            updateIndicator={updateIndicator}
            closeModal={closeModal}
          />
        </div>
      ))}
    </>
  );
}

export default IndicatorListModal;
