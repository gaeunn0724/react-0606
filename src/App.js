import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link, Routes, Route, useParams } from 'react-router-dom'; //component임
import { HeaderStyled } from './HeaderStyled';
import { Nav } from './Nav';
import { Article } from './Article';
import { Create } from './Create';

function Read(props){
  const params = useParams(); //가변적인 값(ex. id)를 props로 부터 가져올 수 있다.
  const id = Number(params.id);
  const topic = props.topics.filter(e=>{
    if(e.id === id) //state의 id와 topics의 id가 같으면
      return true;
    else return false;
  })[0];
  return <Article title={topic.title} body={topic.body}></Article>
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
    
  }else if(mode === 'CREATE'){
  }
  return (
    <div>
      <HeaderStyled onSelect={headerHandler()}></HeaderStyled>
      <Nav data={topics} onSelect={navHandler()}></Nav>
      {/* {content} */}
      <Routes>
        <Route path="/" element={<Article title="Welcome" body="Hello, WEB!"></Article>}></Route>
        <Route path="/create" element={<Create onCreate={onCreateHandler()}/>}></Route>
        <Route path="/read/:id" element={<Read topics={topics}/>}></Route>
      </Routes>
      <ButtonGroup>
      <Button component={Link} to="/create" variant="outlined" onClick={createHandler()}>Create</Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>
      <Button component={Link} to="/delete" variant="outlined" onClick={deleteHandler()}>Delete</Button>
      </div>
  );
  function Read(props){
    const params = useParams();
    const id = Number(params.id);
    const topic = props.topics.filter(e=>{
      if(e.id === id) {
        return true;
      } else {
        return false;
      }
    })[0];
    return <Article title={topic.title} body={topic.body}></Article>
  }

  function onCreateHandler() {
    return (title, body) => {
      const newTopic = { id: nextId, title: title, body: body };
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId + 1);
    };
  }

  function navHandler() {
    return (id) => {
      setMode('READ');
      setId(id);
    };
  }

  function deleteHandler() {
    return () => {
      const newTopics = topics.filter((e) => {
        if (e.id === id) {
          return false;
        } else
          return true;
      });
      setTopics(newTopics);
      setMode('WELCOME');
    };
  }

  function createHandler() {
    return () => {
      setMode('CREATE');
    };
  }

  function headerHandler() {
    return () => {
      setMode('WELCOME');
    };
  }
}

export default App;
