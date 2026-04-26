export default async function handler(req, res) {

res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET");

try{

const issueResp = await fetch(
"https://newapi.55lottertttapi.com/api/webapi/GetGameIssue",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
typeId:1,
language:0,
random:"166b81d9568e4123a83a2c7fdb80b7d9",
signature:"5DB43C344C7381B72B5262FFB3572444",
timestamp:1737252405
})
}
);

const issueJson = await issueResp.json();

const fullIssue =
issueJson.data.issueNumber;

const periode =
fullIssue.toString().slice(-5);

const resultResp = await fetch(
"https://newapi.55lottertttapi.com/api/webapi/GetNoaverageEmerdList",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
pageSize:10,
pageNo:1,
typeId:1,
language:0,
random:"b631eb26bac6403e99093913e5bb48c5",
signature:"A6203E85132E5FE26B5F43DDF1ECDD07",
timestamp:1737252405
})
}
);

const resultJson =
await resultResp.json();

const list =
resultJson.data.list;

const numberString =
list[0].number;

const lastDigit =
numberString.split(",").pop();

return res.status(200).json({

periode,
issue:fullIssue,
hasil:parseInt(lastDigit),
number:numberString

});

}catch(err){

return res.status(500).json({

error:"Server Error",
detail:err.message

});

}

}
