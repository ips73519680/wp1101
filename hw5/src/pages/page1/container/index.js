
import { useEffect, useState } from 'react';
import Bts from '../component/Bts';
import Show from '../component/Show';
import './index.css'

function Home() {
    const [input, setInput] = useState([]) //過程(一大串)
    const [answer, setAnswer] = useState()//計算中的答案
    const [waitToPlus_answer, setWaitToPlus_Answer] = useState(0)//計算中的當前數字
    const [wait_icon, setIcon] = useState([0, -1]) //紀錄下一個算數符號及符號的位置
    const [outcome, setOutcome] = useState();

    useEffect(() => {
        console.log("==============================");
        if (!input) {
            console.log("reset");
            setWaitToPlus_Answer(0);
            setAnswer();
            setIcon([0, -1]);
        } else {
            if (!isNaN(input[input.length - 1])) {
                var number = input[wait_icon[1] + 1];
                for (let i = wait_icon[1] + 2; i < (input.length); i++) {
                    number = number + input[i];
                }
                setWaitToPlus_Answer(number);
            } else {
                // 這裡要改成case把計算方式切成四種
                if (!answer) {
                    setAnswer(waitToPlus_answer);
                } else {
                    switch (wait_icon[0]) {
                        case '+':
                            setAnswer(parseInt(answer) + parseInt(waitToPlus_answer)); //寫成function
                            break;
                        case '-':
                            setAnswer(parseInt(answer) - parseInt(waitToPlus_answer)); //寫成function
                            break;
                        case '*':
                            setAnswer(parseInt(answer) * parseInt(waitToPlus_answer)); //寫成function
                            break;
                        case '/':
                            var t = (parseInt(answer) / parseInt(waitToPlus_answer)).toFixed(4);
                            setAnswer(t); //寫成function
                            break;
                        default:
                            setAnswer((parseInt(waitToPlus_answer)));
                    }
                }
                // setAnswer(parseInt(waitToPlus_answer) + parseInt(answer)); //寫成function
            }
        }
        console.log("input ：");
        console.log(input);


    }, [input])

    useEffect(() => {
        console.log("wait_icon：");
        console.log(wait_icon);
        console.log("waitToPlus_answer：");
        console.log(waitToPlus_answer);
        console.log("answer：");
        console.log(answer);
    }, [waitToPlus_answer, answer, wait_icon])


    return (
        <div className="Home">
            <Show input={input} answer={answer} outcome={outcome} />
            <Bts setOutcome={setOutcome} setInput={setInput} input={input} wait_icon={wait_icon} setIcon={setIcon} answer={answer} setAnswer={setAnswer} waitToPlus_answer={waitToPlus_answer} />
        </div>
    );
}

export default Home;
