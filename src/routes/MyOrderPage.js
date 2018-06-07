/**
 * Created by fengxiangfei on 2018/1/13.
 */
import React from 'react';
import MyOrderComponents from '../components/myOrder/MyOrder';
import { connect } from 'dva';

function MyOrderPage({ location, dispatch, myOrder, layout , loading }) {
    return (
        <div style={{paddingTop: '20px', overflow: 'hidden'}}>
            <MyOrderComponents {...myOrder} dispatch={dispatch} location={location} />
        </div>

    );
}



function mapStateToProps({ myOrder, layout ,loading}) {
    return { myOrder, layout, loading};
}

export default connect(mapStateToProps)(MyOrderPage);