//yc
import { Modal, Layout, Breadcrumb, Button,Row, Col,Divider} from 'antd';
import { LightBrown, LightWhite } from '../../../constant/color';
import styled from "styled-components";
import { UserOutlined,MailOutlined,SmileOutlined,FrownOutlined, MessageOutlined  } from '@ant-design/icons';
import "./Card.css"
import 'antd/dist/antd.min.css'
import { Link } from 'react-router-dom';
import {client, sendData} from '../../../ws.js';
import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';

const CustomTitle = styled.h1`
    margin: 20px 50px;
    height: 40px;
    width: 400px;
    font-size: 1.5em;
    color: rgb(22, 46, 77);
`;

const CustomSubtitle = styled.h1`
    margin: 10px 50px;
    height: 30px;
    color: rgb(124,134,161);
    font-size: 1.3em;
`;

const { Header, Content, Footer } = Layout;
const CaseCard = () => {

    const getCaseData = async() => {
        await sendData(["loadCase"]);
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [phone, setPhone] = useState("");
    const [topic, setTopic] = useState("");
    const [money, setMoney] = useState("");
    const [way, setWay] = useState("");
    const [teacherreq, setTeacherreq] = useState("");
    const [content, setContent] = useState("");
    const [other, setOther] = useState("");
    const [date, setDate] = useState("");
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
        placeholder="您好，我對您的案件有興趣..."
      ></TextArea>
    </Modal>
  )


    client.onmessage = async (byteString) => {
        const {data} = byteString;
        const [task, payload] = JSON.parse(data) ;
        switch (task){
            // 對應後端
            case 'loadedFullCase':{  // load teacher data
                console.log("payload data is:", payload);
                setId(payload.id);
                setName(payload.name);
                setPhone(payload.phone);
                setEmail(payload.email);
                setTopic(payload.topic);
                setWay(payload.way);
                setMoney(payload.money);
                setTeacherreq(payload.teacherreq);
                setDate(payload.date);
                setContent(payload.content);
                setOther(payload.other);
                break;
            }
            default: break;
        }
    }

    return (
        <Layout>
            {ModalMode}
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, background: LightWhite}}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/searchCasePage" onClick={getCaseData}>找案件</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/CaseCard">CaseCard</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ border: 1, padding: 24, minHeight: 380,minWidth:1346 }}>
                <div style={{ padding:10, display: 'flex' ,flexDirection: 'row',height:"50px",alignItems:'center' }}>
                    <CustomSubtitle>{"案件編號： " + id + " "}</CustomSubtitle>
                </div>
                <Col className="gutter-row" span={24} style={{padding:10,width:'98%'}} >
                    
                    <Row  style={{margin:10, padding: '20px', width:"100%", borderRadius:10,  background:LightWhite, minHeight:"540px" }}>
                        <div style={{flexDirection:'column', padding: 20}}>
                            <h1 style={{margin: "10px 50px",height: "20px",fontSize:" 1em",color: "#162e4d"}}>{" " + date}</h1>
                            <CustomTitle><UserOutlined/>{"  " + name}</CustomTitle>
                            <CustomTitle><MailOutlined />{"  " + email}</CustomTitle>
                        </div>
                        
                        <Col span={18} style={{margin: "30px", }}>

                            
                            <Divider orientation="left" plain>您希望的服務類型？</Divider>
                            <CustomSubtitle>{topic}</CustomSubtitle>
                            <Divider orientation="left" plain>您希望的服務敘述？</Divider>
                            <CustomSubtitle>{content}</CustomSubtitle>
                            <Divider orientation="left" plain>您的手機聯絡方式為？</Divider>
                            <CustomSubtitle>{phone}</CustomSubtitle>
                            <Divider orientation="left" plain>您希望的服務模式？</Divider>
                            <CustomSubtitle>{way}</CustomSubtitle>
                            <Divider orientation="left" plain>您的預算為何？</Divider>
                            <CustomSubtitle>{money}</CustomSubtitle>
                            <Divider orientation="left" plain>您對於經驗的要求？</Divider>
                            <CustomSubtitle>{teacherreq}</CustomSubtitle>
                            <Divider orientation="left" plain>還有什麼需要注意的地方嗎？</Divider>
                            <CustomSubtitle style={{height:'auto'}}>{other}</CustomSubtitle>
                                
                        
                        </Col>
                        <Col span={4} style={{position:'absolute', top:'50px', right:'0',flexDirection:'column',height:'100%'}}>
                            <Button span={4} style={{margin:10 ,width:"50%",height:30,backgroundColor: LightBrown,color: "white",textAlign: "center", borderRadius:10, padding:3, }}>Like  <SmileOutlined /></Button>
                            <Button span={4} style={{margin:10 ,width:"50%", height:30,backgroundColor: LightBrown,color: "white",textAlign: "center", borderRadius:10, padding:3}}>DisLike  <FrownOutlined rotate={180}/></Button>
                            <Button span={4} onClick={() => {showModal();}} style={{margin:10 ,width:"50%", height:30,backgroundColor: LightBrown,color: "white",textAlign: "center", borderRadius:10, padding:3}}>聊聊  <MessageOutlined /></Button>
                        </Col>
                    </Row>
                </Col>
                    

                </div>
            </Content>

        </Layout>
    );
}
export default CaseCard;