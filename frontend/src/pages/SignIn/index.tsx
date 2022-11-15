import React, { useRef, useState} from 'react';

import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { GenericFrontError } from '../../errors/GenericFrontError';
import getValidationError from '../../errors/getValidationErrors';
import { ResponseError } from '../../errors/ResponseError';
import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import Input from '../../components/Input';
import CustomButton from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import { Box, Container, FormGroup, InputGroup, Label, Link, Title } from './styled';

interface FormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const [submitLoading, setSubmitLoading] = useState(false);

    const { signIn } = useAuth();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setSubmitLoading(true);
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await signIn({ username: data.email, password: data.password });

            navigate('/');
        } catch (err) {

            if (err instanceof Yup.ValidationError) {
                const erros = getValidationError(err);

                formRef.current?.setErrors(erros);

                return;
            }

            if (err instanceof GenericFrontError) {
                let message = err.message;
                if (err instanceof ResponseError) {
                    if (err.status === 400) message = 'Credenciais incorretos';
                }
            }
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
      
        <Container>
            <Box>
                <Title>SignIn</Title>

                <Form ref={formRef} onSubmit={onSubmit}>
                    <FormGroup>
                        <InputGroup>
                            <Input type="email" name="email" label="Email" />
                            <Input type="password" name="password" label="Password" />
                        </InputGroup>

                        <InputGroup>
                            <Label>Não tem usuário, click no botão a baixo:</Label>
                            <Link
                                    href='unsplash/signup'
                                   
                                >
                                    Cadastrar Usuário
                            </Link>
                        </InputGroup>
                        

                    
                        <CustomButton
                            type="submit"
                            style={{ backgroundColor: 'lightblue' }}
                        >
                            Entrar
                        </CustomButton>
                    </FormGroup>
                </Form>
            </Box>
        </Container>
       
    );
};

export default SignIn;
