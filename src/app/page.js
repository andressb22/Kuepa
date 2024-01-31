"use client"
import {useState} from 'react'
import Register from "../../componets/Register";
import Login from "../../componets/Login";
import MultimediaContent from "../../componets/MultimediaContent";

export default function Home() {
  const [loginActive,setLoginActive] = useState(true)
 
  const changeState = (bool)=>{
    setLoginActive(bool)
  }

  return (
    <main className="containerHome">
      <MultimediaContent loginActive={loginActive} />
      <div>
        <Register changeState={changeState}  />
      </div>
      <div>
        <Login changeState={changeState} />
      </div>
    </main>
  );
}
