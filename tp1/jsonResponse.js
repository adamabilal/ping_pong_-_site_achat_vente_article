import ResponseBuilder from "./reponseBuilder.js";
export default class JsonResponse extends ResponseBuilder{

    #contentType
    #url
    constructor(request,response, status=200, url){
        super(request,response, status)
        super.contentType = 'application/json'
        this.#url = url
    }

    buildResponse(){ 
        this.buildHeader()
        this.buildBody() 
    }

    buildHeader(){
        super.buildHeader()
        this.response.statusCode = super.status
    }

    buildBody(){
        let parms = {}
        const urlparams = this.#url.searchParams
        urlparams.forEach((value, key) => {
            parms[key] = value
        });
        parms["date"] = new Date()

        this.response.write(JSON.stringify(parms))
    }

    set status(status){
        this.response.statusCode = this.status
    }

}