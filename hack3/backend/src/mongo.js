import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import "dotenv-defaults/config.js";

async function connect() {


  if (!process.env.MONGO_URL) {
    console.log("missing MONGO_URL!!");
    process.exit(1);
  }
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = mongoose.connection

  db.once('open', () => {
    console.log('MongoDB connected!')

  }

  )

}


export default { connect };