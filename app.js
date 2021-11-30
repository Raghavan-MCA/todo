const mongoose = require('mongoose');
const hapi=require('hapi');
mongoose.connect("mongodb://localhost:27017/todoapp")
const todumode=mongoose.model('taskinfo',{
    id:Number,
    taskname:String,
  
})
const server=new hapi.Server({
    host:'localhost',
    port:2000
})

server.route({
    method:'POST',
    path:'/todo',
    handler:async (req,h)=>{
        const mytodo=new todumode(req.payload)
        const result=await mytodo.save()
        return h.response(result)
    }
})
    server.route({
        method:'GET',
        path:'/todoviewer',
        handler:async (req,h)=>{
            const mytodo =await todumode.find().exec()
            return h.response(mytodo)
        }
    })

    server.route({
        method:'GET',
        path:'/todofinder/{id}',
        handler:async(req,h)=>{
            const mytodo =await todumode.findById(req.params.id).exec()
            return h.response(mytodo)
        }
    })

    

server.start(
    console.log('connected')
)

