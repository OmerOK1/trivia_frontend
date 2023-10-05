class Globals {

}

class DevelopmentGlobals extends Globals {
    host: string = "10.0.0.23";
    public urls = {
        customer: `http://${this.host}:8080/customers/`,

    }
}

class ProductionGlobals extends Globals {
    public urls = {
        customer: "http://localhost:8080/customers/"
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;