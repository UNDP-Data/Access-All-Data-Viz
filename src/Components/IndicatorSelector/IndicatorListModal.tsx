import { IndicatorMetaDataType } from '../../Types';
import IndicatorListComponent from './IndicatorListComponent';

interface Props {
  indicators: IndicatorMetaDataType[];
  updateIndicator: (_d: string) => void;
  closeModal: () => void;
}

function IndicatorListModal(props: Props) {
  const { indicators, updateIndicator, closeModal } = props;
  const signatureSolutions = [
    'Energy',
    'Environment',
    'Gender',
    'Governance',
    'Poverty and Inequality',
    'Resilience',
  ];
  return (
    <>
      {signatureSolutions.map((d, i) => (
        <div key={i}>
          <IndicatorListComponent
            title={`${d} (${
              indicators.filter(el => el.SignatureSolution.indexOf(d) !== -1)
                .length
            })`}
            indicators={indicators.filter(
              el => el.SignatureSolution.indexOf(d) !== -1,
            )}
            updateIndicator={updateIndicator}
            closeModal={closeModal}
          />
        </div>
      ))}
    </>
  );
}

export default IndicatorListModal;
