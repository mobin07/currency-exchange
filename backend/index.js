const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const axios = require("axios");
let data = {};
const getAPI = async () => {
  try {
    let r = await axios.get(
      "https://api.apilayer.com/exchangerates_data/latest?symbols=MYR%2CBRL%2CCNY%2CINR%2CPKR&base=USD",
      {
        headers: {
          apikey: "HlQvVhszyAPeBfIek8mw0xV5QkMPNKZf",
        },
      }
    );
    console.log(r.data.rates);
    data = r.data.rates;
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

app.get("/", async (req, res) => {
  let y = await getAPI();
  if (y) {
    console.log("ji");
    res.send(data);
  } else {
    res.send("something went wrong");
  }
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
