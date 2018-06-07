import dva from 'dva';
import './index.css';
import HomeModel from './models/home';
import GoodsDetailModel from './models/goodsDetail';
import ConfirmOrderModel from './models/confirmOrder';
import ConfirmPayModel from './models/confirmPay';
import ConfirmPayResultModel from './models/confirmPayResult';
import MineModel from './models/mine';
import MyOrderModel from './models/myOrder';
import AddressModel from './models/address';
import ConfirmRefundModel from './models/confirmRefund';
import RefundStatusModel from './models/refundStatus';
import ConfirmRepayModel from './models/confirmRepay';
import CouponListModel from './models/couponList';
import HelpCenterModel from './models/helpCenter';
import WhiteModel from './models/white';
import LoginModel from './models/login/login';
import RegisModel from './models/regis';
import ConHistoryModel from './models/conHistory';
import BandCardModel from './models/bankCard';
import AddBankModel from './models/addBank';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';

// 1. Initialize
// const app = dva();


const app = dva({
    history: createHistory(),
    onAction: createLogger(),
    onError(e){
        console.log(e);
    }
});


// 2. Plugins
// app.use({});

// 3. Model 注册模型
// app.model(require('./models/example').default);
app.model(HomeModel);
app.model(GoodsDetailModel);
app.model(ConfirmOrderModel);
app.model(ConfirmPayModel);
app.model(ConfirmPayResultModel);
app.model(MineModel);
app.model(MyOrderModel);
app.model(AddressModel);
app.model(ConfirmRefundModel);
app.model(RefundStatusModel);
app.model(ConfirmRepayModel);
app.model(CouponListModel);
app.model(LoginModel);
app.model(RegisModel);
app.model(WhiteModel);
app.model(HelpCenterModel);
app.model(ConHistoryModel);
app.model(BandCardModel);
app.model(AddBankModel);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
