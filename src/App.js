import './App.css';
import app from './firebase.init';
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider= new FacebookAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.error('error', error)
        // console.log(error);
      })
  }

  const handleGithubSignIn =()=>{
    signInWithPopup(auth, githubProvider)
      .then(result=>{
        const user = result.user;
        setUser(user);
        console.log(user)
      })
      .catch(error=>{
        console.error(error);
      })
  }

  const handleFacebookSignIn=()=>{
signInWithPopup(auth, facebookProvider)
.then(result=>{
  const user = result.user;
  setUser(user);
  console.log(user);
})
.catch(error=>{
  console.error(error);
})
  }

  const handleSignOut = () => {
signOut(auth)
.then(()=>{
  setUser({});
})
.catch(error=>{
  setUser({});
})
  }

  return (
    <div className="App">
      {
        user.uid? <button onClick={handleSignOut}>Sign Out</button>:
         <>
            <button onClick={handleGoogleSignIn}>Google Sign in</button>
            <button onClick={handleFacebookSignIn}>Facebook Login</button>
      <button onClick={handleGithubSignIn}>Github Sign in</button>
           </>
      }
      <h2>Name: {user.displayName}</h2>
      <p>Email:{user.email}</p>
      <img src={user.photoURL} alt=""/>
    </div>
  );
}

export default App;
