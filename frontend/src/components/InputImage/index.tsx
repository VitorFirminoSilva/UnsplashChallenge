import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";
import { Input, Label, Span } from "./styled";


export interface Props {
    name: string;
    allowNegative?: boolean;
}

const InputImage: React.FC<Props> = ({name, allowNegative, ...rest}) => {

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
        <>
           <Label htmlFor={fieldName} tabIndex={0}>
                <Input 
                    id={fieldName}
                    ref={inputRef}
                    defaultValue={defaultValue} 
                    min={1}
                    max={1} 
                    type="file"
                    accept=".png,.jpeg,.jpg"
                    {...rest}
                />
                <Span>Choose an image</Span>
            </Label>
        </>
    );
};

export default InputImage;