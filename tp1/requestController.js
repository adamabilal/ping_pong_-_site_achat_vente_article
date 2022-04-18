import {URL} from 'url' 
import FirstResponse from './firstResponse.js'
import SecondResponse from './secondResponse.js'
import ErrorResponse from './errorResponse.js'
import JsonResponse from './jsonResponse.js'
import JsonRandomResponse from './jsonRandomResponse.js'
import PublicRessourceResponse from './publicRessourceResponse.js'
export default class RequestController{
    static BASE = 'http://localhost';
    #request
    #response
    #url
    constructor(request, response){
        this.#request = request
        this.#response = response 
    }


    handleRequest(){
        const url = new URL(this.#request.url, RequestController.BASE)
        const path = url.pathname
        this.#url = url
        this.route(path, this.#request, this.#response)
        this.#response.end()
    }

    route(path,request,response){
        if(path=='/first'){
            new FirstResponse(request,response, 200, this.#url).buildResponse()
        }
        else if(path=='/second'){
            new SecondResponse(request,response,200, this.#url).buildResponse()
        }
        else if(path=='/json'){
            const params = this.#url.searchParams
            
            if(Array.from(params).length > 0){
                new JsonResponse(request,response, 200, this.#url).buildResponse()
            }
            else{
                new ErrorResponse(request,response, 404, this.#url).buildResponse()
            }
        }
        else if(path=='/random'){
            const params = this.#url.searchParams
            if(Array.from(params).length==0){
                new JsonRandomResponse(request,response, 200, this.#url).buildResponse()
            }
            else{
                new ErrorResponse(request,response, 404, this.#url).buildResponse()  
            }

        }
        else if(path.startsWith('/public')){
            new PublicRessourceResponse(request,response, 200, this.#url).buildResponse()
        }
        else{
            new ErrorResponse(request,response, 404, this.#url).buildResponse()
        }
    }

}