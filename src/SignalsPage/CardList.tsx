import { SignalCard } from './SignalCard';
import { ChoicesDataType, SignalDataType } from './Types';

interface Props {
  data: SignalDataType[];
  choices: ChoicesDataType;
}

export function CardList(props: Props) {
  const { data, choices } = props;
  return (
    <>
      {data.map((d, i) => (
        <SignalCard data={d} key={i} choices={choices} />
      ))}
    </>
  );
}
