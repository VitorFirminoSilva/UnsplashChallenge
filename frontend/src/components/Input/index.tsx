import React from 'react';
import {  } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Error, Input, InputField, Label } from './styled';

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
    name: string;
    label?: string;
    required?: boolean;
    width?: number; 
    maxL?: number;
    minL?: number;
    register: any;
    errors: any;
}

const CustomInput: React.FC<Props> = ({ register, errors, name, label, required, width, maxL = 100, minL = 3, ...rest }) => {

    return (
        <InputField width={width}>
            {label && <Label htmlFor={name}>{label} {required? '*' : ''}</Label>}
            <Input 
                autoComplete='none' 
                maxLength={maxL} 
                minLength={minL}
                {...register(name,  
                { required: required, maxLength: maxL, minLength: minL })} 
                {...rest} 
            />  
            <Error>
                {errors[name]  && errors[name].type === "required" && (<span>This is required</span>)}
                {errors[name]   && errors[name].type === "maxLength" && (<span>Max length exceeded</span>)}
                {errors[name]   && errors[name].type === "minLength" && (<span>Min length not exceeded</span>)}
            </Error>
        </InputField>
    );
}

CustomInput.propTypes = {
    label: PropTypes.string,
    required: PropTypes.bool,
    width: PropTypes.number,
    maxL: PropTypes.number,
    minL:PropTypes.number
};
export default CustomInput;