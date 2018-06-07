/**
 * Created by huozhenguang on 2018/1/9.
 */
import React from 'react';
import {TabBar} from 'antd-mobile';
import BodyComponents from './Body';
class TabBarExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: this.props.taberType == 1 ? 'redTab' : 'yellowTab',
            hidden: false,
            fullScreen: false,
        };
    }

    renderContent(pageText) {
    }

    render() {
        return (
            <div style={{position: 'fixed', width: '100%', bottom: 0}}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="red"
                    barTintColor="white"
                    hidden={this.state.hidden}
                >


                    <TabBar.Item
                        title="商城"
                        key="mall"
                        icon={{uri: './src/assets/public/ic_tab_home_normal.png'}}
                        selectedIcon={{uri: this.props.taberType == 1 ? './src/assets/public/ic_tab_home_selected.png' : './src/assets/public/ic_tab_home_normal.png'}}

                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.props.dispatch({
                                type: 'home/changeTaber',
                                payload: {
                                    type: 1
                                }
                            });
                        }}
                        data-seed="logId"
                    >
                        {this.renderContent('mall')}
                    </TabBar.Item>

                    <TabBar.Item
                        icon={{uri: './src/assets/public/ic_tab_me_normal.png'}}
                        selectedIcon={{uri: this.props.taberType == 2 ? './src/assets/public/ic_tab_me_selected.png' : './src/assets/public/ic_tab_me_normal.png'}}
                        title="我的"
                        key="my"
                        selected={this.state.selectedTab === 'yellowTab'}
                        onPress={() => {
                            this.props.dispatch({
                                type: 'home/changeTaber',
                                payload: {
                                    type: 2
                                }
                            });
                        }}
                    >
                        {this.renderContent('My')}
                    </TabBar.Item>
                </TabBar>
            </div>
        )
    }
}


export default TabBarExample;