import styled from 'styled-components';
interface propBTN{
    fontColor ?: string;
    backgroundColor ?: string;
    widthBTN ?: number; 
}

export const Button =  styled.button<propBTN>`
 
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.fontColor};

    width: ${(props) => props.widthBTN ? props.widthBTN : 100}%;

    border-radius: 6px;
    cursor: pointer;
   
    font-size: 1.8rem;
    font-weight: bold;
    padding: 5px 10px;
    
    border: none;
    box-shadow: 0 2px 4px 0 black;
    transition: background-color 1s;

    &:focus{
        transform: translateY(-10px); 
        border: 1px solid lightgrey;
        box-shadow: inset 0px 0px 10px 0 grey;
    }
    
    &:disabled{
        background-color: #ffff;
        color: #646464;
        transform: translateY(-1px); 
        border: 1px solid lightgrey;
        box-shadow: inset 0px 0px 10px 0 grey;
        cursor: auto;
    }   
`;