/**
 * Created by huozhenguang on 2018/1/12.
 */
import React from 'react';
import MineTopComponent from '../components/mine/MineTop';
import MineBoxComponent from '../components/mine/MineBox';
import MineBodyComponent from '../components/mine/MineBody';
import MineTaberComponent from '../components/home/Taber';
import { connect } from 'dva';
import TaberComponents from '../components/home/Taber';

function MinePage({ location, dispatch, mine, layout , loading }) {
    return (
        <div>
            <MineTopComponent {...mine} dispatch={dispatch} location={location} />
            <MineBoxComponent {...mine} dispatch={dispatch} location={location} />
            <MineBodyComponent {...mine} dispatch={dispatch} location={location} />
            <TaberComponents {...mine} dispatch={dispatch} location={location}/>
        </div>
    );
}


function mapStateToProps({ mine, layout ,loading}) {
    return { mine, layout, loading};
}
export default connect(mapStateToProps)(MinePage);