interface Props {
  link: string;
}

export function LoginBannerForTabs(props: Props) {
  const { link } = props;
  return (
    <div
      className='margin-bottom-07 margin-top-07'
      style={{
        padding: '1.25rem',
        backgroundColor: 'var(--gray-200)',
        border: '1px solid var(--gray-300)',
        borderRadius: '0.25rem',
      }}
    >
      <h6 className='undp-typography'>
        This feature is only available to UNDP users
      </h6>
      <p className='undp-typography'>
        To proceed, kindly log in using your UNDP account.
      </p>
      <a
        href={`/user/login?destination=${link}`}
        className='undp-button button-primary button-arrow'
        style={{
          textDecoration: 'none',
          width: 'fit-content',
        }}
      >
        click here to login
      </a>
    </div>
  );
}
