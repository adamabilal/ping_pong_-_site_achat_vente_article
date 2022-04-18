import HtmlResponse from "./htmlResponse.js"
export default class ErrorResponse extends HtmlResponse {
    
    #header
    #contentType
  
    constructor(request,response, status=404,url){
        super(request,response, 404, url)
    }

    buildResponse(){ 
        this.buildHeader()
        this.buildBody()
        this.buildFooter()  
    }

    buildHeader(){
        super.buildHeader()
        this.response.write('<hmtl> <head> Page non trouvée </head>')
    }

    buildBody(){
        this.response.write(`<body> <h1> Page non trouvée </h1><p> La page ${this.url.pathname}  n'a pas été trouvée </p>`)
    }

    buildFooter(){
        this.response.write(`<footer><p> ${new Date()} </p></footer></body></html>`)
    }


}