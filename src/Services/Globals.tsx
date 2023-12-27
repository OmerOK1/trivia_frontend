class Globals {

}

class DevelopmentGlobals extends Globals {
    host: string = "10.0.0.35"; //needs to be updated every launch - ipconfig on cmd
    public urls = {
        customer: `http://${this.host}:8080/customers/`,
        //customer: `http://localhost:8080/customers/`,

    }
    public getHost = this.host;
}

class ProductionGlobals extends Globals {
    host: string = "10.0.0.35"; //needs to be updated every launch. TODO: delete!
    public urls = {
        customer: "http://localhost:8080/customers/"
    }
    
    public getHost = this.host;
}
console.log("env = " + process.env.NODE_ENV === 'production');
const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;