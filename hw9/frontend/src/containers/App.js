
import './App.css';
import { useEffect, useState } from "react"
import SignIn from './SignIn'
import ChatRoom from './ChatRoom'

const LOCALSTORAGE_KEY = "save-me"

function App() {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY)
  const [signIn, setSignedIn] = useState(false)
  const [me, setMe] = useState(savedMe || "")
  useEffect(() => {
    if (signIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me)
    }
  }, [signIn])
  return (
    <div className="App">
      {signIn ? (<ChatRoom me={me} />) : (
        <SignIn
          me={me}
          setMe={setMe}
          setSignedIn={setSignedIn} />
      )}
    </div>
  );
}

export default App;