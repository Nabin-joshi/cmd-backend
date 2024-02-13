const Service = require("../../models/CMSModels/serviceModel");

const createService = async (req, res, next) => {
  const { author, content, locale } = req.body;

  let newService;
  try {
    newService = new Service({
      author,
      content,
      locale,
    });
    await newService.save();
  } catch (error) {
    return next(error);
  }

  return res.status(201).json({ message: "Successfully Added" });
};

const getServiceContent = async (req, res, next) => {
  const locale = req.params.id;

  try {
    const service = await Service.findOne({ locale: locale });
    return res.status(201).json({ service: service });
  } catch (error) {
    return next(error);
  }
};

const updateService = async (req, res, next) => {
  // validation if necessary using joi

  const getService = req.body;
  const locale = req.params.id;

  let selectedData;

  try {
    selectedData = await Service.findOne({ locale: locale });
    if (selectedData) {
      await Service.updateOne(
        { locale: locale },
        {
          author: getService.author,
          content: getService.content,
        }
      );
    }
    return res.status(201).json({ msg: "Service Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const serviceController = {
  create: createService,
  getService: getServiceContent,
  update: updateService,
};

module.exports = serviceController;
