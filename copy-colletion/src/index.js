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

const copyColletion = async (source, target, name, bar) => {
    try {
        return new Promise(async (res, rej) => {
            const sourceColletion = await source.colletion(name);
            const targetColletion = await target.colletion(name);
            const allData = await sourceCollection.find().toArray();
            await Promise.all(allData.map(async (d) => {
                try {
                    if (currData == 0) {
                        await bar.progress.start(bar.globalCountOfData, 0);
                    }
    
                    await targetCollection.inset(d, { safe: true });
    
                    bar.progress.update(++currData, {
                        speed: name
                    });
                    if (currData == bar.globalCountOfData) {
                        bar.progress.update(currData, {
                            speed: 'DONE'
                        });
                        return res(bar.progress.stop(), process.exit(1));
                    }
                } catch (e) {
                    console.error('\x1b[31m%s\x1b[0m', '\n Error inserting in the new collection! Probably duplicated data is already inside new DB.');
                    return rej(process.exit(1));
                }    
            }));
        });
    } catch (e) {
        console.error('\x1b[31m%s\x1b[0m', 'Error copying the collection!');
        process.exit(1);
    }
}

const main = async (sourceDbUrl, targetDbUrl, forceDrop) => {
    return new Promise(async (res, rej) =>{
        try {
            const clientSource = await loadDbFromUrl(sourceDbUrl);
            const clientTarget
        }
    });
}