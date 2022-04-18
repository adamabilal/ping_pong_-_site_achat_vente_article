import RequestController from './requestController.js'
import  http from 'http'
const server  = http.createServer((request,response)=>{
   new RequestController(request,response).handleRequest()
});
server.listen(8080)