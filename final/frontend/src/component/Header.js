
import { Layout, message } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { client, sendData } from '../ws.js';
const dashed = "dashed"
const { Header } = Layout;

const HHeader = () => {
    let navigator = useNavigate();
    const ifSignIn = () => {
        //未登入
        if (!localStorage.getItem('token')) {
            return (<>
                <Button
                    type="text"
                    style={{ width: 90, margin: 5, color: "#000000", borderStyle: dashed, border: 1, position: "fixed", right: 20, top: 10 }}
                ><Link to="/SignInPage">登入 </Link><LoginOutlined /></Button>
                <Button
                    type="text"
                    style={{ width: 70, margin: 5, background: "#000000", color: "#ffffff", position: "fixed", right: 130, top: 10 }}
                ><Link to="/SignUpPage">註冊</Link></Button>
            </>)
        }
        //已經登入
        else {
            return (<>
                <Button
                    type="text"
                    style={{ width: 70, margin: 5, color: "#856b5a", position: "fixed", right: 310, top: 10 }}
                >{localStorage.getItem('email')}</Button>
                <Button
                    onClick={() => {
                        localStorage.clear();
                        message.info('已登出')
                        navigator('/')
                    }}
                    type="text"
                    style={{ width: 70, margin: 5, background: "#000000", color: "#ffffff", position: "fixed", right: 20, top: 10 }}
                >登出</Button>
                <Button
                    type="text"
                    style={{ width: 90, margin: 5, background: "#000000", color: "#ffffff", position: "fixed", right: 110, top: 10 }}
                    onClick={sendData(['loadBaseUser'])}
                ><Link to="/UserPage" >會員中心</Link></Button>
            </>)
        }

    }



    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: "#ffffff" }}>
            <div className="logo" />
            <Button
                type="text"
                style={{ width: 90, margin: 5, color: "#000000", borderStyle: dashed, border: 1, position: "fixed", left: 20, top: 10 }}
            >
                <Link to="/">首頁</Link></Button>
            {ifSignIn()}

        </Header>
    )
}

export default HHeader;