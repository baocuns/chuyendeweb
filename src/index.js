import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { RoutedContent } from './routes/index'
import AppLayout from './layout/default';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AppLayout>
      <RoutedContent />
    </AppLayout>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
