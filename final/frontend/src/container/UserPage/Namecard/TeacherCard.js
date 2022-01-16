// Buffett
//yc
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Select, Cascader, Layout, Menu, Breadcrumb, Button ,Row, Col, Input,Switch} from 'antd';
import { BookOutlined, UserOutlined,MailOutlined,StarOutlined, EditOutlined ,CheckOutlined,HomeOutlined } from '@ant-design/icons';
import { DarkBlue, GrayBlue } from '../../../constant/color';
import './Namecard.css'
import TextArea from 'antd/lib/input/TextArea';
import { client, sendData } from '../../../ws.js';

const { Option, OptGroup } = Select;
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

const Area = [
    
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

const Department = [

    {
        value: '文學院',
        label: '文學院',
        children: [
            {
            value: '中國文學系',
            label: '中國文學系',
            },
            {
                value: '外國語文學系',
                label: '外國語文學系',
            },
            {
                value: '歷史學系',
                label: '歷史學系',
            },
            {
                value: '哲學系',
                label: '哲學系',
            },
            {
                value: '人類系',
                label: '人類系',
            },
            {
                value: '圖書資訊學系',
                label: '圖書資訊學系',
            },
            {
                value: '日本語文學系',
                label: '日本語文學系',
            },
            {
                value: '戲劇學系',
                label: '戲劇學系',
            }
        ]
        },
        {
        value: '理學院',
        label: '理學院',
        children: [
            {
            value: '數學系',
            label: '數學系'
            },
            {
            value: '物理學系',
            label: '物理學系'
            },
            {
                value: '化學系',
                label: '化學系'
            },
            {
                value: '地質科學系',
                label: '地質科學系'
            },
            {
                value: '心理學系',
                label: '心理學系',
            },
            {
                value: '地理環境資源學系',
                label: '地理環境資源學系',
            },
            {
                value: '大氣科學系',
                label: '大氣科學系',
            }
        ]
        },
        {
            value: '社會科學院',
            label: '社會科學院',
            children: [
            {
                value: '政治學系',
                label: '政治學系'
            },
            {
                value: '經濟學系',
                label: '經濟學系'
            },
            {
                value: '社會學系',
                label: '社會學系'
            },
            {
                value: '社會工作學系',
                label: '社會工作學系'
            }
            ]
        },
        {
            value: '醫學院',
            label: '醫學院',
            children: [
                {
                value: '醫學系',
                label: '醫學系',
                },
                {
                    value: '護理學系',
                    label: '護理學系',
                },
                {
                    value: '醫學檢驗暨生物技術學系',
                    label: '醫學檢驗暨生物技術學系',
                },
                {
                    value: '職能治療學系',
                    label: '職能治療學系',
                },
                {
                    value: '物理治療學系',
                    label: '物理治療學系',
                },
                {
                    value: '牙醫系',
                    label: '牙醫系',
                },
                {
                    value: '藥學系',
                    label: '藥學系',
                }
            ]
            },
            {
                value: '工學院',
                label: '工學院',
                children: [
                    {
                    value: '土木工程學系',
                    label: '土木工程學系',
                    },
                    {
                        value: '外國語文學系',
                        label: '外國語文學系',
                    },
                    {
                        value: '機械工程學系',
                        label: '機械工程學系',
                    },
                    {
                        value: '化學工程學系',
                        label: '化學工程學系',
                    },
                    {
                        value: '工程科學及海洋工程學系',
                        label: '工程科學及海洋工程學系',
                    },
                    {
                        value: '材料科學與工程學系',
                        label: '材料科學與工程學系',
                    },
                    {
                        value: '醫學工程學系',
                        label: '醫學工程學系',
                    }
                ]
                },
                {
                    value: '生物資源暨農學院',
                    label: '生物資源暨農學院',
                    children: [
                    {
                        value: '農藝學系',
                        label: '農藝學系',
                    },
                    {
                        value: '生物環境系統工程學系',
                        label: '生物環境系統工程學系',
                    },
                    {
                        value: '農業化學系',
                        label: '農業化學系',
                    },
                    {
                        value: '植物病理與微生物學系',
                        label: '植物病理與微生物學系',
                    },
                    {
                        value: '森林環境暨資源學系',
                        label: '森林環境暨資源學系',
                    },
                    {
                        value: '動物科學技術學系',
                        label: '動物科學技術學系',
                    },
                    {
                        value: '農業經濟學系園藝暨景觀學系',
                        label: '農業經濟學系園藝暨景觀學系',
                    },
                    {
                        value: '生物產業傳播暨發展學系',
                        label: '生物產業傳播暨發展學系',
                    },
                    {
                        value: '生物機電工程學系',
                        label: '生物機電工程學系',
                    },
                    {
                        value: '昆蟲學系',
                        label: '昆蟲學系',
                    },
                    {
                        value: '獸醫學系',
                        label: '獸醫學系',
                    }
                    ]
                    },
                    {
                        value: '管理學院',
                        label: '管理學院',
                        children: [
                    {
                        value: '工商管理學系',
                        label: '工商管理學系',
                    },
                    {
                        value: '會計學系',
                        label: '會計學系',
                    },
                    {
                        value: '財務金融學系',
                        label: '財務金融學系',
                    },
                    {
                        value: '國際企業學系',
                        label: '國際企業學系',
                    }
                    ]
                    },
                    {
                        value: '公共衛生學院',
                        label: '公共衛生學院',
                        children: [
                    {
                        value: '公共衛生學系',
                        label: '公共衛生學系',
                    }
                    ]
                    },
                    {
                        value: '電機資訊學院',
                        label: '電機資訊學院',
                        children: [
                    {
                        value: '電機工程學系',
                        label: '電機工程學系',
                    },
                    {
                        value: '資訊工程學系',
                        label: '資訊工程學系',
                    }
                    ]
                    },
                    {
                        value: '法律學院',
                        label: '法律學院',
                        children: [
                    {
                        value: '法律學系',
                        label: '法律學系',
                    }
                    ]
                    },
                    {
                        value: '生命科學院',
                        label: '生命科學院',
                        children: [
                    {
                        value: '生命科學系',
                        label: '生命科學系',
                    },
                    {
                        value: '生化科技學系',
                        label: '生化科技學系',
                    }
                    ]
                    }
    ]

const subjectItem = ['國文','英文','數學','生物','地科','物理','化學','地理','歷史','公民','其他'];




// const NameCardSet = {"NameCardSet": ["name", "department", "place", "subject", "teachyear", "score", "content"]}

const TeacherCard = () => {
    //name, id, subject, place, department, teachyear, score, content
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

    const [complete, setConplete] = useState(false);
    const [editAll, setEditAll] = useState(false);
    const [nameEdit, setNameEdit] = useState(false);
    const [departmentEdit, setDepartmentEdit] = useState(false);
    const [placeEdit, setPlaceEdit] = useState(false);
    const [subjectEdit, setSubjectEdit] = useState(false);
    const [teachyearEdit, setTeachyearEdit] = useState(false);
    const [contentEdit, setContentEdit] = useState(false);
    const [pictureEdit, setPictureEdit] = useState(false);

    const [tmpName, setTmpName] = useState(name);
    const [tmpDepartment, setTmpDepartment] = useState(department);
    const [tmpPlace, setTmpPlace] = useState(place);
    const [tmpSubject, setTmpSubject] = useState(subject);
    const [tmpTeacherYear, setTmpTeacherYear] = useState(teachyear);
    const [tmpContent, setTmpContent] = useState(content);

    function handleChange(value) {
        setTmpPlace(value[0] + " " + value[1]);
        setPlace(value[0] + " " + value[1]);
        console.log(`selected ${value}`);
    }

    function handleDepartmentChange(value) {
        setTmpDepartment(value[1]);
        setDepartment(value[1]);
        console.log(`selected ${value[1]}`);
    }

    useEffect(() => {
        setConplete(editAll | nameEdit | departmentEdit | placeEdit | subjectEdit | teachyearEdit | contentEdit);
    });

    const handleEditAll = (e) => {
        setEditAll(true);
        NETrue();
        DETrue();
        PLTrue();
        SUTrue();
        TYTrue();
        CTTrue();
    }

    const reEditAll = (e) => {
        setTmpName(name);
        setTmpDepartment(department);
        setTmpPlace(place);
        setTmpSubject(subject);
        setTeachyear(teachyear);
        setTmpContent(content);
    }

    const finishEdit = (e) => {
        setEditAll(false);  // finish edit all
        setNameEdit(false);
        setDepartmentEdit(false);
        setPlaceEdit(false);
        setSubjectEdit(false);
        setTeachyearEdit(false);
        // setScoreEdit(false);
        setContentEdit(false);
        // setName(tmpName);
        // setDepartment(tmpDepartment);
        // setPlace(tmpPlace);
        // setSubject(tmpSubject);
        // setTeachyear(tmpTeacherYear);
        // setContent(tmpContent);
        updateFullUser();
    }

    // handle Edit
    const handleNameEdit = (e) => {
        setName(e.target.value);
        setNameEdit(false);
        updateFullUser();
    }

    const handlePicEdit = (e) => {
        setPicture(e.target.value);
        setPictureEdit(false);
        updateFullUser();
    }

    const handleDepartmentEdit = (e) => {
        setDepartment(e.target.value);
        setDepartmentEdit(false);
    }

    const handlePlaceEdit = (e) => {
        setPlace(e.target.value);
        setPlaceEdit(false);
    }

    const handleSubjectEdit = (e) => {
        setSubject(e.target.value);
        setSubjectEdit(false);
    }

    const handleContentEdit = (e) => {
        setContent(e.target.value);
        setContentEdit(false);
        updateFullUser();
    }

    const handleTeacherYearChange = (value) => {
        setTmpTeacherYear(value);
        setTeachyear(value);
        console.log(`selected ${value}`);
    }

    const handleSubjectChange = (value) => {
        setTmpSubject(value);
        setSubject(value);
        console.log(`selected ${value}`);
    }
    


    client.onmessage = async (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            // 對應後端
            case 'loadedFullUser': {  // load teacher data
                console.log("payload data is:", payload);
                setPicture(payload.img);
                setId(payload.id);
                setName(payload.username);
                setEmail(payload.email);
                setPlace(payload.place);
                setDepartment(payload.department);
                setSubject(payload.subject);
                setTeachyear(payload.teachyear);
                setContent(payload.content);
                break;
            }
            default: break;
        }
    }

    const updateFullUser = async () => {
        await sendData(['updateFullUser', [picture, name, email, place, department, subject, teachyear, content] ]);
    }


    // const handleScoreEdit = (e) => {
    //     setScore(e.target.value);
    //     setScoreEdit(false);
    // }

    

    // set edit true
    const NETrue = (e) => { setNameEdit(true) };
    const DETrue = (e) => { setDepartmentEdit(true) };
    const PLTrue = (e) => { setPlaceEdit(true) };
    const SUTrue = (e) => { setSubjectEdit(true) };
    const TYTrue = (e) => { setTeachyearEdit(true) };
    // const SCTrue = (e) => { setScoreEdit(true) };
    const CTTrue = (e) => { setContentEdit(true) };
    const PICTrue = (e) => { setPictureEdit(true) };


    
    return (
        <Layout style={{borderRadius: "20px"}}>
            <div style={{ padding:10, display: 'flex' ,flexDirection: 'row',height:"50px",alignItems:'center' }}>
                <CustomSubtitle>{"會員編號： " + id + " "}</CustomSubtitle>
                <p style={{position:'absolute', right: "80px",margin:"0px", color:"#162E4D"}}>{"評分： " + score + "   "}<StarOutlined /></p>
            </div>


            {/* 評分 e.g. 評分: 93 */}
            <Row gutter={16} style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 ,height:'auto'}}>
                <Col span={8} style={{padding:10, display: 'flex',alignItems:'center', flexDirection:'column',margin: " 20px 0px"}}>
                    
                    {pictureEdit?
                        <Input placeholder="Basic usage" placeholder={picture} value={picture} onChange={(e) => setPicture(e.target.value)} onKeyUp={
                            async (e) => {
                                if (e.keyCode === 13 && e.target.value !== '') {
                                    handlePicEdit(e);
                                }
                            }
                        } />:
                        <>
                            <img className='teacherPic' src={picture} style={{display:'center',width:'auto',height:'auto',maxHeight:'50%', maxWidth:'50%'}}></img>
                            <Button style={{margin:"10px", color:"#162e4d"}}  onClick={PICTrue}>編輯照片（輸入網址）<EditOutlined /></Button>
                        </>
                    }
                    <div style={{display: 'flex',flexDirection:'row',padding:30}}>
                        <p style={{margin:"5px", color:"#162e4d"}}>是否開放查詢：</p>
                        <Switch checkedChildren="開啟" unCheckedChildren="關閉" defaultChecked style={{margin:"5px", color:"#162e4d"}}/>
                    </div>
                </Col>
                <Col span={16} style={{margin: " 10px 0px"}}>
                    {editAll ?<Button  onClick={reEditAll} style={{borderRadius: "10px",paddind:5, background: DarkBlue,color:'white' }} >重新編輯</Button>
                        :<Button  onClick={handleEditAll} style={{margin:"5px", borderRadius: "10px",paddind:5, background: DarkBlue,color:'white',  display: 'flex' ,alignItems:'center' }} >全部編輯<EditOutlined /></Button>
                    }
                    
                    {nameEdit ?
                        <>
                            <CustomSubtitle><UserOutlined />真實姓名</CustomSubtitle>
                            <Input placeholder="Basic usage" placeholder={name} value={name} onChange={(e) => setName(e.target.value)} onKeyUp={
                            async (e) => {
                                if (e.keyCode === 13 && e.target.value !== '') {
                                    handleNameEdit(e);
                                }
                            }
                        } />
                        </>
                         :
                        <CustomTitle ><UserOutlined />{" " + name + " "}
                            <EditOutlined onClick={NETrue}/>
                        </CustomTitle>
                    }       {/* 姓名 + ID ; e.g. 劉大悅 983748 */}
                    
                    <CustomSubtitle>
                        <MailOutlined />{" " + email + " "}
                    </CustomSubtitle>

                        {/* 聯繫方式; e.g. philip910323@gmail.com */}
                    
                    {placeEdit ?
                        <>
                            <CustomSubtitle>現居地：</CustomSubtitle>
                            <Cascader options={Area} onChange={(e) => {
                                setPlace(e)
                                }}  
                                placeholder="選擇現居地點" style={{margin:"0px 40px"}} bordered={false}/>
                        </>
                         :
                        <CustomSubtitle><HomeOutlined />{" " + place + " "}
                            <EditOutlined onClick={PLTrue}/>
                        </CustomSubtitle>
                    }       {/* 地區; e.g. 台北市 */}
                    {departmentEdit ?
                        <>
                            <CustomSubtitle><BookOutlined />系所：</CustomSubtitle>
                            <Cascader options={Department} onChange={(e) => {
                                setDepartment(e)
                                }} 
                                placeholder="選擇系所" style={{margin:"0px 40px"}} bordered={false}/>
                        </>
                         :
                        <CustomSubtitle><BookOutlined />{" " + department + " "}
                            <EditOutlined onClick={DETrue}/>
                        </CustomSubtitle>
                    }     {/* 系所; e.g. 地理系 */}


                    {subjectEdit ?
                    <>
                        <CustomSubtitle>擅長科目：</CustomSubtitle>
                        <Select style={{margin:"0px 40px",width:600}} bordered={false}
                        mode="multiple"
                        allowClear
                        placeholder="選擇擅長科目"
                        defaultValue={[]}
                        onChange={(e) => {
                            setSubject(e)
                        }}
                        >
                            {subjectItem.map(subjectItem => (
                            <Select.Option key={subjectItem} value={subjectItem}>
                                {subjectItem}
                            </Select.Option>
                            ))}
                        </Select>
                    </>
                         :
                        <CustomSubtitle>{"擅長科目： " + subject + " "}
                            <EditOutlined onClick={SUTrue}/>
                        </CustomSubtitle>
                    }       {/* 科目; e.g. 數學 */}

                    
                    {teachyearEdit ?
                        <>
                            <CustomSubtitle>教學經驗：</CustomSubtitle>
                            <Select onChange={(e) => {setTeachyear(e)}} defaultValue="選擇教學經驗" style={{ width: 200,margin:"0px 40px" }} bordered={false}>
                                    <Option value={"無"}>無</Option>
                                    <Option value={"一年以內"}>一年以內</Option>
                                    <Option value={"一年以上"}>一年以上</Option>
                                    <Option value={"兩年以上"}>兩年以上</Option>
                                    <Option value={"五年以上"}>五年以上</Option>
                            </Select>
                        </>
                         :
                        <CustomSubtitle>{ "教學經驗：" + teachyear + " "}<EditOutlined onClick={TYTrue}/></CustomSubtitle>

                    }       {/* 教學經驗 ; e.g. 1~2年 */}

                
                   
                    {contentEdit ? 
                        <>
                            <CustomSubtitle>自我介紹：</CustomSubtitle>
                            <TextArea style={{ height:"120px", fontSize:"20px"}} placeholder={content} value={content} onChange={(e) => setContent(e.target.value)} onKeyUp={
                                async (e) => {
                                    if (e.keyCode === 13 && e.target.value !== '') {
                                        handleContentEdit(e);
                                    }
                                }
                            } />
                        </>
                         :
                        <>
                            <CustomSubtitle>自我介紹：<EditOutlined onClick={CTTrue}/></CustomSubtitle>
                            <CustomSubtitle style={{height:'auto'}}>{content}</CustomSubtitle>
                        </>
                        
                       

                    }       {/* 補充資料 e.g. 我特別擅長教數學 */}
                    <div style={{ padding:5, textAlign: 'center' }}>
                        {complete ?
                            <p>
                                <Button  onClick={finishEdit} style={{borderRadius: "10px",paddind:5, background: DarkBlue ,color:'white'}} >編輯完成<CheckOutlined /></Button>
                            </p> :
                            <></>
                        }
                    </div>
                </Col>
            </Row>

        
            
            
        </Layout>
    )
}
export default TeacherCard;

