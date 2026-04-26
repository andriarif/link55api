export default async function handler(req, res) {

res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET");

try{

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

if(!list || list.length < 2){

return res.status(500).json({
error:"Result tidak ditemukan"
});

}

/* AMBIL RESULT FIX */
const hasilData = list[1];

const fullIssue =
hasilData.issueNumber;

const numberString =
hasilData.number;

const hasil =
parseInt(numberString);

return res.status(200).json({

periode:fullIssue.slice(-5),
issue:fullIssue,
hasil:hasil,
number:numberString

});

}catch(err){

return res.status(500).json({

error:"Server Error",
detail:err.message

});

}

}
