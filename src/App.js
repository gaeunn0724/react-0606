import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from 'styled-components';

const HeaderStyled = styled(Header)`
  background-color:white;
  border: 1px solid red;
`;

function Header(props){
  return <header className={props.className}>
  <h1><a href="/" onClick={(evt)=>{
    evt.preventDefault();
    props.onSelect();
    console.log('evt',evt);
  }}>WWW</a></h1>
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
    return <li key={e.id}><a href={'/read/'+e.id} onClick={(evt)=>{
      evt.preventDefault();
      props.onSelect(e.id); //id값이 뜨게
    }

    } >{e.title}</a></li>
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
  {props.body}
</article>
}

function App() {
  const [mode, setMode] = useState('WELCOME'); //새로운 상태의 기본 값이 welcome. let보다는 const
  //state값을 읽을때에는 mode, 값을 바꿀 때에는 setMode -> 69번째 줄
  const [id, setId] = useState(null);
  console.log(id, mode);
  const topics = [
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'js', body:'js is...'}
  ];
  // function createHandler(){
  //   alert('create!');
  // }
  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB!"></Article>
  }else if(mode === 'READ'){
    const topic = topics.filter(e=>{
      if(e.id === id) //state의 id와 topics의 id가 같으면
        return true;
      else return false;
    })[0];
    content = <Article title={topic.title} body={topic.body}></Article>
  }
  return (
    <div>
      <HeaderStyled onSelect={()=>{
        setMode('WELCOME'); //state를 활용해서 setMode를 변경함. 값을 직접 변경하는게 아니라 함수를 호출하는 것.
      }}></HeaderStyled>
      <Nav data={topics} onSelect={(id)=>{
        setMode('READ');
        setId(id); //id값이 이전과 같으면 실행되지 않는다.
      }}></Nav>
      {content}
      <ButtonGroup>
        <Button variant="outlined" onClick={()=>{
          alert('created!');
        }}>Create</Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>
      <Button variant="outlined">Delete</Button>
    </div>
  );
}

export default App;