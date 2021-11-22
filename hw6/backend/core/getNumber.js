let number

const genNumber = () => {
    if (number === undefined) {
        number = Math.floor(Math.random() * 100) + 1
    }
    console.log(number);
    return number
}
function roughScale(x, base) {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) { return 0; }
    return parsed;
}
const getNumber = () => {
    return number
}
export { getNumber, genNumber, roughScale }