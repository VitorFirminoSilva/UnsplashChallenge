import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './styled';

interface props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    color ?: string;
    background ?: string;
    width ?: number;
    noLoading ?: boolean;
}

const CustomButton: React.FC<props> = ({ children, color, background, width, disabled, noLoading, ...rest }) => {
    return (
        <>
            <Button disabled={disabled} fontColor={color} backgroundColor={background} widthBTN={width} {...rest}>
                {children}{' '}
            </Button>
        </>
    );
}

CustomButton.propTypes = {
    children: PropTypes.any,
    color: PropTypes.string,
    background: PropTypes.string,
    width: PropTypes.number,
    disabled: PropTypes.bool,
    style: PropTypes.any,
    noLoading : PropTypes.bool,
};
export default CustomButton;