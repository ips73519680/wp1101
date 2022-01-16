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

const subjectItem = ['國文', '英文', '數學', '生物', '地科', '物理', '化學', '地理', '歷史', '公民', '其他'];
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
const { Option, OptGroup } = Select;
const dashed = "dashed"


const SQuery = (index) => {
    const [subject, setSubject] = useState('');
    const [place, setPlace] = useState('');
    const [money, setMoney] = useState('');
    const handleSearch = async () => {
        console.log('searchStudent');
        await sendData(["loadSearchStudent", { subject, place, money }]);
    }

    function handleSubjectChange(value) {
        setSubject(value)
    }
    function handleMoneyChange(value) {

        setMoney(value)
    }
    function handlePlaceChange(value) {
        setPlace(value)
    }


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
                <Select defaultValue="選擇上課預算" style={{ width: 200 }} onChange={handleMoneyChange} >
                    <Option value={"500元以下"}>500元以下</Option>
                    <Option value={"500~700元"}>500~700元</Option>
                    <Option value={"700~1000元"}>700~1000元</Option>
                    <Option value={"1000元以上"}>1000元以上</Option>
                </Select>
            </Col>
            {/* <Col className="gutter-row" span={6} style={{ paddingTop: 5 }}>
                <Cascader options={Area} onChange={handlePlaceChange} style={{ width: 200 }} placeholder="選擇上課地點" />
            </Col> */}
            <Col className="gutter-row" span={6}>
                <Button
                    onClick={handleSearch}
                    type="text"
                    style={{ width: 100, height: 40, borderRadius: 10, background: DarkGray, color: "#ffffff" }}
                >Search</Button>
            </Col>
        </Row >

    )
}
export default SQuery;
