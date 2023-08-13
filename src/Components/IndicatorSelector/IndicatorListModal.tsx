import { IndicatorMetaDataType } from '../../Types';
import IndicatorListComponent from './IndicatorListComponent';

interface Props {
  indicators: IndicatorMetaDataType[];
  updateIndicator: (_d: string) => void;
  setOpenModal: (_d: boolean) => void;
}

function IndicatorListModal(props: Props) {
  const { indicators, updateIndicator, setOpenModal } = props;
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
            setOpenModal={setOpenModal}
          />
        </div>
      ))}
    </>
  );
}

export default IndicatorListModal;
