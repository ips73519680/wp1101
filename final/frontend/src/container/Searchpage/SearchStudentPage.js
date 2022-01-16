//liu
//yc
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { LightWhite } from '../../constant/color';
import "./Searchpage.css"
import 'antd/dist/antd.min.css'
import Query from "./SQuery";
import List from "./SList";
import { Link } from 'react-router-dom';
import { client, sendData } from '../../ws.js';
import { useEffect } from 'react';
const dashed = "dashed"

const { Header, Content, Footer } = Layout;
const SearchStudentPage = () => {
    useEffect(() => {
        getStudentData();
    }, []);

    const getStudentData = async () => {
        await sendData(["loadStudent"]);
    };

    return (
        <Layout>

            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, background: LightWhite }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    {/* <Breadcrumb.Item>List</Breadcrumb.Item> */}
                    <Breadcrumb.Item><Link to="/searchStudentPage" onClick={getStudentData}>找學生</Link></Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ border: 1, padding: 24, minHeight: 380, minWidth: "1346px" }}>
                    <Query index={1} />
                    <List />
                </div>
            </Content>

        </Layout>
    );
}
export default SearchStudentPage;