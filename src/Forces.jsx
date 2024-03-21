import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const url = import.meta.env.VITE_APP_URL;

const Forces = () => {
    const [forces, setForces] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [forcesPerPage] = useState(10); // Adjust as needed
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending

    useEffect(() => {
        getForces().catch(console.error);
    }, []);

    const getForces = async () => {
        const response = await fetch(`${url}/forces`);
        const data = await response.json();
        setForces(data);
    };

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Toggle sort order
    const toggleSortOrder = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        const sortedForces = [...forces].sort((a, b) => {
            return newOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        });
        setForces(sortedForces);
    };

    // Get current forces
    const indexOfLastForce = currentPage * forcesPerPage;
    const indexOfFirstForce = indexOfLastForce - forcesPerPage;
    const currentForces = forces.slice(indexOfFirstForce, indexOfLastForce);

    // Calculate total pages
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(forces.length / forcesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ForceWrapper>
            <Title>Forces</Title>
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
