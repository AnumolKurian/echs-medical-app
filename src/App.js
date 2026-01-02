import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './page/admin/AdminDashboard';
import Usertable from './page/user/Usertable';
import Member from './page/admin/Member';
import NewMedicalBill from './page/user/NewMedicalBill';
import ShowUserSingleBill from './page/user/ShowUserSingleBill';
import ShowUserBill from './page/user/ShowUserBill';
import CmpLogin from './page/CmpLogin';
import MemberUpdate from './page/admin/MemberUpdate';
import MedicalBill from './page/admin/MedicalBill';
import MedicalBillView from './page/admin/MedicalBillView';
//import NewMedicalBill from './page/user/NewMedicalBill'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Routes for admin */}
          <Route path='/admin' element={<AdminDashboard />}>
            <Route path="Member" element={<Member />} />
            <Route path="MedicalBill" element={<MedicalBill />} />
            
          </Route>

          {/* Routes for user */}
          <Route path='/user' element={<Usertable />}>
            <Route path="NewMedicalBill" element={<NewMedicalBill />} />
            <Route path="showuserbill" element={<ShowUserBill />} />
            
          </Route>

          {/* Login */}
          <Route path='/' element={<CmpLogin />} />

          {/* Staff Update Route */}
          <Route path='/MemberUpdate/:echs_member_id' element={<MemberUpdate />} />

          <Route path="/show-user-single-bill/:echs_member_id" element={<ShowUserSingleBill />} />

          <Route path="/medicalbillview/:echs_member_id" element={<MedicalBillView />} />



          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;