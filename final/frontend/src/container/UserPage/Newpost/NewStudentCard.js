//yc
import { Input, Cascader, Select, Modal, Layout, Breadcrumb, Button, Row, Col, Divider } from 'antd';
import { LightBrown, LightWhite } from '../../../constant/color';
import styled from "styled-components";
import { UserOutlined, MailOutlined, SmileOutlined, FrownOutlined, MessageOutlined, CheckOutlined } from '@ant-design/icons';
import "./Newpost.css"
import 'antd/dist/antd.min.css'
import { Link } from 'react-router-dom';
import { client, sendData } from '../../../ws.js';
import { useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';

const dashed = "dashed"
const { Option, OptGroup } = Select;

const Area = [
    {
        value: '線上',
        label: '線上',
    }, {
        value: '實體',
        label: '實體',
        children: [
            {
                value: '臺北市',
                label: '臺北市',
                children: [
                    {
                        value: '中正區',
                        label: '中正區',
                    },
                    {
                        value: '大同區',
                        label: '大同區',
                    },
                    {
                        value: '中山區',
                        label: '中山區',
                    },
                    {
                        value: '松山區',
                        label: '松山區',
                    },
                    {
                        value: '大安區',
                        label: '大安區',
                    },
                    {
                        value: '萬華區',
                        label: '萬華區',
                    },
                    {
                        value: '信義區',
                        label: '信義區',
                    },
                    {
                        value: '士林區',
                        label: '士林區',
                    },
                    {
                        value: '北投區',
                        label: '北投區',
                    },
                    {
                        value: '內湖區',
                        label: '內湖區',
                    },
                    {
                        value: '南港區',
                        label: '南港區',
                    },
                    {
                        value: '文山區',
                        label: '文山區',
                    }

                ]
            },
            {
                value: '新北市',
                label: '新北市',
                children: [
                    {
                        value: '萬里區',
                        label: '萬里區'
                    },
                    {
                        value: '金山區',
                        label: '金山區'
                    },
                    {
                        value: '板橋區',
                        label: '板橋區'
                    },
                    {
                        value: '汐止區',
                        label: '汐止區'
                    },
                    {
                        value: '深坑區',
                        label: '深坑區',
                    },
                    {
                        value: '石碇區',
                        label: '石碇區',
                    },
                    {
                        value: '瑞芳區',
                        label: '瑞芳區',
                    },
                    {
                        value: '平溪區',
                        label: '平溪區',
                    },
                    {
                        value: '雙溪區',
                        label: '雙溪區',
                    },
                    {
                        value: '貢寮區',
                        label: '貢寮區',
                    },
                    {
                        value: '新店區',
                        label: '新店區',
                    },
                    {
                        value: '坪林區',
                        label: '坪林區',
                    },
                    {
                        value: '烏來區',
                        label: '烏來區',
                    },
                    {
                        value: '永和區',
                        label: '永和區',
                    },
                    {
                        value: '中和區',
                        label: '中和區',
                    },
                    {
                        value: '土城區',
                        label: '土城區',
                    },
                    {
                        value: '三峽區',
                        label: '三峽區',
                    },
                    {
                        value: '樹林區',
                        label: '樹林區',
                    },
                    {
                        value: '鶯歌區',
                        label: '鶯歌區',
                    },
                    {
                        value: '三重區',
                        label: '三重區',
                    },
                    {
                        value: '新莊區',
                        label: '新莊區',
                    },
                    {
                        value: '泰山區',
                        label: '泰山區',
                    },
                    {
                        value: '林口區',
                        label: '林口區',
                    },
                    {
                        value: '蘆洲區',
                        label: '蘆洲區',
                    },
                    {
                        value: '五股區',
                        label: '五股區',
                    },
                    {
                        value: '新莊區',
                        label: '新莊區',
                    },
                    {
                        value: '八里區',
                        label: '八里區',
                    },
                    {
                        value: '淡水區',
                        label: '淡水區',
                    },
                    {
                        value: '三芝區',
                        label: '三芝區',
                    },
                    {
                        value: '石門區',
                        label: '石門區',
                    }
                ]
            },
            {
                value: '基隆市',
                label: '基隆市',
                children: [
                    {
                        value: '仁愛區',
                        label: '仁愛區'
                    },
                    {
                        value: '信義區',
                        label: '信義區'
                    },
                    {
                        value: '中正區',
                        label: '中正區'
                    },
                    {
                        value: '中山區',
                        label: '中山區'
                    },
                    {
                        value: '安樂區',
                        label: '安樂區'
                    },
                    {
                        value: '暖暖區',
                        label: '暖暖區'
                    },
                    {
                        value: '七堵區',
                        label: '七堵區'
                    }

                ]
            }
        ]
    }

]

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
const NewStudentCard = () => {
    const [id, setId] = useState("");
    const [poster, setPoster] = useState("");
    const [subject, setSubject] = useState("");
    const [studentlevel, setStudentlevel] = useState("");
    const [place, setPlace] = useState("");
    const [money, setMoney] = useState("");
    const [content, setContent] = useState("");
    const [postdate, setPostdate] = useState("");

    // the variable in return
    const [degree, setDegree] = useState("");
    const [email, setEmail] = useState("");
    const [re_subject, setRe_subject] = useState("");
    const [re_place, setRe_place] = useState("");
    const [re_money, setRe_money] = useState("");
    const [re_teachyear, setRe_teachyear] = useState("");
    const [re_long, setRe_long] = useState("");
    const [re_frequency, setRe_frequency] = useState("");
    const [re_studentlevel, setRe_studentlevel] = useState("");
    const [message, setMessage] = useState('');
    const [hopeContent, setHopeContent] = useState("");

    client.onmessage = async (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            // 對應後端
            case 'loadedFullStudent': {  // load student data
                console.log("payload data is:", payload[0]);
                setEmail(payload[0].email);
                setPoster(payload[0].poster);
                setId(payload[0].id);
                setSubject(payload[0].subject);
                setPlace(payload[0].place);
                setStudentlevel(payload[0].studentlevel);
                setMoney(payload[0].money);
                setPostdate(payload[0].postdate);
                setContent(payload[0].content);
                break;
            }
            default: break;
        }
    }

    const uploadNewCase = async () => {
        if (!(degree && re_subject && re_place && re_money && re_teachyear && re_long && re_frequency && re_studentlevel && message && hopeContent)) alert('尚未填滿空格')
        else {
            console.log("uploadNewStudent:", [localStorage.getItem('email'), degree, re_subject, re_place, re_money, re_teachyear, re_long, re_frequency, re_studentlevel, message, hopeContent])
            await sendData(["uploadNewStudent", [localStorage.getItem('email'), degree, re_subject, re_place, re_money, re_teachyear, re_long, re_frequency, re_studentlevel, message, hopeContent]]);
            alert("創建成功");
        }
    };

    const getStudentData = async () => {
        await sendData(["loadStudent"]);

    };

    const subjectItem = ['國文', '英文', '數學', '生物', '地科', '物理', '化學', '地理', '歷史', '公民', '其他'];

    function displayRender(label) {
        return label[label.length - 1];
    }


    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <Layout>

            <div className="site-layout-background" style={{ border: 1, padding: 24, minHeight: 380, }}>
                <Col className="gutter-row" span={24} style={{ padding: 10, width: '98%' }} >

                    <Row style={{ margin: 10, padding: '20px', width: "100%", borderRadius: 10, background: LightWhite }}>
                        <div style={{ flexDirection: 'column', padding: 20 }}>
                            <CustomTitle>{" 您好，歡迎新增家教案件!"}</CustomTitle>
                        </div>
                        <Col span={22} style={{ margin: "30px", }}>

                            <Divider orientation="left" plain>學生希望學習什麼階段的課程？</Divider>
                            <Select defaultValue="選擇上課地點" style={{ width: 200, margin: "0px 40px" }} onChange={(e) => { setDegree(e) }} bordered={false} >
                                <Option value={"學齡"}>學齡前</Option>
                                <Option value={"國小"}>國小</Option>
                                <Option value={"國中"}>國中</Option>
                                <Option value={"高中"}>高中</Option>
                                <Option value={"大學"}>大學</Option>
                                <Option value={"社會人士"}>社會人士</Option>
                                <Option value={"其他"}>其他</Option>
                            </Select>
                            <Divider orientation="left" plain>學生希望學習什麼科目？</Divider>
                            <Select style={{ margin: "0px 40px", width: 600 }} bordered={false}
                                mode="multiple"
                                allowClear
                                placeholder="選擇課程科目"
                                defaultValue={[]}
                                onChange={(e) => { setRe_subject(e) }}
                            >
                                {subjectItem.map(subjectItem => (
                                    <Select.Option key={subjectItem} value={subjectItem}>
                                        {subjectItem}
                                    </Select.Option>
                                ))}
                            </Select>
                            <Divider orientation="left" plain>您希望在哪裡上課？</Divider>
                            <Cascader options={Area} onChange={(e) => { setRe_place(e) }} placeholder="選擇上課地點" style={{ margin: "0px 40px" }} bordered={false} />

                            <Divider orientation="left" plain>您的上課預算為何？（時薪）</Divider>
                            <Select defaultValue="選擇上課預算" style={{ width: 200, margin: "0px 40px" }} onChange={(e) => { setRe_money(e) }} bordered={false}>
                                <Option value={"500元以下"}>500元以下</Option>
                                <Option value={"500~700元"}>500~700元</Option>
                                <Option value={"700~1000元"}>700~1000元</Option>
                                <Option value={"1000元以上"}>1000元以上</Option>
                            </Select>
                            <Divider orientation="left" plain>您對於教學經驗的要求？</Divider>
                            <Select defaultValue="選擇教學經驗" style={{ width: 200, margin: "0px 40px" }} onChange={(e) => { setRe_teachyear(e) }} bordered={false}>
                                <Option value={"500元以下"}>無</Option>
                                <Option value={"有經驗即可"}>有經驗即可</Option>
                                <Option value={"一年以上"}>一年以上</Option>
                                <Option value={"兩年以上"}>兩年以上</Option>
                                <Option value={"五年以上"}>五年以上</Option>
                            </Select>
                            <Divider orientation="left" plain>希望每次上課時間多長？</Divider>
                            <Select defaultValue="選擇上課時長" style={{ width: 200, margin: "0px 40px" }} onChange={(e) => { setRe_long(e) }} bordered={false}>
                                <Option value={"1小時以內"}>1小時以內</Option>
                                <Option value={"1~2小時"}>1~2小時</Option>
                                <Option value={"2~3小時"}>2~3小時</Option>
                                <Option value={"3小時以上"}>3小時以上</Option>
                            </Select>
                            <Divider orientation="left" plain>希望多久上一次課？</Divider>
                            <TextArea
                                style={{ height: "20px", fontSize: "15px", margin: "0px 40px" }}
                                enterButton="Chat"
                                value={re_frequency}
                                onChange={(e) => { setRe_frequency(e.target.value) }}
                                bordered={false}
                                placeholder="我希望一週..."
                            >
                            </TextArea>

                            <Divider orientation="left" plain>學生的年級？</Divider>
                            <TextArea
                                style={{ height: "20px", fontSize: "15px", margin: "0px 40px" }}
                                enterButton="Chat"
                                value={re_studentlevel}
                                onChange={(e) => { setRe_studentlevel(e.target.value) }}
                                bordered={false}
                                placeholder="學生的年級為..."
                            >
                            </TextArea>

                            <Divider orientation="left" plain>學生希望上課的內容？</Divider>
                            <TextArea
                                style={{ height: "20px", fontSize: "15px", margin: "0px 40px" }}
                                enterButton="Chat"
                                value={hopeContent}
                                onChange={(e) => { setHopeContent(e.target.value) }}
                                bordered={false}
                                placeholder="學生希望的上課內容為..."
                            >
                            </TextArea>

                            <Divider orientation="left" plain>還有什麼需要注意的地方嗎？</Divider>
                            <TextArea
                                style={{ height: "120px", fontSize: "15px", margin: "0px 40px" }}
                                enterButton="Chat"
                                value={message}
                                onChange={(e) => { setMessage(e.target.value) }}
                                bordered={false}
                                placeholder="我希望..."
                            >
                            </TextArea>

                        </Col>
                    </Row>
                </Col>
                <Col className="gutter-row" span={24} style={{ padding: 10, width: '98%', display: 'flex', justifyContent: 'center' }}>
                    <Button style={{ margin: "5px", borderRadius: "10px", paddind: 5, background: LightWhite, color: 'black' }} onClick={uploadNewCase}>新增案件</Button>
                </Col>

            </div>
        </Layout>
    );
}
export default NewStudentCard;