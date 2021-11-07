import "./Show.css"
const Show = ({ input }) => {
    if (input == "Infinity") {
        return (<div className='show' ><text className="showText">err</text></div>)
    } else {
        return (<div className='show' ><text className="showText">{input}</text></div>)
    }
}
export default Show