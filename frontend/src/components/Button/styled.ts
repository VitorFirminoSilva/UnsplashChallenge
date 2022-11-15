import styled from 'styled-components';

export const Button = styled.button`
    border-radius: 6px;
    color: #000;
    cursor: pointer;
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

