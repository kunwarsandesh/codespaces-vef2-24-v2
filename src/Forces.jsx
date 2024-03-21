import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const url = import.meta.env.VITE_APP_URL;

const Forces = () => {
    const [forces, setForces] = useState([]);

    useEffect(() => {
        getForces().catch(console.error);
    }, []);

    const getForces = async () => {
        const response = await fetch(`${url}/forces`);
        const data = await response.json();
        setForces(data);
    };

    return (
        <ForceWrapper>
            <Title>Forces</Title>
            {forces.map(force => (
                <ForceItem key={force.id}>
                    <StyledLink to={`/forces/${force.id}`} state={{ force }}>
                        {force.name}
                    </StyledLink>
                </ForceItem>
            ))}
        </ForceWrapper>
    );
};

export default Forces;

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
