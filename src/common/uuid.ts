// https://gist.github.com/jed/982883
// copied from https://github.com/airbnb/hypernova/blob/master/src/index.js
export function uuid() {
    return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
        /[018]/g,
        (x: any) => (x ^ ((Math.random() * 16) >> (x / 4))).toString(16) // eslint-disable-line no-mixed-operators, no-bitwise, max-len
    )
}
