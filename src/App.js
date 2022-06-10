import './App.css';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Header(){
  return <header>
  <h1><a href="/">Web</a></h1>
</header>
}

function Nav(props){
  console.log('data',props.data);
  // const tagList = [
  //   <li><a href="/read/1">html</a></li>,
  //   <li><a href="/read/2">css</a></li>,
  //   <li><a href="/read/3">js</a></li>
  // ]

  const tagList = props.data.map(e=>{
    return <li key={e.id}><a href={'/read/'+e.id}>{e.title}</a></li>
  });
  return <nav>
  <ol>
    {tagList}
  </ol>
</nav>
}



function Article(props){
  console.log('props',props.title);
  return <article>
  <h2>{props.title}</h2>
  Hello, WEB!
</article>
}

function App() {
  const topics = [
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'js', body:'js is...'}
  ];
  return (
    <div>
      <Header></Header>
      <Nav data={topics}></Nav>
      <Article title="사용자정의"></Article>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button variant="outlined">Create</Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>
      <Button variant="outlined">Delete</Button>
    </div>
  );
}

export default App;
