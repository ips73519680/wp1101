//yc
import { Row, Col, Layout, Modal, Button } from 'antd';
import { SmileOutlined,FrownOutlined, DeleteOutlined, MessageOutlined, EllipsisOutlined  } from '@ant-design/icons';
import { DarkGray, LightBrown, DarkBrown } from '../../../constant/color';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { client, sendData } from '../../../ws.js'
import TextArea from 'antd/lib/input/TextArea';
import { LightWhite } from '../../../constant/color';
import 'antd/dist/antd.min.css'
const { Header, Content, Footer } = Layout;

const dashed = "dashed"
const style = { padding: '8px 0', height: 250, width: "100%", borderRadius: 10, background: LightBrown };
const datastyle = { width: 'auto',  backgroundColor: DarkBrown, color: "white", textAlign: "center", borderRadius: 10, padding: '5px 10px', margin:'0px 5px' };

const useTeacherCollect = () => {
    /* for Modal */
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [Name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [listData, setListData] = useState([]);

    /*
    const item ={
        'subject': 'subject',
        'teachyear': 'teachyear',
        'department': 'department',
        'username': 'username',
        'id': 'id',
        'content': 'content',
    }
    */

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCanel = () => {
        setIsModalVisible(false);
    };

    client.onmessage = async (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            // 對應後端
            case 'loadedMyTeacher': {  // load teacher data
                // listData = []; // init the data
                console.log("payload data is:", payload);
                setListData(payload);
                console.log("listData is:", listData);
                break;
            }
            default: break;
        }
    }

    const ModalMode = (
        <Modal title={"Send message to " + Name} visible={isModalVisible} onOk={handleOk} onCancel={handleCanel}>
            <TextArea
                style={{ height: "120px", fontSize: "15px" }}
                enterButton="Chat"
                value={message}
                onChange={(e) => { setMessage(e.target.value) }}
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


    return (
        <Layout>  
            <Row gutter={16} style={{ padding: 20 }}>{
                listData.map((item) => {

                   return (
                        <Col className="gutter-row" span={24} style={{ padding: 10 }} >
                            {ModalMode}
                            <Row style={style}>
                                <Col span={8} style={{ padding: 10, display: 'flex', alignItems: 'center' }}>
                                    <img className='teacherPic' src={item.img} style={{ display: 'center', width: "100%", height: "100%" }}></img>
                                </Col>
                                <Col span={16}>
                                    <div gutter={16} style={{ padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <Col span={24} style={{ display: 'flex', flexDirection: 'row', }}>
                                            <div style={datastyle}>{item.subject}</div>
                                            <div style={datastyle}>{item.teachyear}</div>
                                            <div style={datastyle}>{item.department}</div>
                                        </Col>
                                         </div>
                                    <div className='intro' style={{ padding: '5px 20px', height: '57%', width: 'auto', }}>{item.content}</div>
                                    <div gutter={20} style={{ padding: 10, width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <Col span={10} style={{ display: 'flex', flexDirection: 'row', }}>
                                            
                                        </Col>
                                        <Col span={6} style={{ display: 'flex', flexDirection: 'row', }}>
                                            <Button span={2} style={datastyle} onClick={() => { sendData(["loadFullTeacher", item.id]) }}><Link to="/TeacherCard"><EllipsisOutlined /></Link></Button>
                                            <Button span={4} onClick={() => { setName(item.username); showModal(); }} style={datastyle}>聊聊  <MessageOutlined /></Button>
                                            <Button span={4} onClick={() => { sendData(['removeMyTeacher', item.id]); }} style={datastyle}>移除 <DeleteOutlined /></Button>
                                        </Col>
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                   )
                })
                }
            </Row>
        </Layout>
    );
}
export default useTeacherCollect;