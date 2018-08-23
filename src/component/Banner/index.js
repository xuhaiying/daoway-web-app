import React from 'react';
import { Carousel } from 'antd-mobile';
import Axios from 'axios';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      initialHeight: 200,
    };
  }
  componentDidMount() {
    Axios.get('/daoway/rest/config/banners?h5=1&lot=121.487899&lat=31.249162')
    .then((response)=>{
      var reslut = response.data;
      this.setState({
        data: reslut.data,
      });
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  render() {
    const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
    return (
        <Carousel
          className="my-carousel"
          autoplay={true}
          infinite
          selectedIndex={1}
          swipeSpeed={35}
          autoplayInterval={5000}
          dotActiveStyle={{background:'#fff'}}
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          // afterChange={index => console.log('slide to', index)}
        >
          {this.state.data.map(ii => (
            <a href="#" key={ii} style={hProp}>
              <img
                src={ii.imgUrl}
                alt="icon"
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({
                    initialHeight: null,
                  });
                }}
              />
            </a>
          ))}
        </Carousel>       
    );
  }
}

export default Banner;