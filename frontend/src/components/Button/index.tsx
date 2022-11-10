import React from "react";
import PropTypes from 'prop-types';
import { Button } from "./styled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    noLoading?: boolean;
}


const CustomButton: React.FC<ButtonProps> = ({ children, disabled, noLoading, ...rest }) => {

    rest.style = { ...rest.style, fontSize: '1.6rem' };

    return (
        <Button disabled={disabled} {...rest}>
            {children}{' '}
        </Button>
    );

};

CustomButton.propTypes = {
    children: PropTypes.any,
    disabled: PropTypes.bool,
    style: PropTypes.any,
    noLoading : PropTypes.bool,
};
export default CustomButton;