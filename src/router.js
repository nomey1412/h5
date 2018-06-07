import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import HomePage from './routes/HomePage';
import GoodsDetailPage from './routes/GoodsDetailPage';
import MinePage from './routes/MinePage';
import ConfirmOrderPage from './routes/ConfrimOrderPage';
import LoginRoute from "./routes/login/Login";
import RegisRoute from "./routes/regis/Regis";
import ConfirmPayPage from './routes/ConfrimPayPage';
import ConfirmPayResultPage from './routes/ConfirmPayResultPage';
import MyOrderPage from './routes/MyOrderPage';
import confirmRepay from "./routes/repay/confirmRepay";
import confirmRefund from "./routes/refund/confirmRefund";
import refundStatus from "./routes/refund/refundStatus";
import couponList from "./routes/coupon/couponList";
import WhitePage from "./routes/WhitePage";
import AddressPage from './routes/Address';
import HelpCenter from './routes/Helpcenter/HelpCenter';
import ConNone from './routes/coupon/conNonePage';
import ConHistory from './routes/coupon/ConHistory';
import MyCoupon from './routes/coupon/MyCoupon';
import Repur from './routes/MyOrderPage';
import BankCardInfo from './routes/bankCard/bankCardInfo';
import AddBankCardInfo from './routes/bankCard/addBankCardInfo';
import CancelOrder from './routes/CancelOrderPage';


function RouterConfig({history}) {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route path="/goods_detail" component={GoodsDetailPage}/>
                <Route path="/mine" component={MinePage}/>
                <Route path="/confirmOrder" component={ConfirmOrderPage}/>
                <Route path="/login" exact component={LoginRoute}/>
                <Route path="/regis" exact component={RegisRoute}/>
                <Route path="/confirmPay" component={ConfirmPayPage}/>
                <Route path="/confirmPayResult" component={ConfirmPayResultPage}/>
                <Route path="/myOrder" component={MyOrderPage}/>
                <Route path="/repay" component={confirmRepay}/>
                <Route path="/confirmRefund" component={confirmRefund}/>
                <Route path="/refundStatus" component={refundStatus}/>
                <Route path="/couponList" component={couponList}/>
                <Route path="/WhitePage" component={WhitePage}/>
                <Route path="/address" component={AddressPage}/>
                <Route path="/HelpCenter" component={HelpCenter}/>
                <Route path="/ConNone" component={ConNone}/>
                <Route path="/ConHistory" component={ConHistory}/>
                <Route path="/myCoupon" component={MyCoupon} />
                <Route path="/UseRule" component={HelpCenter} />
                <Route path="/repur" component={Repur} />
                <Route path="/repayStatus" component={refundStatus} />
                <Route path="/bankCardInfo" component={BankCardInfo} />
                <Route path="/AddBankCardInfo" component={AddBankCardInfo} />
                <Route path="/cancel" component={CancelOrder} />
            </Switch>
        </Router>
    );
}

export default RouterConfig;
