import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom'; //component임
import { HeaderStyled } from './HeaderStyled';
import { Nav } from './Nav';
import { Article } from './Article';
import { Create } from './Create';

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
      <HeaderStyled onSelect={headerHandler()}></HeaderStyled>
      <Nav data={topics} onSelect={navHandler()}></Nav>
      {content}
      <ButtonGroup>
        <Button variant="outlined" onClick={createHandler()}>Create</Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>
      <Button component={Link} to="/create" variant="outlined" onClick={deleteHandler()}>Delete</Button>
      </div>
  );

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
