const express = require("express");

const teamMemberRoutes = require("./routes/team_member");

const app = express();
app.use(express.json());
app.use("/", teamMemberRoutes);

init();

async function init() {
  try {
    app.listen(3001, () => {
      console.log("Express App Listening on Port 3001");
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
