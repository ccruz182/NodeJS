const semver = require('semver');

class ServiceRegistry {
    constructor(log) {
        this.log = log;
        this.services = {};
        this.timeout = 30;
    }

    getRegisterService = (name, version) => {
        this.cleanUp();
        const candidates = Object.values(this.services).filter(s => s.name === name && semver.satisfies(s.version, version) );

        return candidates[Math.floor(Math.random() * candidates.length)];
    }

    getRegisteredServices = () => {
        this.cleanUp();
        const registeredServices = Object.entries(this.services).map(e => {return {'key': e[0], ...e[1]}});

        return registeredServices;
    }

    register = (serviceInformation) => {
        this.cleanUp();
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

    cleanUp = () => {
        const now = Math.floor(new Date() / 1000);
        console.log("--> now", now);
        Object.keys(this.services).forEach(key => {
            if (this.services[key].timestamp + this.timeout < now ) {
                // Delete
                delete this.services[key];
                this.log.debug(`'${key}' service was removed`);
            }
        })
    }
}

module.exports = ServiceRegistry;