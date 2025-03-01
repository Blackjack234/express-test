import 'dotenv/config'
import express from "express";

const app = express();
const port = process.env.PORT|| 5000;
let teaData = [];

let newId = 1;
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hellow anirban's tea shop!!!");
});

app.get("/ice-tea", (req, res) => {
  res.status(200).send("What kind of ice tea whould you prefer?");
});

app.post("/teas", (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      res.status(400).json({
        status: 400,
        message: `all fields are required. something is missing.`,
      });
    }

    const newData = { id: newId++, name, price };
    teaData.push(newData);
    if (typeof teaData == "object" && teaData.length > 0) {
      res.status(201).json({
        status: 201,
        message: "data added succcessfully.",
        data: newData,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "data not added. something went wrong.",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "Server error!!",
      error: e.message,
    });
  }
});

app.get("/teas", (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      message: "data found successfuly",
      data: teaData,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "server error",
      error: e.message,
    });
  }
});

app.get("/teas/:id", (req, res) => {
  try {
    const tea = teaData.find((t) => t.id === parseInt(req.params.id));
    if (!tea) {
      req.status(404).json({
        status: 404,
        message: "tea not found",
        data: tea,
      });
    } else {
      req.status(200).json({
        status: 200,
        message: "tea is found",
        data: tea,
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "server error",
      error: e.message,
    });
  }
});

app.put("/teas/:id", (req, res) => {
  try {
    const tea = teaData.find((t) => t.id === parseInt(req.params.id));
    if (!tea) {
      return req.status(404).json({
        status: 404,
        message: "tea not found",
        data: tea,
      });
    }

    tea.name = req.body.name;
    tea.price = req.body.price;

    return res.status(200).json({
      status: 200,
      message: "update is done",
      data: tea,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "server error",
      error: e.message,
    });
  }
});

app.delete("/teas/:id", (req, res) => {
  try {
    const tea = teaData.findIndex((t) => t.id === parseInt(req.params.id));

    if (tea === -1) {
      return res.status(404).json({
        status: 404,
        message: "tea not found!",
      });
    }

    teaData.splice(tea, 1);

    return res.status(200).json({
      status: 200,
      message: "delete successful",
    });
  } catch (e) {
    return res.status(500).json({
      status: 500,
      message: "server error",
      error: e.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});
