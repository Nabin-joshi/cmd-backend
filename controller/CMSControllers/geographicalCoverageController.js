const GeographicalCoverage = require("../../models/CMSModels/geographicalCoverage");

const createGeographicalCoverage = async (req, res, next) => {
  const { locale, district, RMs, PNGOs, schools } = req.body;

  try {
    let newGeographicalCoverage = new GeographicalCoverage({
      locale,
      district,
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
          district: geographicalCoverage.district,
          RMs: geographicalCoverage.RMs,
          PNGOs: geographicalCoverage.PNGOs,
          schools: geographicalCoverage.schools,
        }
      );
    }
  } catch (err) {
    return next(err);
  }
};

const GeographicalCoverageController = {
  create: createGeographicalCoverage,
  get: getGeographicalCoverage,
  update: updateGeographicalCoverage,
};

module.exports = GeographicalCoverageController;
