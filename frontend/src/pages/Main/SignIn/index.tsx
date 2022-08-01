import React from 'react';
import CustomButton from '../../../components/Button';
import CustomInput from '../../../components/Input';



const SignIn: React.FC = () => {
    document.title = 'Unsplash App | SignIn';
    return (
        <>
            <h1>SignIn</h1>
            <CustomInput 
                required={true} 
                placeholder="Ex: exemplo@exemplo.com" 
                label='Email' 
                name="email" 
                width={100}
            />
            <CustomInput 
                required={true} 
                placeholder='Senha 8 ou mais caracteres' 
                label='password' 
                name='password' 
                type='password'
                width={100}
            />
            <CustomButton 
                background='blue'
                color='black'
                width={100}
                type="submit">
                    Signin
            </CustomButton>
        </>
    );
};

export default SignIn;

