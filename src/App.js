import Die from "./components/Die";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Title from "./components/Title";
import NumsOfRolls from "./components/NumOfRolls";
import BestScore from "./components/BestScore";
import Confetti from "react-confetti";
// localStorage.clear();
function App() {
  const [dice, setDice] = useState(genereteNumbers());
  const [tenzies, setTenzies] = useState(false);
  const [counter, setCounter] = useState(0);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("best-score"))
  );

  useEffect(() => {
    let firstVal = dice[0].value;
    let isDicesFinished = dice.every(
      (dice) => dice.isHeld === true && dice.value === firstVal
    );
    if (isDicesFinished) {
      setTenzies(true);
      localStorage.setItem(
        "best-score",
        JSON.stringify(
          counter < +bestScore || bestScore == null ? counter : +bestScore
        )
      );
      setBestScore(JSON.parse(localStorage.getItem("best-score")));
      // setBestScore(()=> localStorage.getItem("best-score") > counter ? localStorage.getItem("best-score")= bestScore : localStorage.getItem("best-score")= counter)
    }
  }, [dice]);

  // function to generete the random numbers
  function genereteNumbers() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr[i] = {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };
    }
    return arr;
  }
  function getId(id) {
    setDice((prevDice) => {
      return prevDice.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      );
    });
  }
  let allDices = dice.map((dice) => (
    <Die
      value={dice.value}
      key={dice.id}
      isHeld={dice.isHeld}
      getId={() => getId(dice.id)}
    />
  ));
  function rollDices() {
    let newArray = genereteNumbers();
    if (tenzies) {
      setDice(newArray);
      setTenzies(false);
      setCounter(0);
    } else {
      setDice((prevDice) => {
        return prevDice.map((dice, i) => {
          return dice.isHeld ? dice : { ...newArray[i] };
        });
      });
      setCounter((prev) => ++prev);
    }
  }
  return (
    <React.Fragment>
      {tenzies && <Confetti />}
      <div className="extras">
        <NumsOfRolls counter={counter} />
        <BestScore score={bestScore} />
      </div>
      <main>
        <Title />
        <div className="container">{allDices}</div>
        <button className="roll-dice" onClick={rollDices}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </React.Fragment>
  );
}

export default App;
