import styled from 'styled-components';


export const Centralize =  styled.section`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    font-size: 3.2rem;

    span:first-child {
        margin-right: 15px;
        padding-right: 10px;
        border-right: 2px solid #646464;
    }

    span + span {
        color: #646464;
    }
`;