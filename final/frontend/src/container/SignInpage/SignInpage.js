//yc
import { Input, Button, Layout, message } from "antd";
import { UserOutlined, LoginOutlined } from "@ant-design/icons";
import Title from "./Title";
import Card from "./Card";
import Wrapper from "./Wrapper";
import { LightBrown, LightWhite } from "../../constant/color";
import { useEffect, useState } from "react";
import { client, sendData } from '../../ws';
import { useNavigate, useLocation } from "react-router-dom";

const dashed = "dashed"
const { Header, Content, Footer } = Layout;
const SignInPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let from = location.state?.from?.pathname || "/"
        if (from != "/") {
            message.warning("登入以查看更多資訊")
        }
    }, []);

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    client.onmessage = async (byteString) => {
        const { data } = byteString;
        console.log(JSON.parse(data));
        const [task, payload] = JSON.parse(data);
        switch (task) {
            // 對應後端
            case 'UserDoNotExist': {  // load student data
                message.info('無該使用者信箱')
                break;
            }
            case 'WrongPassword': {
                message.info('密碼錯誤')
                break;
            }
            case 'SignInSucuss': {
                localStorage.setItem('token', payload)
                localStorage.setItem('email', email)
                message.info('成功登入')
                navigate('/')
                break;
            }
            default: break;
        }
    }

    const signIn = async () => {
        await sendData(["signIn", { password, email }])
    };



    return (
        <Layout>

            <Wrapper style={{ display: 'flex', alignItems: 'center', background: LightWhite }} >
                <Card style={{ background: LightBrown }}>
                    <Title>
                        <h1 style={{ color: "#FFFFFF", }}>Welcome back</h1>
                    </Title>
                    <Input prefix={<UserOutlined />}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your mail"
                        size="large" style={{ width: 300, margin: 10 }}
                    />
                    <Input.Password
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        size="large" style={{ width: 300, margin: 10 }}

                    />
                    <Button type="primary"
                        style={{ margin: 5, background: LightWhite, color: LightBrown, borderStyle: 'solid', border: 2, borderColor: LightWhite }}
                        onClick={signIn}
                    >Sign In</Button>

                </Card>
            </Wrapper>
        </Layout >

    )

};
export default SignInPage;