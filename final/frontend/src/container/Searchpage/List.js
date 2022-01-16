//liu
import './List.css'
import { Row, Col, Slider } from 'antd';
import { DarkGray, LightBrown, DarkBrown } from '../../constant/color';
import { SmileOutlined, FrownOutlined, StarOutlined, MessageOutlined } from '@ant-design/icons';
import { getList } from '../../utility/sendToBackend';
import { useEffect } from 'react';
const line = "solid"
const style = { padding: '8px 0', height: 250, borderRadius: 10, background: LightBrown };

//======= show list=========//
const MOCK_DATA = [
    {
        img: 'https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/2b3f6ff00db7a1efae21d85cfb8995eaff2da8d8.png',
        '科目': '數學',
        '教學資歷': '一年',
        '系所': '工海系',
        '簡介': '123'
    },
    {
        img: 'https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/2b3f6ff00db7a1efae21d85cfb8995eaff2da8d8.png',
        '科目': '英文',
        '教學資歷': '一年',
        '系所': '英文系',
        '簡介': '123'
    },
    {
        img: 'https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/2b3f6ff00db7a1efae21d85cfb8995eaff2da8d8.png',
        '科目': '英文',
        '教學資歷': '一年',
        '系所': '數學系',
        '簡介': '123'
    },
    {
        img: 'https://tw.portal-pokemon.com/play/resources/pokedex/img/pm/2b3f6ff00db7a1efae21d85cfb8995eaff2da8d8.png',
        '科目': '英文',
        '教學資歷': '兩年',
        '系所': '數學系',
        '簡介': '123'
    }
]
const listData = MOCK_DATA;
const datastyle = { width: 80, height: 30, backgroundColor: DarkBrown, color: "white", textAlign: "center", borderRadius: 10, padding: 3 };

const List = () => {

    useEffect(() => {
        console.log("Listhi!");
    })

    return (
        <Row gutter={16} style={{ padding: 20 }}>{
            listData.map((item) => {

                return (
                    <Col className="gutter-row" span={12} style={{ padding: 10 }} >
                        <Row style={style}>
                            <Col span={8} style={{ padding: 10, display: 'flex', alignItems: 'center' }}>
                                <img className='teacherPic' src={item.img} style={{ display: 'center', width: 180, height: 200 }}></img>
                            </Col>
                            <Col span={16}>
                                <div gutter={16} style={{ padding: 10, width: 300, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <div span={4} style={datastyle}>{item.科目}</div>
                                    <div span={4} style={datastyle}>{item.教學資歷}</div>
                                    <div span={4} style={datastyle}>{item.系所}</div>
                                </div>
                                <div className='intro' style={{ padding: 10, height: '57%' }}>{item.簡介}</div>
                                <div gutter={16} style={{ padding: 10, width: 400, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <div span={4} style={{ width: 80, height: 30, backgroundColor: DarkBrown, color: "white", textAlign: "center", borderRadius: 10, padding: 3 }}>Like  <SmileOutlined /></div>
                                    <div span={4} style={{ width: 100, height: 30, backgroundColor: DarkBrown, color: "white", textAlign: "center", borderRadius: 10, padding: 3 }}>DisLike  <FrownOutlined /></div>
                                    <div span={4} style={{ width: 80, height: 30, backgroundColor: DarkBrown, color: "white", textAlign: "center", borderRadius: 10, padding: 3 }}>評分  <StarOutlined /></div>
                                    <div span={4} style={{ width: 80, height: 30, backgroundColor: DarkBrown, color: "white", textAlign: "center", borderRadius: 10, padding: 3 }}>聊聊  <MessageOutlined /></div>
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

export default List;
