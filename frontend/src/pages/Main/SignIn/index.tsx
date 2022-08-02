import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CustomButton from '../../../components/Button';
import CustomInput from '../../../components/Input';
import { CenterWrapper, FormGroup, InputGroup, TextWrapper, Wrapper } from './styled';
import { FormHandles } from '@unform/core';
import { Error, Input, InputField, Label } from '../../../components/Input/styled';

interface FormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    document.title = 'Unsplash App | SignIn';

    const formRef = useRef<FormHandles>(null);

    const { register, handleSubmit , formState: { errors } }  = useForm();

    const navigate = useNavigate();

    const getSubmit = (data: {}) => {
       console.log(data);
    };
    
    return (
        <CenterWrapper>
            <form onSubmit={handleSubmit(getSubmit)}>
                <Wrapper>
                    <TextWrapper>
                        <h1>Unsplash Challenge</h1>
                    </TextWrapper>
                    <FormGroup>
                        <InputGroup>
                            <InputField width={100}>
                                <Label htmlFor={"email"}> Email *</Label>
                                <Input 
                                    autoComplete='none' 
                                    placeholder='Ex: exemplo@exemplo.com'
                                    {...register("email")}
                                    type='text'
                                    className='lg'
                                />  
                                <Error></Error>
                            </InputField>
                            <InputField width={100}>
                                <Label htmlFor={"password"}> Password *</Label>
                                <Input 
                                    autoComplete='none' 
                                    placeholder='Senha 8 ou mais caracteres'
                                    {...register("password")}
                                    type='password'
                                    className='lg'
                                />  
                                <Error></Error>
                            </InputField>
                        </InputGroup>
                        <TextWrapper>Não tem uma conta, crie uma rapidamente <a href="/unsplash/createnew">Criar Conta</a></TextWrapper>
                        <CustomButton
                            background='blue'
                            color='black'
                            width={100}
                            type="submit">
                            Signin
                        </CustomButton>
                    </FormGroup>
                </Wrapper>
            </form>
        </CenterWrapper>
    );
};

export default SignIn;

