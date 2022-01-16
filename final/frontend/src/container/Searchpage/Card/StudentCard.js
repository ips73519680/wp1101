//yc
import { Modal, Layout, Breadcrumb, Button, Row, Col, Divider } from 'antd';
import { LightBrown, LightWhite } from '../../../constant/color';
import styled from "styled-components";
import { UserOutlined, MailOutlined, SmileOutlined, FrownOutlined, MessageOutlined, CheckOutlined } from '@ant-design/icons';
import "./Card.css"
import 'antd/dist/antd.min.css'
import { Link } from 'react-router-dom';
import { client, sendData } from '../../../ws.js';
import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
const dashed = "dashed"

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
const StudentCard = () => {
    const [id, setId] = useState("");
    const [poster, setPoster] = useState("");
    const [subject, setSubject] = useState("");
    const [studentlevel, setStudentlevel] = useState("");
    const [place, setPlace] = useState("");
    const [money, setMoney] = useState("");
    const [content, setContent] = useState("");
    const [postdate, setPostdate] = useState("");
    const [degree, setDegree] = useState("");
    const [hopeContent, setHopeContent] = useState("");
    const [long, setLong] = useState("");
    const [frequency, setFrequency] = useState("");
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
        <Modal title={"Send message to " + poster} visible={isModalVisible} onOk={handleOk} onCancel={handleCanel}>
            <TextArea
                style={{ height: "120px", fontSize: "15px" }}
                enterButton="Chat"
                value={message}
                onChange={(e) => { setMessage(e.target.value) }}
                placeholder="您好，我對您的家教案件有興趣..."
            ></TextArea>
        </Modal>
    )

    client.onmessage = async (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            // 對應後端
            case 'loadedFullStudent': {  // load student data
                console.log("payload data is:", payload);
                setPoster(payload.poster);
                setId(payload.id);
                setSubject(payload.subject);
                setPlace(payload.place);
                setStudentlevel(payload.studentlevel);
                setMoney(payload.money);
                setPostdate(payload.postdate);
                setContent(payload.content);
                setDegree(payload.degree);
                setHopeContent(payload.hopeContent);
                setLong(payload.long);
                setFrequency(payload.frequency);
                break;
            }
            default: break;
        }
    }


    const getStudentData = async () => {
        await sendData(["loadStudent"]);
    };

    return (
        <Layout>
            {ModalMode}
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, background: LightWhite }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    {/* <Breadcrumb.Item>List</Breadcrumb.Item> */}
                    <Breadcrumb.Item><Link to="/searchStudentPage" onClick={getStudentData}>找學生</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/StudentCard">StudentCard</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ border: 1, padding: 24, minHeight: 380, minWidth: 1346 }}>
                    <div style={{ padding: 10, display: 'flex', flexDirection: 'row', height: "50px", alignItems: 'center' }}>
                        <CustomSubtitle>{"案件編號： " + id + " "}</CustomSubtitle>
                    </div>
                    <Col className="gutter-row" span={24} style={{ padding: 10, width: '98%' }} >

                        <Row style={{ margin: 10, padding: '20px', width: "100%", borderRadius: 10, background: LightWhite, minHeight: "540px" }}>
                            <div style={{ flexDirection: 'column', padding: 20 }}>
                                <h1 style={{ margin: "10px 50px", height: "20px", fontSize: " 1em", color: "#162e4d" }}>{" " + postdate}</h1>
                                <CustomTitle><UserOutlined />{"  " + poster}</CustomTitle>
                            </div>

                            <Col span={18} style={{ margin: "30px", }}>

                                <Divider orientation="left" plain>學生希望學習什麼階段的課程？</Divider>
                                <CustomSubtitle>{degree}</CustomSubtitle>
                                <Divider orientation="left" plain>學生希望學習什麼科目？</Divider>
                                <CustomSubtitle>{subject}</CustomSubtitle>
                                <Divider orientation="left" plain>學生希望上課的內容？</Divider>
                                <CustomSubtitle>{hopeContent}</CustomSubtitle>
                                <Divider orientation="left" plain>您希望在哪裡上課？</Divider>
                                <CustomSubtitle>{place}</CustomSubtitle>
                                <Divider orientation="left" plain>您的上課預算為何？</Divider>
                                <CustomSubtitle>{money}</CustomSubtitle>
                                <Divider orientation="left" plain>您對於學生的程度為何？</Divider>
                                <CustomSubtitle>{studentlevel}</CustomSubtitle>
                                <Divider orientation="left" plain>希望每次上課時間多長？</Divider>
                                <CustomSubtitle>{long}</CustomSubtitle>
                                <Divider orientation="left" plain>希望多久上一次課？</Divider>
                                <CustomSubtitle>{frequency}</CustomSubtitle>
                                <Divider orientation="left" plain>還有什麼需要注意的地方嗎？</Divider>
                                <CustomSubtitle style={{ height: 'auto' }}>{content}</CustomSubtitle>


                            </Col>
                            <Col span={4} style={{ position: 'absolute', top: '50px', right: '0', flexDirection: 'column', height: '100%' }}>
                                <Button span={4} style={{ margin: 10, width: "50%", height: 30, backgroundColor: LightBrown, color: "white", textAlign: "center", borderRadius: 10, padding: 3, }}>Like  <SmileOutlined /></Button>
                                <Button span={4} style={{ margin: 10, width: "50%", height: 30, backgroundColor: LightBrown, color: "white", textAlign: "center", borderRadius: 10, padding: 3 }}>DisLike  <FrownOutlined rotate={180} /></Button>
                                <Button span={4} onClick={() => { showModal(); }} style={{ margin: 10, width: "50%", height: 30, backgroundColor: LightBrown, color: "white", textAlign: "center", borderRadius: 10, padding: 3 }}>聊聊  <MessageOutlined /></Button>
                            </Col>
                        </Row>
                    </Col>


                </div>
            </Content>

        </Layout>
    );
}
export default StudentCard;