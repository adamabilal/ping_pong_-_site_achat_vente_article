import ResponseBuilder from "./reponseBuilder.js"
export default class HtmlResponse extends ResponseBuilder {
    
 
    #contentType
  
    constructor(request,response, status, url){
        super(request,response, status, url)
        super.contentType = 'text/html;charset=utf-8'
    }

    buildResponse(){   
        this.buildHeader()
        this.buildBody()
        this.buildFooter()
    }

    buildHeader(){
       
        this.response.statusCode = super.status
        this.response.setHeader('Content-Type', super.contentType)
        this.response.write(`<link href="./public/style/style.css" rel="stylesheet" type="text/css">`)
    }

    buildBody(){
    }

    buildFooter(){
        this.response.write(`<footer class="ok"><p> ${new Date()} </p></footer></body></html>`)
    }

}
