import React, { Component } from 'react';
import {Button} from 'antd-mobile';
import TabBarExample from './component/TabBar';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Button>submit</Button>
        <TabBarExample />
      </div>
    );
  }
}

export default App;
