const {Router} = require("express")
const { TeamMember } = require('../models/TeamMember');

const router = Router()

router.get('/team', async (req, res, next) => {
  const team = await TeamMember.findAll();
  return res.json(team);
});

module.exports = router;
