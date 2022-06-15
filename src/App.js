import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; //component임

const HeaderStyled = styled(Header)`
  background-color:white;
  border: 1px solid red;
`;

function Header(props){
  return <header className={props.className}>
  <h1><Link to="/" onClick={(evt)=>{
    props.onSelect();
    console.log('evt',evt);
  }}>WWW</Link></h1>
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
    return <li key={e.id}><Link to={'/read/'+e.id} onClick={(evt)=>{
      props.onSelect(e.id); //id값이 뜨게
    }

    } >{e.title}</Link></li>
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

function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={(evt)=>{
      evt.preventDefault();
      //evt.target은 form태그 자신
      const title = evt.target.title.value;
      const body = evt.target.body.value;
      props.onCreate(title,body); //전달
    }}>
      <p><input name="title" type="text" placeholder='title'></input></p>
      <p><textarea name="body" placeholder='body'></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}

function App() {
  const [mode, setMode] = useState('WELCOME'); //새로운 상태의 기본 값이 welcome. let보다는 const
  //state값을 읽을때에는 mode, 값을 바꿀 때에는 setMode -> 69번째 줄
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  console.log(id, mode);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'js', body:'js is...'},
  ]);
  
 
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
  }else if(mode === 'CREATE'){

    content = <Create onCreate={(title,body)=>{
      const newTopic= {id:nextId, title:title, body:body};
      // topics.push(newTopic);
      // setTopics(topics);
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}/>;
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
          setMode('CREATE');
        }}>Create</Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>
      <Button component={Link} to="/create" variant="outlined" onClick={()=>{
        const newTopics = topics.filter((e)=>{
          if(e.id === id){
            return false;
          }else return true;
        });
        setTopics(newTopics);
        setMode('WELCOME');
      }}>Delete</Button>
      </div>
  );
}

export default App;
