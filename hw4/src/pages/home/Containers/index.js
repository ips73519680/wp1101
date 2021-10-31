import { useState } from 'react';
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import List from '../Components/List';
import { useEffect } from 'react';

const Home = () => {
    const [length, setLength] = useState([0]);
    const [data, setData] = useState([]);
    const [click, setClick] = useState([0]);
    const [completedClick, setCompletedClick] = useState([0]);


    // mode = 1 ：all ; mode = 2 ： active ; mode = 3 : completed
    const [mode, setMode] = useState([1]);

    useEffect(() => {
        setLength(data.length);
    }, [data])

    useEffect(() => {
        setClick(0);
        setCompletedClick(0);
    }, [completedClick])

    return (
        <div className="todo-app__root">
            <Header />
            <List completedClick={completedClick} listData={data} add={setData} setClick={setClick} click={click} deleteData={setData} mode={mode} />
            <Footer length={length} click={click} setCompletedClick={setCompletedClick} setMode={setMode} />
        </div>
    );
};


export default Home