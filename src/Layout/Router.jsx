import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/LogIn/Login";
import Registration from "../pages/Registration/Registration";
import ChangePassword from "../pages/Profile/Pages/ChangePassword/ChangePassword";
import Slots from "../pages/Slots/Slots";
import NetEnt from "../pages/Slots/NetEnt";
import Jili from "../pages/Slots/Jili";
import Pragmetic from "../pages/Slots/Pragmetic";
import RedTiger from "../pages/Slots/RedTiger";
import Jdb from "../pages/Slots/Jdb";
import PgSoft from "../pages/Slots/PgSoft";
import EasyGaming from "../pages/Slots/EasyGaming";
import Casino from "../pages/Casino/Casino";
import Evo from "../pages/Casino/Evo";
import Pragmatic from "../pages/Casino/Pragmatic";
import Playtech from "../pages/Casino/Playtech";
import Winfinity from "../pages/Casino/Winfinity";
import Ezugi from "../pages/Casino/Ezugi";
import Table from "../pages/Table/Table";
import JiliTable from "../pages/Table/JiliTable";
import KingMaker from "../pages/Table/KingMaker";
import Fishing from "../pages/Fishing/Fishing";
import JiliFishing from "../pages/Fishing/JiliFishing";
import BankDetails from "../pages/Profile/Pages/BankDetails/BankDetails";
import Crash from "../pages/Crash/Crash";
import JiliCrash from "../pages/Crash/JiliCrash";
import Spribe from "../pages/Crash/Spribe";
import Sportsbook from "../pages/Sportsbook/Sportsbook";
import Saba from "../pages/Sportsbook/Saba";
import Sexy from "../pages/Casino/Sexy";
import Referral from "../pages/Referral/Referral";
import Promotions from "../pages/Promotions/Promotions";
import Rewards from "../pages/Rewards/Rewards";
import Vip from "../pages/VIP/Vip";
import AgentAffiliate from "../pages/AgentAffiliate/AgentAffiliate";
import Profile from "../pages/Profile/Profile";
import Personal from "../pages/Profile/Pages/Personal/Personal";
import Users from "../pages/Admin/Users";
import WithDraw from "../pages/Admin/WithDraw";
import Overview from "../pages/Admin/Overview";
import BetHistory from "../pages/Admin/BetHistory";
import ViewUser from "../pages/Admin/ViewUser";
import Deposit from "../pages/Profile/Pages/Deposit/Deposit";
import Withdrawal from "../pages/Profile/Pages/Withdrawal/Withdrawal";
import Voucher from "../pages/Profile/Pages/Voucher/Voucher";
import History from "../pages/Profile/Pages/History/History";
import Turnover from "../pages/Profile/Pages/Turnover/Turnover";
import DepositInfo from "../pages/Admin/DepositInfo";
import Admin from "../pages/Admin/Admin";
import Unauthorized from "../pages/Unauthorize/Unauthorize";
import ProtectedRoute from "../pages/ProtectedRoute/ProtectedRoute";
import BettingPass from "../component/MobileResponsive/BettingPass";
import BetingHistory from "../component/MobileResponsive/BetingHistory";
import WithdrawalMobile from "../component/MobileResponsive/WithdrawalMobile";
import Cricket from "../pages/Cricket/Cricket";
import DepositMobile from "../component/MobileResponsive/DepositMobile";
import ManagePayment from "../pages/Admin/ManagePayment";
import MyBethistory from "../pages/Profile/Pages/MyBethistory/MyBethistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/cricket",
        element: <Cricket />,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/referral",
        element: <Referral />,
      },
      {
        path: "/promotion",
        element: <Promotions />,
      },
      {
        path: "/rewards",
        element: <Rewards />,
      },
      {
        path: "/agent-affiliate",
        element: <AgentAffiliate />,
      },
      {
        path: "/unauthorized",
        element: <Unauthorized />,
      },
      {
        path: "/vip",
        element: <Vip />,
      },
      {
        path: "/bet-pass",
        element: <BettingPass></BettingPass>,
      },
      {
        path: "/betinghistory",
        element: <BetingHistory></BetingHistory>,
      },
      {
        path: "/withdrawalmobile",
        element: <WithdrawalMobile></WithdrawalMobile>,
      },
      {
        path: "/deposit",
        element: <DepositMobile></DepositMobile>,
      },
      // admin dashboard
      {
        path: "/admin",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN", "SUB_ADMIN"]}>
            <Admin />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "users/:id",
            element: <ViewUser />,
          },
          {
            path: "deposit",
            element: <DepositInfo />,
          },
          {
            path: "withdraw",
            element: <WithDraw />,
          },
          {
            path: "bet-history",
            element: <BetHistory />,
          },
          {
            path: "overview",
            element: <Overview />,
          },
          {
            path: "dualpayment",
            element: <ManagePayment />,
          },
        ],
      },
      // user dashboard
      {
        path: "/profile",
        element: (
          <ProtectedRoute allowedRoles={["USER", "SUPER_ADMIN", "SUB_ADMIN"]}>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Navigate to="personal" replace /> },
          {
            path: "personal",
            element: <Personal />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
          {
            path: "betting-history",
            element: <MyBethistory />,
          },
          {
            path: "bank-details",
            element: <BankDetails />,
          },
          {
            path: "deposit",
            element: <Deposit />,
          },
          {
            path: "withdrawal",
            element: <Withdrawal />,
          },
          {
            path: "voucher",
            element: <Voucher />,
          },
          {
            path: "history",
            element: <History />,
          },
          {
            path: "turnover",
            element: <Turnover />,
          },
        ],
      },
      //slots
      {
        path: "/slots",
        element: <Slots></Slots>,
        children: [
          {
            path: "/slots/netent",
            element: <NetEnt></NetEnt>,
          },
          {
            path: "/slots/jili",
            element: <Jili></Jili>,
          },
          {
            path: "/slots/pragmatic",
            element: <Pragmetic></Pragmetic>,
          },
          {
            path: "/slots/redtiger",
            element: <RedTiger></RedTiger>,
          },
          {
            path: "/slots/jdb",
            element: <Jdb></Jdb>,
          },
          {
            path: "/slots/pgsoft",
            element: <PgSoft></PgSoft>,
          },
          {
            path: "/slots/easy",
            element: <EasyGaming></EasyGaming>,
          },
        ],
      },
      //casino
      {
        path: "/live-casino",
        element: <Casino></Casino>,
        children: [
          {
            path: "/live-casino/evo",
            element: <Evo></Evo>,
          },
          {
            path: "/live-casino/pragmatic",
            element: <Pragmatic></Pragmatic>,
          },
          {
            path: "/live-casino/sexy",
            element: <Sexy></Sexy>,
          },
          {
            path: "/live-casino/pt",
            element: <Playtech></Playtech>,
          },
          {
            path: "/live-casino/winfinity",
            element: <Winfinity></Winfinity>,
          },
          {
            path: "/live-casino/ezugi",
            element: <Ezugi></Ezugi>,
          },
        ],
      },
      //table
      {
        path: "/table",
        element: <Table></Table>,
        children: [
          {
            path: "/table/jili",
            element: <JiliTable></JiliTable>,
          },
          {
            path: "/table/km",
            element: <KingMaker></KingMaker>,
          },
        ],
      },
      //crash
      {
        path: "/crash",
        element: <Crash></Crash>,
        children: [
          {
            path: "/crash/jili",
            element: <JiliCrash></JiliCrash>,
          },
          {
            path: "/crash/spribe",
            element: <Spribe></Spribe>,
          },
        ],
      },
      //sports book
      {
        path: "/sportsbook",
        element: <Sportsbook></Sportsbook>,
        children: [
          {
            path: "/sportsbook/saba",
            element: <Saba></Saba>,
          },
        ],
      },
      //fishing
      {
        path: "/fishing",
        element: <Fishing></Fishing>,
        children: [
          {
            path: "/fishing/jili",
            element: <JiliFishing></JiliFishing>,
          },
        ],
      },
    ],
  },
]);

export default router;
