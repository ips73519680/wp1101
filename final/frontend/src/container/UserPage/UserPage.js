//liu
import { Layout, Menu, Breadcrumb, ConfigProvider } from 'antd';
import 'antd/dist/antd.variable.min.css';
import calender from './calender';
import NameCard from './Namecard/Namecard';
import ClassroomPage from './Classroompage/Classroompage';
import ChatroomPage from './Chatroompage/Chatroompage';
import NewStudentCard from './Newpost/NewStudentCard';
import NewCaseCard from './Newpost/NewCaseCard';
import TeacherCard from './Namecard/TeacherCard';
import TeacherCollect from './Collect/TeacherCollect';
import StudentCollect from './Collect/StudentCollect';
import CaseCollect from './Collect/CaseCollect';
// import ChatHeader from './Chatroompage/Header';
import { useState } from 'react';
import './UserPageFrame.css'
import { client, sendData } from '../../ws.js';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

//change antd_primaryColor

const UserPage = () => {

    ConfigProvider.config({
        theme: {
            primaryColor: '#af9b8d',
        },
    });

    const [infoType, setInfoType] = useState('個人資料')
    const [identity, setIdentity] = useState('基本資料')

    return (
        <Layout >
            <Header className="header" style={{}}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>

                </Menu>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu key="sub1" onClick={() => { setInfoType('個人資料') }} title="個人資料">
                            <Menu.Item key="1" onClick={() => {
                                setIdentity('基本資料')
                                sendData(['loadBaseUser'])
                            }}>基本資料</Menu.Item>
                            <Menu.Item key="2" onClick={() => {
                                setIdentity('我的履歷')
                                sendData(['loadFullUser'])
                            }}>我的履歷</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" onClick={() => { setInfoType('我的收藏') }} title="我的收藏">
                            <Menu.Item key="4" onClick={() => {
                                setIdentity('老師資訊')
                                sendData(["loadMyTeacher"])
                            }}>老師資訊</Menu.Item>
                            <Menu.Item key="5" onClick={() => {
                                setIdentity('學生家教')
                                sendData(["loadMyStudent"])
                            }}>學生家教</Menu.Item>
                            <Menu.Item key="6" onClick={() => {
                                setIdentity('一般案件')
                                sendData(["loadMyCase"])
                            }}>一般案件</Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub3" onClick={() => { setInfoType('新增案件') }} title="新增案件">
                            <Menu.Item key="10" onClick={() => { setIdentity('家教案件') }}>家教案件</Menu.Item>
                            <Menu.Item key="11" onClick={() => { setIdentity('一般案件') }}>一般案件</Menu.Item>
                        </SubMenu>
                        {/* <Menu.Item key="7" onClick={() => {setInfoType('聊天室');setIdentity('')}}>聊天室</Menu.Item>
                        <Menu.Item key="8" onClick={() => {setInfoType('行事曆');setIdentity('')}}>行事曆</Menu.Item>
                        <Menu.Item key="9" onClick={() => {setInfoType('上課教室');setIdentity('')}}>上課教室</Menu.Item> */}

                        {/* <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                            
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu> */}
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>會員中心</Breadcrumb.Item>
                        <Breadcrumb.Item>{infoType}</Breadcrumb.Item>
                        <Breadcrumb.Item>{identity}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 610,
                        }}
                    >
                        {infoType == '新增案件' && identity == '家教案件' ? <NewStudentCard /> : infoType == '新增案件' && identity == '一般案件' ? <NewCaseCard /> : infoType == '上課教室' ? <ClassroomPage /> : infoType == '行事曆' ? calender() :
                            infoType == '我的收藏' && identity == '老師資訊' ? <TeacherCollect /> : infoType == '我的收藏' && identity == '學生家教' ? <StudentCollect /> : infoType == '我的收藏' && identity == '一般案件' ? <CaseCollect /> : infoType == '聊天室' ? <ChatroomPage /> : identity == '基本資料' ? <NameCard /> : <TeacherCard />}
                    </Content>
                </Layout>
            </Layout>
        </Layout >
    )
};

export default UserPage