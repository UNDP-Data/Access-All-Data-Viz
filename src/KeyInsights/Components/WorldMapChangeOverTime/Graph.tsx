import { useEffect, useRef, useState } from 'react';
import { UnivariateMap } from './UnivariateMap';

interface DataProps {
  'Alpha-3 code': string;
  'Country or Area': string;
  data: {
    year: number;
    value: number;
  }[];
  changeOverTime?: number;
}

interface Props {
  data: DataProps[];
  colorArray: string[];
  valueArray: number[];
  title: string;
}

export function Graph(props: Props) {
  const { data, colorArray, valueArray, title } = props;
  const [height, setHeight] = useState(0);

  const graphDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (graphDiv.current) {
      setHeight(
        graphDiv.current.clientHeight < 450
          ? 450
          : graphDiv.current.clientHeight,
      );
    }
  }, [graphDiv]);
  return (
    <div style={{ flexGrow: 1 }} ref={graphDiv}>
      {height ? (
        <UnivariateMap
          title={title}
          data={data}
          colorArray={colorArray}
          valueArray={valueArray}
          height={height}
        />
      ) : (
        <div className='undp-loader-container undp-container'>
          <div className='undp-loader' />
        </div>
      )}
    </div>
  );
}
