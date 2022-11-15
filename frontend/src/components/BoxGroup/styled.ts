import styled from 'styled-components';


export const Title = styled.h1` 

`;

export const Label = styled.label` 
    font-size: 1.2rem;
    font-weight: 700;
`;

export const Link = styled.a`
    background-color: lightgreen;
    text-decoration: none;
    text-align: center;
    border-radius: 6px;
    color: #000;
    cursor: pointer;
    max-width: 300px;
    font-size: 1.6rem;
    width: 100%;
    border: none;
    padding: 5px;
    box-shadow: 0 2px 4px 0 #000;
    transition: background-color 1s;
    margin-top: 10px;

    &:focus{
        transform: translateX(2px);
        box-shadow: none;
    }
`;


export const Container = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #fff;
`;

export const Box = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    background-color: #ddd;
    border: 4px solid rgba(0,0,0,0.2);
    border-radius: 6px;

    padding: 20px;

    height: 400px;
    width: 300px;

    form{
        width: 100%;
        height: 100%;
    }

`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column; 
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column; 
    height: 100%;
    justify-content: space-between;

`;