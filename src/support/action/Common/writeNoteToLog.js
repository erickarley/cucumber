/**
 * Clicks a tab on 2020
 * @param  {String}   text4Log           Text on the tab
 */

 export default (text4Log) => {
    console.log(text4Log);
    process.emit('test:log', text4Log);
}
