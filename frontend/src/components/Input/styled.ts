import styled from 'styled-components';

export const ContainerInput = styled.div`

    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;

    input {
        font-size: 1.6rem;
        background-color: #fff;
        width: 100%;
        min-height: 3.8rem;
        max-width: 300px;

        border: 2px solid lightgray;
        border-radius: 6px;

        padding: 5px;

        transition:border .6s;

        &:focus{
            border: 2px solid #777;
        }
    }

    span{
        margin-left: 3px;
        margin-top: 1px;
        font-size: 1.4rem;
        font-weight: 700;
        color: red;
    }

`;