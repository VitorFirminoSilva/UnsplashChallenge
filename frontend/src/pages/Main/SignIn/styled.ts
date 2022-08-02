import styled from 'styled-components';




export const CenterWrapper = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #fff;
`;

export const Wrapper = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #e4e4e4;
    border-radius: 5px;
    width: 400px;
    height: 500px;
    padding: 40px;
    gap: 20px;

`;

export const TextWrapper = styled.div`
    text-align: center;
    font-size: 1.6rem;

`;

export const FormGroup = styled.div`

    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
`;