import './App.css';
import * as _appService from '../../Services/App-Service.js';
import React, { useState } from 'react';

const App = () => {
  // State Hooks
  let [items, setItems] = useState(null);

  // Hook Handlers
  const fetchInitialItems = async () => {
    const resp = await _appService.GetInitial();
    setItems(resp);
  }

  const fetchItem = async event => {
    const itemId = event.target.dataset.itemId
    let tempList = [...items]

    const resp = await _appService.GetItem(itemId);

    AddItemToList(tempList, resp);

    setItems(tempList);
  }

  const combineItems = async _ => {
    let tempList = [...items];

    let stickIndex = FindIndexOfItem(tempList, 0)
    if (stickIndex === -1)
      return;

    let stick = tempList[stickIndex];
    if (stick.quantity < 1) {
      return;
    }

    let stoneIndex = FindIndexOfItem(tempList, 1)
    if (stoneIndex === -1)
      return;

    let stone = tempList[stoneIndex];
    if (stone.quantity < 1) {
      return;
    }

    stick.quantity--;
    stone.quantity--;

    const resp = await _appService.CombineItems();
    
    AddItemToList(tempList, resp);

    cleanUp(tempList);
    setItems(tempList);
  }

  const dismantle = async event => {
    const itemId = event.target.dataset.itemId
    let tempList = [...items];
    
    const itemIndex = FindIndexOfItem(tempList, parseInt(itemId));
    
    console.log(itemIndex)
    if (itemIndex === -1) {
      return;
    }

    const resp = await _appService.Dismantle(itemId);
    if (!resp)
      return;
    console.log(resp)
      
    tempList[itemIndex].quantity--
    AddItemsToList(tempList, resp);
    cleanUp(tempList);
    setItems(tempList);
  }

  const cleanUp = tempList => {
    for (let i = 0; i < tempList.length; i++) {
      if (tempList[i].quantity <= 0) {
        tempList.splice(i--, 1)
      }
    }

    if (!tempList.length)
      tempList = [];
  }

  // Return JSX
  return (
    <div className="App">
      <header className="App-header">
        <div className="actions">
          <h1>Actions</h1>
          <button onClick={fetchInitialItems}>Get Initial Items</button>
          <button onClick={fetchItem} data-item-id="0">Gather Sticks</button>
          <button onClick={fetchItem} data-item-id="1">Gather Stones</button>
          <button onClick={combineItems}>Combine 1 stick and 1 stone</button>
        </div>
        <div className="inventory">
          <h1>Inventory</h1>
          <ul className="items">
            {items?.map(({id, name, quantity}) => {
              return (
                <li key={id}>
                  <div>{ name }</div>
                  <span>Quantity: { quantity }</span>
                  <div>
                    <button onClick={dismantle} data-item-id={id}>dismantle {name}</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </header>
    </div>
  )
}

const AddItemsToList = (arr, items) => {
  for (let item of items) {
    let index = FindIndexOfItem(arr, item.id);

    if (index === -1)
      arr.push(item);
    else
      arr[index].quantity += item.quantity;
  }
}

const AddItemToList = (arr, item) => {
  let index = FindIndexOfItem(arr, item.id);

  if (index === -1)
    arr.push(item);
  else
    arr[index].quantity += item.quantity;
}

const FindIndexOfItem = (arr, itemId) => {
  return arr.findIndex(i => i.id === itemId);
}

export default App;
