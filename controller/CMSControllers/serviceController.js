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
  const id = req.params.id;

  try {
    const service = await Service.findOne({ _id: id });
    return res.status(201).json({ service: service });
  } catch (error) {
    return next(error);
  }
};

const updateService = async (req, res, next) => {
  // validation if necessary using joi

  const getService = req.body;
  const id = req.params.id;

  let selectedData;

  try {
    selectedData = await Service.findOne({ _id: id });
    if (selectedData) {
      await Service.updateOne(
        { _id: id },
        {
          author: getService.author,
          content: getService.content,
          locale: getService.locale,
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
