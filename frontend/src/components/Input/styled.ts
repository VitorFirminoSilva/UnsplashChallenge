import styled from 'styled-components';


interface Props{
    width?: number; 
}

export const Input =  styled.input<Props>`
    border: 2px solid lightgrey;
    border-radius: 6px;
    color: #646464;
    font-size: 1.6rem;
    padding: 5px 10px;
    width: ${(props) => props.width ? props.width : 100}%;
    transition: border .6s;

    &:focus{
        border: 2px solid grey;
    }

    &.sm{
        height: 20px;
    }

    &.lg{
        height: 50px;
        font-size: 1.8rem;
    }
`;


export const InputField =  styled.div<Props>`
    width: ${(props) => props.width ? props.width : 100}%;
    display: flex;
    flex-direction: column;
    grid-gap: 2px;
    margin-bottom: 5px;

`;

export const Error = styled.span`
    color: red;
    margin-left: 5px;
    font-size: 1.4rem;
    font-weight: 700;
    text-align: justify;
`;

export const Label = styled.label`
    color: black;
    font-size: 1.6rem;
    font-weight: bold;
    margin-left: 5px;
`;