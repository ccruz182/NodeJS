const axios = require('axios');

const SERVICE_NAME = 'speakers-service';
const SERVICE_VERSION = '1';

class SpeakersService {
  constructor({serviceRegistryUrl, serviceVersionIdentifier}) {
    this.serviceRegistryUrl = serviceRegistryUrl;
    this.serviceVersionIdentifier = serviceVersionIdentifier;
  }

  async getNames() {
    const { response } = await this.getService(SERVICE_NAME);
    const {ip, port} = response;

    return this.callService({
      method: 'GET',
      url: `http://${ip}:${port}/speakers/names`
    });
  }

  async getListShort() {
    const { response } = await this.getService(SERVICE_NAME);
    const {ip, port} = response;

    return this.callService({
      method: 'GET',
      url: `http://${ip}:${port}/speakers-short`
    });
  }

  async getList() {
    const { response } = await this.getService(SERVICE_NAME);
    const {ip, port} = response;

    return this.callService({
      method: 'GET',
      url: `http://${ip}:${port}/speakers`
    });
  }

  async getAllArtwork() {
    const { response } = await this.getService(SERVICE_NAME);
    const {ip, port} = response;

    return this.callService({
      method: 'GET',
      url: `http://${ip}:${port}/artworks`
    });
  }

  async getSpeaker(shortname) {
    const { response } = await this.getService(SERVICE_NAME);
    const {ip, port} = response;

    return this.callService({
      method: 'GET',
      url: `http://${ip}:${port}/speakers/${shortname}`
    });
  }

  async getArtworkForSpeaker(shortname) {
    const { response } = await this.getService(SERVICE_NAME);
    const {ip, port} = response;

    return this.callService({
      method: 'GET',
      url: `http://${ip}:${port}/artworks/${shortname}`
    });
  }

  getImage = async (path) => {
    const { response } = await this.getService(SERVICE_NAME);
    const {ip, port} = response;

    return this.callService({
      method: 'GET',
      responseType: 'stream',
      url: `http://${ip}:${port}/images/${path}`
    });
  }

  callService = async (requestOptions) => {
    const response = await axios(requestOptions);

    return response.data;
  }

  getService = async (serviceName) => {
    const response = await axios.get(`${this.serviceRegistryUrl}/services/${serviceName}/${this.serviceVersionIdentifier}`);

    return response.data;
  }
}

module.exports = SpeakersService;
