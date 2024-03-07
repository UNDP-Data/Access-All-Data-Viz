import FileSaver from 'file-saver';
import styled from 'styled-components';
import * as XLSX from 'xlsx';

interface Props {
  data: any;
  indicatorTitle: string;
  minified?: boolean;
}

const MinifiedButton = styled.button`
  background-color: var(--gray-300);
  padding: var(--spacing-05);
  width: 100%;
  font-size: 0.875rem;
  font-weight: bold;
  border: 0;
  text-align: left;
  display: flex;
  gap: var(--spacing-05);
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: var(--gray-400);
  }
`;

function ExportExcel(props: Props) {
  const { data, indicatorTitle, minified } = props;
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  const Heading = [
    {
      country: 'Country',
      countryCode: 'ISO-3 Code',
      year: 'Year',
      value: indicatorTitle,
    },
  ];

  const exportToExcel = (csvData: any) => {
    const ws = XLSX.utils.json_to_sheet(Heading, {
      header: ['country', 'countryCode', 'year', 'value'],
      skipHeader: true,
    });

    const wscols = [{ wch: 20 }, { wch: 5 }, { wch: 15 }];

    ws['!cols'] = wscols;
    XLSX.utils.sheet_add_json(ws, csvData, {
      header: ['country', 'countryCode', 'year', 'value'],
      skipHeader: true,
      origin: -1, // ok
    });
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataForExcel = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(
      dataForExcel,
      `${indicatorTitle.replaceAll(',', '').replaceAll('.', ' ')}.xlsx`,
    );
  };

  return (
    <div>
      {minified ? (
        <MinifiedButton type='button' onClick={() => exportToExcel(data)}>
          Download XLSX
        </MinifiedButton>
      ) : (
        <button
          type='button'
          className='undp-button button-tertiary button-arrow'
          onClick={() => exportToExcel(data)}
        >
          Download Data as XLSX
        </button>
      )}
    </div>
  );
}

export default ExportExcel;
