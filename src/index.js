import React from 'react';
import { createRoot } from 'react-dom/client';
import { JournalApp } from './JournalApp';
import './styles/styles.scss';

const divRoot = document.getElementById('root');
const root = createRoot(divRoot)

root.render(
  <React.StrictMode>
    <JournalApp />
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
