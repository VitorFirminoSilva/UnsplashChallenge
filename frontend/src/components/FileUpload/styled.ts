import styled from 'styled-components';


export const Label = styled.label`
    width: 100%;
    height: 100%;

    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #aaa;
    border: 2px dashed;
    cursor: pointer;
    font-family: sans-serify;

    &:hover{
        color: #777;
        background: #ccc;
    }
`;

export const Input = styled.input`
    display: none;

`;

export const Image = styled.img`
    width: 100%;
    max-height: 250px;
    
`;

