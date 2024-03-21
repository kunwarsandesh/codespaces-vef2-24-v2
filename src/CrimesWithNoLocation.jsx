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
        {/* Your form elements here */}
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

export default CrimesWithNoLocation;