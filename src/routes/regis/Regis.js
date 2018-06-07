/**
 * Created by biyajuan on 2018/1/9.
 * 说明:注册路由入口文件
 */
import React from 'react';
import { connect } from 'dva';
import RegisLayout from "../../components/register/Register";
function RegisRoute({ location, dispatch, login, layout , loading }) {
  return (
    <RegisLayout {...login} dispatch={dispatch} location={location} />
  );
}

RegisRoute.propTypes = {
};


function mapStateToProps({ login, layout ,loading}) {
  return { login, layout, loading};
}
export default connect(mapStateToProps)(RegisRoute);
