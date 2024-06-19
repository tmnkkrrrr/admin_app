import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import ClientList from './dashboard/ClientList/ClientList';
import VisitorRoute from './routes/VisitorRouter';
import Login from './Login/Login';
import Refer_Earn from './dashboard/refer_earn/Refer_Earn';
import NotificationBroadcast from './dashboard/NotificationBroadcast/NotificationBroadcast';
import Banner from './dashboard/Banner/Banner';
import FullServiceBroker from './dashboard/FullServiceBroker/FullServiceBroker';
// import UnlistedShares from './dashboard/UnlistedShares/UnlistedShares';
import DiscServiceBroker from './dashboard/DiscServiceBroker/DiscServiceBroker';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<VisitorRoute Component={ClientList} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/client_list" element={<VisitorRoute Component={ClientList} />} />
        <Route path="/dashboard/banner" element={<VisitorRoute Component={Banner} />} />
        <Route path="/dashboard/discount_broker" element={<VisitorRoute Component={DiscServiceBroker} />} />
        <Route path="/dashboard/fullservice_broker" element={<VisitorRoute Component={FullServiceBroker} />} />
        {/* <Route path="/dashboard/unlisted_shares" element={<VisitorRoute Component={UnlistedShares} />} /> */}
        <Route path="/dashboard/refer_earn" element={<VisitorRoute Component={Refer_Earn} />} />
        <Route path="/dashboard/notifications"element={<VisitorRoute Component={NotificationBroadcast} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
