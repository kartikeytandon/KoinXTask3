import React, { useState } from 'react';
import axios from 'axios';
import './Crypto.css';

const Crypto = () => {
  const [companies, setCompanies] = useState([])
  const [coin, setCoin] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://helpful-duck-raincoat.cyclic.app/cryptoCompanies?coin=${coin}`);
      setCompanies(response.data.companies);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setError("This coin is not supported, try either of bitcoin or ethereum")
    }
  };

  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            Coin:
            <input type="text" value={coin} onChange={(e) => setCoin(e.target.value)} />
          </label>
          <button type="submit">Get Companies</button>
        </form>
      </div>
      <ul className="company-list">
        {companies.length > 0 ? (
          <>
            <h1>These companies hold {coin}</h1>
            {companies.map(company => (
              <li key={company.symbol}>{company.name}</li>
            ))}
          </>
        ) : (
          <li>{error}</li>
        )}
      </ul>
    </div>
  );
};

export default Crypto;