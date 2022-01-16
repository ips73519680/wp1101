//liu
import { FormOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { TeacherSet } from '../../constant/Set'
import { Select, Transfer } from 'antd';
import { Row, Col, Divider, Button } from 'antd';
import { DarkGray } from '../../constant/color';
import { Link } from 'react-router-dom';
const style = { background: '#0092ff', padding: '8px 0' };

const { Option, OptGroup } = Select;
const dashed = "dashed"

function handleChange(value) {
    console.log(`selected ${value}`);
}

//預設找老師、案件、學生會有不同的DATA進來
//index=0 老師, index=1 學生, index=2 案件

const Query = (index) => {


    //index.index 可以取直
    return (
        <Row gutter={16} style={{ paddingLeft: 100, paddingRight: 100, paddingTop: 20 }}>
            <Col className="gutter-row" span={6} style={{ paddingTop: 5 }}>
                <Select defaultValue="科目" style={{ width: 200 }} onChange={handleChange}>
                    <OptGroup label="科目">
                        {
                            TeacherSet.科目.map((item, index) => {
                                const tempValue = (index + 1) * 10;
                                return <Option value={tempValue}>{item}</Option>
                            })
                        }
                    </OptGroup>
                </Select>
            </Col>
            <Col className="gutter-row" span={6} style={{ paddingTop: 5 }}>
                <Select defaultValue="教學資歷" style={{ width: 200 }} onChange={handleChange}>
                    <OptGroup label="教學資歷">
                        {
                            TeacherSet.教學資歷.map((item, index) => {
                                const tempValue = (index + 1) * 10;
                                return <Option defaultValue="" value={tempValue}>{item}</Option>
                            })
                        }
                    </OptGroup>
                </Select>
            </Col>
            <Col className="gutter-row" span={6} style={{ paddingTop: 5 }}>
                <Select defaultValue="系所" style={{ width: 200 }} onChange={handleChange}>
                    <OptGroup label="系所">
                        {
                            //這個可以寫fuction 改好看一點
                            TeacherSet.系所.map((item, index) => {
                                const tempValue = (index + 1) * 10;
                                return <Option defaultValue="" value={tempValue}>{item}</Option>
                            })
                        }
                    </OptGroup>
                </Select>
            </Col>
            <Col className="gutter-row" span={6}>
                <Button
                    type="text"
                    style={{ width: 100, height: 40, borderRadius: 10, background: DarkGray, color: "#ffffff" }}
                >Search</Button>
                <Button
                    type="text"
                    style={{ width: 130, margin: 5, color: "#000000", background: 'transparent', border: 1 }}
                ><FormOutlined /><Link to="/NewTeacherPage">我要當老師</Link></Button>
            </Col>

        </Row>

    )
}
export default Query;
