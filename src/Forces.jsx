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
            <h1>Forces</h1>
            {forces.map(force => (
                <div key={force.id}>
                    <h2>
                        {/* Use Link to pass force data to InfoOnForce component */}
                        <Link to={`/forces/${force.id}`} state={{ force }}>
                            {force.name}
                        </Link>
                    </h2>
                </div>
            ))}
        </ForceWrapper>
    );
};

export default Forces;

const ForceWrapper = styled.div`
    h1 {
        color: #333;
    }
`;