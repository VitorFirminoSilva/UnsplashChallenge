import React from 'react';
import { Centralize } from './styled';


const NotFoundPage: React.FC = () => {
    document.title += '| Página não encontrada';
    return (
        <>
            <Centralize>
                <div>
                    <span>404</span>
                    <span>Página não encontrada</span>
                </div>
            </Centralize>
        </>
    );
};

export default NotFoundPage;

