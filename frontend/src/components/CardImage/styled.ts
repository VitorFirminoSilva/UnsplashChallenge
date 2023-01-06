import styled from 'styled-components';

export const CardStructure = styled.div`
    position: relative;
    display: flex;
    margin: 6px auto;
    border-radius: 16px;
    overflow: hidden;
    transition: .5s ease;

    &:hover img{
        filter: brightness(0.5);
    }

    &:hover .btn-access{
        display: block;
        filter: none;
    }
`;

export const CardImg = styled.img`
    width: 100%;
    height: auto;
`;

export const CardButtom = styled.div`
    transition: .5s ease;
    display: none;
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%)
`;
