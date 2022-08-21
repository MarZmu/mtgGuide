/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { PropTypes } from 'prop-types';

function Finder({user}) {

  const costs = ['Select', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const colors = ['Select', 'White', 'Blue', 'Black', 'Red', 'Green'];
  const types = ['Select', 'Creature', 'Enchantment', 'Instant', 'Planeswalker', 'Tribal', 'Instant', 'Artifact'];
  const sorts = ['Select', 'Toughness', 'Mana Cost', 'Newest', 'Rarity'];
  const filters = {'colors': 'Select', 'type': 'Select', 'cmc': 'Select', 'name': ''};

  const [cards, setCards] = useState([]);
  const [order, setOrder] = useState('');
  const [displayCard, setDisplayCard] = useState();

  var url = 'https://api.magicthegathering.io/v1/cards/?contains=imageUrl&';

  //throttle / debounce searchbar

  //puts selected filters in state
  const onChange = (e) => {
    const key = e.target.id;
    var val = e.target.value;
    if (val === 'Select') {
      val = '';
    }
    filters[key] = val;
  };

  //creates endpoint from set filters
  const buildUrl = () => {
    var endpoint = [];
    _.each(filters, (val, key) => {
      if (val !== 'Select' && val !== '') {
        endpoint.push(`${key}=${val}`);
      }
    });
    endpoint = url + endpoint.join('&');
    // endpoint = endpoint.join('&');
    getCards(endpoint);
  };

  const orderCards = (cards) => {
    console.log(order, cards);
    cards = cards.sort((a, b) => (a[order] - b[order]));
    return cards;
  };

  //takes endpoint from buildUrl, fetches cards and puts top 9 in state
  const getCards = (endpoint) => {
    axios.get(endpoint)
    // axios.get(`/Cards?${endpoint}`)
      // .then((res) => console.log(res));
      .then(({ data }) => {
        data = (order ? orderCards(data.cards) : data.cards);
        // data = data.cards.sort((a, b) => (a.order > b.order));
        // console.log(data.sort((a, b) => a.order < b.order));
        setCards(data.slice(0, 9));
      });
  };



  //confirms user wants to add card to database
  const addCardPrompt = (card) => {
    const addCard = confirm(` ${user}. Add this card to your collection?`);
    if (addCard) {
      axios.post(`/Cards/${user}`, {card});
    }
  };

  return (
    <div id='find-container'>
      <div id='search-container'>
        <input
          id='name'
          placeholder="Search by Name"
          onChange={(e) => onChange(e)}>
        </input>
        <label className='find-select'>
          Filter by Cost
          <select
            id='cmc'
            name='mana'
            onChange={(e) => onChange(e)}>
            {costs.map((num, index) => <option key={'n' + index} value={num}>{num}</option>)}
          </select>
        </label>
        <label className='find-select'>
          Filter by Type
          <select
            id='type'
            name='type'
            onChange={(e) => onChange(e)}>
            {types.map((type, index) => <option key={'t' + index} value={type}>{type}</option>)}
          </select>
        </label>
        <label className='find-select'>
          Filter by Color
          <select
            id='colors'
            name='colors'
            onChange={(e) => onChange(e)}>
            {colors.map((color, index) => <option key={'c' + index} value={color}>{color}</option>)}
          </select>
        </label>
        <label className='find-select'>
          Sorting Options
          <select
            id='order'
            name='order'
            onChange={(e) => setOrder(e.target.value)}>
            {sorts.map((sort, index) => <option key={'s' + index} value={sort}>{sort}</option>)}
          </select>
        </label>
      </div>
      <button id='search-button' onClick={buildUrl}>Search Cards</button>
      <div id='card-container'>
        {displayCard && <img
          id='display-card'
          src={displayCard.imageUrl}
          alt={displayCard.name}></img>}
        {/* Future: render a star on cards already owned in DB  */}
        {cards.map((card, index) => (<img
          key={card.id}
          className='card'
          id={'cd' + index}
          src={card.imageUrl}
          alt={card.name}
          onClick={(e) => addCardPrompt(card)}
          onMouseEnter={(e) => setDisplayCard(card)}>
        </img>)
        )}
      </div>
    </div>
  );
}

export default Finder;


Finder.propTypes = {
  user: PropTypes.number
};