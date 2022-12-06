import { Form } from '@unform/web';
import React, { useRef, useState } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import Modal from 'react-modal';
import { GroupRow, InputGroup } from '../../components/BoxGroup/styled';
import CustomButton from '../../components/Button';
import InputImage from '../../components/InputImage';
import { useAuth } from '../../hooks/auth';
import * as Yup from 'yup';

import { Container, Header, HomeLink, InputHome, ModalBody, ModalHeader, Navbar, Navigation} from './styled';
import Input from '../../components/Input';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/axios';
import getValidationError from '../../errors/getValidationErrors';

interface FormData{
    image: File;
    title: string;
}

Modal.setAppElement("#root");

const Home: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const navigate  = useNavigate();

    const [fileImage, setFile] = useState<File | null>(null);

    const { user } = useAuth();

    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    
    const closeModal = () => {
        setIsOpen(false);
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                title: Yup.string()
                    .required('o Título é obrigatório'),
                image: Yup.mixed().required('Image é obrigatória'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });


            //Isso é gambi tem que arrumar
            const request_data = {
                idUser: user?.id,
                label: data.title, 
                file: fileImage
            };

            await api.post('/images', request_data, { 
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
           
            setIsOpen(false);
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
                        <h2>New Image</h2>
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
                            <Input type='text' name='title' label='Title' />
                            <InputImage setFile={setFile}  name='image'/>
                    </ModalBody>
                </Form>
            </Modal>
        </Container>
    );

};
export default Home;
