import React from 'react';
import { Carousel } from 'antd';
import background from '../../../images/background/background.jpg'

const contentStyle = {
  height: '300px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const SliderImage = () => (
  <Carousel autoplay>
    <div>
      {/* <h3 style={contentStyle}>1</h3> */}
      <img src={background} />
    </div>
    <div>
      {/* <h3 style={contentStyle}>2</h3> */}
      <img src={background} />
    </div>
    <div>
      {/* <h3 style={contentStyle}>3</h3> */}
      <img src={background} />

    </div>
    <div>
      {/* <h3 style={contentStyle}>4</h3> */}
      <img src={background} />

    </div>
  </Carousel>
);

export default SliderImage;