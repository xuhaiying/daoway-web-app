import React from 'react';
import {Grid} from 'antd-mobile';
import Axios from 'axios';
import './nav.css';
import Ext from '../Ext';

class HomepageNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          ext:[]
        };
      }
      componentWillMount(){
        Axios.get('/daoway/rest/category/for_filter?lot=121.487899&lat=31.249162&weidian=false&recommendOnly=true&includeChaoshi=true&hasChaoshi=false&includeExtCategory=true&channel=daoway')
        .then((response)=>{
          let reslut = response.data;
          let data = reslut.data;
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
        let data = this.state.data;
        if (data.length == 0 ) return null
        return (
          <div>
          <div style={{padding:'0.5rem',background:'#fff'}}>
            <Grid data={data} square={false} columnNum={5} hasLine={false} renderItem={dataItem => (
           <div>
           <img src={dataItem.iconUrl2} style={{ width: '45px', height: '45px' }} alt="icon" />
            <div>
             <span>{dataItem.name}</span>
            </div>
            </div>
            )}/> 
          </div>
          <Ext ext={this.state.ext}></Ext>
          </div>
        );
      };
}

export default HomepageNav;