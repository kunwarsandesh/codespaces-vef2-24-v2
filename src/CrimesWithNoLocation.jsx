import React, { useState } from 'react';
import styled from 'styled-components';
const API_url = import.meta.env.VITE_APP_URL;



const CrimesWithNoLocation = ({ forceId }) => {
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('all-crime');
    const [crimes, setCrimes] = useState(null);

    const categories = [
        { url: 'all-crime', name: 'All crime' },
        { url: 'anti-social-behaviour', name: 'Anti-social behaviour' },
        { url: 'bicycle-theft', name: 'Bicycle theft' },
        { url: 'burglary', name: 'Burglary' },
        { url: 'criminal-damage-arson', name: 'Criminal damage and arson' },
        { url: 'drugs', name: 'Drugs' },
        { url: 'other-theft', name: 'Other theft' },
        { url: 'possession-of-weapons', name: 'Possession of weapons' },
        { url: 'public-order', name: 'Public order' },
        { url: 'robbery', name: 'Robbery' },
        { url: 'shoplifting', name: 'Shoplifting' },
        { url: 'theft-from-the-person', name: 'Theft from the person' },
        { url: 'vehicle-crime', name: 'Vehicle crime' },
        { url: 'violent-crime', name: 'Violence and sexual offences' },
        { url: 'other-crime', name: 'Other crime' },
    ];



    const handleSubmit = async (event) => {
        event.preventDefault();
        let url = `${API_url}/crimes-no-location?category=${category}&force=${forceId}`;
        if (date) url += `&date=${date}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json(); // Directly parse the response as JSON
            setCrimes(data);
        } catch (error) {
            console.error('Error fetching crimes with no location:', error);
        }
    };


    return (
        <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date (optional):</label>
        <input 
          type="month" 
          id="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="category">Category:</label>
        <select 
          id="category" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.url} value={cat.url}>{cat.name}</option>
          ))}
        </select>
        <button type="submit">Fetch Crimes</button>
      </form>
            {crimes && (
                <ul>
                    {crimes.map((crime, index) => (
                        <li key={index}>
                            <h3>Crime ID: {crime.id}</h3>
                            <p>Category: {crime.category}</p>
                            <p>Outcome: {crime.outcome_status?.category || 'N/A'}</p>
                            <p>Date of Outcome: {crime.outcome_status?.date || 'N/A'}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};



const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 5px;
`;

const Select = styled.select`
  padding: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const CrimeList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CrimeItem = styled.li`
  background-color: #f0f0f0;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
`;

const CrimeHeader = styled.h3`
  margin: 0;
  color: #333;
`;

const CrimeDetail = styled.p`
  margin: 5px 0;
`;

export default CrimesWithNoLocation;