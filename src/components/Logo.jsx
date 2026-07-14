export function Logo({ compact = false }) {
  return (
    <a className="brand" href="#top" aria-label="WANGSIQI Studio — Home">
      <img className="brand__mark" src="./assets/icons/wsq-logo.svg" alt="" />
      {!compact && <span className="brand__name">WANGSIQI Studio</span>}
    </a>
  );
}
