/**
 * Created by fengxiangfei on 2018/1/22.
 */

import React from 'react';
import {connect} from 'dva';
import BankInfo from '../../components/bank/bankCardInfo'

function Bank({ location, dispatch, bankCard, layout , loading }) {
    return (
        <div className="bank_info">
            <BankInfo {...bankCard} dispatch={dispatch} location={location}/>
        </div>
    );
}
Bank.propTypes = {};


function mapStateToProps({ bankCard, layout ,loading}) {
    return { bankCard, layout, loading};
}
export default connect(mapStateToProps)(Bank);;