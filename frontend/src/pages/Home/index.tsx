import { Form } from '@unform/web';
import React, { useRef, useState } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import Modal from 'react-modal';
import { GroupRow, InputGroup } from '../../components/BoxGroup/styled';
import CustomButton from '../../components/Button';
import InputImage from '../../components/InputImage';
import { useAuth } from '../../hooks/auth';

import { Container, Header, HomeLink, InputHome, ModalBody, ModalHeader, Navbar, Navigation, NavItem } from './styled';
import Input from '../../components/Input';

interface FormData{
    image: string;
    label: string;
}

Modal.setAppElement("#root");

const Home: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const { user } = useAuth();

    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    
    const closeModal = () => {
        setIsOpen(false);
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data);
    };


    return (
        <Container>
            <Header>
                <Navbar>
                    <HomeLink href="/home">Unsplash</HomeLink>
                    <InputHome type="text" name="search" placeholder='Search Images...'/>
                    <Navigation>
                        <li>
                            <CustomButton
                                type="button"
                                style={{ backgroundColor: 'lightgreen' }}
                                onClick={openModal}
                            >
                                New Image

                            </CustomButton>
                        </li>
                        
                        <li>
                            <CustomButton
                                type="button"
                                style={{ backgroundColor: 'lightcoral' }}
                            >
                                Signout
                            </CustomButton>
                        </li>
                    </Navigation>
                </Navbar>
            </Header>

            <Modal 
                
                isOpen={modalIsOpen}
               
                contentLabel="Test Modal"
                overlayClassName="modal-overlay"
                className="modal-content"
            >
                <Form ref={formRef} onSubmit={onSubmit}>
                    <ModalHeader>
                        <h2>Congratulation, you won!!!</h2>
                        <GroupRow>
                            <CustomButton
                                type="submit"
                                style={{ backgroundColor: 'lightgreen', maxWidth: '100px' }}
                            >
                                Save
                            </CustomButton>
                            <CustomButton
                                type="button"
                                style={{ backgroundColor: 'lightcoral', maxWidth: '100px' }}
                                onClick={closeModal}
                            >
                                Cancel
                            </CustomButton>
                        </GroupRow>
                    </ModalHeader>
                    <ModalBody>
                        
                            <InputImage name='image'/>
                    
                            <Input type='text' name='title' label='Title' />
                    </ModalBody>
                </Form>
            </Modal>
        </Container>
    );

};
export default Home;
