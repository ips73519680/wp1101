import { client, sendData } from '../ws';

const isAuth = async () => {

    await sendData(["isAuth", localStorage.getItem("token")])

    client.onmessage = async (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            // 對應後端
            case 'hasNoToken': {
                console.log("hasNoToken");
                return false;
            }
            case 'WrongToken': {
                console.log("WrongToken");
                return false;
            }
            case 'correctToken': {
                console.log("correctToken");
                return true;
            }
            default:
                console.log("bad");
                break;
        }
    }

}
export default isAuth;

