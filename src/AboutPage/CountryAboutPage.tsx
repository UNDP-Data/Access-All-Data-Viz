import { queue } from 'd3-queue';
import { json } from 'd3-request';
import { useEffect, useState } from 'react';
import { format } from 'd3-format';
import { ABOUT_TEXT_LINKS, COUNTRYTAXONOMYLINK } from '../Constants';
import { CountryGroupDataType, CountryTaxonomyDataType } from '../Types';
import CountryWebsiteList from '../CountryPage/CountryWebLinks.json';

interface Props {
  countryId: string;
}

const isDataAvailable = (data: CountryGroupDataType, indicator: string) => {
  if (data.indicators.findIndex(d => d.indicator === indicator) === -1)
    return false;
  if (
    data.indicators[data.indicators.findIndex(d => d.indicator === indicator)]
      .yearlyData.length === 0
  )
    return false;

  return true;
};
const GetDataValueAndYear = (data: CountryGroupDataType, indicator: string) => {
  return data.indicators[
    data.indicators.findIndex(d => d.indicator === indicator)
  ].yearlyData[
    data.indicators[data.indicators.findIndex(d => d.indicator === indicator)]
      .yearlyData.length - 1
  ];
};

export function CountryAboutPage(props: Props) {
  const { countryId } = props;
  const [countryTaxonomy, setCountryTaxonomy] = useState<
    CountryTaxonomyDataType | undefined
  >(undefined);
  const [countryData, setCountryData] = useState<
    CountryGroupDataType | undefined
  >(undefined);
  const aboutData =
    ABOUT_TEXT_LINKS.findIndex(d => d.id === countryId) !== -1
      ? ABOUT_TEXT_LINKS[ABOUT_TEXT_LINKS.findIndex(d => d.id === countryId)]
      : null;
  useEffect(() => {
    queue()
      .defer(
        json,
        `https://raw.githubusercontent.com/UNDP-Data/Access-All-Data-Data-Repo/main/countryData/${countryId}.json`,
      )
      .defer(json, COUNTRYTAXONOMYLINK)
      .await(
        (
          err: any,
          data: CountryGroupDataType,
          countryTaxonomyDataFromFile: CountryTaxonomyDataType[],
        ) => {
          if (err) throw err;
          setCountryTaxonomy(
            countryTaxonomyDataFromFile[
              countryTaxonomyDataFromFile.findIndex(
                d => d['Alpha-3 code'] === countryId,
              )
            ],
          );
          setCountryData(data);
        },
      );
  }, [countryId]);
  return (
    <div className='undp-container'>
      {countryTaxonomy && countryData ? (
        <div className='flex-div flex-wrap'>
          <div
            style={{
              width: 'calc(50% - 0.5rem)',
              minWidth: '20rem',
              flexGrow: 1,
            }}
          >
            <h2 className='undp-typography'>
              {countryTaxonomy['Country or Area']}
            </h2>
          </div>
          <div
            style={{
              width: 'calc(50% - 0.5rem)',
              minWidth: '20rem',
              flexGrow: 1,
            }}
          >
            <p className='undp-typography'>
              Located in {countryTaxonomy['Group 2']}
              {isDataAvailable(countryData, 'Population, total') ? (
                <>
                  &nbsp;and with a population of&nbsp;
                  <span className='bold'>
                    {format('.2s')(
                      GetDataValueAndYear(countryData, 'Population, total')
                        .value,
                    ).replace('G', 'B')}
                  </span>
                  &nbsp;inhabitants
                </>
              ) : null}
              .&nbsp;
              {isDataAvailable(
                countryData,
                'GDP per capita, PPP (current international $)',
              ) ? (
                <span>
                  {countryTaxonomy['Country or Area']}
                  &nbsp;had a GDP of&nbsp;
                  <span className='bold'>
                    {format('.2s')(
                      GetDataValueAndYear(
                        countryData,
                        'GDP per capita, PPP (current international $)',
                      ).value,
                    ).replace('G', 'B')}
                    &nbsp;USD
                  </span>
                  &nbsp;per capita in&nbsp;
                  {
                    GetDataValueAndYear(
                      countryData,
                      'GDP per capita, PPP (current international $)',
                    ).year
                  }
                  .&nbsp;
                </span>
              ) : (
                ''
              )}
              {isDataAvailable(countryData, 'Human development index (HDI)') ? (
                <span>
                  {countryTaxonomy['Country or Area']}
                  &nbsp;also demonstrated a&nbsp;
                  <span className='bold'>
                    {GetDataValueAndYear(
                      countryData,
                      'Human development index (HDI)',
                    ).value > 0.8
                      ? 'high'
                      : GetDataValueAndYear(
                          countryData,
                          'Human development index (HDI)',
                        ).value > 0.55
                      ? 'medium'
                      : 'low'}
                  </span>
                  &nbsp;human development in&nbsp;
                  {
                    GetDataValueAndYear(
                      countryData,
                      'Human development index (HDI)',
                    ).year
                  }
                  &nbsp;(last reported HDI:{' '}
                  {
                    GetDataValueAndYear(
                      countryData,
                      'Human development index (HDI)',
                    ).value
                  }
                  ).&nbsp;
                </span>
              ) : (
                ''
              )}
              {isDataAvailable(
                countryData,
                'Gender Inequality Index-Gender Inequality Index',
              ) ? (
                <span>
                  {countryTaxonomy['Country or Area']}
                  &nbsp;also has a&nbsp;
                  <span className='bold'>
                    {GetDataValueAndYear(
                      countryData,
                      'Gender Inequality Index-Gender Inequality Index',
                    ).value < 0.45
                      ? 'high'
                      : GetDataValueAndYear(
                          countryData,
                          'Gender Inequality Index-Gender Inequality Index',
                        ).value < 0.72
                      ? 'medium'
                      : 'low'}
                  </span>
                  &nbsp;gender parity&nbsp;(last reported Gender Inequality
                  Index:{' '}
                  {
                    GetDataValueAndYear(
                      countryData,
                      'Gender Inequality Index-Gender Inequality Index',
                    ).value
                  }
                  ).&nbsp;
                </span>
              ) : (
                ''
              )}
              {isDataAvailable(
                countryData,
                'GINI index (World Bank estimate)',
              ) ? (
                <span>
                  {countryTaxonomy['Country or Area']}
                  &nbsp;have a relatively&nbsp;
                  <span className='bold'>
                    {GetDataValueAndYear(
                      countryData,
                      'GINI index (World Bank estimate)',
                    ).value < 35.18
                      ? 'low'
                      : GetDataValueAndYear(
                          countryData,
                          'GINI index (World Bank estimate)',
                        ).value < 39.06
                      ? 'moderate'
                      : 'high'}
                  </span>
                  &nbsp;levels of income inequality&nbsp;(last reported GINI
                  Index:{' '}
                  {
                    GetDataValueAndYear(
                      countryData,
                      'GINI index (World Bank estimate)',
                    ).value
                  }
                  ).&nbsp;
                </span>
              ) : (
                ''
              )}
            </p>
            {aboutData?.bodyText}
            {CountryWebsiteList.findIndex(
              d => d.iso3 === countryTaxonomy['Alpha-3 code'],
            ) !== -1 ? (
              <div className='margin-top-09'>
                <h3 className='undp-typography'>Resources</h3>
                <div className='margin-bottom-05'>
                  <a
                    href={
                      CountryWebsiteList[
                        CountryWebsiteList.findIndex(
                          d => d.iso3 === countryTaxonomy['Alpha-3 code'],
                        )
                      ].url
                    }
                    target='_blank'
                    className='undp-style'
                    rel='noreferrer'
                  >
                    Country Website
                  </a>
                </div>
                {aboutData?.resource.map((d, i) => (
                  <div className='margin-bottom-05' key={i}>
                    <a
                      href={d.link}
                      target='_blank'
                      className='undp-style'
                      rel='noreferrer'
                    >
                      {d.source}
                    </a>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
