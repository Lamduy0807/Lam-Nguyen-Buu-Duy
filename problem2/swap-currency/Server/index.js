const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());

app.get("/prices.json", async (req, res) => {
  try {
    const response = await axios.get(
      "https://interview.switcheo.com/prices.json"
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error");
  }
});

app.listen(3001, () => {
  console.log("Proxy server running on port 3001");
});
