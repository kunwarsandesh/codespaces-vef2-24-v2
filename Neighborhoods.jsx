import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const API_url = import.meta.env.VITE_APP_URL;

const Neighborhoods = ({ forceName, forceId }) => {
    const [neighborhoods, setNeighborhoods] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let url = `${API_url}/${forceId}/neighbourhoods`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setNeighborhoods(data);
            } catch (error) {
                console.error('Error fetching neighborhoods:', error);
            }
        };

        getData();
    }, [forceId]);

    return (
        <NeighborhoodsContainer>
            <h1>Neighborhoods {forceName} Looks After</h1>
            <NeighborhoodsList>
                {neighborhoods.map((neighborhood, index) => (
                    <NeighborhoodItem key={index}>
                        <h2>{neighborhood.name}</h2>
                        <p>ID: {neighborhood.id}</p>
                    </NeighborhoodItem>
                ))}
            </NeighborhoodsList>
        </NeighborhoodsContainer>
    );
    
};

export default Neighborhoods;

// Styled components
const NeighborhoodsContainer = styled.div`
    text-align: center;
    margin: 20px;
`;

const NeighborhoodsList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const NeighborhoodItem = styled.li`
    background-color: #f0f0f0;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
`;
