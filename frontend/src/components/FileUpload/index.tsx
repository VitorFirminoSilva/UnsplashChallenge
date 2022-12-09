import React, { useRef, useEffect, useState, ChangeEventHandler } from "react";
import { useField } from "@unform/core";
import { Image, Input, Label } from "./styled";


export interface Props {
    name: string;
    file: File | null;
    setFile: Function;
}

const FileUpload: React.FC<Props> = ({name, file, setFile, ...rest}) => {
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
        setFile(event.target.files[0]);
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
                <span>{file ? <Image src={URL.createObjectURL(file)} alt="Input Image" /> : "Choose an image" }</span>
            </Label>
        </>
    );
};

export default FileUpload;