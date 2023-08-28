class Globals {
}

class DevelopmentGlobals extends Globals {
    public urls = {
        admin: "http://localhost:8080/admin/",
        company: "http://localhost:8080/companies/", 
        customer: "http://localhost:8080/customers/",
        login: "http://localhost:8080/login/"
    }
}

class ProductionGlobals extends Globals {
    public urls = {
        admin: "https://couponsystembackend-railway-production.up.railway.app/admin/",
        company: "https://couponsystembackend-railway-production.up.railway.app/companies/",
        customer: "https://couponsystembackend-railway-production.up.railway.app/customers/",
        login: "https://couponsystembackend-railway-production.up.railway.app/login/"
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;