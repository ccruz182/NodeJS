const axios = require("axios");

class CircuitBraker {
  OPEN = "OPEN";
  CLOSED = "CLOSED";
  HALF = "HALF";

  constructor() {
    this.states = {};
    this.failureThreshold = 5;
    this.coolDownPeriod = 10;
    this.requestTimeout = 1;
  }

  initState = (endpoint) => {
    this.states[endpoint] = {
      failures: 0,
      coolDownPeriod: this.coolDownPeriod,
      circuit: this.CLOSED,
      nextTry: 0,
    };
  };

  onSuccess = (endpoint) => {
    this.initState(endpoint);
  };

  onFailure = (endpoint) => {
    const state = this.states[endpoint];
    state.failures++;
    console.log("[onFailure] state", state);

    if (state.failures > this.failureThreshold) {
      state.circuit = this.OPEN;
      state.nextTry = new Date() / 1000 + state.coolDownPeriod;
      console.log(`[Alert] Circuit for endpoint ${endpoint} is ${this.OPEN}`);
    }
  };

  canRequest = (endpoint) => {
    if (!this.states[endpoint]) {
      this.initState(endpoint);
    }

    const state = this.states[endpoint];
    if (state.circuit === this.CLOSED) {
      return true;
    }

    const now = new Date() / 1000;

    if (state.nextTry <= now) {
      state.circuit = this.HALF;
      return true;
    }

    return false;
  };

  callService = async (requestOptions) => {
    console.log("CIRCUIT BREAKER [callService]")
    const endpoint = `${requestOptions.method}:${requestOptions.url}`;

    if (!this.canRequest(endpoint)) {
      return false;
    }

    requestOptions.timeout = this.requestTimeout * 1000;

    try {
      const response = await axios(requestOptions);
      this.onSuccess(endpoint);

      return response.data;
    } catch (err) {
      this.onFailure(endpoint);
      
      return false;
    }
  };
}

module.exports = CircuitBraker;
