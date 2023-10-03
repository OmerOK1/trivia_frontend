class Globals {

}

class DevelopmentGlobals extends Globals {
    public urls = {
        customer: "http://localhost:8080/customers/",

    }
}

class ProductionGlobals extends Globals {
    public urls = {
        customer: "http://localhost:8080/customers/"
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;