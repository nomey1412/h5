/**
 * Created by huozhenguang on 2018/1/16.
 */
import React from 'react';
import AddressComponent from '../components/address/Address';
import { connect } from 'dva';

function AddressPage({ location, dispatch, address, layout , loading }) {
    return (
        <div className="tsd_address">
            <AddressComponent {...address} dispatch={dispatch} location={location} />
        </div>
    );
}


function mapStateToProps({ address, layout ,loading}) {
    return { address, layout, loading};
}
export default connect(mapStateToProps)(AddressPage);