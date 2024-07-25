const { query } = require("express");
const AboutUsHistorySearch = require("../models/CMSModels/About-Us/history");
const AboutUsIntroducionSearch = require("../models/CMSModels/About-Us/introduction");
const ourApproachSearch = require("../models/CMSModels/About-Us/introduction");
const ourStrategicPlanSearch = require("../models/CMSModels/About-Us/ourStrategicPlan");
const ourThematicAreasSearch = require("../models/CMSModels/About-Us/ourThematicAreas");
const AboutUsourValuesSearch = require("../models/CMSModels/About-Us/ourValues");
const FAQSearch = require("../models/CMSModels/Footer-Links/FAQ");
const privacyPolicySearch = require("../models/CMSModels/Footer-Links/privacyPolicy");
const termsOfServiceSearch = require("../models/CMSModels/Footer-Links/termsOfService");
const geoGraphicalCoverageSearch = require("../models/CMSModels/geographicalCoverage");
const latestNewsSearch = require("../models/CMSModels/latestNews");
const needHelpSearch = require("../models/CMSModels/needHelp");
const ourWorkSearch = require("../models/CMSModels/ourWork");
const publicationSearch = require("../models/CMSModels/publication");
const vacancySearch = require("../models/CMSModels/vacancy");
const volenteerSearch = require("../models/CMSModels/volenteer");
const yourSupportSearch = require("../models/CMSModels/yourSupport");
const boardCommiteesSearch = require("../models/AboutUs");
const blogsSearch = require("../models/blogs");
const contactUsSearch = require("../models/contactUs");
const donationSearch = require("../models/donation");
const footerSearch = require("../models/footer");
const getInTouchSearch = require("../models/getInTouch");
const getInvolvedSearch = require("../models/GetInvolved");
const ourImpactSearch = require("../models/ourImpact");
const ourPartnerSearch = require("../models/ourPartner");
const ourProgramSearch = require("../models/OurProgram");
const ourValuesSearch = require("../models/ourValues");
const resourcesSearch = require("../models/Resources");
const storiesSearch = require("../models/stories ");
const theJourneySearch = require("../models/theJourney");

const getSearchResult = async (req, res, next) => {
  let searchText = req.params.search;
  let data = [];
  try {
    const regex = new RegExp(searchText.trim(), "i");
    // search In History Table
    const historyResult = await AboutUsHistorySearch.find({
      $or: [
        { historyDescription: { $regex: regex } },
        { "history.title": { $regex: regex } },
        { "history.subTitle": { $regex: regex } },
        { "history.description": { $regex: regex } },
      ],
    });
    if (historyResult && historyResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/about-us/history",
      };
      data.push(obj);
    }
    // search In Introduction Table
    const introductionResult = await AboutUsIntroducionSearch.find({
      $or: [
        { introductionTitle: { $regex: regex } },
        { introductionDescription: { $regex: regex } },
        { ourVisionTitle: { $regex: regex } },
        { ourVisionDescription: { $regex: regex } },
        { ourMissionTitle: { $regex: regex } },
        { ourMissionDescription: { $regex: regex } },
        { ourGoalTitle: { $regex: regex } },
        { ourGoalDescription: { $regex: regex } },
      ],
    });
    if (introductionResult && introductionResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/about-us/introduction",
      };
      data.push(obj);
    }
    // search In ourApproach Table
    const ourApproachResult = await ourApproachSearch.find({
      $or: [
        { heading: { $regex: regex } },
        { "approach.title": { $regex: regex } },
      ],
    });
    if (ourApproachResult && ourApproachResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/about-us/introduction",
      };
      data.push(obj);
    }
    // search In ourStrategicPlan Table
    const ourStrategicPlanResult = await ourStrategicPlanSearch.find({
      $or: [{ content: { $regex: regex } }],
    });
    if (ourStrategicPlanResult && ourStrategicPlanResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/aboutUsOurStrategicPlan",
      };
      data.push(obj);
    }
    // search In ourThematicAreas Table
    const ourThematicAreasResult = await ourThematicAreasSearch.find({
      $or: [
        { heading: { $regex: regex } },
        { "thematicAreas.title": { $regex: regex } },
        { "thematicAreas.description": { $regex: regex } },
      ],
    });
    if (ourThematicAreasResult && ourThematicAreasResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/about-us/introduction",
      };
      data.push(obj);
    }
    // search In ourValues Table
    const AboutUsourValuesResult = await AboutUsourValuesSearch.find({
      $or: [
        { heading: { $regex: regex } },
        { "values.title": { $regex: regex } },
      ],
    });
    if (AboutUsourValuesResult && AboutUsourValuesResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/about-us/introduction",
      };
      data.push(obj);
    }
    // search In FAQ Table
    const FAQResult = await FAQSearch.find({
      $or: [{ content: { $regex: regex } }],
    });
    if (FAQResult && FAQResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/FAQ",
      };
      data.push(obj);
    }
    // search In privacyPolicy Table
    const privacyPolicyResult = await privacyPolicySearch.find({
      $or: [{ content: { $regex: regex } }],
    });
    if (privacyPolicyResult && privacyPolicyResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/privacyPolicy",
      };
      data.push(obj);
    }
    // search In termsOfService Table
    const termsOfServiceResult = await termsOfServiceSearch.find({
      $or: [{ content: { $regex: regex } }],
    });
    if (termsOfServiceResult && termsOfServiceResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/termsOfService",
      };
      data.push(obj);
    }
    // search In geoGraphicalCoverage Table
    const geoGraphicalCoverageResult = await geoGraphicalCoverageSearch.find({
      $or: [
        { districts: { $regex: regex } },
        { RMs: { $regex: regex } },
        { PNGOs: { $regex: regex } },
        { schools: { $regex: regex } },
      ],
    });
    if (geoGraphicalCoverageResult && geoGraphicalCoverageResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/",
      };
      data.push(obj);
    }
    // search In latestNews Table
    const latestNewsResult = await latestNewsSearch.find({
      $or: [
        { "news.title": { $regex: regex } },
        { "news.day": { $regex: regex } },
        { "news.month": { $regex: regex } },
        { "news.contentDescription": { $regex: regex } },
        { "news.details": { $regex: regex } },
      ],
    });
    if (latestNewsResult && latestNewsResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/latestNews/viewAll",
      };
      data.push(obj);
    }
    // search In needHelp Table
    const needHelpResult = await needHelpSearch.find({
      $or: [{ content: { $regex: regex } }],
    });
    if (needHelpResult && needHelpResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/needhelp",
      };
      data.push(obj);
    }
    // search In ourWork Table
    const ourWorkResult = await ourWorkSearch.find({
      $or: [
        { description: { $regex: regex } },
        { "work.header": { $regex: regex } },
        { "work.details": { $regex: regex } },
      ],
    });
    if (ourWorkResult && ourWorkResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/ourWork/viewAll",
      };
      data.push(obj);
    }
    // search In publication Table
    const publicationResult = await publicationSearch.find({
      $or: [
        { "publication.title": { $regex: regex } },
        { "publication.pdf": { $regex: regex } },
      ],
    });
    if (publicationResult && publicationResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/resources/lives",
      };
      data.push(obj);
    }
    // search In volenteer Table
    const volenteerResult = await volenteerSearch.find({
      $or: [
        { "volenteer.content": { $regex: regex } },
        { "volenteer.name": { $regex: regex } },
      ],
    });
    if (volenteerResult && volenteerResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/getInvolved/volunteer",
      };
      data.push(obj);
    }

    // search In vacancy Table
    const vacancyResult = await vacancySearch.find({
      $or: [
        { "vacancy.content": { $regex: regex } },
        { "vacancy.name": { $regex: regex } },
      ],
    });
    if (vacancyResult && vacancyResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/getInvolved/vacancy",
      };
      data.push(obj);
    }
    // search In yourSupport Table
    const yourSupportResult = await yourSupportSearch.find({
      $or: [
        { header: { $regex: regex } },
        { details: { $regex: regex } },
        { description: { $regex: regex } },
        { quotation: { $regex: regex } },
        { quotationBy: { $regex: regex } },
      ],
    });
    if (yourSupportResult && yourSupportResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/",
      };
      data.push(obj);
    }
    // search In boardCommitees Table
    const boardCommiteesResult = await boardCommiteesSearch.find({
      $or: [
        { "boardCommittees.name": { $regex: regex } },
        { "boardCommittees.nameNepali": { $regex: regex } },
        { "boardCommittees.position": { $regex: regex } },
        { "boardCommittees.positionNepali": { $regex: regex } },
        { "boardCommittees.description": { $regex: regex } },
        { "boardCommittees.descriptionNepali": { $regex: regex } },
      ],
    });
    if (boardCommiteesResult && boardCommiteesResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/aboutUs/boardCommittees",
      };
      data.push(obj);
    }
    // search In blogs Table
    const blogsResult = await blogsSearch.find({
      $or: [
        { "blogs.title": { $regex: regex } },
        { "blogs.day": { $regex: regex } },
        { "blogs.month": { $regex: regex } },
        { "blogs.contentDescription": { $regex: regex } },
        { "blogs.details": { $regex: regex } },
      ],
    });
    if (blogsResult && blogsResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/resources/blog",
      };
      data.push(obj);
    }
    // search In contactUs Table
    const contactUsResult = await contactUsSearch.find({
      $or: [
        { header: { $regex: regex } },
        { headerNepali: { $regex: regex } },
        { description: { $regex: regex } },
        { descriptionNepali: { $regex: regex } },
        { phone: { $regex: regex } },
        { phoneNepali: { $regex: regex } },
        { address: { $regex: regex } },
        { addressNepali: { $regex: regex } },
        { email: { $regex: regex } },
      ],
    });
    if (contactUsResult && contactUsResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/contactUs",
      };
      data.push(obj);
    }
    // search In donation Table
    const donationResult = await donationSearch.find({
      $or: [
        { header: { $regex: regex } },
        { headerNepali: { $regex: regex } },
        { anyAmountCountHeader: { $regex: regex } },
        { anyAmountCountHeaderNepali: { $regex: regex } },
        { bankName: { $regex: regex } },
        { bankNameNepali: { $regex: regex } },
        { location: { $regex: regex } },
        { locationNepali: { $regex: regex } },
        { currency: { $regex: regex } },
        { currencyNepali: { $regex: regex } },
        { acNumber: { $regex: regex } },
        { acNumberNepali: { $regex: regex } },
        { "iconDescs.description": { $regex: regex } },
        { "iconDescs.descriptionNepali": { $regex: regex } },
      ],
    });
    if (donationResult && donationResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/donation",
      };
      data.push(obj);
    }
    // search In footer Table
    const footerResult = await footerSearch.find({
      $or: [
        { address: { $regex: regex } },
        { addressNepali: { $regex: regex } },
        { phone: { $regex: regex } },
        { phoneNepali: { $regex: regex } },
        { email: { $regex: regex } },
        { tollFreePhone: { $regex: regex } },
        { tollFreePhoneNepali: { $regex: regex } },
        { feedBackEmail: { $regex: regex } },
      ],
    });
    if (footerResult && footerResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/",
      };
      data.push(obj);
    }
    // search In getInTouch Table
    const getInTouchResult = await getInTouchSearch.find({
      $or: [
        { email: { $regex: regex } },
        { message: { $regex: regex } },
        { name: { $regex: regex } },
      ],
    });
    if (getInTouchResult && getInTouchResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/contactUs",
      };
      data.push(obj);
    }
    // search In getInvolved Table
    const vacancisResult = await getInvolvedSearch.find({
      $or: [
        { vacancy: { $regex: regex } },
        { vacancyNepali: { $regex: regex } },
      ],
    });
    if (vacancisResult && vacancisResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/getInvolved/vacancy",
      };
      data.push(obj);
    }
    const procurementResult = await getInvolvedSearch.find({
      $or: [
        { procurement: { $regex: regex } },
        { procurementNepali: { $regex: regex } },
      ],
    });
    if (procurementResult && procurementResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/getInvolved/procurement",
      };
      data.push(obj);
    }
    const volunteerResult = await getInvolvedSearch.find({
      $or: [
        { volunteer: { $regex: regex } },
        { volunteerNepali: { $regex: regex } },
      ],
    });
    if (volunteerResult && volunteerResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/getInvolved/volunteer",
      };
      data.push(obj);
    }
    const donateResult = await getInvolvedSearch.find({
      $or: [{ donate: { $regex: regex } }, { donateNepali: { $regex: regex } }],
    });
    if (donateResult && donateResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/donation",
      };
      data.push(obj);
    }
    // search In ourImpact Table
    const ourImpactResult = await ourImpactSearch.find({
      $or: [
        { heading: { $regex: regex } },
        { headingNepali: { $regex: regex } },
        { "contents.count": { $regex: regex } },
        { "contents.countNepali": { $regex: regex } },
        { "contents.desc": { $regex: regex } },
        { "contents.descNepali": { $regex: regex } },
      ],
    });
    if (ourImpactResult && ourImpactResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/about-us/introduction",
      };
      data.push(obj);
    }
    // search In ourPartner Table
    const ourPartnerResult = await ourPartnerSearch.find({
      $or: [
        { heading: { $regex: regex } },
        { "partner.content": { $regex: regex } },
      ],
    });
    if (ourPartnerResult && ourPartnerResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/aboutUsOurPartners",
      };
      data.push(obj);
    }
    // search In ourProgram Table
    const advocacyAwarnessResult = await ourProgramSearch.find({
      $or: [
        { advocacyAwarnessNepali: { $regex: regex } },
        { advocacyAwarness: { $regex: regex } },
      ],
    });
    if (advocacyAwarnessResult && advocacyAwarnessResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/ourProgram/advocacyAwarness",
      };
      data.push(obj);
    }
    const empowermentAndCommunityInclusionResult = await ourProgramSearch.find({
      $or: [
        { empowermentAndCommunityInclusion: { $regex: regex } },
        { empowermentAndCommunityInclusionNepali: { $regex: regex } },
      ],
    });
    if (
      empowermentAndCommunityInclusionResult &&
      empowermentAndCommunityInclusionResult.length !== 0
    ) {
      let obj = {
        searchQuery: searchText,
        link: "/ourProgram/empowermentAndCommunityInclusion",
      };
      data.push(obj);
    }
    const strengthenCommunitySupportSystemResult = await ourProgramSearch.find({
      $or: [
        { strengthenCommunitySupportSystem: { $regex: regex } },
        { strengthenCommunitySupportSystemNepali: { $regex: regex } },
      ],
    });
    if (
      strengthenCommunitySupportSystemResult &&
      strengthenCommunitySupportSystemResult.length !== 0
    ) {
      let obj = {
        searchQuery: searchText,
        link: "/ourProgram/strengthenCommunitySupportSystem",
      };
      data.push(obj);
    }
    const organizationalDevelopmentResult = await ourProgramSearch.find({
      $or: [
        { organizationalDevelopment: { $regex: regex } },
        { organizationalDevelopmentNepali: { $regex: regex } },
      ],
    });
    if (
      organizationalDevelopmentResult &&
      organizationalDevelopmentResult.length !== 0
    ) {
      let obj = {
        searchQuery: searchText,
        link: "/ourProgram/organizationalDevelopment",
      };
      data.push(obj);
    }
    const ecscResult = await ourProgramSearch.find({
      $or: [{ ecsc: { $regex: regex } }, { ecscNepali: { $regex: regex } }],
    });
    if (ecscResult && ecscResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/ourProgram/ecsc",
      };
      data.push(obj);
    }
    // search In ourValues Table
    const ourValuesResult = await ourValuesSearch.find({
      $or: [
        { heading: { $regex: regex } },
        { headingNepali: { $regex: regex } },
        { "contents.title": { $regex: regex } },
        { "contents.titleNepali": { $regex: regex } },
      ],
    });
    if (ourValuesResult && ourValuesResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/",
      };
      data.push(obj);
    }
    // search In resources Table
    const resourcesResult = await resourcesSearch.find({
      $or: [
        { media: { $regex: regex } },
        { mediaNepali: { $regex: regex } },
        { newsAndPressRelease: { $regex: regex } },
        { newsAndPressReleaseNepali: { $regex: regex } },
        { events: { $regex: regex } },
        { eventsNepali: { $regex: regex } },
        { digitalLibrary: { $regex: regex } },
        { digitalLibraryNepali: { $regex: regex } },
        { transformingLives: { $regex: regex } },
        { transformingLivesNepali: { $regex: regex } },
        { blog: { $regex: regex } },
        { blogNepali: { $regex: regex } },
      ],
    });
    if (resourcesResult && resourcesResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/",
      };
      data.push(obj);
    }
    // search In stories Table
    const storiesResult = await storiesSearch.find({
      $or: [
        { heading: { $regex: regex } },
        { headingNepali: { $regex: regex } },
        { "contents.desc": { $regex: regex } },
        { "contents.descNepali": { $regex: regex } },
        { "contents.person": { $regex: regex } },
        { "contents.personNepali": { $regex: regex } },
      ],
    });
    if (storiesResult && storiesResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/stories/readmore",
      };
      data.push(obj);
    }
    // search In theJourney Table
    const theJourneyResult = await theJourneySearch.find({
      $or: [
        { heading: { $regex: regex } },
        { headingNepali: { $regex: regex } },
        { subHeading: { $regex: regex } },
        { subHeadingNepali: { $regex: regex } },
        { "contents.date": { $regex: regex } },
        { "contents.dateNepali": { $regex: regex } },
        { "contents.desc": { $regex: regex } },
        { "contents.descNepali": { $regex: regex } },
      ],
    });
    if (theJourneyResult && theJourneyResult.length !== 0) {
      let obj = {
        searchQuery: searchText,
        link: "/",
      };
      data.push(obj);
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

const SearchController = {
  get: getSearchResult,
};
module.exports = SearchController;
