import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './components/App.jsx';
import './styles.css';

const root = createRoot(document.getElementById('root'));

root.render(<App />);
