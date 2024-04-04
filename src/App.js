import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Đảm bảo đường dẫn đến file CSS là chính xác

const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'DoAnA_LTT',
  password: '123456789',
  database: 'xedap'
});

connection.connect(function(err){
  (err) ? console.log(err) : console.log(connection);
});

app.get('/api/news', (req, res) => {
  res.json({ message: 'I am a message from Server!'});
});

app.listen(4000, () => console.log('App listening on port 4000'));


const App = () => {
  const [sensorData, setSensorData] = useState({ value: '',});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://192.168.1.4:8081/all');
        // Giả sử API trả về mảng và bạn muốn lấy phần tử cuối cùng
        const latestData = response.data[response.data.length - 1];
        setSensorData({
          value: latestData.value,
      
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
    // Cập nhật dữ liệu mỗi 5 giây
    const interval = setInterval(fetchData, 500);
    return () => clearInterval(interval);
  }, []);


  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Xe Dap</h1>
      </header>

      <footer>
      
      </footer>

      <main>
        <h2>Products</h2>
        <ul className="product-list">
          <li className="product">
            <span className="product-name">Product 1</span>
            <span className="product-price">$10</span>
          </li>
          <li className="product">
            <span className="product-name">Product 2</span>
            <span className="product-price">$15</span>
          </li>
          {/* Add more products as needed */}
        </ul>
      </main>
    </div>

  //  <body>
  //     {/* <section id="header">
  //       <a href="@"><img src="    " class="logo" alt="" ></a>

  //     </section> */}
  //     <div>
  //       <ul id="nav">
  //         <li> <a href="shop.html">Danh Muc</a> </li>
  //         <li> <a href="shop.html">BLOG</a> </li>
  //         <li> <a href="shop.html">Shop</a> </li>
  //         <li> <a href="shop.html">Shop</a> </li>
  //         <li> <a href="shop.html">Shop</a> </li>
  //         <li> <a href="shop.html">Shop</a> </li>
  //         <li> <a href="shop.html">Shop</a> </li>
  //       </ul>
  //     </div>
  //  </body>

  );
};

export default App;