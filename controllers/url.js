const Url = require("../models/url");
const { nanoid } = require("nanoid");

async function handleGenerateNewUrl(req, res) {
  const { redirectLink } = req.body;
  if (!redirectLink)
    return res.status(400).json({ msg: "Redirect Link required" });
  const shortId = nanoid(8);
  await Url.create({
    shortId: shortId,
    redirectLink: redirectLink,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.status(201).render("home", { id: shortId });
}

async function handleGetLinkById(req, res) {
  const { id } = req.params;
  const result = await Url.findOneAndUpdate(
    {
      shortId: id,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );

  res.redirect(result.redirectLink);
}

async function handleGetAnalyticsById(req, res) {
  const { id } = req.params;
  const result = await Url.findOne({
    shortId: id,
  });
  res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewUrl,
  handleGetAnalyticsById,
  handleGetLinkById,
};
