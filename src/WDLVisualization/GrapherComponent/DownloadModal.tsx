import domtoimage from 'dom-to-image';
import { Image } from 'lucide-react';
import styled from 'styled-components';
import { DataSourceListMinifiedItem } from './DataSourceListItem';

const Button = styled.button`
  background-color: var(--gray-200);
  padding: var(--spacing-07);
  width: 100%;
  font-size: 1rem;
  border: 0;
  text-align: left;
  display: flex;
  gap: var(--spacing-05);
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: var(--gray-300);
  }
`;

export function DownloadModal() {
  return (
    <div className='undp-scrollbar'>
      <h5 className='undp-typography bold margin-top-07'>Graph</h5>
      <Button
        type='button'
        onClick={() => {
          const node = document.getElementById('graph-node') as HTMLElement;
          domtoimage
            .toPng(node, { height: node.scrollHeight })
            .then((dataUrl: any) => {
              const link = document.createElement('a');
              link.download = 'graph.png';
              link.href = dataUrl;
              link.click();
            });
        }}
      >
        <Image size={48} strokeWidth={1} color='var(--gray-700)' />
        <p
          className='margin-bottom-00 undp-typography'
          style={{ lineHeight: '1.25rem' }}
        >
          Download the chart as Image
          <br />
          <span style={{ fontSize: '0.75rem', color: 'var(--gray-600)' }}>
            (suitable for most uses, widely compatible)
          </span>
        </p>
      </Button>
      <hr className='undp-style margin-top-09 margin-bottom-09' />
      <h5 className='undp-typography bold'>Data</h5>
      <DataSourceListMinifiedItem />
    </div>
  );
}
