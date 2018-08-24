import React from 'react';
import './ext.css';
class Ext extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        let exts = this.props.ext;
        const listItems = exts.map((ext,index) => <li key={index}><img src={ext.iconUrl}/>{ext.name}</li>);
        return (
            <div className="pro_ject">
                <div className="quick_title">
                    <span style={{fontWeight: 'bold'}}>即刻达</span>
                    <span className="quick">最快30分钟上门</span>
                </div>
                <ul className="quick_items">{listItems}</ul>
            </div>
        )  
    }
}

export default Ext;