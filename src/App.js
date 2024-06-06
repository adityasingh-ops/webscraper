// src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [product, setProduct] = useState('');
  const [data, setData] = useState({ amazon: [], ebay: [] });

  const fetchData = () => {
    axios.get(`http://http://127.0.0.1:5000/scrape?product=${product}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Price Comparison</h1>
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Enter product name"
        />
        <button onClick={fetchData}>Compare Prices</button>
        <div className="results">
          <h2>Amazon</h2>
          <ul>
            {data.amazon.map((item, index) => (
              <li key={index}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.title}: {item.price}
                </a>
              </li>
            ))}
          </ul>
          <h2>eBay</h2>
          <ul>
            {data.ebay.map((item, index) => (
              <li key={index}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.title}: {item.price}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
