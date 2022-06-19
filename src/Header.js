import { Link } from 'react-router-dom';

export function Header(props) {
  return <header className={props.className}>
    <h1><Link to="/" onClick={(evt) => {
      props.onSelect();
      console.log('evt', evt);
    }}>WWW</Link></h1>
  </header>;
}
