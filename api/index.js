export default async function handler(req, res) {

res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET");

try{

/* ================= GET ISSUE AKTIF ================= */

const issueResp = await fetch(
"https://newapi.55lottertttapi.com/api/webapi/GetGameIssue",
{
method:"POST",

headers:{
"Content-Type":"application/json;charset=UTF-8"
},

body:JSON.stringify({

/* WINGO 1 MENIT */

typeId:1,

language:0,

random:
Math.random().toString(36).substring(2),

signature:
"5DB43C344C7381B72B5262FFB3572444",

timestamp:
Math.floor(Date.now()/1000)

})

}
);

const issueJson =
await issueResp.json();

const currentIssue =
String(
issueJson?.data?.issueNumber || ""
).trim();

/* ================= GET RESULT HISTORY ================= */

const resultResp = await fetch(
"https://newapi.55lottertttapi.com/api/webapi/GetNoaverageEmerdList",
{
method:"POST",

headers:{
"Content-Type":"application/json;charset=UTF-8"
},

body:JSON.stringify({

pageSize:10,

pageNo:1,

/* WINGO 1 MENIT */

typeId:1,

language:0,

random:
Math.random().toString(36).substring(2),

signature:
"A6203E85132E5FE26B5F43DDF1ECDD07",

timestamp:
Math.floor(Date.now()/1000)

})

}
);

const resultJson =
await resultResp.json();

const list =
resultJson?.data?.list;

/* ================= VALIDASI ================= */

if(
!list ||
!Array.isArray(list) ||
list.length < 1
){

return res.status(500).json({

error:"Result tidak ditemukan"

});

}

/* ================= RESULT TERBARU ================= */

const latest =
list[0];

const hasil =
parseInt(latest.number);

const resultIssue =
String(
latest.issueNumber || ""
).trim();

/* ================= RETURN ================= */

return res.status(200).json({

success:true,

/* PERIODE BERJALAN */

periode:currentIssue,

/* RESULT TERAKHIR */

resultIssue:resultIssue,

hasil:hasil,

number:latest.number,

status:
hasil <= 4
? "SMALL"
: "BIG",

serverTime:
Date.now()

});

}catch(err){

return res.status(500).json({

success:false,

error:"Server Error",

detail:err.message

});

}

}
