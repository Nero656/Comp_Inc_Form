import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from "./Components/Header";
import Gyms from "./Components/Gyms";
import Reservoirs from "./Components/Reservoir";
import Gym from "./views/Gym/Main"
import Reservoir from "./views/Reservoir/Main";
import Auth from './views/User/Auth'
import Reg from './views/User/Reg'
import UserPage from './views/User/UserPage'
import Equipments from './views/equipments/Main'
import AppointAnInstructor from './views/User/appointAnInstructorForm/Main'
import TheoreticalLessons from './views/User/TheoreticalLessons/Main'
import LessonsList from './views/User/TheoreticalLessons/LessonsList'
import Request from "./views/Request";
import RequestList from "./views/RequestList";
import ShowRequest from "./views/ShowRequest";
import GymAdmin from "./views/AdminPages/Gyms/Main"
import ReservoirsAdmin from "./views/AdminPages/Reservoirs/Main"
import UserRequestList from "./views/AdminPages/UserRequestList";
import Services from "./views/Services";
import UserServices from "./views/User/Services";
import UserCertificate from "./views/User/CertificateList";
import MedicalCheckup from "./views/User/medical/MedicalСheckup";
import MedicalExaminationsList from "./views/User/medical/MedicalExaminationsList";
import ShowMedicalTestRes from "./views/User/medical/showMedicalTestRes";
import DaveList from "./views/User/Dive/List"
import DavePreview from "./views/User/Dive/Preview"
import DaveCreate from "./views/User/Dive/Create"
import IssueACertificate from "./views/AdminPages/Сertificates/Main";

import './App.css';
import {Space} from "antd";

const Main = () => {
    return (
        <div className={'container-md'}>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Shark</h1>
                    <p className="lead">Наш телефон +7 000 800 7777</p>
                </div>
                <hr/>
            </div>
            <Space direction={'vertical'} size={20}>
                <Gyms/>
                <Reservoirs/>
            </Space>
        </div>
    )
}

export default function App() {
    return (
        <Router>
            <Header/>
            <div className={'body'}>
                <Routes>
                    <Route path='/' element={<Main/>}/>
                    <Route path={':/Auth'} element={<Auth/>}/>
                    <Route path={':/Reg'} element={<Reg/>}/>
                    <Route path={'/UserPage/:id'} element={<UserPage/>}/>
                    <Route path={':/Equipments'} element={<Equipments/>}/>
                    <Route path={'/appoint_an_instructor/:id'} element={<AppointAnInstructor/>}/>
                    <Route path={':/TheoreticalLessons'} element={<TheoreticalLessons/>}/>
                    <Route path={'/TheoreticalLessonsList/:id'} element={<LessonsList/>}/>
                    <Route path={':/Request'} element={<Request/>}/>
                    <Route path={':/RequestList'} element={<RequestList/>}/>
                    <Route path={':/RequestList/request/:id'} element={<ShowRequest/>}/>
                    <Route path={':/Gym/:id'} element={<Gym/>}/>
                    <Route path={':/Reservoir/:id'} element={<Reservoir/>}/>
                    <Route path={':/GymAdmin'} element={<GymAdmin/>}/>
                    <Route path={':/ReservoirsAdmin'} element={<ReservoirsAdmin/>}/>
                    {/*<Route path={':/partners'} element={<PartnersAdmin/>}/>*/}
                    <Route path={':/issue_a_certificate'} element={<IssueACertificate/>}/>
                    <Route path={':/user-request'} element={<UserRequestList/>}/>
                    <Route path={':/Services'} element={<Services/>}/>
                    <Route path={'/DiveList/:id'} element={<DaveList/>}/>
                    <Route path={'/DivePreview/:id'} element={<DavePreview/>}/>
                    <Route path={'/DiveCreate/:id'} element={<DaveCreate/>}/>
                    <Route path={'/Services/user/:id'} element={<UserServices/>}/>
                    <Route path={'/Certificate/user/:id'} element={<UserCertificate/>}/>
                    <Route path={'/Medical_checkup/user/:id'} element={<MedicalCheckup/>}/>
                    <Route path={'/Medical_examinations_list/user/:id'} element={<MedicalExaminationsList/>}/>
                    <Route path={'/Medical_examinations_list/Test/:id'} element={<ShowMedicalTestRes/>}/>
                    <Route path={'/RequestList/user/:id'} element={<RequestList/>}/>
                </Routes>
            </div>
        </Router>
    );
}