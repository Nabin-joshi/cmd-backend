const Slider = require("../../models/CMSModels/sliderModel");
const { BACKEND_SERVER_PATH } = require("../../config/config");

const createSlider = async (req, res, next) => {
  const { title, content, photo, video, author, locale, learnMore } = req.body;

  let newSlider;
  try {
    newSlider = new Slider({
      title,
      author,
      content,
      imageName: photo,
      video: video,
      locale,
      learnMore,
    });
    await newSlider.save();
  } catch (error) {
    return next(error);
  }

  return res.status(201).json({ message: "Successfully Added" });
};

const getSliderContent = async (req, res, next) => {
  const locale = req.params.locale;

  try {
    const sliderData = await Slider.findOne({ locale: locale });
    if (sliderData.image && sliderData.image !== "") {
      sliderData.image = `${BACKEND_SERVER_PATH}/public/images/${sliderData.image}`;
    }
    if (sliderData.video && sliderData.video !== "") {
      sliderData.video = `${BACKEND_SERVER_PATH}/public/videos/${sliderData.video}`;
    }
    return res.status(201).json({ slider: sliderData });
  } catch (error) {
    return next(error);
  }
};

const updateSliderData = async (req, res, next) => {
  const getData = req.body;
  const locale = req.params.locale;

  let selectedData;

  try {
    selectedData = await Slider.findOne({ locale: locale });
    if (selectedData) {
      await Slider.updateOne(
        { locale: locale },
        {
          title: getData.title,
          author: getData.author,
          content: getData.content,
          learnMore: getData.learnMore,
        }
      );
    }
    return res.status(201).json({ msg: "Service Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const updateSliderImage = async (req, res, next) => {
  try {
    let imageName = "";
    if (req.file) {
      imageName = req.file.filename;
    } else if (req.body.image && req.body.image !== "undefined") {
      imageName = req.body.image;
    }

    selectedEnglishData = await Slider.findOne({ locale: "eng" });
    selectedNepaliData = await Slider.findOne({ locale: "nep" });
    if (selectedEnglishData) {
      await Slider.updateOne(
        { locale: "eng" },
        {
          image: imageName.trim(),
        }
      );
    }

    if (selectedNepaliData) {
      await Slider.updateOne(
        { locale: "nep" },
        {
          image: imageName.trim(),
        }
      );
    }

    return res.status(200).json({ msg: "Image added successfully" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const updateSliderVideo = async (req, res, next) => {
  try {
    let videoName = "";
    if (req.file) {
      videoName = req.file.filename;
    } else if (req.body.video && req.body.video !== "undefined") {
      videoName = req.body.video;
    }

    selectedEnglishData = await Slider.findOne({ locale: "eng" });
    selectedNepaliData = await Slider.findOne({ locale: "nep" });
    if (selectedEnglishData) {
      await Slider.updateOne(
        { locale: "eng" },
        {
          video: videoName.trim(),
        }
      );
    }
    if (selectedNepaliData) {
      await Slider.updateOne(
        { locale: "nep" },
        {
          video: videoName.trim(),
        }
      );
    }
    return res.status(200).json({ msg: "Video added successfully" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const serviceController = {
  create: createSlider,
  get: getSliderContent,
  update: updateSliderData,
  updateSliderImage: updateSliderImage,
  updateSliderVideo: updateSliderVideo,
};

module.exports = serviceController;
