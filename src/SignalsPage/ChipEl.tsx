interface Props {
  text: string;
  circleColor: string;
}

export function ChipEl(props: Props) {
  const { circleColor, text } = props;
  return (
    <div className='undp-chip flex-div gap-03 flex-vert-align-center'>
      <div
        style={{
          width: '0.825rem',
          height: '0.825rem',
          borderRadius: '0.825rem',
          backgroundColor: circleColor,
          flexShrink: 0,
        }}
      />
      {text}
    </div>
  );
}
