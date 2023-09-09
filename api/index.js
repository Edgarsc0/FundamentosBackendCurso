const express = require("express")
const dotenv = require("dotenv");
const mainRouting = require("./routes");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({ limit: '1mb' }));
mainRouting(app)

app.get("/", (req, res) => {
    res.status(200).json({
        status: "API Server is running..."
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
});