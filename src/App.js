import React from "react";
import Die from "./components/Die";
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


export default function App(){

    const [diceNumbers, setDiceNumbers] = React.useState(allNewDice)
    const [clickCounter, setClickCounter] = React.useState(0)

    const [tenzies,setTenzies] = React.useState(false)

    function allNewDice(){
        const newDice = []
        for(let i=0; i<10 ; i++){
            newDice.push(
                        {
                        id: nanoid(),
                        value: Math.round(Math.random() * (6-1) + 1 ),
                        isHeld: false
                        }
                )
        }
        return newDice
    }

    React.useEffect(() => {
        const allHeld = diceNumbers.every(die => die.isHeld)
        const number = diceNumbers[0].value
        const allSame = diceNumbers.every(die => die.value === number)
        if(allHeld && allSame){
            setTenzies(true)
        }
        else{
            setTenzies(false)
        }
    },[diceNumbers])

    function rollDice(){
        setClickCounter(prevClicks => prevClicks+1)
        if(!tenzies){
            setDiceNumbers(oldDice => oldDice.map(die => {
                return die.isHeld ? die : {...die, value: Math.round(Math.random() * (6-1) + 1 )}
            }))
        }else{
            setClickCounter(0)
            setDiceNumbers(allNewDice())
        }
    }

    function holdDice(id){
        setDiceNumbers(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    const diceElements = diceNumbers.map(die => <Die key={die.id} 
                                                     id={die.id} 
                                                     value={die.value}
                                                     isHeld={die.isHeld} 
                                                     holdDice={holdDice}
                                                />)

    return(
        <main> 
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="container">
                {diceElements}
            </div>
            <button className="roll-button" onClick={rollDice}>{tenzies ? "NewGame" : "Roll"}</button>
            <p>Rolls counter: {clickCounter}</p>
        </main>
    )
}