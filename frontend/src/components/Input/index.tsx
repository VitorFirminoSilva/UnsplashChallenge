import React from 'react';
import { Input } from './styled';

interface props extends React.InputHTMLAttributes<HTMLInputElement>{
    width ?: number;
    noLoading ?: boolean;
}

const CustomInput: React.FC<props> = ({ children, width, disabled, noLoading, ...rest }) => {
    return (
        <>
            <Input disabled={disabled} widthINP={width} {...rest} />
                
        </>
    );
}

CustomInput.propTypes = {
    
};
export default CustomInput;