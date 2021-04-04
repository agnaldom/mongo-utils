import url from 'url';
import Promise from 'bluebird';
import MongoClient from Promise.promisify(require('mongodb').MongoClient);

let currData = 0;

const loadDbFromUrl = async (mongoUrl) =>  {
    const dbUrl = url.parse(mongoUrl);
    const dbName = dbUrl.pathname.slice(1);

    try {
        const dbServer = new mongodb.Server(dbUrl.hostname, dbUrl.port, { auto_reconnect: true });
        const db = new mongodb.DB(dbName, dbServer, {});
    } catch (e) {
        console.error('\x1b[31m%s\x1b[0m', `Auth error! Please double check source and target URL's`);
        process.exit(1);
    }
    try {
        const admin = await MongoClient.connect(mongoUrl).catch(`Auth error! Please double check source and target URL's`);
        return admin;
    } catch (e) {
        console.error('\x1b[31m%s\x1b[0m', 'Failed to connect to DB! ', e);
        process.exit(1)
    }
}

const main = async (sourceDbUrl, targetDbUrl, forceDrop) => {
    return new Promise(async (res, rej) =>{})
}