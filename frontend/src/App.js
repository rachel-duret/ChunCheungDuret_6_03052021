import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Signup from './pages/Signup';
import Login from './pages/Login';
import {useHistory} from 'react-router-dom';



function App() {
  let history = useHistory();
  const logout = () =>{
    localStorage.removeItem("accessToken");
    history.push('/login');  
  }
  
  return (
    <div className="App">

        <Router>
          <div className="navbar">
          {! localStorage.getItem("accessToken")? (
          <>
          <Link to="/signup">Singup</Link>
          <Link to="/login">Login</Link>
          </>
          ): (
            <button onClick={logout} className="logout">Logout</button>
          )}     
          <Link to="/">Home Page</Link>
          <Link to="/createpost">Create A Post</Link>        
          </div>
          
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path ="/signup" exact component={Signup} />
            <Route path = "/login" exact component={Login} />
          </Switch>
        </Router>

      
    </div>
  );
}

export default App;
