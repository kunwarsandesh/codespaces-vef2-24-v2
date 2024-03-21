import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SeniorOfficers from './SeniorOfficers';
import CrimesWithNoLocation from './CrimesWithNoLocation';
import Neighborhoods from '../Neighborhoods';




const url = import.meta.env.VITE_APP_URL;

const InfoOnForce = () => {
    const [infoForce, setInfo] = useState(null);
    const location = useLocation();
    const force = location.state?.force;

    useEffect(() => {
        const getInfoOnForce = async () => {
            try {
                const response = await fetch(`${url}/forces/${force.id}`);
                const data = await response.json();
                setInfo(data);
            } catch (error) {
                console.error(error);
            }
        };

        getInfoOnForce();
    }, [force.id]);

    return (
        <InfoOnForceWrapper>
            <ForceName>{force.name}</ForceName>
            <br />
            {infoForce && (
                <ForceDetails>
                    <ForceDetail>ID: {infoForce.id}</ForceDetail>
                    <ForceDetail>URL: <ForceLink href={infoForce.url} target="_blank" rel="noopener noreferrer">{infoForce.url}</ForceLink></ForceDetail>
                    <ForceDetail>Telephone: {infoForce.telephone}</ForceDetail>
                    <EngagementTitle>Engagement Methods</EngagementTitle>
                    <EngagementList>
                        {infoForce.engagement_methods
                            .filter(method => method.type !== 'telephone')
                            .map((method, index) => (
                                <EngagementItem key={index}>
                                    <strong>{method.title}:</strong> <ForceLink href={method.url}>{method.url}</ForceLink>
                                </EngagementItem>
                            ))}
                    </EngagementList>

                </ForceDetails>

            )}
            <br></br>
            <SeniorOfficers forceId={force.id} />

            <br></br>
            <h3>Search Crimes with no Location</h3>
            <CrimesWithNoLocation forceId={force.id} />
            <br></br>
            <Neighborhoods forceId={force.id} forceName={force.name} />
        </InfoOnForceWrapper>
    );





};

const InfoOnForceWrapper = styled.div`
    text-align: center;
    margin: 20px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    background-color: #f9f9f9;
`;

const ForceName = styled.h1`
    color: #333;
    margin-bottom: 20px;
`;

const ForceDetails = styled.div`
    text-align: left;
    margin-top: 20px;
`;

const ForceDetail = styled.p`
    margin: 10px 0;
`;

const ForceLink = styled.a`
    color: #007bff;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const EngagementTitle = styled.h2`
    color: #333;
    margin-top: 20px;
`;

const EngagementList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const EngagementItem = styled.li`
    margin: 5px 0;
`;

export default InfoOnForce;
