//liu
import { FormOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { TeacherSet } from '../../constant/Set'
import { Cascader, Select, Transfer } from 'antd';
import { Row, Col, Divider, Button } from 'antd';
import { DarkGray } from '../../constant/color';
import { Link } from 'react-router-dom';
import { sendData } from '../../ws';
const style = { background: '#0092ff', padding: '8px 0' };

const { Option, OptGroup } = Select;
const dashed = "dashed"
const subjectItem = ['國文', '英文', '數學', '生物', '地科', '物理', '化學', '地理', '歷史', '公民', '其他'];
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

function handleChange(value) {
    console.log(`selected ${value}`);
}

//預設找老師、案件、學生會有不同的DATA進來
//index=0 老師, index=1 學生, index=2 案件

const TQuery = (index) => {
    const [subject, setSubject] = useState('');
    const [department, setDepartment] = useState('');
    const [teachyear, setTeachyear] = useState('');

    const handleSearch = async () => {
        console.log('searchStudent');
        await sendData(["loadSearchTeacher", { subject, department, teachyear }]);
    }

    function handleSubjectChange(value) {
        setSubject(value)
    }
    function handleDepartmentChange(value) {
        setDepartment(value)
    }
    function handleTeachyearChange(value) {
        setTeachyear(value)
    }
    //index.index 可以取直
    return (
        <Row gutter={16} style={{ paddingLeft: 100, paddingRight: 100, paddingTop: 20, textAlign: 'center' }}>
            {/* <Col className="gutter-row" span={6} style={{ paddingTop: 5 }}>
                <Select style={{ width: 200, }}
                    mode="multiple"
                    allowClear
                    placeholder="選擇擅長科目"
                    defaultValue={[]}
                    onChange={handleSubjectChange}
                >
                    {subjectItem.map(subjectItem => (
                        <Select.Option key={subjectItem} value={subjectItem}>
                            {subjectItem}
                        </Select.Option>
                    ))}
                </Select>
            </Col> */}
            <Col className="gutter-row" span={6} style={{ paddingTop: 5 }}>
                <Select onChange={handleTeachyearChange} defaultValue="選擇教學經驗" style={{ width: 200 }} >
                    <Option value={"無"}>無</Option>
                    <Option value={"一年以內"}>一年以內</Option>
                    <Option value={"一年以上"}>一年以上</Option>
                    <Option value={"兩年以上"}>兩年以上</Option>
                    <Option value={"五年以上"}>五年以上</Option>
                </Select>
            </Col>
            {/* <Col className="gutter-row" span={6} style={{ paddingTop: 5 }}>
                <Cascader options={Department} onChange={handleDepartmentChange} placeholder="選擇老師系所" style={{ width: 200 }} />
            </Col> */}
            <Col className="gutter-row" span={6}>
                <Button
                    onClick={handleSearch}
                    type="text"
                    style={{ width: 100, height: 40, borderRadius: 10, background: DarkGray, color: "#ffffff" }}
                >Search</Button>

            </Col>

        </Row>

    )
}
export default TQuery;
