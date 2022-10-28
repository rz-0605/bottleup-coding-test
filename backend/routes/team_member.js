const { Router } = require("express");
const { TeamMember } = require("../models/TeamMember");

const router = Router();

router.get("/team", async (req, res, next) => {
  const team = await TeamMember.findAll();
  return res.json(team);
});

router.post("/createTeammate", async (req, res, next) => {
  const teammate = req.body.teammate; //assuming input is valid
  await TeamMember.create(teammate);
  return res.status(200);
});

module.exports = router;
