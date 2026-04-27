export default async function handler(req, res) {

res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET");

try{

const response = await fetch(
"https://api.55fiveapi.com/api/webapi/GetNoaverageEmerdList",
{
method:"POST",

headers:{

"Content-Type":"application/json;charset=UTF-8",

"Accept":"application/json, text/plain, */*",

"Authorization":
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIxNzc3Mjk3Njk2IiwibmJmIjoiMTc3NzI5NzY5NiIsImV4cCI6IjE3NzcyOTk0OTYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyYXRpb24iOiI0LzI3LzIwMjYgOToxODoxNiBQTSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFjY2Vzc19Ub2tlbiIsIlVzZXJJZCI6IjEwOTY4NjMiLCJVc2VyTmFtZSI6IjYyODk1NDE0MzcwMTYyIiwiVXNlclBob3RvIjoiOSIsIk5pY2tOYW1lIjoiQW5kcmlwZWRpYSIsIkFtb3VudCI6IjMwLjQwIiwiSW50ZWdyYWwiOiIwIiwiTG9naW5NYXJrIjoiSDUiLCJMb2dpblRpbWUiOiI0LzI3LzIwMjYgODo0ODoxNiBQTSIsIkxvZ2luSVBBZGRyZXNzIjoiMTAzLjE2Ni45Mi4xOTgiLCJEYk51bWJlciI6IjAiLCJJc3ZhbGlkYXRvciI6IjAiLCJLZXlDb2RlIjoiMzAxNSIsIlRva2VuVHlwZSI6IkFjY2Vzc19Ub2tlbiIsIlBob25lVHlwZSI6IjEiLCJVc2VyVHlwZSI6IjAiLCJVc2VyTmFtZTIiOiJhbmRyaXBlZGlhOTBAZ21haWwuY29tIiwiaXNzIjoiand0SXNzdWVyIiwiYXVkIjoibG90dGVyeVRpY2tldCJ9.XWyroCj2s587J-QdApaGvyUQwxng8wLoNeG4EbbVWAQ",

"Ar-Origin":"https://www.lopmiva.com"

},

body:JSON.stringify({

pageSize:10,
pageNo:1,

/* WINGO 1 MENIT */
typeId:1,

language:1,

random:
Math.random().toString(36).substring(2),

signature:
"1F7A8D9E698F3155CB0E447679B1F5AD",

timestamp:
Math.floor(Date.now()/1000)

})

}
);

const data =
await response.json();

const latest =
data?.data?.list?.[0];

if(!latest){

return res.status(500).json({

success:false,
error:"Data tidak ditemukan"

});

}

const hasil =
parseInt(latest.number);

return res.status(200).json({

success:true,

periode:
latest.issueNumber,

hasil:hasil,

number:
latest.number,

status:
hasil <= 4
? "SMALL"
: "BIG",

warna:
latest.colour,

premium:
latest.premium,

serverTime:
Date.now()

});

}catch(err){

return res.status(500).json({

success:false,
error:err.toString()

});

}

}
