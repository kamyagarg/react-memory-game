import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

import GameBox from "./components/GameBox/GameBox.js"
import "./components/css/global.css"

const cardAlphabets = [
  {
    title: 'A',
    matched: false,
  },
  {
    title: 'B',
    matched: false,
  },
  {
    title: 'C',
    matched: false,
  },
  {
    title: 'D',
    matched: false,
  },
  {
    title: 'E',
    matched: false,
  },
  {
    title: 'F',
    matched: false,
  },
  {
    title: 'G',
    matched: false,
  },
  {
    title: 'H',
    matched: false,
  },
];

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState();
  const [choiceTwo, setChoiceTwo] = useState();
  const [selectedCard, setSelectedCard] = useState();
  const [totalMatched, setTotalMatched] = useState(0);
  const [disableClick, setDisableClick] = useState();

  useEffect(() => {
    shuffleAlphabets();
  }, []);

  useEffect(() => {
    if (totalMatched == 8) {
      alert("YAYAY! YOU DID IT!!");
    }
  }, [totalMatched]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisableClick(true);
      if (choiceOne.title == choiceTwo.title) {
        compareSelectedCards();
        resetTurns();
      } else {
        setTimeout(() => resetTurns(), 500);
      }
    }
  }, [choiceOne, choiceTwo])

  useEffect(() => {
    window.onbeforeunload = confirmExit;
    function confirmExit() {
      return "Are you sure want to leave?";
    }
  }, [])

  const shuffleAlphabets = () => {
    const shuffledAlphabets = [...cardAlphabets, ...cardAlphabets]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledAlphabets);
    setTurns(0);
    setTotalMatched(0);
  }

  const handleClickFun = (card) => {
    setSelectedCard(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  const compareSelectedCards = () => {
    setCards(prevCards => {
      return prevCards.map(card => {
        if (card.title == choiceTwo.title) {
          setTotalMatched(totalMatched + 1);
          return { ...card, matched: true }
        } else {
          return card;
        }
      })
    })
  }

  const resetTurns = () => {
    setChoiceTwo();
    setChoiceOne();
    setTurns(turns + 1);
    setDisableClick(false);
  }

  console.log("cards", cards);
  return (
    <div className="App flex justify-content-center align-items-center flex-dirextion-column">
      <header
        className='header flex align-items-center justify-content-center'
      >
        Memory Game
      </header>
      <button 
        onClick={() => shuffleAlphabets()} 
        className="reset-button cursor-pointer"
      >
        Reset Game
      </button>
      <GameBox
        cards={cards}
        handleClick={handleClickFun}
        selectedCardOne={choiceOne}
        selectedCardTwo={choiceTwo}
        disableCardSelection={disableClick}
      />
      <div className='flex bottom-area align-items-center'>
        <div className='total-turns'>Total Turns: {turns}</div>
        <div className='total-matches'>Total Matches: {totalMatched}</div>
      </div>
    </div>
  );
}

export default App;
