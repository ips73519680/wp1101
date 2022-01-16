//liu
import { FormOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { TeacherSet } from '../../constant/Set'
import { Select, Transfer } from 'antd';
import { Row, Col, Divider, Button } from 'antd';
import { DarkGray } from '../../constant/color';
import { Link } from 'react-router-dom';
import { sendData } from '../../ws';
const style = { background: '#0092ff', padding: '8px 0' };

const { Option, OptGroup } = Select;
const dashed = "dashed"

function handleChange(value) {
    console.log(`selected ${value}`);
}


const CQuery = (index) => {


    const [topic, setTopic] = useState('');
    const [money, setMoney] = useState('');

    const handleSearch = async () => {
        await sendData(["loadSearchCase", { topic, money }]);
    }

    function handleTopicChange(value) {
        setTopic(value)
    }
    function handleMoneyChange(value) {
        setMoney(value)
    }
    return (
        <Row gutter={16} style={{ paddingLeft: 100, paddingRight: 100, paddingTop: 20, textAlign: 'center' }}>
            {/* <Col className="gutter-row" span={8} style={{ paddingTop: 5 }}>
                <Select defaultValue="選擇任務類型" style={{ width: 200 }} onChange={handleTopicChange}>
                    <Option value={"解題"}>解題</Option>
                    <Option value={"諮詢"}>諮詢</Option>
                    <Option value={"單堂授課"}>單堂授課</Option>
                    <Option value={"語言交換"}>語言交換</Option>
                    <Option value={"其他"}>其他</Option>

                </Select>
            </Col> */}
            <Col className="gutter-row" span={8} style={{ paddingTop: 5 }}>

                <Select defaultValue="選擇上課預算" style={{ width: 200 }} onChange={handleMoneyChange}>
                    <Option value={"500元以下"}>500元以下</Option>
                    <Option value={"500~700元"}>500~700元</Option>
                    <Option value={"700~1000元"}>700~1000元</Option>
                    <Option value={"1000元以上"}>1000元以上</Option>
                </Select>
            </Col>
            <Col className="gutter-row" span={8}>
                <Button
                    onClick={handleSearch}
                    type="text"
                    style={{ width: 100, height: 40, borderRadius: 10, background: DarkGray, color: "#ffffff" }}
                >Search</Button>
            </Col>

        </Row>

    )
}
export default CQuery;
