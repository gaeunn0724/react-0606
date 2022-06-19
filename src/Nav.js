import { Link } from 'react-router-dom';

export function Nav(props) {
  console.log('data', props.data);
  // const tagList = [
  //   <li><a href="/read/1">html</a></li>,
  //   <li><a href="/read/2">css</a></li>,
  //   <li><a href="/read/3">js</a></li>
  // ]
  const tagList = props.data.map(e => {
    return <li key={e.id}><Link to={'/read/' + e.id} onClick={(evt) => {
      props.onSelect(e.id); //id값이 뜨게
    }}>{e.title}</Link></li>;
  });
  return <nav>

    <ol>
      {tagList}

    </ol>
  </nav>;
}
