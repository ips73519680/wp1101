
import Item from './Item'
import { useState } from 'react'
const List = ({ click, setClick, listData, add, deleteData, mode, completedClick }) => {

    const [note, setNote] = useState("");
    function noteChange(e) {
        setNote(e.target.value);
    }
    const [counter, setCounter] = useState(0);
    return (
        <section className="to-do-app__main">
            <input value={note} className="todo-app__input" onChange={noteChange} id="input" onKeyPress={(e) => {
                if (e.key === "Enter") {
                    add(function (prevData) {
                        setCounter(counter + 1);
                        return [...prevData, { note, id: counter }]
                    })
                    setNote('');
                }
            }} />
            <ul className="todo-app__list" id="todo-app__list">
                {listData.map((item) => { return <Item mode={mode} completedClick={completedClick} text={item.note} id={item.id} key={item.id} setClick={setClick} click={click} deleteData={deleteData} /> })}
            </ul>
        </section>
    )
}

export default List;

