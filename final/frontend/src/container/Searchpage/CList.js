//liu
import './List.css'
import { Modal, Row, Col, Button } from 'antd';
import { LightBrown, DarkBrown, LightWhite } from '../../constant/color';
import { SmileOutlined, FrownOutlined, DollarOutlined, MessageOutlined, EllipsisOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { client, sendData } from '../../ws.js';
import TextArea from 'antd/lib/input/TextArea';
import 'antd/dist/antd.min.css'

const line = "solid"
const style = { padding: '8px 0', height: 150, width: "100%", borderRadius: 10, background: LightWhite };

//======= show list=========//

// const listData = MOCK_DATA;
const personaldata = { width: "80%", height: 30, Color: DarkBrown, display: "flex", alignItems: "center", borderRadius: 10, padding: 3, margin: '5px', width: '100%' }
const datastyle = { width: "18%", height: 30, Color: DarkBrown, textAlign: "center", borderRadius: 10, padding: 3 };

const Clist = () => {

    const [listData, setListData] = useState([]);
    /* for Modal */
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [Name, setName] = useState('');
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
        <Modal title={"Send message to " + Name} visible={isModalVisible} onOk={handleOk} onCancel={handleCanel}>
            <TextArea
                style={{ height: "120px", fontSize: "15px" }}
                enterButton="Chat"
                value={message}
                onChange={(e) => { setMessage(e.target.value) }}

                placeholder="您好，我對您的案件有興趣..."
            ></TextArea>
        </Modal>
    )

    client.onmessage = async (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            // 對應後端
            case 'loadedCase': {  // load student data
                console.log("payload data is:", payload);
                setListData(payload);
                console.log("listData is:", listData);
                break;
            }
            case 'loadedSearchCase': {
                setListData(payload);
                break;
            }

            default: break;
        }
    }

    return (
        <Row gutter={16} style={{ padding: 20 }}>{
            listData.map((item) => {
                return (
                    <Col className="gutter-row" span={8} style={{ padding: 10 }} >
                        {ModalMode}
                        <Row style={style}>
                            <Col span={16} style={{ padding: 10, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                <div span={4} style={personaldata}>{item.name + " " + item.topic}</div>
                                <div span={4} style={personaldata}>{"  " + item.teacherreq}</div>
                                <div gutter={16} style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <div span={4} style={personaldata}><DollarOutlined />{"  " + item.money}</div>
                                    <Button span={4} style={{ background: LightWhite, width: "15%", height: 30, textAlign: "center", borderRadius: 10, padding: 3, borderColor: LightBrown, margin: '5px' }} onClick={() => { sendData(["loadFullCase", item.id]) }}><Link to="/CaseCard"><EllipsisOutlined /></Link></Button>
                                </div>
                            </Col>
                            <Col span={8}>

                                <div gutter={16} style={{ padding: 10, width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'space-around', float: "right" }}>
                                    <Button span={4} style={{ margin: 5, width: "80%", height: 30, backgroundColor: LightBrown, color: "white", textAlign: "center", borderRadius: 10, padding: 3 }} onClick={() => { sendData(["addCase", item.id]) }}>Like  <SmileOutlined /></Button>
                                    <Button span={4} style={{ margin: 5, width: "80%", height: 30, backgroundColor: LightBrown, color: "white", textAlign: "center", borderRadius: 10, padding: 3 }}>DisLike  <FrownOutlined rotate={180} /></Button>
                                    <Button span={4} onClick={() => { setName(item.username); showModal(); }} style={{ margin: 5, width: "80%", height: 30, backgroundColor: LightBrown, color: "white", textAlign: "center", borderRadius: 10, padding: 3 }}>聊聊  <MessageOutlined /></Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>

                )

            }
            )}
        </Row>
    )
}

export default Clist;
