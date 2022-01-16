//yc
import { Input, Button, Layout, message } from "antd";
import { UserOutlined, LoginOutlined, MailOutlined } from "@ant-design/icons";
import Title from "./Title";
import Card from "./Card";
import Wrapper from "./Wrapper";
import { LightBrown, LightWhite } from "../../constant/color";
import { useState } from "react";
import { client, sendData } from '../../ws';
import { useNavigate } from "react-router-dom";


const dashed = "dashed"
const { Header, Content, Footer } = Layout;
const SignUpPage = () => {
    let navigate = useNavigate();
    //{  me, setMe, password, setPassword}
    const [me, setMe] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    client.onmessage = async (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            // 對應後端
            case 'createUser': {  // load student data
                message.info('已成功註冊')
                navigate('/SignInPage')
                break;
            }
            case 'emailExist': {
                message.info('該信箱已被使用')
                break;
            }
            default: break;
        }
    }
    const newUser = async () => {
        // createUser(me, password, email);                           
        await sendData(["createUser", { me, password, email }])
    };

    return (
        <Layout>

            <Wrapper style={{ display: 'flex', alignItems: 'center', background: LightWhite }} >
                <Card style={{ background: LightBrown }}>
                    <Title>
                        <h1 style={{ color: "#FFFFFF", position: 'center' }}>註冊</h1>
                    </Title>
                    <Input prefix={<UserOutlined />}
                        onChange={(e) => setMe(e.target.value)}
                        placeholder=" 姓名"
                        size="large" style={{ width: 300, margin: 10 }}
                    />
                    <Input prefix={<MailOutlined />}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=" 信箱"
                        size="large" style={{ width: 300, margin: 10 }}
                    />
                    <Input.Password
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=" 密碼"
                        size="large" style={{ width: 300, margin: 10 }}

                    />
                    <Button type="primary"
                        style={{ margin: 5, background: LightWhite, color: LightBrown, borderStyle: 'solid', border: 2, borderColor: LightWhite }}
                        onClick={newUser}
                    >Sign Up</Button>

                </Card>
            </Wrapper>
        </Layout>

    )

};
export default SignUpPage;