import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import KeywordStats from './KeywordStats';
import ErrorModal from './ErrorModal';
import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [keywords, setKeywords] = useState({});
  const [error, setError] = useState('');

  const handleSearch = async (keyword) => {
    setError('');
    try {
      const response = await fetch(
        `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(keyword)}&display=50`,
        {
          method: 'GET',
          headers: {
            'X-Naver-Client-Id': 'iUxYoY4bMJeimLbQgmU0',
            'X-Naver-Client-Secret': 'Tgx8LUWE9g',
          },
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`HTTP ${response.status} - ${response.statusText}\n\n${errText}`);
      }

      const data = await response.json();

      const cleanedItems = data.items.map((item) => ({
        title: item.title.replace(/<[^>]*>?/g, ''),
        link: item.link,
        price: `${Number(item.lprice).toLocaleString()}원`,
      }));

      setResults(cleanedItems);

      const allWords = cleanedItems
        .flatMap((item) => item.title.split(/\s+/))
        .map((word) => word.trim().replace(/[^\w가-힣0-9]/g, ''))
        .filter((word) => word.length > 1);

      const freqMap = {};
      allWords.forEach((word) => {
        freqMap[word] = (freqMap[word] || 0) + 1;
      });

      const finalMap = {};
      const words = Object.keys(freqMap);

      words.forEach((word) => {
        const isComposite = words.some((other) => other !== word && word.includes(other) && freqMap[other] >= 2);
        if (!isComposite) {
          finalMap[word] = freqMap[word];
        }
      });

      setKeywords(finalMap);
    } catch (err) {
      console.error('에러 발생:', err);
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          marginTop: '50px',
          gap: '40px',
          width: '100%',
          maxWidth: '1300px',
        }}>
        <SearchResults items={results} />
        <KeywordStats keywords={keywords} />
      </div>

      <ErrorModal message={error} onClose={() => setError('')} />
    </div>
  );
}

export default App;
