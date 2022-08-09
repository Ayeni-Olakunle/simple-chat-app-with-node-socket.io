import './App.css';
import { useEffect, useState } from "react"
import io from 'socket.io-client';
const socket = io.connect("https://simple-chat-t.herokuapp.com/")

function App() {
  const [message, setMessage] = useState()
  const [pastMsg, setPastMsg] = useState([])

  const sendMessage = () => {
    socket.emit("send_message", { message: message });
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setPastMsg(data.message)
    })
  }, [socket])
  return (
    <div className="App">
      <div>
        <input type="text" placeholder="Send Message" onChange={e => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send Message</button>
        <div>
          <h1>Send Message:</h1>
          <p>{pastMsg}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
