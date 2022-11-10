import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";
import { ContainerInput } from "./styled";

export interface Props {
    name: string;
    type: string;
    label?: string;
    allowNegative?: boolean;
}

const Input: React.FC<Props> = ({name, type, label, allowNegative, ...rest}) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const {fieldName, defaultValue, registerField, error} = useField(name);

    useEffect(() => {

        registerField({ 
            name: fieldName, 
            ref: inputRef, 
            getValue: (ref) => {
                return ref.current.value;
            },
            setValue: (ref, value) => {
                ref.current.value = value;
            },
            clearValue: (ref) => {
                ref.current.value = '';
            },
        });

    }, [fieldName, registerField]);

    return (
        <ContainerInput>
            {label && <label htmlFor={fieldName}>{label}</label>}
            <input 
                id={fieldName}
                ref={inputRef}
                defaultValue={defaultValue} 
                min={1} 
                type={type}
                {...rest}
            />

            {error && <span>{error}</span>}
        </ContainerInput>
    );
};

export default Input;