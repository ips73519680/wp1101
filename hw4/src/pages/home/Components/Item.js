import { useState } from 'react'
import x from '../../../img/x.png'


const Item = ({ click, setClick, text, id, deleteData, mode, completedClick }) => {
    const [state, setState] = useState([0]);
    // state==0 ：未點擊(active) state == 1：已點擊(completed)
    function changeStyle() {
        if (state === 1) {
            setState(0); setClick(parseInt(click - 1));
        }
        else {
            setState(1); setClick(parseInt(click + 1));
        }
    }
    function deleteItem() {
        deleteData(function (prev) {
            if (state === 1) {
                setClick(click - 1)
            }
            return (prev.filter((item) => item.id !== id));
        })
    }
    const item = (<li className="todo-app__item" >
        <div className="todo-app__checkbox" >
            <input id={id} type="checkbox" onClick={changeStyle} checked={(state == 1) ? true : false} /> <label htmlFor={id}></label>
        </div>
        <h1 style={(state === 1) ? { textDecoration: 'line-through', opacity: 0.5 } : { textDecoration: 'none', opacity: 1 }} className="todo-app__item-detail">{text}</h1>
        <img src={x} alt="" className="todo-app__item-x" onClick={deleteItem} />
    </li >)

    if (completedClick === 1 && state == 1) {
        deleteItem();
    }
    if (mode == 1) {
        return item;
    } else if (mode === 2 && state == 0) {
        return item;
    } else if (mode === 3 && state == 1) {
        return item;
    } else {
        return null;
    }

}
export default Item;


