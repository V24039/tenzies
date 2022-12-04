import React, { useEffect, useState } from "react";
import Die from "./Die"

function App() {
  
  const [dies, setDie] = useState(newDice())
  // const [heldValue, setValue] = useState(0)
  const [tenzies, setTenzies] = useState(false)

  useEffect(() =>{
    const allHeld = dies.every(die => die.isHeld)
    const value = dies[0].value
    const allValue = dies.every(die => die.value===value)
    if(allHeld && allValue){
      setTenzies(true)
    }
  },[dies])

  function newDice() {
    const newDices = []
    for(let i=0;i<10;i++){
      newDices.push(
        {
          id: i,
          value:Math.ceil(Math.random()*6),
          isHeld: false,
        })
    }
    return newDices
  }
 
  function rollDice(){
    setDie(prev => prev.map( ele =>{
      return !ele.isHeld ? 
      {
        ...ele,
        value: Math.ceil(Math.random()*6)
      }:ele
    }))
  }

  function newGame(){
    setDie(newDice())
    setTenzies(prev => ! prev)
  }

  function constNumber(index) {
    setDie(prev => prev.map( ele =>{
      return ele.id === index ? 
      {
        ...ele,
        isHeld: !ele.isHeld
      }:ele
    }))
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-box">
        {dies.map((die, index) => {
          return ( 
            <Die  key = {index}
                  value = {die.value}
                  isHeld = {die.isHeld}
                  click = {() => constNumber(die.id, die.value)}/>
          )
        })}
      </div>
      
      {
        tenzies?<button className="roll" onClick={()=>newGame()}>New Game</button>
        :<button className="roll" onClick={()=>rollDice()}>Roll</button>
        
      }
      {
        !tenzies && dies.every(die => die.isHeld) ? <h1>
          Different numbers
        </h1>:<p></p>
      }
      
    </main>
  );
}

export default App;
