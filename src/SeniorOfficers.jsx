import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SeniorOfficers = ({ forceId }) => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeniorOfficers = async () => {
      try {
        // Use the `forceId` prop to construct the URL
        const response = await fetch(`https://data.police.uk/api/forces/${forceId}/people`);
        const data = await response.json();
        setOfficers(data);
      } catch (error) {
        console.error('Error fetching senior officers:', error);
      } finally {
        setLoading(false);
      }
    };

    if (forceId) { // Check that `forceId` is not undefined or null
      fetchSeniorOfficers();
    }
  }, [forceId]);

  if (loading) {
    return <p>Loading senior officers...</p>;
  }

  return (
    <OfficersList>
      {officers.map((officer, index) => (
        <OfficerItem key={index}>
          <OfficerName>{officer.name}, {officer.rank}</OfficerName>
          <OfficerBio dangerouslySetInnerHTML={{ __html: officer.bio }} />
          {/* Render other details as necessary */}
        </OfficerItem>
      ))}
    </OfficersList>
  );
};

export default SeniorOfficers;

// Styled-components for the SeniorOfficers
const OfficersList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

`;

const OfficerItem = styled.article`
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 15px;
  margin-bottom: 15px;
`;

const OfficerName = styled.h3`
  color: #222;
  margin-bottom: 0.5em;
`;

const OfficerBio = styled.div`
  color: #666;
  font-size: 0.9em;
  line-height: 1.6;
  word-wrap: break-word;

  p {
    margin-bottom: 1em;
  }
`;
