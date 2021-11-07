import './Bt.css';
import * as React from 'react';
import { Icon, Input } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { width } from '@material-ui/system';

const Bt = ({ icon, setInput, setOutcome, input, wait_icon, setIcon, waitToPlus_answer, answer }) => {
    function change() {
        var state = "true"
        //state = true 是數字 、 false 不是數字
        switch (icon) {
            case "AC": {
                setInput('');
                state = false;
            }
            case "+":
                if (isNaN(input[(input.length - 1)])) {
                    console.log("+++");
                    // alert('err!請按AC後重新輸入1'); //等等改成alert
                    state = "false";
                } else {
                    setIcon(["+", input.length])
                }
                break;
            case "-":
                if (isNaN(input[(input.length - 1)])) {
                    // alert('err!請按AC後重新輸入2');  //等等改成alert
                    state = "false";
                } else {
                    setIcon(["-", input.length])
                }
                break;
            case "*":
                if (isNaN(input[(input.length - 1)])) {
                    // alert('err!請按AC後重新輸入3');  //等等改成alert
                    state = "false";
                } else {
                    setIcon(["*", input.length])
                }
                break;
            case "÷":
                if (isNaN(input[(input.length - 1)])) {
                    // alert('err!請按AC後重新輸入4'); //等等改成alert
                    state = "false";
                } else {
                    setIcon(["/", input.length])
                }
                break;
            case "=":
                //if 最後一位不是數字
                if (isNaN(input[(input.length - 1)])) {

                    state = "false";
                } else {
                    state = "false";
                    switch (wait_icon[0]) {
                        case '+':
                            setInput(parseInt(answer) + parseInt(waitToPlus_answer)); //寫成function

                            break;
                        case '-':
                            console.log("--------！");
                            setInput(parseInt(answer) - parseInt(waitToPlus_answer));

                            break;
                        case '*':
                            setInput(parseInt(answer) * parseInt(waitToPlus_answer));

                            break;
                        case '/':
                            var t = (parseInt(answer) / parseInt(waitToPlus_answer)).toFixed(4);
                            setInput(t);
                            break;
                        default:
                            break;
                    }


                }
                break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":

            default:
                break;
        }

        //可以繼續跑
        if (state == "true") {
            setInput((prev) => { return (prev + icon) })

        }
    }
    const ID = 'icon' + '-' + icon
    return (<div className="button" id={ID} onClick={change} > {icon}</div >);
}
export default Bt;