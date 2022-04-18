import HtmlResponse from "./htmlResponse.js"
import * as http from 'http'
export default class SecondResponse extends HtmlResponse {
  
    
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
        this.response.write('<html> <head> Second route </head>')
    }

    buildBody(){
        this.response.write('<body> <h1> Welcome to Second route </h1><p> Second route access </p>')
        this.response.write(`<img src="./public/img/timoleon_oceanie.jpg" alt="timoleon bien sur">`)
    }

}