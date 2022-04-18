import ResponseBuilder from "./reponseBuilder.js"
import { readFileSync } from 'fs'
import ErrorResponse from "./errorResponse.js"
export default class PublicRessourceResponse extends ResponseBuilder{
    #ressourceContent
    constructor(request, response, status, url){
        super(request, response, status, url)
        this.#ressourceContent = null
    }

    buildResponse(){
        let path = this.url.pathname
        path = `.${path}`
        try {
            this.#ressourceContent = readFileSync(path);
            this.contentType = 'text/plain'
            this.buildBody()
        } catch (error) {
            new ErrorResponse(this.request, this.response,this.status, this.url).buildResponse()
        }
    }

    buildBody(){
        this.response.write(this.#ressourceContent)
    }
    

}