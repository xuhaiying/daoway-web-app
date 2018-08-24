import React from 'react';
import ReactDOM from 'react-dom';
import { TabBar, ListView } from 'antd-mobile'; 
import Home from '../Home';
import {observer,inject} from 'mobx-react';

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const ii = (pIndex * NUM_SECTIONS) + i;
    const sectionName = `Section ${ii}`;
    sectionIDs.push(sectionName);
    dataBlobs[sectionName] = sectionName;
    rowIDs[ii] = [];

    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `S${ii}, R${jj}`;
      rowIDs[ii].push(rowName);
      dataBlobs[rowName] = rowName;
    }
  }
  sectionIDs = [...sectionIDs];
  rowIDs = [...rowIDs];
}

class ListViewExample extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource,
      isLoading: true,
      height: (document.documentElement.clientHeight * 3) / 4,
    };
  }

  componentDidMount() {
    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    setTimeout(() => {
      genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
        isLoading: false,
        height: hei,
      });
    }, 600);
  }

  onEndReached = (event) => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    setTimeout(() => {
      genData(++pageIndex);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
        isLoading: false,
      });
    }, 1000);
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID} style={{ padding: '0 15px' }}>
          <div
            style={{
              lineHeight: '50px',
              color: '#888',
              fontSize: 18,
              borderBottom: '1px solid #F6F6F6',
            }}
          >{obj.title}</div>
          <div style={{ display: 'flex', padding: '15px 0' }}>
            <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
              <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderHeader={() => <span>header</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderSectionHeader={sectionData => (
          <div>{`Task ${sectionData.split(' ')[1]}`}</div>
        )}
        renderRow={row}
        renderSeparator={separator}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        pageSize={4}
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}
@inject("store")
@observer
class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      hidden: false,
    };
    this.handleClick = this.handleScroll.bind(this);
  }
  handleScroll(e) {
    e.preventDefault();
    if (this.state.selectedTab === 'home'){
      const t = 200;
      let scrollTop = e.target.scrollTop;
      let m = Math.min(scrollTop, t) / t;
      this.props.store.changeBgColor(m);
    } 
  }
  // renderContent(pageText) {
  //   console.log(pageText)
  //   return (
  //     <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
  //       <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
  //       <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
  //         onClick={(e) => {
  //           e.preventDefault();
  //           this.setState({
  //             hidden: !this.state.hidden,
  //           });
  //         }}
  //       >
  //         Click to show/hide tab-bar
  //       </a>
  //     </div>
  //   );
  // }
  // handleScroll(event){
  //   console.log(event)
  // }
  render() {
    return (
      <div onScroll={(event)=>{this.handleScroll(event)}} style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#e94840"
          barTintColor="white"
          tabBarPosition="bottom"
          hidden={this.state.hidden}
          prerenderingSiblingsNumber={0}
        >
          <TabBar.Item
            title="首页"
            key="homepage"
            icon={{ uri: 'http://daoway.cn/h5/image/icon2.png' }}
            selectedIcon={{ uri: 'http://daoway.cn/h5/image/icon1.png' }}
            selected={this.state.selectedTab === 'home'}
            onPress={() => {
              this.setState({
                selectedTab: 'home',
              });
            }}
            data-seed="logId"
          >
          
           <Home/>
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'http://daoway.cn/h5/image/icon6.png' }}
            selectedIcon={{ uri: 'http://daoway.cn/h5/image/icon5.png' }}
            title="订单"
            key="order"
            selected={this.state.selectedTab === 'order'}
            onPress={() => {
              this.setState({
                selectedTab: 'order',
              });
            }}
          >
            <ListViewExample />
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'http://daoway.cn/h5/image/icon8.png' }}
            selectedIcon={{ uri: 'http://daoway.cn/h5/image/icon7.png' }}
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'my'}
            onPress={() => {
              this.setState({
                selectedTab: 'my',
              });
            }}
          >
           
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default TabBarExample;