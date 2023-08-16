import { DotPlot } from '../CardComponents/DotPlot';
import { LineChart } from '../CardComponents/LineChart';
import { StackedAreaChart } from '../CardComponents/StackedAreaChart';
import { ValueCard } from '../CardComponents/ValueCard';
import { IndicatorDataType, IndicatorMetaDataType } from '../Types';

interface Props {
  data: IndicatorDataType[];
  card: any;
  indicator: IndicatorMetaDataType[];
}

export function GraphEl(props: Props) {
  const { data, card, indicator } = props;
  return (
    <>
      {card.vizType === 'lineChart' ? (
        <LineChart
          data={data[0].yearlyData}
          strokeWidth={card.settings.strokeWidth}
          lineColor={card.settings.lineColor}
          graphTitle={card.settings.graphTitle}
          source={indicator[0].DataSourceName}
          sourceLink={indicator[0].DataSourceLink}
          graphDescription={
            card.settings.description
              ? indicator[0].IndicatorDescription
              : undefined
          }
          suffix={card.settings.suffix}
          prefix={card.settings.prefix}
        />
      ) : null}
      {card.vizType === 'dotPlot' ? (
        <DotPlot
          value={data[0].yearlyData[data[0].yearlyData.length - 1].value}
          year={data[0].yearlyData[data[0].yearlyData.length - 1].year}
          size={card.settings.size || 200}
          dotColor={card.settings.dotColor}
          graphTitle={card.settings.graphTitle}
          source={indicator[0].DataSourceName}
          sourceLink={indicator[0].DataSourceLink}
          graphDescription={
            card.settings.description
              ? indicator[0].IndicatorDescription
              : undefined
          }
        />
      ) : null}
      {card.vizType === 'stackedLineChart' ? (
        <StackedAreaChart
          data1={data[0].yearlyData}
          data2={data[1].yearlyData}
          strokeWidth={1}
          lineColor1={card.settings.lineColor[0]}
          lineColor2={card.settings.lineColor[1]}
          graphTitle={card.settings.graphTitle}
          source={indicator[0].DataSourceName}
          sourceLink={indicator[0].DataSourceLink}
          graphDescription={
            card.settings.description
              ? indicator[0].IndicatorDescription
              : undefined
          }
        />
      ) : null}
      {card.vizType === 'valueCard' ? (
        <ValueCard
          value={data[0].yearlyData[data[0].yearlyData.length - 1].value}
          year={data[0].yearlyData[data[0].yearlyData.length - 1].year}
          prefix={card.settings.prefix}
          suffix={card.settings.suffix}
          graphTitle={card.settings.graphTitle}
          source={indicator[0].DataSourceName}
          sourceLink={indicator[0].DataSourceLink}
          graphDescription={
            card.settings.description
              ? indicator[0].IndicatorDescription
              : undefined
          }
        />
      ) : null}
    </>
  );
}
