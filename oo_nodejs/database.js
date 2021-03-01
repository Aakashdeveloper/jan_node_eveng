import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;
const url ="mongodb://localhost:27017";
const dbname="januser";

const MainCall = {}
var output;

MainCall.getData=(colName)=>{
    MongoClient.connect(url,(err,connection)=>{
        if(err) throw err;
        var dbo= connection.db(dbname);
        dbo.collection(colName).find({}).toArray((err,result) => {
            if(err) throw err;
            console.log('Data Fetched');
            output = result
        })
    })

    return output;
}

MainCall.postData=(colName,dbObj)=>{
    MongoClient.connect(url,(err,connection)=>{
        if(err) throw err;
        var dbo= connection.db(dbname);
        dbo.collection(colName).insertOne(dbObj,(err,result) => {
            if(err) throw err;
            console.log('Data Added');
        })
    })
    return 'Data Added';
}

export default MainCall;