import React from "react";
import CustomButton from "../Button";
import { CardButtom, CardImg, CardStructure } from "./styled";

export interface Props {
  idImage: number;
  label: string;
  urlImage: string;
  deleteHandler: any;
};

const CardImage: React.FC<Props> = ({ idImage, label, urlImage, deleteHandler }) => {

  return (
    <CardStructure>
      <CardImg src={urlImage} alt={label} />
      <CardButtom className="btn-access">
        <CustomButton
          type="button"
          style={{ backgroundColor: 'red' }}
          onClick={() => deleteHandler(idImage)}
        >
          Delete
        </CustomButton>
      </CardButtom>
    </CardStructure>
  );
};

export default CardImage;