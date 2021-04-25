import React, { useEffect, useState } from 'react';
import { CardImg } from 'reactstrap';

const ItemImg = ({ picture, ...props }) => {
    const [image, setImage] = useState(undefined);

    useEffect(() => {
        if (!image && picture) {
          import(`../../assets/images/${picture}.jpg`).then((image) => setImage(image.default));
        }
      }, [image, picture]);

    return <CardImg top width="100%" height="270" src={image} alt="Item Image" {...props} />
};

export default ItemImg;