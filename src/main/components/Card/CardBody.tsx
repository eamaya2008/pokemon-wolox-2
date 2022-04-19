import React, { FunctionComponent } from 'react';

type CardBodyProps = {
  name: string;
  imgSrc: string;
};

const CardBody: FunctionComponent<CardBodyProps> = ({ name, imgSrc }) => {
  return (
    <div className="card-body">
      <img src={imgSrc} alt="" className="card-body-img" />
      <h5 className="card-body-title">{name}</h5>
    </div>
  );
};

export default CardBody;
