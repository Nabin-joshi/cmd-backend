const Slider = require("../../models/CMSModels/sliderModel");

const createSlider = async (req, res, next) => {
  const { title, content, photo, readMoreButtonColor, author, locale } =
    req.body;

  //   const buffer = Buffer.from(
  //     photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
  //     "base64"
  //   );

  //   const imageName = `${Date.now()}-${author}.png`;

  //   try {
  //     fs.writeFileSync(`public/images/${imageName}`, buffer);
  //   } catch (error) {
  //     return next(error);
  //   }

  let newSlider;
  try {
    newSlider = new Slider({
      title,
      readMoreButtonColor,
      author,
      content,
      imageName: photo,
      locale,
    });
    await newSlider.save();
  } catch (error) {
    return next(error);
  }

  return res.status(201).json({ message: "Successfully Added" });
};

const getSliderContent = async (req, res, next) => {
  const id = req.params.id;

  try {
    const sliderData = await Slider.findOne({ _id: id });
    return res.status(201).json({ slider: sliderData });
  } catch (error) {
    return next(error);
  }
};

const updateSliderData = async (req, res, next) => {
  const getData = req.body;
  const id = req.params.id;

  let selectedData;

  try {
    selectedData = await Slider.findOne({ _id: id });
    if (selectedData) {
      await Slider.updateOne(
        { _id: id },
        {
          title: getData.title,
          author: getData.author,
          content: getData.content,
          readMoreButtonColor: getData.readMoreButtonColor,
          locale: getData.locale,
        }
      );
    }
    return res.status(201).json({ msg: "Service Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const updateSliderImage = async (req, res, next) => {
  const getData = req.body;
  const id = req.params.id;

  let selectedData;

  try {
    selectedData = await Slider.findOne({ _id: id });
    if (selectedData) {
      await Slider.updateOne(
        { _id: id },
        {
          title: getData.title,
          author: getData.author,
          content: getData.content,
          readMoreButtonColor: getData.readMoreButtonColor,
          locale: getData.locale,
        }
      );
    }
    return res.status(201).json({ msg: "Service Updated Successfully" });
  } catch (error) {
    return next(error);
  }
};

const serviceController = {
  create: createSlider,
  get: getSliderContent,
  update: updateSliderData,
};

module.exports = serviceController;
