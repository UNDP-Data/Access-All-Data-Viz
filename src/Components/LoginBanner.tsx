interface Props {
  link: string;
}

export function LoginBanner(props: Props) {
  const { link } = props;
  return (
    <div
      className='flex-div flex-wrap flex-space-between flex-vert-align-center'
      style={{
        backgroundColor: 'var(--gray-200)',
        border: '1px solid var(--gray-500)',
        borderRadius: '4px',
        padding: 'var(--spacing-05) var(--spacing-06)',
        marginTop: 'var(--spacing-05)',
      }}
    >
      <p
        className='undp-typography margin-bottom-00 small-font'
        style={{ color: 'var(--gray-600)' }}
      >
        UNDP personnel, login for more features.
      </p>
      <a
        href={`/user/login?destination=${link}`}
        className='undp-button button-tertiary button-arrow padding-00'
        style={{
          textDecoration: 'none',
          width: 'fit-content',
          padding: '0 !important',
        }}
      >
        click here to login
      </a>
    </div>
  );
}
