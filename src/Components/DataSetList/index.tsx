import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { json } from 'd3-request';
import { queue } from 'd3-queue';
import { Input, Modal, Pagination, Select } from 'antd';
import { ArrowDownToLine, Search } from 'lucide-react';
import sortBy from 'lodash.sortby';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import uniqBy from 'lodash.uniqby';
import intersection from 'lodash.intersection';
import flatten from 'lodash.flatten';
import {
  CountryTaxonomyDataType,
  IndicatorMetaDataType,
  IndicatorSimplifiedDataType,
} from '../../Types';
import {
  COUNTRYTAXONOMYLINK,
  METADATALINK,
  SDG_GOALS,
  SIGNATURE_SOLUTIONS_LIST,
  TAGS_LIST,
  DATALINK,
} from '../../Constants';
import { DownloadModal } from './DownloadModal';

interface Props {
  signatureSolution?: string;
}

const CardEl = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  background-color: var(--gray-200);
  flex-basis: 20rem;
  flex-grow: 1;
  flex-shrink: 0;
`;

const DownloadExcel = (indicator: IndicatorMetaDataType) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  queue()
    .defer(json, `${DATALINK}/indicatorData/${indicator.id}.json`)
    .await((err: any, data: IndicatorSimplifiedDataType) => {
      if (err) throw err;

      const Heading = [
        {
          country: 'Country or Area',
          countryCode: 'ISO-3 Code',
          year: 'Year',
          value: indicator.IndicatorLabel,
        },
      ];
      const csvData: any = [];
      data.countryData.forEach(d => {
        d.data.forEach(el => {
          csvData.push({
            country: d['Country or Area'],
            countryCode: d['Alpha-3 code'],
            year: el.year,
            value: el.value,
          });
        });
      });
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
        `${indicator.IndicatorLabel.replaceAll(',', '').replaceAll(
          '.',
          ' ',
        )}.xlsx`,
      );
    });
};

export function DataSetList(props: Props) {
  const { signatureSolution } = props;
  const [paginationValue, setPaginationValue] = useState(1);
  const [indicatorsListMain, setIndicatorsListMain] = useState<
    IndicatorMetaDataType[] | undefined
  >(undefined);
  const [indicatorsList, setIndicatorsList] = useState<
    IndicatorMetaDataType[] | undefined
  >(undefined);
  const [sourceList, setSourceList] = useState<string[] | undefined>(undefined);
  const [sourceForFilter, setSourceForFilter] = useState<string | undefined>(
    undefined,
  );
  const [ssForFilter, setSSForFilter] = useState<string | undefined>(undefined);
  const [sdgForFilter, setSDGForFilter] = useState<string[]>([]);
  const [tagsForFilter, setTagsForFilter] = useState<string[]>([]);
  const [searchPhrase, setSearchPhrase] = useState<undefined | string>(
    undefined,
  );
  const [modalVisibility, setModalVisibility] = useState(false);
  const [countries, setCountries] = useState<
    CountryTaxonomyDataType[] | undefined
  >(undefined);
  useEffect(() => {
    setIndicatorsList(undefined);
    queue()
      .defer(json, METADATALINK)
      .defer(json, COUNTRYTAXONOMYLINK)
      .await(
        (
          err: any,
          indicatorMetaData: IndicatorMetaDataType[],
          countryTaxonomy: CountryTaxonomyDataType[],
        ) => {
          if (err) throw err;
          const queryParams = new URLSearchParams(window.location.search);
          const topic = queryParams.get('topic')?.replaceAll('_', "'");
          const indicatorsFilteredBySS = signatureSolution
            ? indicatorMetaData.filter(
                d => d.SignatureSolution.indexOf(signatureSolution) !== -1,
              )
            : indicatorMetaData;
          const indicatorsFiltered = topic
            ? indicatorsFilteredBySS.filter(
                d => d.SSTopics.indexOf(topic) !== -1,
              )
            : indicatorsFilteredBySS;
          setIndicatorsListMain(indicatorsFiltered);
          const dataSourceArray = flatten(
            indicatorsFiltered.map(d => d.DataSourceName.split(';')),
          );
          const uniqSource = sortBy(
            uniqBy(dataSourceArray, d => d),
            d => d,
          );
          setSourceList(uniqSource);
          setIndicatorsList(indicatorsFiltered);
          setCountries(sortBy(countryTaxonomy, d => d['Country or Area']));
        },
      );
  }, [signatureSolution]);
  useEffect(() => {
    if (indicatorsListMain) {
      const indicatorFilterBySource = sourceForFilter
        ? indicatorsListMain.filter(
            d => d.DataSourceName.split(';').indexOf(sourceForFilter) !== -1,
          )
        : indicatorsListMain;
      const indicatorFilterBySS = ssForFilter
        ? indicatorFilterBySource.filter(
            d => d.SignatureSolution.indexOf(ssForFilter) !== -1,
          )
        : indicatorFilterBySource;
      const indicatorFilterByTags =
        tagsForFilter.length !== 0 && tagsForFilter
          ? indicatorFilterBySS.filter(
              d => intersection(d.Tags, tagsForFilter).length > 0,
            )
          : indicatorFilterBySS;
      const indicatorFilterBySDGs =
        sdgForFilter.length !== 0 && sdgForFilter
          ? indicatorFilterByTags.filter(
              d => intersection(d.SDGs, sdgForFilter).length > 0,
            )
          : indicatorFilterByTags;
      const indicators = sortBy(
        indicatorFilterBySDGs,
        d => d.IndicatorLabel,
      ).filter(
        d =>
          d.IndicatorLabel.toLowerCase().includes(
            searchPhrase?.toLowerCase() || '',
          ) ||
          d.IndicatorDescription.toLowerCase().includes(
            searchPhrase?.toLowerCase() || '',
          ),
      );
      setIndicatorsList(indicators);
    }
  }, [
    searchPhrase,
    ssForFilter,
    sdgForFilter,
    tagsForFilter,
    sourceForFilter,
    indicatorsListMain,
  ]);
  return (
    <div>
      {indicatorsList && sourceList && countries ? (
        <div
          className='undp-container max-width-1980'
          style={{
            padding: '0 var(--spacing-06)',
          }}
        >
          <div
            className='margin-bottom-07'
            style={{
              padding: '1.25rem',
              backgroundColor: 'var(--gray-200)',
              border: '1px solid var(--gray-300)',
              borderRadius: '0.25rem',
            }}
          >
            <h5
              className='undp-typography bold margin-bottom-03'
              style={{ color: 'var(--gray-700)' }}
            >
              Explore and download databases
            </h5>
            <p
              className='undp-typography margin-bottom-06'
              style={{ fontSize: '1rem' }}
            >
              Dive deeper into data: Seamlessly explore and effortlessly
              download data for deeper insights in Excel format
            </p>
            <button
              type='button'
              className='undp-button button-tertiary button-arrow'
              style={{ padding: 0 }}
              onClick={() => {
                setModalVisibility(true);
              }}
            >
              Explore and download data
            </button>
          </div>
          <div className='margin-bottom-05 flex-div gap-00'>
            <Input
              className='undp-input'
              placeholder='Search Indicator'
              onChange={d => setSearchPhrase(d.target.value)}
            />
            <div
              style={{
                backgroundColor: 'var(--blue-700)',
                padding: '12px 10px 0',
              }}
            >
              <Search stroke='var(--white)' size={24} />
            </div>
          </div>
          <div className='margin-bottom-07 flex-div'>
            <div
              style={{
                flexGrow: 1,
                minWidth: '17.5rem',
                width: 'calc(25% - 0.75rem)',
              }}
            >
              <p className='label'>Filter by source</p>
              <Select
                className='undp-select'
                showSearch
                maxTagCount='responsive'
                style={{ width: '100%' }}
                allowClear
                clearIcon={<div className='clearIcon' />}
                placeholder='All Sources'
                onChange={d => {
                  setSourceForFilter(d);
                }}
                value={sourceForFilter}
              >
                {sourceList.map(d => (
                  <Select.Option className='undp-select-option' key={d}>
                    {d}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div
              style={{
                flexGrow: 1,
                minWidth: '17.5rem',
                width: 'calc(25% - 0.75rem)',
              }}
            >
              <p className='label'>Filter by topic</p>
              <Select
                className='undp-select'
                showSearch
                maxTagCount='responsive'
                style={{ width: '100%' }}
                allowClear
                clearIcon={<div className='clearIcon' />}
                placeholder='All Topics'
                onChange={d => {
                  setSSForFilter(d);
                }}
                value={ssForFilter}
              >
                {SIGNATURE_SOLUTIONS_LIST.filter(d => d !== 'All').map(d => (
                  <Select.Option className='undp-select-option' key={d}>
                    {d}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div
              style={{
                flexGrow: 1,
                minWidth: '17.5rem',
                width: 'calc(25% - 0.75rem)',
              }}
            >
              <p className='label'>Filter by tags</p>
              <Select
                className='undp-select'
                showSearch
                maxTagCount='responsive'
                style={{ width: '100%' }}
                mode='multiple'
                allowClear
                clearIcon={<div className='clearIcon' />}
                placeholder='All Tags'
                onChange={d => {
                  setTagsForFilter(d);
                }}
                value={tagsForFilter}
              >
                {TAGS_LIST.map(d => (
                  <Select.Option className='undp-select-option' key={d}>
                    {d}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div
              style={{
                flexGrow: 1,
                minWidth: '17.5rem',
                width: 'calc(25% - 0.75rem)',
              }}
            >
              <p className='label'>Filter by SDGs</p>
              <Select
                className='undp-select'
                mode='multiple'
                maxTagCount='responsive'
                style={{ width: '100%' }}
                allowClear
                clearIcon={<div className='clearIcon' />}
                placeholder='All SDGs'
                onChange={d => {
                  setSDGForFilter(d);
                }}
                value={sdgForFilter}
              >
                {SDG_GOALS.map(d => (
                  <Select.Option
                    className='undp-select-option'
                    key={d.split(':')[0]}
                  >
                    {d}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
          <div className='flex-div flex-wrap'>
            {indicatorsList
              .filter(
                (_d, i) =>
                  i >= (paginationValue - 1) * 10 && i < paginationValue * 10,
              )
              .map((d, i) => (
                <CardEl key={i}>
                  <div className='margin-bottom-07'>
                    <h6 className='undp-typography'>{d.IndicatorLabel}</h6>
                    <div className='flex-div flex-wrap margin-bottom-05'>
                      {d.SignatureSolution.map((el, j) => (
                        <div
                          className='undp-chip'
                          style={{ backgroundColor: 'var(--gray-400)' }}
                          key={j}
                        >
                          {el}
                        </div>
                      ))}
                    </div>
                    <p className='undp-typography'>{d.IndicatorDescription}</p>
                  </div>
                  <div
                    className='flex-div flex-vert-align-center'
                    style={{ justifyContent: 'space-between' }}
                  >
                    <div
                      style={{
                        fontSize: '1rem',
                        color: 'var(--gray-600)',
                      }}
                    >
                      Source(s):{' '}
                      {d.DataSourceLink !== '' ? (
                        <>
                          {d.DataSourceName.split(';').map((el, j) => (
                            <a
                              href={d.DataSourceLink.split(';')[j]}
                              target='_blank'
                              className='undp-style'
                              rel='noreferrer'
                              key={j}
                              style={{
                                marginRight: '0.5rem',
                                fontSize: '1rem',
                                color: 'var(--gray-600)',
                              }}
                            >
                              {el}
                            </a>
                          ))}
                        </>
                      ) : (
                        <p
                          style={{
                            marginRight: '0.5rem',
                            marginBottom: '0',
                            fontSize: '1rem',
                          }}
                        >
                          {d.DataSourceName}
                        </p>
                      )}
                    </div>
                    <button
                      type='button'
                      style={{
                        flexShrink: 0,
                        backgroundColor: 'transparent',
                        border: '0',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        DownloadExcel(d);
                      }}
                    >
                      <ArrowDownToLine size={24} stroke='var(--blue-600)' />
                    </button>
                  </div>
                </CardEl>
              ))}
          </div>
          <div className='flex-div flex-hor-align-center margin-top-07'>
            <Pagination
              className='undp-pagination'
              onChange={(e: number) => {
                setPaginationValue(e);
              }}
              defaultCurrent={1}
              current={paginationValue}
              total={indicatorsList.length}
              pageSize={10}
              showSizeChanger={false}
            />
          </div>
        </div>
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
      <Modal
        open={modalVisibility}
        className='undp-modal'
        title=''
        onOk={() => {
          setModalVisibility(false);
        }}
        onCancel={() => {
          setModalVisibility(false);
        }}
        style={{ maxWidth: '90%' }}
        destroyOnClose
      >
        {indicatorsListMain && countries ? (
          <DownloadModal
            indicatorsListMain={indicatorsListMain}
            countries={countries}
            signatureSolution={signatureSolution}
          />
        ) : null}
      </Modal>
    </div>
  );
}
