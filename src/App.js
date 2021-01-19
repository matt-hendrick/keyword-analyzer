import React from 'react';
import './App.css';

import KeywordAnalyzer from './containers/KeywordAnalyzer/KeywordAnalyzer';

function App() {
  window.gtag('config', process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, {
    page_title: document.title,
    page_path: window.location.pathname + window.location.search,
  });
  return <KeywordAnalyzer />;
}

export default App;
