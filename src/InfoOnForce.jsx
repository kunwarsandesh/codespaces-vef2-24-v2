import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const url = import.meta.env.VITE_APP_URL;

const InfoOnForce = () => {
    const [infoForce, setInfo] = useState([]);
    const location = useLocation();
    const { force } = location.state;

    useEffect(() => {
        getInfoOnForce().catch(console.error);
    }, []);

    const getInfoOnForce = async () => {
        const response = await fetch(`${url}/forces/${force.id}`);
        const data = await response.json();
        setInfo(data);
    };

    return (
        <InfoOnForceWrapper>
            <h1>{force.id}</h1>
            {infoForce.map(force => (
                <div key={force.id}>
                    <h2>
                        <p>ID: {force.url}</p>
                        <p>Telephone: {force.telephone}</p>
                    </h2>
                </div>
            ))}
        </InfoOnForceWrapper>
    );
};


const InfoOnForceWrapper = styled.div`
    h1 {
        color: #333;
    }
`;


export default InfoOnForce;
