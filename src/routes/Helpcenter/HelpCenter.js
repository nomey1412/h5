/**
 * Created by fengxiangfei on 2018/1/22.
 */

import React from 'react';
import {connect} from 'dva';
import HelpTop from '../../components/HelpCenter/HelpTop';
import HelpButton from '../../components/HelpCenter/HelpButton';

function HelpCenter({ location, dispatch, helpCenter, layout , loading }) {
    return (
        <div className="HelpCenter">
            <HelpTop {...helpCenter} dispatch={dispatch} location={location}  />
            <HelpButton {...helpCenter} dispatch={dispatch} location={location} />
        </div>
    );
}
HelpCenter.propTypes = {};


function mapStateToProps({ helpCenter, layout ,loading}) {
    return { helpCenter, layout, loading};
}
export default connect(mapStateToProps)(HelpCenter);