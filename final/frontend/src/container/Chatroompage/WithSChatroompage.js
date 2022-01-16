//yc
import 'antd/dist/antd.min.css'
import './Chatroompage.css'
import { client, sendData } from './client'
import { Button, Tabs, Modal, Row, Col, Layout } from 'antd'
import useChat from './useChat'
import { MessageOutlined } from '@ant-design/icons';
import { useState, useEffect, useRef, Fragment } from 'react'
import TextArea from 'antd/lib/input/TextArea';
import { DarkBlue, DarkBrown ,LightBrown} from '../../../constant/color'
const dashed = "dashed"
const style = { height: '100%', borderRadius: 10, };
const { TabPane } = Tabs;
const LOCALSTORAGE_KEY = "email";
const personaldata = { width: "80%", height:'auto', Color: DarkBrown, display: "flex", alignItems: "center", borderRadius: 10, padding: 3, margin: '5px', width: '100%' }


function WithSChatroomPage() {
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
              placeholder="您好，我對您的家教案件有興趣..."
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

                  <Col className="gutter-row" span={19} style={personaldata} >
                    <Col span={4} style={personaldata}>{item.from}</Col>
                    <Col style={personaldata}>{item.body}</Col>
                  </Col >
                  <Col className="gutter-row" span={4} style={personaldata} >
                    <Button span={4} onClick={() => { setName(item.username); setEmail(item.email); showModal(); }} style={{ margin: 5, width: "80%", height: 30, backgroundColor: DarkBlue, color: "white", textAlign: "center", borderRadius: 10, padding: 3 }}>回覆同學  <MessageOutlined /></Button>       
                  </Col >

              

            {/* )

          })
        } */}


    </Row>
    </Layout>

  )
}

export default WithSChatroomPage;
