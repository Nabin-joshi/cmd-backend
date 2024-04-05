const GeoMap = require("../../models/CMSModels/geoMap");
const GeographicalCoverage = require("../../models/CMSModels/geographicalCoverage");

const createGeographicalCoverage = async (req, res, next) => {
  const { locale, district, RMs, PNGOs, schools } = req.body;

  try {
    let newGeographicalCoverage = new GeographicalCoverage({
      locale,
      districts,
      RMs,
      PNGOs,
      schools,
    });

    await newGeographicalCoverage.save();
    res.status(201).json({ msg: "Geographical Coverage Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const getGeographicalCoverage = async (req, res, next) => {
  const locale = req.params.locale;

  try {
    let selectedData = await GeographicalCoverage.findOne({ locale: locale });
    if (selectedData) {
      return res.status(200).json({ geographicalCoverage: selectedData });
    }
  } catch (err) {
    return next(err);
  }
};

const updateGeographicalCoverage = async (req, res, next) => {
  const geographicalCoverage = req.body;
  const locale = req.params.locale;

  try {
    let selectedData = await GeographicalCoverage.findOne({ locale: locale });
    if (selectedData) {
      await GeographicalCoverage.updateOne(
        { locale: locale },
        {
          districts: geographicalCoverage.districts,
          RMs: geographicalCoverage.RMs,
          PNGOs: geographicalCoverage.PNGOs,
          schools: geographicalCoverage.schools,
        }
      );
    }
    res.status(201).json({ msg: "Added successfully" });
  } catch (err) {
    return next(err);
  }
};

const createGeoMap = async (req, res, next) => {
  const { locale, map } = req.body;

  try {
    const newGeoMap = new GeoMap({ locale, map });
    await newGeoMap.save();
    return res.status(201).json({ msg: "GeoMap Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const updateGeoMap = async (req, res, next) => {
  const { locale } = req.params;
  const { map } = req.body;

  try {
    const updatedGeoMap = await GeoMap.findOneAndUpdate(
      { locale },
      { map },
      { new: true }
    );
    return res
      .status(200)
      .json({ msg: "GeoMap Updated successfully", updatedGeoMap });
  } catch (err) {
    return next(err);
  }
};

const getGeoMap = async (req, res, next) => {
  const { locale } = req.params;

  try {
    const geoMap = await GeoMap.findOne({ locale });
    return res.status(200).json(geoMap);
  } catch (err) {
    return next(err);
  }
};

const getAllGeoMaps = async (req, res, next) => {
  try {
    const geoMaps = await GeoMap.find();
    return res.status(200).json(geoMaps);
  } catch (err) {
    return next(err);
  }
};

const deleteGeoMap = async (req, res, next) => {
  const { locale } = req.params;

  try {
    await GeoMap.findOneAndDelete({ locale });
    return res.status(200).json({ msg: "GeoMap Deleted successfully" });
  } catch (err) {
    return next(err);
  }
};

const GeographicalCoverageController = {
  create: createGeographicalCoverage,
  get: getGeographicalCoverage,
  update: updateGeographicalCoverage,
  createGeoMap,
  updateGeoMap,
  getGeoMap,
  getAllGeoMaps,
  deleteGeoMap,
};

module.exports = GeographicalCoverageController;
