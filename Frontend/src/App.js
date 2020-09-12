import React, {useState, useEffect} from 'react';


function App() {

  const [questions,setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [param, setParam] = useState('');
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const [tags, setTags] = useState('');

  useEffect(()=>{

    const fetchData = async ()=>{
      fetch(`http://localhost:5000/`)
      .then(res=>res.json())
      .then(result=> {
        setIsLoading(false);
        setQuestions(result);
        console.log(result)
        console.log('here')
      })
      .catch(err=> {
        console.log(err);
      })
    }
    const fetchDataSearch = async ()=>{
      const requestOptions = {
        method:'POST',
        headers:{ 'Content-Type': 'application/json' },
        body:JSON.stringify({tags:search})
      };
      fetch(`http://localhost:5000/search`,requestOptions)
      .then(res=>res.json())
      .then(result=> {
        setIsLoading(false);
        setQuestions(result);
        console.log(result)
        console.log('here')
      })
      .catch(err=> {
        console.log(err);
      })
    }
    if(search===''){
      fetchData();
    }else{
      fetchDataSearch();
    }
    
  },[search])

  function getAll(){
    let rows = questions.map(item=>{
      return (
      <div key={item._id} className="card">
        <h4>Query: <small>{item.query}</small></h4>
      <h5>Topic: <small>{item.topic}</small></h5>
      <h5>Tags: <small>{item.tags}</small></h5>
      </div>
      )
    })
    return rows;
  }

  function handleSearch(e){
    setParam(e.target.value);
  }
  function handleSubmit(e){
    e.preventDefault();
    setSearch(param);
    setIsLoading(true);
  }
  function handleQuery(e){
    setQuery(e.target.value)
  }
  function handleTopic(e){
    setTopic(e.target.value)
  }
  function handleTags(e){
    setTags(e.target.value)
  }
  function handleQuerySubmit(e){
    e.preventDefault();
    
    const requestOptions = {
      method:'POST',
      headers:{ 'Content-Type': 'application/json' },
      body:JSON.stringify({
        query:query,
        topic:topic,
        tags:tags
      })
    };
    const postData = async ()=>{
      fetch(`http://localhost:5000/add`,requestOptions)
      .then(res=>res.json())
      .then(result=> {
        setIsLoading(false);
        let prev = questions;
        prev.push(result)
        setQuestions(prev);
        console.log(result)
        console.log('here')
      })
      .catch(err=> {
        console.log(err);
      })
    }
    setIsLoading(true);
    postData();
  }
  if(isLoading){
    return(
      <h2> Loading ...</h2>
    )
  }else{
    return (
      <div className="parent">
        <div className="left">
          <label>Search Query: </label>
          <input type="search" onChange={handleSearch} />
          <button type="submit" onClick={handleSubmit}>Search</button>
          {getAll()}
        </div>
        <div className="right">
          <h3>Add Query: </h3>
          <label>Query: </label>
          <input type="text" onChange={handleQuery}/><br/>
          <label>Topic: </label>
          <input type="text" onChange={handleTopic}/><br/>
          <label>Tags: </label>
          <input type="text" onChange={handleTags}/>
          <br/>
          <button type="submit" onClick={handleQuerySubmit}>Add</button>
        </div>
      </div>
    )
  }
}

export default App;
