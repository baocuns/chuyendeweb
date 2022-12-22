import React from 'react';
import { Image } from 'antd';
import styled from 'styled-components'

const MultipleImage = () => (
    <Container>
        <Image.PreviewGroup>
            <Image width={250} src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg" />
            <Image
                width={200}
                src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
            />
        </Image.PreviewGroup>
    </Container>
);

const Container = styled.div`   
  text-align: center;
`

export default MultipleImage;