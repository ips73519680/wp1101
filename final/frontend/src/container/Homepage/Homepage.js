//yc
import { Layout, Breadcrumb, } from 'antd';
import { LightWhite,  } from '../../constant/color';
import Bar from './Bar';
import FindTeacher from './FindTeacher';
import FindStudent from './FindStudent';
import FindCase from './FindCase';
import { Link } from 'react-router-dom';
import { client, sendData } from '../../ws.js';

const dashed = "dashed"
const { Header, Content, Footer } = Layout;

const HomePage = () => {

  //https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dHV0b3J8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60
  //https://images.unsplash.com/photo-1589087394593-e1f8a7d30fed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHR1dG9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60
  //https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODV8fGJ1bGxldGlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60

  const getTeacherData = async () => {
    await sendData(["loadTeacher"]);
  };

  const getStudentData = async () => {
    await sendData(["loadStudent"]);
  };

  const getCaseData = async () => {
    await sendData(["loadCase"]);
  };

  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: LightWhite,
  };


  return (

    <Layout>
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, background: LightWhite }}>
        <Breadcrumb style={{ height: 100 }}></Breadcrumb>
        <div className="site-layout-background" style={{ background: LightWhite, fontSize: 50, padding: 24, minHeight: 150, textAlign: 'center', justifyContent: 'space-around', }}>
          走得多慢都無所謂，只要你不停下腳步！
        </div>
      </Content>
      <Bar style={{ padding: 20, justifyContent: 'space-around', backgroundColor: LightWhite, }}>

      </Bar>
      

      <Bar
        style={{ padding: 20, justifyContent: 'space-around', backgroundColor: LightWhite, minHeight: 400 }}
      >
        <FindTeacher style={{ color: "white", }}>
          <Link to="/searchTeacherPage" onClick={getTeacherData}>找老師</Link>
        </FindTeacher>
        <FindStudent style={{ color: "white", }}>
          <Link to="/searchStudentPage" onClick={getStudentData}>找學生</Link>
        </FindStudent>
        <FindCase style={{ color: "white", }}>
          <Link to="/searchCasePage" onClick={getCaseData}>找案件</Link>
        </FindCase>
      </Bar>

    </Layout>
  );
}

export default HomePage;
