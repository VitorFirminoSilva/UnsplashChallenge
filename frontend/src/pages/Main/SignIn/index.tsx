import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import CustomButton from '../../../components/Button';
import { CenterWrapper, FormGroup, InputGroup, TextWrapper, Wrapper } from './styled';
import CustomInput from '../../../components/Input';
import { fetchGetUser } from '../../../services/fetch/user';

interface ICredentials {
    email: string;
    password: string;
}


const SignIn: React.FC = () => {
    document.title = 'Unsplash App | SignIn';

    const { register, handleSubmit , formState: { errors } }  = useForm();

    const navigate = useNavigate();

    const getSubmit = ( data : any) => {

        const options: ICredentials = {
            email: data?.email,
            password: data?.password,
        };

        console.log(options);

       fetchGetUser( options )
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
                          
                            <CustomInput
                                register={register} 
                                errors={errors}  
                                maxL={60}
                                placeholder='Ex: exemplo@exemplo.com'
                                label='Email'
                                name='email'
                                type='text'
                                required={true}
                                className='lg'
                            />  

                            <CustomInput
                                register={register} 
                                errors={errors} 
                                maxL={50} 
                                placeholder='Senha'
                                label='Password'
                                name='password'
                                type='password'
                                required={true}
                                className='lg'
                            />  
                          
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

