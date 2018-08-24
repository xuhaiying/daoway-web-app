import React from 'react';
import Axios from 'axios';
import './activitybox.css';
class ActivityBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
        };
      }
    componentWillMount(){
        Axios.get('/daoway/rest/indexEvent/all?serviceMinLimit=4&type=all&lot=116.4286225517944&lat=39.957932583781')
        .then((response)=>{
          let reslut = response.data;
          let data = reslut.data;
          if (data.length > 10)data.length = 10
          this.setState({
            data: reslut.data.activity,
          });
        })
        .catch((error)=>{
          console.log(error)
        })
    }
    render() { 
        let data = this.state.data;
        if (data.length < 3 ) return null
        let activity = data[0];
        let activity1 = data[1];
        let activity2 = data[2];
        return (
            <div className="linkbox">
                <div style={{paddingLeft:"0.25rem",paddingRight:"0.12rem"}}>
                <div className="leftbox">
                    <strong>{activity.title}</strong>
                    <p>{activity.subject}</p>
                    <div>
                        <img src={activity.img}/>
                    </div>
                </div>
                </div>
                <div style={{paddingLeft:"0.12rem",paddingRight:"0.25rem"}}>
                <div className="rigthbox">
                    <div className="topbox">
                        <strong style={{color:"#42a2fd"}}>{activity1.title}</strong>
                        <p>{activity1.subject}</p>
                        <div>
                            <img src={activity1.img}/>
                        </div>
                    </div>
                    <div className="bottombox">
                        <strong style={{color:"#ff509f"}}>空调养护</strong>
                        <p>{activity2.subject}</p>
                        <div>
                            <img src={activity2.img}/>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default ActivityBox