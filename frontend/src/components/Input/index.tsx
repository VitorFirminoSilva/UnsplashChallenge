import React from 'react';
import PropTypes from 'prop-types';
import { Error, Input, InputField, Label } from './styled';

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
    name: string;
    label?: string;
    allowNegative?: boolean;
    required?: boolean;
    width?: number; 
}

const CustomInput: React.FC<Props> = ({ name, label, form, allowNegative, required, width, ...rest }) => {

    return (
        <InputField width={width}>
            {label && <Label htmlFor={name}>{label} {required? '*' : ''}</Label>}
            <Input autoComplete='none' name={name} {...rest} />  
            <Error></Error>
        </InputField>
    );
}

CustomInput.propTypes = {
    label: PropTypes.string,
    allowNegative: PropTypes.bool,
    required: PropTypes.bool,
    width: PropTypes.number,
};
export default CustomInput;