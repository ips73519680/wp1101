//yc
import 'antd/dist/antd.min.css'
import './Chatroompage.css'
import { client, sendData } from './client'
import { Modal, Button, Tabs, Row, Col, Layout } from 'antd'
import { SmileOutlined, FrownOutlined, DollarOutlined, MessageOutlined, EllipsisOutlined, EnvironmentOutlined } from '@ant-design/icons';
import useChat from './useChat'
import { Link } from 'react-router-dom';
import { useState, useEffect,  } from 'react'
import { LightWhite,LightBrown,DarkBrown } from '../../../constant/color'
import TextArea from 'antd/lib/input/TextArea';
const dashed = "dashed"
const { TabPane } = Tabs;
const LOCALSTORAGE_KEY = "email";
const style = { padding: '8px 0', height: 150, width: "100%", borderRadius: 10, background: LightWhite };
const personaldata = { width: "80%", height: 30, Color: DarkBrown, display: "flex", alignItems: "center", borderRadius: 10, padding: 3, margin: '5px', width: '100%' }

function WithTChatroomPage() {
  const { status, messages, sendMessage, clearMessages } = useChat()
  const [textBody, setTBody] = useState('')
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const [me, setMe] = useState(savedMe || '');
  const [signedIn, setSignedIn] = useState(false);
  const [listData, setListData] = useState([]);
  /* for Modal */
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [message, setMessage] = useState('');

  const makeGroup = (s1, s2) => {
      let temp = [s1, s2]
      temp.sort();
      return temp[0] + '_' + temp[1];
  }
  const showModal = () => {
      setIsModalVisible(true);
  };

  const handleOk = () => {
      console.log("click OK!");
      if (!localStorage.getItem('token')) {
          setIsModalVisible(false);
          if (!message) {
              alert("不可空白")
          } else {
              sendMessage({ from: localStorage.getItem('email'), to: email, body: message, group: makeGroup(localStorage.getItem('email'), email) })
          }
      } else {
          alert("尚未登入!")
      }
  };

  const handleCanel = () => {
      setIsModalVisible(false);
  };


  const ModalMode = (
      <Modal title={"Send message to " + Name} visible={isModalVisible} onOk={handleOk} onCancel={handleCanel} >
          <TextArea
              style={{ height: "120px", fontSize: "15px" }}
              enterButton="Chat"
              value={message}
              onChange={(e) => { setMessage(e.target.value) }}
              placeholder="老師好，目前我們..."
          ></TextArea>
      </Modal >
  )

  useEffect(() => {
    getMessageData();
  }, []);

  const getMessageData = async () => {
    await sendData(["loadedMessage", localStorage.getItem('email')]);
  };


  client.onmessage = async (byteString) => {
    const { data } = byteString;
    const [task, payload] = JSON.parse(data);

    switch (task) {
      // 對應後端
      case 'loadedMessage': {  // load student data
        console.log("payload data is:", payload);
        setListData(payload);
        console.log("listData is:", listData);
        break;
      }

      default: break;
    }
  }

  const item = {
    "from": "from",
    "body": "body",

  }

  return (
    <Layout>
      <Row gutter={16} style={{ padding: 20 }}>
          {/* {
            listData.map((item) => {
              return ( */}
              {ModalMode}
                    <Col span={12}>
                        <Row style={style}>
                            <Col span={16} style={{ padding: 10, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                <div span={4} style={personaldata}>{item.studentlevel + " " + item.subject}</div>
                                <div span={4} style={personaldata}><EnvironmentOutlined />{"  " + item.place}</div>
                                <div gutter={16} style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <div span={4} style={personaldata}><DollarOutlined />{"  " + item.money}</div>
                                    {/* <Button span={4} style={{ background: LightWhite, width: "15%", height: 30, textAlign: "center", borderRadius: 10, padding: 3, borderColor: LightBrown, margin: '5px' }}
                                    ><Link to="/StudentCard" state={{ id: item.id }}><EllipsisOutlined /></Link></Button> */}
                                    <Button span={4} style={{ background: LightWhite, width: "15%", height: 30, textAlign: "center", borderRadius: 10, padding: 3, borderColor: LightBrown, margin: '5px' }}
                                        onClick={() => { sendData(["loadFullStudent", item.id]) }}><Link to="/StudentCard"><EllipsisOutlined /></Link></Button>
                                </div>
                            </Col>
                            <Col span={8}>

                                <div gutter={16} style={{ padding: 10, width: "100%", position:'absolute', bottom:0, flexDirection: 'column', justifyContent: 'space-around', float: "right" }}>
                                    <Button span={4} onClick={() => { setName(item.username); setEmail(item.email); showModal(); }} style={{ margin: 5, width: "80%", height: 30, backgroundColor: LightBrown, color: "white", textAlign: "center", borderRadius: 10, padding: 3 }}>回覆老師  <MessageOutlined /></Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="gutter-row" span={10} style={{width: "80%",  Color: DarkBrown, display: "flex", flexDirection: 'column', borderRadius: 10, padding: 3, margin: '5px', width: '100%'}} >
                      <div style={{padding:10}}>{item.from}</div>
                      <div style={{padding:10}}>{item.body}</div>
                    </Col >


                

              {/* )

            })
          } */}


      </Row>
    </Layout>

  )
}

export default WithTChatroomPage;
