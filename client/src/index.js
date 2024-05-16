import React from 'react';
import ReactDOM from 'react-dom/client';
// import './Style/home.css';
// import './Style/filter.css';
// import Homepage from './home';
import './Pages/home';
// import App from './App';
import Router from './Pages/route';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
