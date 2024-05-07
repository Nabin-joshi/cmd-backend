const SocialLink = require("../../models/CMSModels/socialLink");

const createSocialLink = async (req, res, next) => {
  const { locale, facebook, youtube, instagram, x, linkedIn } = req.body;

  try {
    let newSocialLinks = new SocialLink({
      locale,
      facebook,
      youtube,
      instagram,
      twitter,
      linkedIn,
    });

    await newSocialLinks.save();
    res.status(201).json({ msg: "Social Links Created successfully" });
  } catch (err) {
    return next(err);
  }
};

const getSocialLink = async (req, res, next) => {
  try {
    const socialLinks = await SocialLink.findOne({ locale: "" });
    if (socialLinks) {
      return res.status(200).json(socialLinks);
    }
  } catch (err) {
    return next(err);
  }
};

const updateSocialLinks = async (req, res, next) => {
  const socialLinks = req.body;

  try {
    let selectedData = await SocialLink.findOne({ locale: "" });
    if (selectedData) {
      await SocialLink.updateOne({
        youtube: socialLinks.youtube,
        facebook: socialLinks.facebook,
        instagram: socialLinks.instagram,
        twitter: socialLinks.twitter,
        linkedIn: socialLinks.linkedIn,
      });
    }
    res.status(201).json({ msg: "Added successfully" });
  } catch (err) {
    return next(err);
  }
};

const socialLinksController = {
  create: createSocialLink,
  get: getSocialLink,
  update: updateSocialLinks,
};

module.exports = socialLinksController;
