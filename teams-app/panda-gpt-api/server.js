const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sql = require('mssql');
require("dotenv").config();

const PORT = process.env.PORT || 3080;

// Daycare data daily updates
var daycareData;
var filteredDaycareData;
// Initial messages value
var _messages = [
    {
        role: "system",
        content:
            "As a daycare assistant chatbot for `Panda Care` daycare, you will be provided with some data about the children in a daycare. You are to kindly respond to requests about a particular child from the daycare. You will be given the data upon request.",
    },
    {
        role: "assistant",
        content:
            "🐼 Hi, you can ask me questions about any child enrolled in Panda Care Daycare. 🐼",
    }
];

var _filteredMessages = [ 
    { 
        role: 'system',
        content: 
        "As a daycare assistant, you are to provide information about a particular child from the daycare. You will be given the data upon request."
    }
];


const app = express();
app.use(cors());
app.use(bodyParser.json());

let config = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // Required for Azure SQL Database
        trustServerCertificate: true // Required if your database is using a self-signed certificate
    }
};

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/botresponse", async (req, res) => {
    console.log("In botresponse with message: " + req.body.data);
    const message = req.body;
    if(daycareData == undefined || daycareData == null) {
        daycareData = await getDaycareUpdatesData();
        console.log(JSON.stringify(daycareData));
        _messages.push({
            role: "system",
            content: `This is the daycare's data to analyze about the children: ${JSON.stringify(
                daycareData
            )} `,
    });
    }
    _messages.push({ role: "user", content: message.data });
    var botResponse = await getCompletion(_messages);
    var botMessage = botResponse.data.choices[0].message.content;
    _messages.push({ role: "system", content: botMessage });
    res.status(200).json(botMessage);
});

app.post("/parentchild", async (req, res) => {
    const message = req.body;
    if(filteredDaycareData == undefined || filteredDaycareData == null) {
        filteredDaycareData = await getDaycareUpdatesByChildForParent(message.parentName, message.childName);
        if(filteredDaycareData == undefined || filteredDaycareData == null) {
            res.status(200).json(`Sorry, I couldn't find any information about the child named ${message.childName} with a parent named ${message.parentName}.`);   
        }
        console.log(JSON.stringify(filteredDaycareData));
        _filteredMessages.push({
            role: "system",
            content: `The following information is about a child named ${message.childName} with a parent named ${message.parentName}: ${JSON.stringify(
                filteredDaycareData
            )}. Give the parent the information based on what they asked for pertaining to the child.`,
    });
    }
    _filteredMessages.push({ role: "user", content: message.messageText });
    var botResponse = await getCompletion(_filteredMessages);
    var botMessage = botResponse.data.choices[0].message.content;
    _filteredMessages.push({ role: "system", content: botMessage });
    res.status(200).json(botMessage);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

async function getCompletion(messages) {
    try {
        const resp = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.4,
        });
        return resp;
    } catch (err) {
        const failedResponse = {
            data: {
                choices: [
                    {
                        message: {
                            content: "An unexpected error occurred. Please try again.",
                        },
                    },
                ],
            },
        };
        return failedResponse;
    }
}

async function getDaycareUpdatesData() {
    // Connect to the Azure SQL database

    try{
        const pool = await sql.connect(config);
        const results = await pool.request().query(`SELECT TOP (30) * FROM ${config.table1} JOIN ${config.table2} ON ${config.table1}.childId = ${config.table2}.childId;`);
        const rows = results.recordset;
        console.log("called");
        return rows;
    }
    catch(err){
        console.log(err);
    }
    finally{
        sql.close();
    }
}

async function getDaycareUpdatesByChildForParent(parentName, childName) {
    try {
      await sql.connect(config);
      
      const request = new sql.Request();

      request.input('ParentName', sql.NVarChar, parentName);
      request.input('ChildName', sql.NVarChar, childName);
      
      const result = await request.execute('GetChildUpdatesForParent');
      console.log(result.recordsets[0]);
      const rows = result.recordsets;
      return rows;
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      sql.close();
    }
  }