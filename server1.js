
const { log } = require('console');
const http=require('http');
const  PORT=3000;

const blogs=[
    {
        id:1,
        title:'Node.js',
        author:"Jhon Doe",
        content:'Node.js is an open-source, cross-platform JavaScript runtime environment that allows you to run JavaScript code outside the browser. It is built on Google'
    },
      {
        id:2,
        title:'Angular',
        author:"jon Doe",
        content:'Angular is an open-source, cross-platform JavaScript runtime environment that allows you to run JavaScript code outside the browser. It is built on Google'
    }
]

//BASE_URL===localhost:3000
//BASE_URL===BASE_URL/blogs  &&METHOD-"GET"
//BASE_URL===BASE_URL/blogs  &&METHOD-"POST"
//BASE_URL===BASE_URL/blogs/:id  &&METHOD-"GET"


// const server=http.createServer((req,res)=>{
//     if(req.method=="GET" && req.url ==="/blogs"){
//         res.writeHead(200,{
//             "content-type":"application/json"
//         })
//         res.end(JSON.stringify(blogs))
//     }
// })

const server=http.createServer((req,res)=>{
    if(req.method==="GET" &&req.url.startsWith('/blogs')){
        // /blogs/1.>>['blogs','1']
        let id=req.url.split('/')[2] //string
        const blog=blogs.find(t=>t.id==id)
        if(blog){
            res.writeHead(200,{
            "content-type":"application/json"
        })
        res.end(JSON.stringify(blogs))

        }
    }
        
})

server.listen(PORT,()=>{
    console.log(`Server is running in ${PORT}`);
})