//liu
//yc
import { Modal,Layout, Breadcrumb, Button,Row, Col} from 'antd';
import { LightWhite, LightBrown} from '../../../constant/color';
import styled from "styled-components";
import { UserOutlined,MailOutlined,StarOutlined, MessageOutlined,SmileOutlined, FrownOutlined } from '@ant-design/icons';
import "./Card.css"
import 'antd/dist/antd.min.css'
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { client, sendData } from '../../../ws.js';
import TextArea from 'antd/lib/input/TextArea';


const dashed = "dashed"

const CustomTitle = styled.h1`
    height: 40px;
    width: 400px;
    font-size: 1.8em;
    color: rgb(22, 46, 77);
`;

const CustomSubtitle = styled.h1`
    margin: 5px 5px;
    height: 30px;
    color: rgb(124,134,161);
    font-size: 1.3em;
`;

const { Header, Content, Footer } = Layout;
const TeacherCard = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [subject, setSubject] = useState("");
    const [place, setPlace] = useState("");
    const [department, setDepartment] = useState("");
    const [teachyear, setTeachyear] = useState("");
    const [score, setScore] = useState("");
    const [content, setContent] = useState("");
    const [picture, setPicture] = useState("https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/2b3f6ff00db7a1efae21d85cfb8995eaff2da8d8.png")
    /* for Modal */
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [message, setMessage] = useState('');

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCanel = () => {
        setIsModalVisible(false);
    };

const ModalMode = (
    <Modal title = {"Send message to " + name} visible={isModalVisible} onOk = {handleOk} onCancel={handleCanel}>
      <TextArea
        style={{ height:"120px", fontSize:"15px"}}
        enterButton="Chat"
        value = {message}
        onChange = { (e) => { setMessage(e.target.value) } }
        // onSearch = { (msg) => {
        //   if(msg === ''){
        //     displayStatus({type : 'error', msg : 'Invalid username'});
        //   }
        //   else{
        //     let Found = false;
        //     for(let i = 0;i < panes.length;i++){
        //       if(panes[i].title === msg) Found = true;
        //     }
        //     if(!Found){
        //       add(msg);
        //       setMessage('');
        //       handleOk();
        //       displayStatus({type : 'success', msg : 'Successfully send!'});
        //     }
        //     else{
        //       displayStatus({type : 'error', msg : 'Send fail'});
        //     }
        //   }
        // }}
        placeholder="老師您好，我有家教需求..."
      ></TextArea>
    </Modal>
  )

    const getTeacherData = async() => { 
        await sendData(["loadTeacher"]); 
    };

    client.onmessage = async (byteString) => {
        const {data} = byteString;
        const [task, payload] = JSON.parse(data) ;
        switch (task){
            // 對應後端
            case 'loadedFullTeacher':{  // load teacher data
                console.log("payload data is:", payload);
                setName(payload.username);
                setEmail(payload.email);
                setId(payload.id);
                setSubject(payload.subject);
                setPlace(payload.place);
                setDepartment(payload.department);
                setTeachyear(payload.teachyear);
                setScore(payload.score);
                setContent(payload.content);
                setPicture(payload.img)
                break;
            }
            
            
            default: break;
        }
    }

    // console.log(selectID);

    return (
        <Layout>
            
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, background: LightWhite}}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    {/* <Breadcrumb.Item>List</Breadcrumb.Item> */}
                    <Breadcrumb.Item><Link to="/searchTeacherPage" onClick={getTeacherData}>找老師</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/TeacherCard">TeacherCard</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ border: 1, padding: 24, minHeight: 380,minWidth:1346 }}>
                <div style={{ padding:10, display: 'flex' ,flexDirection: 'row',height:"50px",alignItems:'center' }}>
                <CustomSubtitle>{"會員編號： " + id + " "}</CustomSubtitle>
                <p style={{position:'absolute', right: "80px",margin:"0px", color:"#162E4D"}}>{"評分： " + score + "   "}<StarOutlined /></p>
            </div>


            {/* 評分 e.g. 評分: 93 */}
            <Row gutter={16} style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 , minHeight:"540px" }}>
                {ModalMode}
                <Col span={8} style={{padding:10, display: 'flex',alignItems:'center', flexDirection:'column',margin: " 20px 0px"}}>
                    <img className='teacherPic' src={picture} style={{display:'center',width:'auto',height:'auto',maxHeight:'90%', maxWidth:'90%'}}></img>
                    <Row>
                        <Col span={12} style={{padding:10, display: 'flex',alignItems:'center', flexDirection:'column',margin: " 20px 0px"}}>
                            <Button span={4} style={{width:"100%",height:30,backgroundColor: LightBrown,color: "white",textAlign: "center", borderRadius:10, padding:3,margin: " 5px"}}>Like  <SmileOutlined /></Button>
                            <Button span={4} style={{width:"120%", height:30,backgroundColor: LightBrown,color: "white",textAlign: "center", borderRadius:10, padding:3,margin: " 5px"}}>DisLike  <FrownOutlined rotate={180}/></Button>
                        </Col>
                        <Col span={12} style={{padding:10, display: 'flex',alignItems:'center', flexDirection:'column',margin: " 20px 0px"}}>
                            <Button span={4} style={{width:"100%", height:30,backgroundColor: LightBrown,color: "white",textAlign: "center", borderRadius:10, padding:3,margin: " 5px"}}>評分  <StarOutlined /></Button>
                            <Button span={4} onClick={() => showModal()} style={{width:"100%", height:30,backgroundColor: LightBrown,color: "white",textAlign: "center", borderRadius:10, padding:3,margin: " 5px"}}>聊聊  <MessageOutlined /></Button>
                        </Col>
                    </Row>
                </Col>
                <Col span={16} style={{margin: " 10px 0px", background: LightWhite, padding:30,borderRadius:10}}>
                   
                   
                    <CustomTitle ><UserOutlined />{" " + name + " "}</CustomTitle>
                        {/* 姓名 + ID ; e.g. 劉大悅 983748 */}
                    
                    <CustomSubtitle><MailOutlined />{" " + email + " "}</CustomSubtitle>
                        {/* 聯繫方式; e.g. philip910323@gmail.com */}

                    <CustomSubtitle>{"地區： " + place + " "}</CustomSubtitle>
                        {/* 地區; e.g. 台北市 */}
                
                    <CustomSubtitle>{"系所： " + department + " "}</CustomSubtitle>
                        {/* 系所; e.g. 地理系 */}

                    <CustomSubtitle>{"科目： " + subject + " "}</CustomSubtitle>
                        {/* 科目; e.g. 數學 */}

                    <CustomSubtitle>{ "教學經驗：" + teachyear + " "}</CustomSubtitle>
                        {/* 教學經驗 ; e.g. 1~2年 */}

                        <CustomSubtitle>自我介紹：</CustomSubtitle>
                        <CustomSubtitle style={{height:'auto'}}>{content}</CustomSubtitle>
                        {/* 補充資料 e.g. 我特別擅長教數學 */}
                
                </Col>
            </Row>


                </div>
            </Content>

        </Layout>
    );
}
export default TeacherCard;