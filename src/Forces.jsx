import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const url = import.meta.env.VITE_APP_URL;
const Forces = () => {
    const [forces, setForces] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredForces, setFilteredForces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [forcesPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        getForces().catch(console.error);
    }, []);

    useEffect(() => {
        setFilteredForces(forces.filter(force => force.name.toLowerCase().includes(searchQuery.toLowerCase())));
    }, [searchQuery, forces]);

    const getForces = async () => {
        const response = await fetch(`${url}/forces`);
        const data = await response.json();
        data.sort((a, b) => a.name.localeCompare(b.name));
        setForces(data);
        setFilteredForces(data);
    };

    const toggleSortOrder = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        const sortedForces = [...filteredForces].sort((a, b) => newOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
        setFilteredForces(sortedForces);
    };

    const indexOfLastForce = currentPage * forcesPerPage;
    const indexOfFirstForce = indexOfLastForce - forcesPerPage;
    const currentForces = filteredForces.slice(indexOfFirstForce, indexOfLastForce);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredForces.length / forcesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ForceWrapper>
            <Title>Forces</Title>
            <SearchInput
                type="text"
                placeholder="Search forces..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
            <button onClick={toggleSortOrder}>Toggle Sort Order</button>
            {currentForces.map(force => (
                <ForceItem key={force.id}>
                    <StyledLink to={`/forces/${force.id}`} state={{ force }}>
                        {force.name}
                    </StyledLink>
                </ForceItem>
            ))}
            <Pagination>
                {pageNumbers.map(number => (
                    <PageItem key={number} onClick={() => paginate(number)}>
                        {number}
                    </PageItem>
                ))}
            </Pagination>
        </ForceWrapper>
    );
};

export default Forces;

// Styled components
const ForceWrapper = styled.div`
    text-align: left;
    margin: 20px;
`;

const Title = styled.h1`
    color: #333;
    text-align: center;
`;

const ForceItem = styled.div`
    margin: 10px 0;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    &:last-child {
        border-bottom: none;
    }
`;

const StyledLink = styled(Link)`
    color: #007bff;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const PageItem = styled.span`
    margin: 0 5px;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const SearchInput = styled.input`
    margin: 10px 0;
    padding: 10px;
    width: 100%;
    box-sizing: border-box; // Make sure padding doesn't affect the total width
`;