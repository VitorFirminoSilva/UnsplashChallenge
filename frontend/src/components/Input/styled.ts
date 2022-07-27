import styled from 'styled-components';


interface propINP{
    widthINP ?: number; 
}

export const Input =  styled.input<propINP>`
    border: 2px solid lightgrey;
    border-radius: 6px;
    color: #646464;
    font-size: 1.6rem;
    margin-bottom: 15px;
    
    padding: 5px 10px;
    width: ${(props) => props.widthINP ? props.widthINP : 100}%;
    transition: border .6s;

    &:focus{
        border: 2px solid grey;
    }
`;