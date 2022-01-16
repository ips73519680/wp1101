//yc
import { Row, Col, Layout, Menu, Breadcrumb, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { DarkGray, LightBrown, DarkBrown } from '../../../constant/color';
import { LightWhite } from '../../../constant/color';
import 'antd/dist/antd.min.css'


const dashed = "dashed"
const style = { height: 650, borderRadius: 10, };

const { Header, Content, Footer } = Layout;
const ClassroomPage = () => {

    return (
        <Layout>  
                <div className="site-layout-background" style={{ border: 1, minHeight: 380, borderRadius: 10 }}>
                    <Row style={style}>
                        <Col span={8} style={{ padding: 5, display: 'flex', alignItems: 'center', borderRadius: 10, flexDirection: 'column' }}>
                            <div style={{ height: '50%', width: '95%', background: LightBrown, padding: 5, borderRadius: 10 }}>視訊1</div>
                            <div style={{ height: '50%', width: '95%', background: LightBrown, padding: 5, position: 'relative', top: 5, borderRadius: 10 }}>視訊2</div>
                        </Col>
                        <Col span={16} style={{ padding: 10, position: 'relative', display: 'flex', textAlign: 'center', background: LightBrown, borderRadius: 10, border: 20, borderColor: 'white' }}>
                            白板
                        </Col>
                    </Row>
                </div>
        </Layout>
    );
}
export default ClassroomPage;