import HtmlResponse from "./htmlResponse.js"

export default class FirstResponse extends HtmlResponse {
      
    constructor(request,response, status=200){
        super(request,response, status)
    }

    buildResponse(){ 
        this.buildHeader()
        this.buildBody()
        this.buildFooter()  
    }

    buildHeader(){
        super.buildHeader()
        this.response.write('<hmtl> <head> First route </head>')
    }

    buildBody(){
        this.response.write('<body> <h1> Welcome to First route </h1><p> First route access </p>')
    }

    set status(status){
        this.response.statusCode = this.status
    }


}