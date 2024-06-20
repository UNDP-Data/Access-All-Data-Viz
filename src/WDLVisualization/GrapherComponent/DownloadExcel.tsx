import FileSaver from 'file-saver';
import styled from 'styled-components';
import * as XLSX from 'xlsx';

interface Props {
  data: any;
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
  const { data } = props;
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  const Heading = [
    {
      country: 'Country',
      countryCode: 'ISO-3 Code',
      year: 'Year',
      gender: 'Gender',
      ageRange: 'Age range',
      incomeRange: 'Income range',
      headCount: 'headcount',
      expenditure_nominal: 'Expenditure (nominal)',
      expenditure_ppp: 'Expenditure (US$ PPP)',
      expenditure_nominal_daily: 'Expenditure per day (nominal)',
      expenditure_ppp_daily: 'Expenditure per day (US$ PPP)',
      expenditure_nominal_per_capita: 'Expenditure per capita (nominal)',
      expenditure_ppp_per_capita: 'Expenditure per capita (US$ PPP)',
      expenditure_nominal_per_capita_daily:
        'Expenditure per capita per day (nominal)',
      expenditure_ppp_per_capita_daily:
        'Expenditure per capita per day (US$ PPP)',
    },
  ];

  const exportToExcel = (csvData: any) => {
    const ws = XLSX.utils.json_to_sheet(Heading, {
      header: [
        'country',
        'countryCode',
        'year',
        'value',
        'gender',
        'ageRange',
        'incomeRange',
        'headCount',
        'expenditure_nominal',
        'expenditure_ppp',
        'expenditure_nominal_daily',
        'expenditure_ppp_daily',
        'expenditure_nominal_per_capita',
        'expenditure_ppp_per_capita',
        'expenditure_nominal_per_capita_daily',
        'expenditure_ppp_per_capita_daily',
      ],
      skipHeader: true,
    });

    const wscols = [{ wch: 20 }, { wch: 5 }, { wch: 15 }];

    ws['!cols'] = wscols;
    XLSX.utils.sheet_add_json(ws, csvData, {
      header: [
        'country',
        'countryCode',
        'year',
        'value',
        'gender',
        'ageRange',
        'incomeRange',
        'headCount',
        'expenditure_nominal',
        'expenditure_ppp',
        'expenditure_nominal_daily',
        'expenditure_ppp_daily',
        'expenditure_nominal_per_capita',
        'expenditure_ppp_per_capita',
        'expenditure_nominal_per_capita_daily',
        'expenditure_ppp_per_capita_daily',
      ],
      skipHeader: true,
      origin: -1, // ok
    });
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataForExcel = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(dataForExcel, 'data.xlsx');
  };

  return (
    <div>
      <MinifiedButton type='button' onClick={() => exportToExcel(data)}>
        Download XLSX
      </MinifiedButton>
    </div>
  );
}

export default ExportExcel;
