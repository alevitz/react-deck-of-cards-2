
// import './Board.css';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';

function Board() {
const [cards, setCards] = useState(0);
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
      async function getCard(){
        const results = await axios.get(`http://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`);
        console.log(results);
        // setDeckId(results.data.deck_id);
      }
      getCard();
    }    
  },[cards]);




function drawCard(){
  setCards(cards => cards + 1);
}



  return (
    <div className="Board">
    <button onClick={drawCard}>Draw Card</button>      
    </div>
  );
}


export default Board;
