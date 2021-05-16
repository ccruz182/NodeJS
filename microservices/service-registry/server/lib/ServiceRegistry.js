class ServiceRegistry {
    constructor(log) {
        this.log = log;
        this.services = {};
        this.timeout = 30;
    }

    getRegisteredServices = () => {
        const registeredServices = Object.entries(this.services).map(e => {return {'key': e[0], ...e[1]}});

        return registeredServices;
    }

    register = (serviceInformation) => {
        const { name, version, ip, port} = serviceInformation;
        const key = `${name}/${version}/${ip}/${port}`;

        if (!this.services[key]) {
            const newService = {
                name, version, ip, port,
                timestamp: Math.floor(new Date() / 1000)
            };

            this.services[key] = {... newService};

            this.log.debug(`Added service ${JSON.stringify(this.services[key])}`);
        } else {
            const newService = {
                name, version, ip, port,
                timestamp: Math.floor(new Date() / 1000)
            };

            this.services[key] = {... newService}; 
            this.log.debug(`Updated servicd ${this.services[key]}`);
        }

        return key;
    }

    unregister = (serviceInformation) => {
        const { name, version, ip, port} = serviceInformation;
        const key = `${name}/${version}/${ip}/${port}`;
        console.log("Deleting ->", key);
        delete this.services[key];

        return key;
    }
}

module.exports = ServiceRegistry;