import React from 'react';
import {Card, WhiteSpace, List} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
class HelpTop extends React.Component {
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        status:true
    }
    handleClick(argv,e){
        this.props.dispatch({
            type:'helpCenter/changeStatus',
            payload:{
                argv:argv,
                data:this.props.qaList
            }
        });
    }

    render() {
        if(this.props.qaList.length > 0){
            return (<div>
                <List renderHeader={() => '常见问题'} className="my-list" ref="huozhenguang">
                    {
                        this.props.qaList.map(( item , i) => {
                            return (
                                <div key={i}>
                                <Item
                                    arrow={item.status ? 'down' : 'up'}
                                    multipleLine
                                    onClick={this.handleClick.bind(this,i)}
                                    platform=""
                                >
                                    {item.title}
                                </Item>

                                <Item wrap  className="gray" style={ item.status ? { display:'none'} : {display:'block'}}>
                                    {item.content}
                                </Item>
                                </div>
                            );
                        })
                    }

                </List>
            </div>)
        }else{
            return "";
        }
    }

}

export default HelpTop;