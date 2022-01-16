//yc
import { Layout, Menu, Breadcrumb, Button } from 'antd';


import { Row, Col, Slider } from 'antd';
import { DarkGray, LightBrown, DarkBrown, LightWhite } from '../../constant/color';
import { SmileOutlined, FrownOutlined, StarOutlined, MessageOutlined } from '@ant-design/icons';

import './NewTeacherpage.css';
import 'antd/dist/antd.min.css'

const { Header, Content, Footer } = Layout;

const NewCasePage = () => {
    console.log("NewTeacherPage");
    return (
        <Layout>

            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, background: LightWhite }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ border: 1, padding: 24, minHeight: 380 }}>
                    <div gutter={16} style={{ padding: 10, width: 400, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <div span={4} style={{ width: 80, height: 30, backgroundColor: DarkBrown, color: "white", textAlign: "center", borderRadius: 10, padding: 3 }}>Like  <SmileOutlined /></div>
                        <div span={4} style={{ width: 100, height: 30, backgroundColor: DarkBrown, color: "white", textAlign: "center", borderRadius: 10, padding: 3 }}>DisLike  <FrownOutlined /></div>
                        <div span={4} style={{ width: 80, height: 30, backgroundColor: DarkBrown, color: "white", textAlign: "center", borderRadius: 10, padding: 3 }}>評分  <StarOutlined /></div>
                        <div span={4} style={{ width: 80, height: 30, backgroundColor: DarkBrown, color: "white", textAlign: "center", borderRadius: 10, padding: 3 }}>聊聊  <MessageOutlined /></div>
                    </div>
                </div>
            </Content>

        </Layout>

    )

}

export default NewCasePage;