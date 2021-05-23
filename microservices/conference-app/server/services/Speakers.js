const axios = require("axios");
const url = require("url");
const crypto = require("crypto");

const CircuitBreaker = require("../lib/CircuitBreaker");

const circuitBreaker = new CircuitBreaker();

const SERVICE_NAME = "speakers-service";
const SERVICE_VERSION = "1";

class SpeakersService {
  constructor({ serviceRegistryUrl, serviceVersionIdentifier }) {
    this.serviceRegistryUrl = serviceRegistryUrl;
    this.serviceVersionIdentifier = serviceVersionIdentifier;
    this.cache = {};
  }

  async getNames() {
    const { response } = await this.getService(SERVICE_NAME);
    const { ip, port } = response;

    return this.callService({
      method: "GET",
      url: `http://${ip}:${port}/speakers/names`,
    });
  }

  async getListShort() {
    const { response } = await this.getService(SERVICE_NAME);
    const { ip, port } = response;

    return this.callService({
      method: "GET",
      url: `http://${ip}:${port}/speakers-short`,
    });
  }

  async getList() {
    const { response } = await this.getService(SERVICE_NAME);
    const { ip, port } = response;

    return this.callService({
      method: "GET",
      url: `http://${ip}:${port}/speakers`,
    });
  }

  async getAllArtwork() {
    const { response } = await this.getService(SERVICE_NAME);
    const { ip, port } = response;

    return this.callService({
      method: "GET",
      url: `http://${ip}:${port}/artworks`,
    });
  }

  async getSpeaker(shortname) {
    const { response } = await this.getService(SERVICE_NAME);
    const { ip, port } = response;

    return this.callService({
      method: "GET",
      url: `http://${ip}:${port}/speakers/${shortname}`,
    });
  }

  async getArtworkForSpeaker(shortname) {
    const { response } = await this.getService(SERVICE_NAME);
    const { ip, port } = response;

    return this.callService({
      method: "GET",
      url: `http://${ip}:${port}/artworks/${shortname}`,
    });
  }

  getImage = async (path) => {
    const { response } = await this.getService(SERVICE_NAME);
    const { ip, port } = response;

    return this.callService({
      method: "GET",
      responseType: "stream",
      url: `http://${ip}:${port}/images/${path}`,
    });
  };

  callService = async (requestOptions) => {
    console.log("CALLING SPEAKERS SERVICE")
    const servicePath = url.parse(requestOptions.url).path;
    const cacheKey = crypto
      .createHash("md5")
      .update(requestOptions.method + servicePath)
      .digest("hex");

    const result = await circuitBreaker.callService(requestOptions);
    
    if (!result) {
      if (this.cache[cacheKey]) {
        console.log("RETURNING FROM CACHE");
        return this.cache[cacheKey];
      } else {
        console.log("NO CACHE :C")
        return false;
      }
    }
    this.cache[cacheKey] = result;

    return result;
  };

  getService = async (serviceName) => {
    const response = await axios.get(
      `${this.serviceRegistryUrl}/services/${serviceName}/${this.serviceVersionIdentifier}`
    );

    return response.data;
  };
}

module.exports = SpeakersService;
