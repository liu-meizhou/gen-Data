
const addressCode = require('./json.json')
const fs = require('fs')

function handleData(data, parentCode = '000000') {
    return Object.keys(data).map(key => {
        const [name, code] = key.split('&');
        const item = { name, code, parentCode };
        const children = data[key];
        item.children = handleData(children, code);
        return item;
    });
}

const data = handleData(addressCode);

fs.promises.writeFile('./data.json', JSON.stringify(data), {
    encoding: "utf8",
    flag: "w",
    mode: 0o666,
}).catch(console.error);
