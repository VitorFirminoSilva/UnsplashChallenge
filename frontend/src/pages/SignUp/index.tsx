
import React, { useRef, useState} from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {  Container, FormGroup, InputGroup, Title } from '../../components/BoxGroup/styled';
import CustomButton from '../../components/Button';
import Input from '../../components/Input';
import getValidationError from '../../errors/getValidationErrors';
import { BoxCreate } from './styled';
import { api } from '../../services/axios';

interface FormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string()
                    .required('Nome é obrigatório'),
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const request_data = {
                name: data.name,
                username: data.email,
                password: data.password,      
            };

            await api.post('/user', request_data);
            navigate('/');
        } catch (err) {

            if (err instanceof Yup.ValidationError) {
                const erros = getValidationError(err);

                formRef.current?.setErrors(erros);

                return;
            }
        
        }
    };
    

    return (
   
           <Container>
            <BoxCreate>
                <Title>Create User</Title>

                <Form ref={formRef} onSubmit={onSubmit}>
                    <FormGroup>
                        <InputGroup>
                            <Input type="text" name="name" label="Name" />
                            <Input type="email" name="email" label="Email" />
                            <Input type="password" name="password" label="Password" />
                        </InputGroup>
                        <CustomButton
                            type="submit"
                            style={{ backgroundColor: 'lightblue' }}
                        >
                            Salvar
                        </CustomButton>
                    </FormGroup>
                </Form>
            </BoxCreate>
        </Container>
     
    );

};
export default SignUp;