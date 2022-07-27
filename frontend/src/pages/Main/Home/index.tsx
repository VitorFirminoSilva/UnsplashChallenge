import React from 'react';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { ComponentDiv } from './styled';



const Home: React.FC = () => {
    document.title = 'Unsplash App | Página inicial';
    return (
        <ComponentDiv>
            <h1>Home</h1>
            <Input width={50}/>
            <Button 
                background='blue'
                color='black'
                width={50}
                disabled={false} 
                type="submit">
                Entrar
            </Button>
        </ComponentDiv>
    );
};

export default Home;

