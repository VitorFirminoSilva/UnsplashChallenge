import React, { useRef, useEffect, useState, ChangeEventHandler } from "react";
import { useField } from "@unform/core";
import { Image, Input, Label } from "./styled";


export interface Props {
    name: string;
    allowNegative?: boolean;
}

const InputImage: React.FC<Props> = ({name, allowNegative, ...rest}) => {

    const [image, setImage] = useState<File | null>(null);

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


    const changeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        setImage(event.target.files[0]);
    }

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
                    onChange={changeContent}
                    {...rest}
                />
                <span>{image ? <Image src={URL.createObjectURL(image)} alt="Input Image" /> : "Choose an image" }</span>
            </Label>
        </>
    );
};

export default InputImage;