import './App.css'
import { Button, Input, Tag } from 'antd'
import useChat from './Hooks/useChat'
import { useState, useEffect } from 'react'
import { message } from 'antd';


function App() {
  const { status, messages, sendMessage, clearMessages } = useChat()
  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')  // textBody
  const [hadSignIn, setSignIn] = useState(false)


  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = {
        content: msg, duration: 0.5
      }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
      }
    }
  }
  useEffect(() => {
    displayStatus(status)
  }, [status])

  useEffect(() => {

    if (localStorage.getItem('username') != null) {
      setUsername(localStorage.getItem('username'));
    } else {
      setUsername('My');
    }
  }, [])
  if (hadSignIn === true) {

    return (
      <div className="App">
        <div className="App-title">
          <h1>{username}'s Chat Room</h1>
          <Button type="primary" danger onClick={clearMessages}>
            Clear
          </Button>

        </div>
        <div className="App-messages">
          {messages.length === 0 ? (
            <p style={{ color: '#ccc' }}> No messages... </p>
          ) : (
            messages.map(({ name, body }, i) => (
              <p className="App-message" key={i}>
                <Tag color="blue">{name}</Tag> {body}
              </p>
            ))
          )}

        </div>

        {/* <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: 10 }}
        ></Input> */}

        <Input.Search
          value={body}
          onChange={(e) => setBody(e.target.value)}
          enterButton="Send"
          placeholder="Type a message here..."
          onSearch={(msg) => {
            sendMessage({ name: username, body: msg })
            setBody('')
          }}

        ></Input.Search>
      </div>
    )
  }
  else {
    return (
      <div className="App">
        <div className="App-title">
          <h1>{username} Chat Room</h1>
        </div>
        <Input.Search
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          enterButton="Sign In"
          placeholder={username}
          onSearch={() => {
            console.log('setSignIn(true) !');
            if (username) {
              setSignIn(true);
              localStorage.setItem('username', username);
            }
            else {
              alert('please input your name')
            }
          }}
        ></Input.Search>
      </div >)
  }
}

export default App
