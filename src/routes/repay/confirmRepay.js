import React from 'react';
import {connect} from 'dva';
import RepayLayout from "../../components/repay/confirmRepay";
import ConfirmCenter from "../../components/repay/confirmCenter";
import ConfirmButton from "../../components/repay/confirnButton";

function repay({ location, dispatch, confirmRepay, layout , loading }) {
    return (
        <div className="tsd_repay">
            <RepayLayout {...confirmRepay} dispatch={dispatch} location={location} />
            <ConfirmCenter {...confirmRepay} dispatch={dispatch} location={location}/>
            <ConfirmButton {...confirmRepay} dispatch={dispatch} location={location}/>
        </div>
    );
}
repay.propTypes = {};


function mapStateToProps({ confirmRepay, layout ,loading}) {
    return { confirmRepay, layout, loading};
}
export default connect(mapStateToProps)(repay);
