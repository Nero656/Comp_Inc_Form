import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from "./Components/Header";
import Services from "./Components/Services";
import Stack from "./Components/Stack";
import Partners from "./Components/Partners";
import Auth from './views/User/Auth'
import Reg from './views/User/Reg'
import Request from "./views/Request";
import RequestList from "./views/RequestList";
import ShowRequest from "./views/ShowRequest";
import ServiceAdmin from "./views/AdminPages/Services/Main"
import StackAdmin from "./views/AdminPages/Stack/Main"
import PartnersAdmin from "./views/AdminPages/Partners/Main"
import UserRequestList from "./views/AdminPages/UserRequestList";
import './App.css';


const Main = () => {
    return (
        <div className={'container-md'}>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Comp_inc</h1>
                    <p className="lead">Наш телефон +7 000 800 7777</p>
                </div>
                <hr/>
            </div>
            <Services/>
            <Stack/>
            <Partners/>
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
                    <Route path=':/Auth' element={<Auth/>}/>
                    <Route path=':/Reg' element={<Reg/>}/>
                    <Route path=':/Request' element={<Request/>}/>
                    <Route path=':/RequestList' element={<RequestList/>}/>
                    <Route path='/RequestList/request/:id' element={<ShowRequest/>}/>
                    <Route path={':/service'} element={<ServiceAdmin/>}/>
                    <Route path={':/stack'} element={<StackAdmin/>}/>
                    <Route path={':/partners'} element={<PartnersAdmin/>}/>
                    <Route path={':/user-request'} element={<UserRequestList/>}/>
                    <Route path={'/RequestList/user/:id'} element={<RequestList/>}/>
                </Routes>
            </div>
        </Router>
    );
}