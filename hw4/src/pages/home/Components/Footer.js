const Footer = ({ length, click, setMode, setCompletedClick }) => {

    const sum = parseInt(length - click);

    function mode1() {
        setMode(1);
    }
    function mode2() {
        setMode(2);
    }
    function mode3() {
        setMode(3);
    }
    function completed() {
        setCompletedClick(1)
    }

    if (length !== 0 && parseInt(click) !== 0) {
        return (<footer className="todo-app__footer" id="todo-footer">
            <div className="todo-app__total" id="todo-app__total">{sum} left</div>
            <ul className="todo-app__view-buttons">
                <li><button id="allbt" onClick={mode1}>All</button></li>
                <li><button id="activebt" onClick={mode2} >Active</button></li>
                <li><button id="completedbt" onClick={mode3}>Completed</button></li>
            </ul>

            <div className="todo-app__clean"><button id="clearbt" onClick={completed}>Clear completed</button></div>
        </footer >)
    } else if (length !== 0 && parseInt(click) === 0) {
        return (<footer className="todo-app__footer" id="todo-footer">
            <div className="todo-app__total" id="todo-app__total">{sum} left</div>
            <ul className="todo-app__view-buttons">
                <li><button id="allbt" onClick={mode1}>All</button></li>
                <li><button id="activebt" onClick={mode2} >Active</button></li>
                <li><button id="completedbt" onClick={mode3}>Completed</button></li>
            </ul>
            <div className="todo-app__clean" style={{ visibility: 'hidden' }}><button id="clearbt">Clear completed</button></div>
        </footer >)
    } else {
        return null;
    }
}

export default Footer;