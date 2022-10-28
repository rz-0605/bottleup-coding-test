import axios from "axios";

export const createTeammate = async (teammate) => {
  try {
    await axios.post("/createTeammate", { teammate });
    return true;
  } catch (e) {
    return false;
  }
};
