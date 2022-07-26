import React from 'react';
import Button from '../../../components/Button';


const Home: React.FC = () => {
    document.title += '| Página inicial';
    return (
        <>
            <h1>Home</h1>
            <Button 
                background='blue'
                color='black'
                width={40}
                disabled={false} 
                type="submit">
                Entrar
            </Button>
        </>
    );
};

export default Home;

