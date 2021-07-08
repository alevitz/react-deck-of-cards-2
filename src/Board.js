
import './Board.css';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { v4 as uuidv4, v4 } from 'uuid';
import Card from './Card';

function Board() {
const [cards, setCards] = useState(0);
const [shuffledDeck, setShuffledDeck] = useState([]);
const deckId = useRef('new');


useEffect(() => {
  async function getShuffledDeckId(){
    const results = await axios.get(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
    console.log(results);
    deckId.current = results.data.deck_id;
  }
  getShuffledDeckId();
},[]);

  useEffect(() => {
    if(deckId.current !== 'new'){
      if(cards >= 52){
        alert("No cards remaining!");
      } else {      
      async function getCard(){
        const results = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`);
        console.log(results);
        const cardImg = results.data.cards[results.data.cards.length - 1].image;
        
        setShuffledDeck(shuffledDeck => [...shuffledDeck, {img: cardImg, id: uuidv4() }])
      }
      getCard();
    }
  }    
  },[cards]);

const cardImgs = shuffledDeck.map(card => {
  return(
    <div className="cards">
    <Card 
    image={card.img}
    key={card.id}   
    />
    </div>
  )
})



function drawCard(){
  setCards(cards => cards + 1);
}



  return (
    <div className="Board">
    <button onClick={drawCard}>Draw Card</button>
    {cardImgs}      
    </div>
  );
}


export default Board;
