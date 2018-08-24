import React from 'react';
import Header from '../Header';
import Banner from '../Banner';
import HomepageNav from '../HomepageNav';
import ActivityBox from '../ActivityBox';
import Recommend from '../Recommend';

class Home extends React.Component {
    constructor(props) {
      super(props);   
    }
    render() {
        return (
          <div>
            <Header/>
            <Banner/>
            <HomepageNav/>
            <ActivityBox/>
            <Recommend/>
            <Recommend/>
            <Recommend/>
          </div>
        );
      };
  }

  export default Home;