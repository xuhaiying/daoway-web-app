import React from 'react';
import { Icon } from 'antd-mobile';
import './header.css';
import positionIcon1 from '../../assets/img/position1.png';
import positionIcon from '../../assets/img/position.png';
import {observer,inject} from 'mobx-react';
@inject("store")
@observer
class Header extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let m = this.props.store.bgColor;
        let src,style,search;
        if (m > 0.5) {
            src = positionIcon;
            // style = {color:'#ccc'};
            style = '#ccc';
        } else {
            src = positionIcon1;
            // style = {color:'#fff'};
            style = '#fff';
        }
        return (
            <header style={{backgroundColor:'rgba(255, 255, 255, ' + m + ')'}}>
            <div>
                <div className="leftBox">
                    <img src={src}/>
                    <span style={{color:style}}>雍和航星科技园</span>
                    <Icon type="down" style={{verticalAlign: 'middle',color:style}}/>
                </div>
                <div className="rightBox" id="searchdiv">
                    <Icon type="search" style={ { marginRight: '0.4rem',width:'0.7rem',height:'1.3rem',color:style }} />
                    <span style={{color:style}}>快速搜索商家、服务</span>
                </div>
            </div>
            </header>
        )
    }
}

export default Header;