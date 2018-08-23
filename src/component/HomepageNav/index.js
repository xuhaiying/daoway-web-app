import React from 'react';
import {Grid} from 'antd-mobile';
import Axios from 'axios';

import Ext from '../Ext';
class HomepageNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: [],ext:[]};
      }
      componentDidMount() {
        Axios.get('/daoway/rest/category/for_filter?lot=121.487899&lat=31.249162&weidian=false&recommendOnly=true&includeChaoshi=true&hasChaoshi=false&includeExtCategory=true&channel=daoway')
        .then((response)=>{
          var reslut = response.data;
          var data = reslut.data;
          if (data.length > 10)data.length = 10
          this.setState({
            data: reslut.data,
            ext: reslut.ext
          });
        })
        .catch((error)=>{
          console.log(error)
        })
      }
      render() {
        return (
          <div>
            <Grid data={this.state.data} square={false} columnNum={5} hasLine={false} renderItem={dataItem => (
           <div>
           <img src={dataItem.iconUrl2} style={{ width: '45px', height: '45px' }} alt="icon" />
            <div>
             <span>{dataItem.name}</span>
            </div>
            </div>
            )}/> 
          </div>
        );
      };
}

export default HomepageNav;