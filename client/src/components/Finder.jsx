import React from 'react';

function Finder() {

  const colors = ['White', 'Blue', 'Black', 'Red', 'Green'];
  const types = ['Creature', 'Enchantment', 'Instant', 'Planeswalker', 'Tribal', 'Instant', 'Artifact'];

  return (
    <div id='find-container'>
      <div id='search-container'>
        <input id='search-bar' placeholder="Search by Name"></input>
        <select id='mana-select' className='find-select' name='mana-select'>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <label htmlFor='type-select' className='find-select'>
          Filter by Type
          <select id='type-select' name='type-select'>
            {types.map((type, index) => <option key={'t' + index} value={type}>{type}</option>)}
          </select>
        </label>
        <label className='find-select'>
          Filter by Color
          <select id='color-select'  name='color-select'>
            {colors.map((color, index) => <option key={'c' + index} value={color}>{color}</option>)}
          </select>
        </label>
        <label className='find-select'>
          Sorting Options
          <select id='order-select'  name='order-select'>
            <option value="Toughness">Toughness</option>
            <option value="ManaCost">Mana Cost</option>
            <option value="Newest">Newest</option>
            <option value="Rarity">Rarity</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default Finder;