import React,{useState,useEffect}from 'react';
import logo from './logo.svg';
import './App.css';
import PostList from './Components/PostsList'
import axios from 'axios'
function App() {
  const[PostsList,setPostslist] = useState([]);
  
  const getPostList = () =>{
    axios
      .get("http://localhost:5000/api/posts")
      .then(res =>{
        console.log(res)
        setPostslist(res.data)
      })
      .catch(
      error => console.log(error)
    )
  }
  useEffect(()=>{
    getPostList()
  },[])
  return (
    <div className="App">
      <PostList posts={PostsList} />
    </div>
  );
}

export default App;
