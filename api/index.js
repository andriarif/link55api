export default async function handler(req, res) {

res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET");

try{

/* GET ISSUE AKTIF */
const issueResp = await fetch(
"https://newapi.55lottertttapi.com/api/webapi/GetGameIssue",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
typeId:30,
language:0,
random:"166b81d9568e4123a83a2c7fdb80b7d9",
signature:"5DB43C344C7381B72B5262FFB3572444",
timestamp:1737252405
})
}
);

const issueJson =
await issueResp.json();

const currentIssue =
issueJson?.data?.issueNumber;

/* GET HISTORY RESULT */
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
typeId:30,
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
resultJson?.data?.list;

if(!list || list.length < 1){

return res.status(500).json({
error:"Result tidak ditemukan"
});

}

/* RESULT TERAKHIR FIX */
const latest =
list[0];

const hasil =
parseInt(latest.number);

return res.status(200).json({

/* PERIODE BERJALAN */
periode:currentIssue,

/* RESULT FIX */
resultIssue:latest.issueNumber,

hasil:hasil,

number:latest.number,

status:
hasil <= 4
? "SMALL"
: "BIG"

});

}catch(err){

return res.status(500).json({

error:"Server Error",
detail:err.message

});

}

}
