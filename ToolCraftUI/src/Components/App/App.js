import './App.css';
import * as _appService from '../../Services/App-Service.js';
import React, { useState } from 'react';

const App = () => {
  // State Hooks
  const maxInventorySize = 20;
  let [items, setItems] = useState([]);

  const fetchItem = async event => {
    if (items.length === maxInventorySize)
      return

    const itemId = event.target.dataset.itemId
    let tempList = [...items]

    const resp = await _appService.GetItem(itemId);

    tempList = GetCombinedLists(tempList, resp);

    setItems(tempList);
  }

  const combineItems = async _ => {
    let tempList = [...items];

    let stickIndex = FindIndexOfItem(tempList, 0)
    if (stickIndex === -1)
      return;

    tempList.splice(stickIndex, 1);
    
    let stoneIndex = FindIndexOfItem(tempList, 1)
    if (stoneIndex === -1)
    return;
    
    tempList.splice(stoneIndex, 1);

    const resp = await _appService.CombineItems();
    
    AddItemToList(tempList, resp);
    setItems(tempList);
  }

  const dismantle = async event => {
    const itemId = event.target.dataset.itemId
    const itemIndex = event.target.dataset.index;
    let tempList = [...items];
    
    const resp = await _appService.Dismantle(itemId);
    if (!resp)
      return;

    if (resp.length + items.length - 1 > maxInventorySize)
      return;
    
    tempList.splice(itemIndex, 1);
    tempList = GetCombinedLists(tempList, resp);
    setItems(tempList);
  }

  const GetCombinedLists = (arr, items) => {
    return arr.concat(items);
  }

  const AddItemToList = (arr, item) => {
    arr.push(item);
  }

  const FindIndexOfItem = (arr, itemId) => {
    return arr.findIndex(i => i.id === itemId);
  }

  // Return JSX
  return (
    <div className="App">
      <header className="App-header">
        <div className="container actions-container">
          <h1>Actions</h1>
          <button onClick={fetchItem} data-item-id="0">Gather Sticks</button>
          <button onClick={fetchItem} data-item-id="1">Gather Stones</button>
          <button onClick={combineItems}>Combine 1 stick and 1 stone</button>
        </div>
      </header>
      <main>
        <div className="inventory container">
          <h1>Inventory: {items?.length}/20</h1>
          <ul className="items row row-cols-4">
            {items?.map(({id, name}, index) => {
              return (
                <li key={index} data-index={index} className="col p-4">
                  <div className="border border-dark p-3 justify-content-center rounded">
                    <div className="row">
                      <span className="d-flex justify-content-end"><i className="fas fa-recycle btn btn-primary" onClick={dismantle} data-item-id={id}></i></span>
                    </div>
                    <div className="row">
                      <span className="d-flex justify-content-center fs-4">{ name }</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      <footer>
        <span class="fixed-bottom d-flex justify-content-center">&copy; KodingKamp 2020</span>
      </footer>
    </div>
  )
}

export default App;
