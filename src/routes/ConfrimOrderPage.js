/**
 * Created by huozhenguang on 2018/1/13.
 */
import React from 'react';
import { connect } from 'dva';
import AddressComponent from '../components/confirmOrder/Address';
import BodyComponent from '../components/confirmOrder/Body';
import DetailComponent from '../components/confirmOrder/Detail';
import FooterComponent from '../components/goodsDetail/GoodsDetailBottom';


function ConfrimOrderPage({ location, dispatch, confirmOrder, layout , loading }) {
    return (
        <div className="tsd_add" style={{overflow:'hidden',marginBottom:'60px'}}>
            <AddressComponent {...confirmOrder} dispatch={dispatch} location={location} />
            <DetailComponent {...confirmOrder} dispatch={dispatch} location={location}/>
            <BodyComponent {...confirmOrder} dispatch={dispatch} location={location}/>
            <FooterComponent {...confirmOrder} dispatch={dispatch} location={location}/>
        </div>

    );
}

function mapStateToProps({ confirmOrder, layout ,loading}) {
    return { confirmOrder, layout, loading};
}
export default connect(mapStateToProps)(ConfrimOrderPage);


