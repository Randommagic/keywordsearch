import React from 'react';

function KeywordStats({ keywords }) {
  const sorted = Object.entries(keywords)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50); // 최대 50개까지 표시

  if (sorted.length === 0) return null;

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>자주 등장한 키워드</h3>
      <ul style={styles.list}>
        {sorted.map(([word, count], idx) => (
          <li key={idx} style={styles.item}>
            <span style={styles.word}>{word}</span>
            <span style={styles.price}>{count}회</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px 30px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    height: '100%',
    boxSizing: 'border-box',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    color: '#444',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    padding: '12px 0',
    borderBottom: '1px solid #f0f0f0',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px',
  },
  word: {
    fontWeight: 500,
  },
  price: {
    color: '#007fff',
    fontWeight: 'bold',
  },
};

export default KeywordStats;
