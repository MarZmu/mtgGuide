/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { PropTypes } from 'prop-types';

function Finder({user}) {

  const costs = ['Select', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const colors = ['Select', 'White', 'Blue', 'Black', 'Red', 'Green'];
  const types = ['Select', 'Creature', 'Enchantment', 'Instant', 'Planeswalker', 'Tribal', 'Instant', 'Artifact'];
  const sorts = ['Select', 'Toughness', 'Power', 'Mana Cost', 'Newest', 'Rarity'];
  const filters = {'colors': 'Select', 'type': 'Select', 'cmc': 'Select', 'name': ''};
  const orderKeys = { 'Mana Cost': 'cmc', 'Power': 'power', 'Toughness': 'toughnes', 'Newest': 'createdAt'};

  var [cards, setCards] = useState([]);
  const [order, setOrder] = useState('');
  const [displayCard, setDisplayCard] = useState();
  const [local, setLocal] = useState(false);

  useEffect(
    () => {
      setCards(orderCards(cards));
    },
    []
  );

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
  const buildUrl = (e) => {
    setDisplayCard(null);
    var endpoint = [];
    _.each(filters, (val, key) => {
      if (val !== 'Select' && val !== '') {
        endpoint.push(`${key}=${val}`);
      }
    });
    if (e.target.id === 'api') {
      setLocal(false);
      endpoint = url + endpoint.join('&');
      getCards(endpoint, null);
    } else {
      setLocal(true);
      endpoint = endpoint.join('&');
      console.log('local', endpoint);
      getCards(null, endpoint);
    }
  };

  //takes endpoint from buildUrl, fetches cards and puts top 9 in state
  const getCards = (api, localep) => {
    if (api) {
      console.log(api);
      axios.get(api)
        .then(({ data }) => {
          console.log(data);
          setCards(data.cards.slice(0, 50));
        });
    } else {
      console.log(user, localep);
      axios.get(`/Cards/${user}/?${localep}`)
        .then(({data}) => {
          data.map((card) => card.createdAt = new Date(card.createdAt));
          console.log(data[0]);
          setCards(data.slice(0, 50));
        });
    }
  };

  const orderCards = (criteria) => {
    setOrder(criteria);
    console.log(order, cards);
    const how = orderKeys[criteria];
    console.log(how);
    cards = cards.sort((a, b) => (a[how] - b[how]));
    return cards;
  };


  //confirms user wants to add card to database
  const addCardPrompt = (card) => {
    const addCard = confirm(` ${user}. Add this card to your collection?`);
    if (addCard) {
      axios.post(`/Cards/${user}`, {card});
    }
  };

  const favorite = (card) => {
    const removeCard = confirm(` ${user}. Remove this card from your collection?`);
    console.log(card);
    if (removeCard) {
      axios.delete(`/Cards/${user}/${card.cardid}`);
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
            onChange={(e) => orderCards(e.target.value)}>
            {sorts.map((sort, index) => <option key={'s' + index} value={sort}>{sort}</option>)}
          </select>
        </label>
      </div>
      <button id='local' onClick={(e) => buildUrl(e)}>Search My Cards</button>
      <button id='api' onClick={(e) => buildUrl(e)}>Search Online</button>
      <div id='card-container'>
        {displayCard && <img
          id='display-card'
          src={displayCard.imageUrl}
          alt={displayCard.name}></img>}
        {/* Future: render a star on cards already owned in DB  */}
        {cards.slice(0, 10).map((card, index) => (<img
          key={card.id}
          className={local ? 'lcard' : 'card'}
          id={'cd' + index}
          src={card.imageUrl}
          alt={card.name}
          onClick={ local ? (e) => favorite(card) : (e) => addCardPrompt(card)}
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