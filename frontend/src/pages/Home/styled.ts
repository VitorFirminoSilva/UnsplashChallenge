import styled from 'styled-components';
import ROOTS from '../../constants/ROOTS';


export const Page = styled.div`
    display: flex;
    margin: auto;
    width: 99vw;
    height: 100vh;
    overflow: auto;
`;

export const Container = styled.div`  
    display: flex;
    flex-direction: column;
    margin: 0 10px;
    width: 100%;
`;

export const Header = styled.header`
    display: flex;
    width: 100%;
    justify-content: center;
`;

export const Navbar = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    width: 100%;
    padding: 10px 0;
`;


export const HomeLink = styled.a`
    font-size: 2.4rem;
    padding: 15px 1rem;
    text-decoration: none;
`;

export const Navigation = styled.ul`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    max-width: 230px;

    li{
        width: 100%;
    }
`;

export const NavItem = styled.a`
    display: flex;
    gap: 5px;
    text-decoration: none;
    font-family: Arial;
    font-size: 1.8rem;
    padding: 1rem;
    transition: all 250ms linear 0s;

    &:hover {
        background: rgba(0, 0, 0, 0.3);
    }
`;


export const InputHome = styled.input`
    font-size: 1.6rem;
    background-color: #fff;
    width: 100%;
    min-height: 3.8rem;

    border: 2px solid lightgray;
    border-radius: 6px;

    padding: 5px;

    transition:border .6s;

    &:focus{
        border: 2px solid #777;
    }
`;


export const ErrorMessageContainer = styled.div`
    p {
        color : red;
        font-weight: bold;
        padding: 1.6rem 0.8rem;
    }
`;


export const ImageContainer = styled.div`
    -webkit-column-count: ${ROOTS.columnCount_6};
    -moz-column-count: ${ROOTS.columnCount_6};
    column-count: ${ROOTS.columnCount_6};
    -webkit-column-width: ${ROOTS.porcentageCount_6};
    -moz-column-width: ${ROOTS.porcentageCount_6};
    column-width: ${ROOTS.porcentageCount_6};
    padding: 0 12px; 

    @media screen and (max-width: 1440px){
        -webkit-column-count: ${ROOTS.columnCount_5};
        -moz-column-count: ${ROOTS.columnCount_5};
        column-count: ${ROOTS.columnCount_5};
        -webkit-column-width: ${ROOTS.porcentageCount_5};
        -moz-column-width: ${ROOTS.porcentageCount_5};
        column-width: ${ROOTS.porcentageCount_5}; 
    }
    
    @media screen and (max-width: 1024px){
        -webkit-column-count: ${ROOTS.columnCount_4};
        -moz-column-count: ${ROOTS.columnCount_4};
        column-count: ${ROOTS.columnCount_4};
        -webkit-column-width: ${ROOTS.porcentageCount_4};
        -moz-column-width: ${ROOTS.porcentageCount_4};
        column-width: ${ROOTS.porcentageCount_4}; 
    }

    @media screen and (max-width: 768px){
        -webkit-column-count: ${ROOTS.columnCount_3};
        -moz-column-count: ${ROOTS.columnCount_3};
        column-count: ${ROOTS.columnCount_3};
        -webkit-column-width: ${ROOTS.porcentageCount_3};
        -moz-column-width: ${ROOTS.porcentageCount_3};
        column-width: ${ROOTS.porcentageCount_3}; 
    }

    @media screen and (max-width: 675px){
        -webkit-column-count: ${ROOTS.columnCount_2};
        -moz-column-count: ${ROOTS.columnCount_2};
        column-count: ${ROOTS.columnCount_2};
        -webkit-column-width: ${ROOTS.porcentageCount_2};
        -moz-column-width: ${ROOTS.porcentageCount_2};
        column-width: ${ROOTS.porcentageCount_2}; 
    }

    @media screen and (max-width: 395px){
        -webkit-column-count: ${ROOTS.columnCount_1};
        -moz-column-count: ${ROOTS.columnCount_1};
        column-count: ${ROOTS.columnCount_1};
        -webkit-column-width: ${ROOTS.porcentageCount_1};
        -moz-column-width: ${ROOTS.porcentageCount_1};
        column-width: ${ROOTS.porcentageCount_1}; 
    } 
`;


////Modal


export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: #ddd;
    color: #000;
`;

/* Modal Body */
export const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    padding: 10px 20px;
`;