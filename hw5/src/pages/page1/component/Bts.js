import Bt from './Bt'

// const icons = [["C", "+/-", "%", "÷"], ["x^2", "√", "MC", "MR"], ["7", "8", "9", "*"], ["4", "5", "6", "-"], ["1", "2", "3", "+"], ["0", ".", "DEl", "="]];
const icons = [["AC", "+/-", "%", "÷"], ["7", "8", "9", "*"], ["4", "5", "6", "-"], ["1", "2", "3", "+"]];

const Bts = ({ setInput, input, setAnswer, answer, wait_icon, setIcon, waitToPlus_answer, setOutcome }) => {
    return (

        <div > {
            icons.map((items) =>
                < div>
                    {items.map((item) => <Bt key={item} wait_icon={wait_icon} setIcon={setIcon} icon={item} setInput={setInput} input={input} setAnswer={setAnswer} answer={answer} waitToPlus_answer={waitToPlus_answer} />)}
                </div>)
        }
            < Bt key='0' wait_icon={wait_icon} setIcon={setIcon} icon='0' setInput={setInput} input={input} setAnswer={setAnswer} answer={answer} waitToPlus_answer={waitToPlus_answer} />
            <Bt key="." wait_icon={wait_icon} setIcon={setIcon} icon="." setInput={setInput} input={input} setAnswer={setAnswer} answer={answer} waitToPlus_answer={waitToPlus_answer} />
            <Bt key="=" wait_icon={wait_icon} setIcon={setIcon} icon="=" setInput={setInput} input={input} setAnswer={setAnswer} answer={answer} waitToPlus_answer={waitToPlus_answer} />
        </div >
    )

}
export default Bts;