
import './Board.css';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { v4 as uuidv4, v4 } from 'uuid';
import Card from './Card';

function Board() {
const [cards, setCards] = useState(0);
const [shuffledDeck, setShuffledDeck] = useState([]);
const [clickedShuffle, setClickedShuffle] = useState(false);
const [shuffle, setShuffle] = useState(0);
const deckId = useRef('new');


useEffect(() => {
  async function getShuffledDeckId(){
    const results = await axios.get(`http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
    deckId.current = results.data.deck_id;
  }
  getShuffledDeckId();
},[]);

  useEffect(() => {
    if(deckId.current !== 'new' && clickedShuffle === false){
      if(cards >= 52){
        alert("No cards remaining!");
      } else {      
      async function getCard(){
        const results = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`);        
        const cardImg = results.data.cards[results.data.cards.length - 1].image;
        console.log(results);
        setShuffledDeck(shuffledDeck => [...shuffledDeck, {img: cardImg, id: uuidv4() }])
      }
      getCard();
    }
  }    
  },[cards]);

  useEffect(() => {
    if(deckId.current !== 'new'){
    async function shuffleDeck(){
      setShuffledDeck([]);
      setClickedShuffle(true);
      setCards(0);
      const results = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId.current}/shuffle/`);
      
      setClickedShuffle(false);
    }
    shuffleDeck()
  }
  },[shuffle]);


  function drawCard(){
    setCards(cards => cards + 1);
  }

  function shuffleCards(){
    setShuffle(shuffle => shuffle + 1);
  }



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



  return (
    <div className="Board">
    {clickedShuffle ? null : 
    <div>
    <button onClick={drawCard}>Draw Card</button>
    <button onClick={shuffleCards}>Shuffle Cards</button>
    </div>
    }
    {cardImgs}      
    </div>
  );
}


export default Board;
