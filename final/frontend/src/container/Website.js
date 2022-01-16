

import React from 'react';
import 'antd/dist/antd.min.css'
import { Routes, Route, Outlet, Link } from 'react-router-dom';

import FFooter from "../component/Footer";
import HHeader from "../component/Header";
import NewTeacherPage from "../container/Addpage/NewTeacherpage"
import NewStudentPage from "../container/Addpage/NewStudentPage"
import NewCasePage from "../container/Addpage/NewCasePage"
import SignInPage from "../container/SignInpage/SignInpage";
import SignUpPage from "./SignUppage/SignUppage";
import SearchTeacherPage from "./Searchpage/SearchTeacherPage"
import SearchStudentPage from "./Searchpage/SearchStudentPage"
import SearchCasePage from "./Searchpage/SearchCasePage"
import Homepage from "./Homepage/Homepage"
import ClassroomPage from "./UserPage/Classroompage/Classroompage";
import Userpage from "./UserPage/UserPage";
import TeacherCard from "./Searchpage/Card/TeacherCard";
import StudentCard from "./Searchpage/Card/StudentCard";
import CaseCard from "./Searchpage/Card/CaseCard";
import AuthRoute from '../component/AuthRoute';

const Website = () => {

    return (
        <>
            <HHeader />
            <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="/SearchTeacherPage" element={<SearchTeacherPage />}></Route>
                <Route path="/SearchStudentPage" element={<SearchStudentPage />} />
                <Route path="/SearchCasePage" element={<SearchCasePage />} />
                <Route path="/NewTeacherPage" element={<AuthRoute><NewTeacherPage /></AuthRoute>}></Route>
                <Route path="/NewStudentPage" element={<AuthRoute><NewStudentPage /></AuthRoute>}></Route>
                <Route path="/NewCasePage" element={<AuthRoute><NewCasePage /></AuthRoute>}></Route>
                <Route path="/SignInPage" element={<SignInPage />}></Route>
                <Route path="/ClassroomPage" element={<AuthRoute><ClassroomPage /></AuthRoute>}></Route>
                <Route path="/SignUpPage" element={<SignUpPage />}></Route>
                <Route path="/Userpage" element={<AuthRoute><Userpage /></AuthRoute>}></Route>
                <Route path="/TeacherCard" element={<AuthRoute><TeacherCard /></AuthRoute>}></Route>
                <Route path="/StudentCard" element={<AuthRoute><StudentCard /></AuthRoute>}></Route>
                <Route path="/CaseCard" element={<AuthRoute><CaseCard /></AuthRoute>}></Route>
            </Routes>
            <FFooter />

        </>
    )
}
export default Website;