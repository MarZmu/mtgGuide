// import React from 'react';

// function Display({ addCardPrompt, setDisplayCard, displayCard, buildUrl, setOrder, cards, sorts, colors, types, costs, onChange }) {



//   return (
//     <div id='find-container'>
//       <div id='search-container'>
//         <input
//           id='name'
//           placeholder="Search by Name"
//           onChange={(e) => onChange(e)}>
//         </input>
//         <label className='find-select'>
//           Filter by Cost
//           <select
//             id='cmc'
//             name='mana'
//             onChange={(e) => onChange(e)}>
//             {costs.map((num, index) => <option key={'n' + index} value={num}>{num}</option>)}
//           </select>
//         </label>
//         <label className='find-select'>
//           Filter by Type
//           <select
//             id='type'
//             name='type'
//             onChange={(e) => onChange(e)}>
//             {types.map((type, index) => <option key={'t' + index} value={type}>{type}</option>)}
//           </select>
//         </label>
//         <label className='find-select'>
//           Filter by Color
//           <select
//             id='colors'
//             name='colors'
//             onChange={(e) => onChange(e)}>
//             {colors.map((color, index) => <option key={'c' + index} value={color}>{color}</option>)}
//           </select>
//         </label>
//         <label className='find-select'>
//           Sorting Options
//           <select
//             id='order'
//             name='order'
//             onChange={(e) => setOrder(e.target.value)}>
//             {sorts.map((sort, index) => <option key={'s' + index} value={sort}>{sort}</option>)}
//           </select>
//         </label>
//       </div>
//       <button id='search-button' onClick={buildUrl}>Search Cards</button>
//       <div id='card-container'>
//         {displayCard && <img
//           id='display-card'
//           src={displayCard.imageUrl}
//           alt={displayCard.name}></img>}
//         {/* Future: render a star on cards already owned in DB  */}
//         {cards.map((card, index) => (<img
//           key={card.id}
//           className='card'
//           id={'cd' + index}
//           src={card.imageUrl}
//           alt={card.name}
//           onClick={(e) => addCardPrompt(displayCard)}
//           onMouseEnter={(e) => setDisplayCard(card)}>
//         </img>)
//         )}
//       </div>
//     </div>
//   );

// }

// export default Display;

{/* <Display
addCardPrompt={addCardPrompt}
setDisplayCard={setDisplayCard}
displayCard={displayCard}
buildUrl={buildUrl}
setOrder={setOrder}
cards={cards}
sorts={sorts}
colors={colors}
types={types}
costs={costs}
onChange={onChange}/> */}