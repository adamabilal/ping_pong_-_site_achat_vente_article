import * as http from 'http'
export default class ResponseBuilder {
    
    #request
    #response
    #status
    #contentType
    #url
    constructor(request,response, status, url){
        this.#request = request
        this.#response = response 
        this.#status = status
        this.#contentType = null
        this.#url = url
       
    }

    buildResponse(){
        this.buildHeader()
        this.buildBody()
        this.buildFooter()
    }

    buildHeader(){
        this.#response.statusCode = this.status
        this.#response.setHeader('Content-Type', this.contentType )
    }

    buildBody(){}  


    buildFooter(){}

    get request(){
        return this.#request
    }

    get response(){
        return this.#response
    }

    get status(){
        return this.#status
    }

    set request(req){
        this.#request = req
    }

    set response(res){
        this.#response = res
    }

    set status(status){
        this.response.statusCode = this.status
    }

    get contentType(){
        return this.#contentType
    }

    set contentType(ct){
        this.#contentType = ct
    }
    
    get url(){
        return this.#url
    }

}