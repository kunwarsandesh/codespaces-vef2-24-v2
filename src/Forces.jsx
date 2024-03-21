
import React, { createRef } from 'react'
import styled from 'styled-components';
const url = import.meta.env.VITE_APP_URL;




//This is .jsx file for forces 
//API call get requests using fetch, async,await 

const Forces = () => {
    console.log('Forces');

    const [forces, setForces] = React.useState();
   //try catch block for error handling
    React.useEffect(() => {
        try {
            getForces();
        } catch (error) {
            console.log(error);
        }
    }
    , []);
    
    //fetching data from API
    const getForces = async () => {
        const response = await fetch(`${url}/forces`);
        const data = await response.json();
        setForces(data);
        console.log(data);
    }

    return (
        <ForceWrapper>
            <h1>Forces</h1>
            {forces && forces.map(force => (
                <div key={force.id}>
                    <h2>{force.name}</h2>
                </div>
            ))}
        </ForceWrapper>
    )
}

export default Forces;

const ForceWrapper = styled.div`

    h1 {
        color: #333;
    }

    h2 {
        color: #666;
    }
`;
    