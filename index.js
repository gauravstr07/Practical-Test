const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const recruiterRoutes = require("./routes/recruiter");
const adminRoutes = require("./routes/admin");
const clientRoutes = require("./routes/clientAuth");

const clientCrudRoute = require("./routes/client");

const clientPostRoutes = require("./routes/clientPosts");

dotenv.config();

const app = express();
const port = 5000;

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/recruiter", recruiterRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/client", clientRoutes);

app.use("/api/client", clientCrudRoute);

app.use("/api/clientPost", clientPostRoutes);

app.listen(port, () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log(`connected to database..💾`);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(`server running on port: ${port}📡`);
});
