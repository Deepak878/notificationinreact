import React from "react";
import "./app.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/card/Card";
import { posts } from "../src/data";
import { io } from "socket.io-client";
const App = () => {
  const [username, setUsername] = useState("hari");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);
  console.log(user);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
    // console.log(
    //   socket.on("firstEvent", (msg) => {
    //     console.log(msg);
    //   })
    // );
  }, []);
  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);
  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}

          <span className="username">{user}</span>
        </>
      ) : (
        <div className="login">
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUser(username)}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
