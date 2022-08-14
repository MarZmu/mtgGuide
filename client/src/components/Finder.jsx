import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

function Finder() {

  const costs = ['Select', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const colors = ['Select', 'White', 'Blue', 'Black', 'Red', 'Green'];
  const types = ['Select', 'Creature', 'Enchantment', 'Instant', 'Planeswalker', 'Tribal', 'Instant', 'Artifact'];
  const sorts = ['Select', 'Toughness', 'Mana Cost', 'Newest', 'Rarity'];
  const filters = {'colors': 'Select', 'type': 'Select', 'mana': 'Select', 'name': ''};

  const [display, setDisplay] = useState([]);
  const [order, changeOrder] = useState('');


  var url = 'https://api.magicthegathering.io/v1/cards/?';

  //throttle / debounce searchbar

  const buildUrl = () => {
    //adjusts url based on filters;
    var endpoint = [];
    _.each(filters, (val, key) => {
      if (val !== 'Select' && val !== '') {
        endpoint.push(`${key}=${val}`);
      }
    });
    endpoint = url + endpoint.join('&');
    getCards(endpoint);

  };

  const getCards = (endpoint) => {
    axios.get(endpoint)
      .then(({data}) => {
        data = data.cards.sort((a, b) => (a.power > b.power));
        console.log(data.sort((a, b) => a.cmc < b.cmc));
        setDisplay(data.slice(0, 9));
      });
  };

  const onChange = (e) => {
    const key = e.target.id;
    var val = e.target.value;
    if (val === 'Select') {
      val = '';
    }
    filters[key] = val;
  };

  const addCardPrompt = (card) => {
    const addCard = confirm('Add this card to your collection?');
    if (addCard) {
      // axios.post();
      console.log('cardSaved');
    }
    console.log(card);
  }

  return (
    <div id='find-container'>
      <div id='search-container'>
        <button onClick={buildUrl}></button>
        <input id='name' placeholder="Search by Name" onChange={(e) => onChange(e)}></input>
        <label className='find-select'>
          Filter by Cost
          <select id='mana' name='mana' onChange={(e) => onChange(e)}>
            {costs.map((num, index) => <option key={'n' + index} value={num}>{num}</option>)}
          </select>
        </label>
        <label className='find-select'>
          Filter by Type
          <select id='type' name='type' onChange={(e) => onChange(e)}>
            {types.map((type, index) => <option key={'t' + index} value={type}>{type}</option>)}
          </select>
        </label>
        <label className='find-select'>
          Filter by Color
          <select id='colors'  name='colors' onChange={(e) => onChange(e)}>
            {colors.map((color, index) => <option key={'c' + index} value={color}>{color}</option>)}
          </select>
        </label>
        <label className='find-select'>
          Sorting Options
          <select id='order'  name='order' onChange={(e) => changeOrder(e.target.value)}>
            {sorts.map((sort, index) => <option key={'s' + index} value={sort}>{sort}</option>)}
          </select>
        </label>
      </div>
      {/* should make it render a card when it is hovered rather than move the card */}
      <div id='card-container'>
        {display.map((card, index) => (<img key={card.id} className='card' id={'cd' + index} src={card.imageUrl} alt={card.name} onClick={(e) => addCardPrompt(card)}></img>))}
      </div>
    </div>
  );
}

export default Finder;