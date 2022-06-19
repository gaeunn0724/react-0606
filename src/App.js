import './App.css';
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link, Routes, Route, useParams, useNavigate } from 'react-router-dom'; //component임
import { HeaderStyled } from './HeaderStyled';
import { Nav } from './Nav';
import { Article } from './Article';
import { Create } from './Create';

function Read(props){
  const params = useParams();
  const id = Number(params.id); //params의 type은 string임. 
  const [topic,setTopic]=useState({title:null, body:null});
  useEffect(()=>{
    //id와 일치하는거 가져옴
    (async()=>{
      const resp = await fetch('http://localhost:3333/topics/'+id);
      const data = await resp.json();
      setTopic(data);
    })(); //만들고 바로 호출
  },[id]); //id가 바뀔때마다 useEffect를 사용하고 싶어!!!
 
  return <Article title={topic.title} body={topic.body}></Article>
}

function Control(props){
  const params = useParams();
  const id = Number(params.id);
  let contextUI = null;
  if(id){
    contextUI = <>
      <Button variant="outlined">Update</Button>
      <Button variant="outlined" onClick={()=>{props.onDelete(id);}}>Delete</Button>
    </>
  }
  return <>
      <Button component={Link} to="/create" variant="outlined">Create</Button>
      {contextUI}
  </>
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

  const refreshTopics = async()=>{
    const resp = await fetch('http://localhost:3333/topics');
    const data = await resp.json();
    setTopics(data);
  };
  useEffect(()=>{
      console.log('side effect'); 
      refreshTopics(); //만들고 바로 호출
      
  },[]); //최초에 한 번만 실행됨.
  const navigate = useNavigate();
  return (
    <div>
      <HeaderStyled onSelect={headerHandler()}></HeaderStyled>
      <Nav data={topics} onSelect={navHandler()}></Nav>
      {/* {content} */}
      <Routes>
        <Route path="/" element={<Article title="Welcome" body="Hello, WEB!"></Article>}></Route>
        <Route path="/create" element={<Create onCreate={onCreateHandler}/>}></Route>
        <Route path="/read/:id" element={<Read topics={topics}/>}></Route>
      </Routes>
     
      <Routes>
        {['/','/read/:id','/update/:topic_id'].map(path=>{ //배열 값이 하나씩 나와서 route로 return함
          return <Route key={path} path={path} element={<Control onDelete={(id)=>{
            deleteHandler(id);
          }}></Control>}></Route>
        })}
      </Routes>
      </div>
  );
  

  async function onCreateHandler(title, body) {
    const resp = await fetch('http://localhost:3333/topics',{
      method: 'POST', //POST로 보내겠다
      headers: {
        'Content-Type': 'application/json', //json으로 해석해서 동작해라
      },
      body: JSON.stringify({title,body}) //json으로 보내줌
    });
    const data = await resp.json(); //fetch된 결과를 받아와
    navigate(`/read/${data.id}`); //방금 생성한 값으로 redirection
    refreshTopics();
      // const newTopic = { id: nextId, title: title, body: body };
      // const newTopics = [...topics];
      // newTopics.push(newTopic);
      // setTopics(newTopics);
      // setMode('READ');
      // setId(nextId);
      // setNextId(nextId + 1);
  }

  function navHandler() {
    return (id) => {
      setMode('READ');
      setId(id);
    };
  }

  function deleteHandler(id) {
    
    const newTopics = topics.filter((e) => {
      if (e.id === id) {
          return false;
        } else
          return true;
      });
      setTopics(newTopics);
      navigate('/');
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
