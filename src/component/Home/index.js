import React from 'react';
import Banner from '../Banner';
import HomepageNav from '../HomepageNav';
import Recommend from '../Recommend';

class Home extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
        return (
          <div>
            <Banner/>
            <HomepageNav/>
            <Recommend/>
          </div>
        );
      };
  }

  export default Home;