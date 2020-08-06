import axios from "axios";

// deployed fake json-server API
export default axios.create({
  baseURL: "https://multicultural-hockey-79992.herokuapp.com/",
});
