import { Form } from '@unform/web';
import React, { useRef, useState , useEffect} from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import Modal from 'react-modal';
import { GroupRow } from '../../components/BoxGroup/styled';
import CustomButton from '../../components/Button';
import { useAuth } from '../../hooks/auth';
import * as Yup from 'yup';

import { Container, ErrorMessageContainer, Header, HomeLink, ImageContainer, InputHome, ModalBody, ModalHeader, Navbar, Navigation, Page } from './styled';
import Input from '../../components/Input';
import { api } from '../../services/axios';
import getValidationError from '../../errors/getValidationErrors';
import FileUpload from '../../components/FileUpload';
import { UnexpectedError } from '../../errors/UnexpectedError';
import createCancelTokenSource from '../../services/createCancelTokenSource';
import { ResponseError } from '../../errors/ResponseError';
import { Image } from '../../services/models';
import CardImage from '../../components/CardImage';
import { fetchManyImage } from '../../services/fetch/image';


interface FormData {
    image: File;
    title: string;
}

Modal.setAppElement("#root");

const Home: React.FC = () => {

    const formRef = useRef<FormHandles>(null);

    const [imageList, setImages] = useState<Image[]>([]);

    const [fileImage, setFile] = useState<File | null>(null);
    const [addImage, setAddImage] = useState(false);

    const { user } = useAuth();


    const numPage = 20;
    const [currentPage, setCurrentPage] = useState(0);
    const [sizePage, setSizePage] = useState(numPage);

    const [modalIsOpen, setIsOpen] = useState(false);

    const [error, setError] = useState(null);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const source = createCancelTokenSource();
        setCurrentPage(0);
        let loadPage = false;
        
        if(user){
            
            fetchManyImage(source.token, 
                user.id, 
                {
                    page: currentPage, 
                    size: sizePage
                }
            ).then((result) => {   
                if(!loadPage){  
                    setImages(result.images);
                }
            }).catch((err) => {
                let message = err.message;
                if (err instanceof ResponseError && err.status === 404){
                    message = 'Imagens não encontrada';
                    setError(message);
                }
            });
        }

        return () => { 
            loadPage = true;
            source.cancel();
        }
    }, [user, currentPage, sizePage]);

    

    useEffect(() => {
        const handlerScroll = (e: any) => {
            if(e.target){
                const scrollHeight = e.target.scrollHeight;
                const currentHeight = e.target.scrollTop + window.innerHeight;
                if(currentHeight + 1 >= scrollHeight){ 
                    setSizePage(sizePage + numPage);
                }  
            }
        }
 
        window.addEventListener('scroll', handlerScroll, {capture: true});

        return () =>{ 
           
            window.removeEventListener('scroll', handlerScroll, {capture: true});
        }
    }, [sizePage]);

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

            if (fileImage === null)
                throw new UnexpectedError("Não foi selecionada nenhuma imagem");


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

            setAddImage(!addImage);
            closeModal();
        } catch (err) {

            if (err instanceof Yup.ValidationError) {
                const erros = getValidationError(err);

                formRef.current?.setErrors(erros);

                return;
            }

        }
    };

    const deleteImage = (id: number) => {
       
        api.delete(`/images/${id}`)
        .then((response) => {
            if(imageList && imageList.length > 0){
                let imageRemove = imageList.find((element) => {
                    if(element.id === id){
                        return element;
                    }
                    return null;
                });
    
                const listTemp = [...imageList];
                if(imageRemove !== undefined){
                    listTemp.filter((element) => element !== imageRemove);
    
                    setImages(listTemp);
                }  
            }
        }).catch((err) => {
            setError(err.message);
        }) 
    };

    return (

        <Page>
            <Container>
                <Header>
                    <Navbar>
                        <HomeLink href="/home">Unsplash</HomeLink>
                        <InputHome type="text" name="search" placeholder='Search Images...' />
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

                <ImageContainer>

                    {error ? (
                        <ErrorMessageContainer>{error}</ErrorMessageContainer>
                    ) : imageList && imageList.length > 0 ? (
                        imageList?.map((image, index) => {
                            return ( 
                                <CardImage key={index} idImage={image.id} deleteHandler={deleteImage} label={image.label} urlImage={`http://localhost:8080/images/uploads/${image.imageURL}`} /> 
                            );
                        })
                    ): 
                        <></>  
                    }
                </ImageContainer>

            </Container>


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
                        <FileUpload name='image' file={fileImage} setFile={setFile} />
                    </ModalBody>
                </Form>
            </Modal>
        </Page>
    );

};
export default Home;
