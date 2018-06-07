/**
 * Created by fengxiangfei on 2018/1/22.
 */

import React from 'react';
import {connect} from 'dva';
import AddBank from '../../components/bank/addBank'

function AddBankInfo({ location, dispatch, addBank, layout , loading }) {
    return (
        <div className="add_bank_info">
            <AddBank {...addBank} dispatch={dispatch} location={location}/>
        </div>
    );
}
AddBankInfo.propTypes = {};

function mapStateToProps({ addBank, layout ,loading}) {
    return { addBank, layout, loading};
}
export default connect(mapStateToProps)(AddBankInfo);;