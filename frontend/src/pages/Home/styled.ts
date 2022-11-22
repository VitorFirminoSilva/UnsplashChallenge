import styled from 'styled-components';


export const Container = styled.div`  
    display: flex;
    flex-direction: column;
    margin: 0 20px;
`;


export const Header = styled.header`
    display: flex;
    justify-content: center;
    
`;

export const Navbar = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    width: 95%;
    margin: 2px auto;
    padding: 10px 10px;
    position: fixed;
`;


export const HomeLink = styled.a`
    font-size: 2.4rem;
    padding: 15px 2rem;
    text-decoration: none;
`;

export const Navigation = styled.ul`
    display: flex;
    align-items: center;
    gap: 5px;
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
    gap: 10px;
    align-items: flex-start;
    height: 100%;
    padding: 10px 20px;
`;