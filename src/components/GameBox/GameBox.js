import React from "react";
import Images from "../Images";

import "./GameBox.css";

const GameBox = (props) => {
  const { cards, handleClick, selectedCardOne, selectedCardTwo, disableCardSelection } = props;
  
  // console.log("flipped in gamebox",flipped);
  const handleCardClick = (card) => {
    if(!disableCardSelection) {
      handleClick(card);
    }
  }

  return(
    <div className="outer-box flex flex-direction-row justify-content-center">
      {cards.map(card => {
        return(
          <div 
            className={`each-card justify-content-center align-items-center flex-dirextion-column ${(selectedCardOne == card || selectedCardTwo == card || card.matched) ? "flipped" : "" }`}
            key={card.id}
          >
            <img 
              src={Images.bgImage} 
              className={`bg-image back ${(selectedCardOne == card || selectedCardTwo == card || card.matched) ? "bottom" : "top" }`}
              onClick={()=>handleCardClick(card)}
              />
            <div 
              className={`front ${(selectedCardOne == card || selectedCardTwo == card || card.matched) ? "top" : "bottom" }`}
              >
                {card.title}
              </div>
          </div>
        )
      })}
    </div>
  )
;}

export default GameBox;