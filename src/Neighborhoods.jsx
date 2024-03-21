import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const API_url = import.meta.env.VITE_APP_URL;

const Neighborhoods = ({ forceName, forceId }) => {
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Adjust the number of items per page as needed

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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNeighborhoods = neighborhoods.slice(indexOfFirstItem, indexOfLastItem);

    const totalPageNumbers = Math.ceil(neighborhoods.length / itemsPerPage);

    const renderPageNumbers = () => {
        let pages = [];
        for (let i = 1; i <= totalPageNumbers; i++) {
            pages.push(
                <PageNumber key={i} onClick={() => setCurrentPage(i)} isActive={currentPage === i}>
                    {i}
                </PageNumber>
            );
        }
        return pages;
    };

    return (
        <NeighborhoodsContainer>
            <h1>{forceName} looks after these listed Neighbourhoods.</h1>
            <NeighborhoodsList>
                {currentNeighborhoods.map((neighborhood, index) => (
                    <NeighborhoodItem key={index}>
                        <h2>{neighborhood.name}</h2>
                        <p>ID: {neighborhood.id}</p>
                    </NeighborhoodItem>
                ))}
            </NeighborhoodsList>
            <Pagination>
                {currentPage > 1 && (
                    <PaginationButton onClick={() => setCurrentPage(1)}>
                        First
                    </PaginationButton>
                )}
                {currentPage > 1 && (
                    <PaginationButton onClick={() => setCurrentPage(currentPage - 1)}>
                        Prev
                    </PaginationButton>
                )}

                {renderPageNumbers()}

                {currentPage < totalPageNumbers && (
                    <PaginationButton onClick={() => setCurrentPage(currentPage + 1)}>
                        Next
                    </PaginationButton>
                )}
                {currentPage < totalPageNumbers && (
                    <PaginationButton onClick={() => setCurrentPage(totalPageNumbers)}>
                        Last
                    </PaginationButton>
                )}
            </Pagination>
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

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const PaginationButton = styled.button`
    padding: 10px;
    margin: 0 5px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background-color: #0056b3;
    }
`;


const PageNumber = styled.span`
    padding: 10px;
    margin: 0 5px;
    cursor: pointer;
    background-color: ${props => props.isActive ? '#007bff' : 'transparent'};
    color: ${props => props.isActive ? 'white' : '#007bff'};
    border-radius: 5px;

    &:hover {
        background-color: ${props => props.isActive ? '#0056b3' : '#e2e6ea'};
        color: ${props => props.isActive ? 'white' : '#007bff'};
    }
`;