import { useState } from 'react';
import './App.css';
import Login from './Login';

function App() {
  
  const[logedIn, LogedIn] = useState(false);
  const [username , Username] = useState('');
  const [pass, Pass] = useState('');

  function checkLogin(){
    const username = document.getElementById('usernameField').value;
    alert(username);
    // alert(username === 'admin');
    // if(username === 'admin' && pass === 'Love@2020'){
    //   LogedIn(true);
    // }else{
    //   alert("Check your Credentials")
    // }

  }

  return (
    <div className="App">

      {
        logedIn ?
          <div>
            logedIn
            <br />
            <button onClick={()=>{LogedIn(false)}}>Logout</button>
          </div> :
        <Login />
      }

    </div>
  );
}

export default App;
