import { FileDown } from 'lucide-react';
import { CountryListType } from '../../Types';
import { Filters } from './Filters';

interface Props {
  regions?: string[];
  countries: CountryListType[];
  setShowDownloadModal: (_d: boolean) => void;
}

export function MapSettings(props: Props) {
  const { regions, countries, setShowDownloadModal } = props;
  return (
    <>
      <div className='settings-sections-container'>
        <div className='flex-div flex-wrap margin-top-03 margin-bottom-03 gap-06'>
          <button
            className='undp-button button-tertiary'
            type='button'
            style={{ color: 'var(--blue-600)', padding: 0 }}
            onClick={() => {
              setShowDownloadModal(true);
            }}
          >
            <FileDown
              strokeWidth={1.25}
              stroke='var(--blue-600)'
              style={{ marginRight: '0.25rem' }}
            />
            Download
          </button>
        </div>
      </div>
      {countries.length > 1 ? (
        <Filters regions={regions} countries={countries} />
      ) : null}
    </>
  );
}
