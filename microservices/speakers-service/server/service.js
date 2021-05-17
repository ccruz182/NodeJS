const express = require("express");

const service = express();

const SpeakersService = require("./lib/SpeakersService");

module.exports = (config) => {
  const log = config.log();
  const speakersService = new SpeakersService(config.data.speakers);

  // Add a request logging middleware in development mode
  if (service.get("env") === "development") {
    service.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  service.use('/images', express.static(config.data.images));

  service.get("/speakers", async (req, res, next) => {
    try {
      return res.json(await speakersService.getList());
    } catch (err) {
      return next(err);
    }
  });

  service.get("/speakers-short", async (req, res, next) => {
    try {
      return res.json(await speakersService.getListShort());
    } catch (err) {
      return next(err);
    }
  });

  service.get("/speakers/names", async (req, res, next) => {
    try {
      return res.json(await speakersService.getNames());
    } catch (err) {
      return next(err);
    }
  });

  service.get("/speakers/:shortName", async (req, res, next) => {
    try {
      console.log("-->", req.shortName)
      return res.json(await speakersService.getSpeaker(req.params.shortName));
    } catch (err) {
      return next(err);
    }
  });

  service.get("/artworks", async (req, res, next) => {
    try {
      return res.json(await speakersService.getAllArtwork());
    } catch (err) {
      return next(err);
    }
  });

  service.get("/artworks/:shortName", async (req, res, next) => {
    try {
      return res.json(
        await speakersService.getArtworkForSpeaker(req.params.shortName)
      );
    } catch (err) {
      return next(err);
    }
  });
  

  // eslint-disable-next-line no-unused-vars
  service.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });
  return service;
};
