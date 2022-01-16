//liu
//yc
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { LightWhite } from '../../constant/color';
import "./Searchpage.css"
import 'antd/dist/antd.min.css'
import Query from "./CQuery";
import List from "./CList";
import { Link } from 'react-router-dom';
import { client, sendData } from '../../ws.js';
import { useEffect } from 'react';
const dashed = "dashed"


const { Header, Content, Footer } = Layout;
const SearchCasePage = () => {
    useEffect(() => {
        getCaseData();
    }, []);

    const getCaseData = async () => {
        await sendData(["loadCase"]);
    };


    return (
        <Layout>

            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, background: LightWhite }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    {/* <Breadcrumb.Item>List</Breadcrumb.Item> */}
                    <Breadcrumb.Item><Link to="/searchCasePage" onClick={getCaseData}>找案件</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ border: 1, padding: 24, minHeight: 380, minWidth: "1346px" }}>
                    <Query index={2} />
                    <List />
                </div>
            </Content>

        </Layout>
    );
}
export default SearchCasePage;