const express = require("express");
const router = express.Router();
const axios = require("axios");

const mongoose = require("mongoose");
mongoose.connect(
  ""
);

router.get("/psets", async (req, res) => {
  try {
    const response = await axios.get(
      `https://www.orcestra.ca/api/psets/canonical`
    );
    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/pset-database", async (req, res) => {
  try {
    const objs = await DataObject.find();
    res.send(objs);
  } catch (error) {
    console.log(error);
  }
});

const dataObjectSchema = new mongoose.Schema({
  datasetType: String,
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dataset: { type: mongoose.Schema.Types.ObjectId, ref: "Dataset" },
  info: {
    status: { type: String, required: true },
    private: Boolean,
    canonical: Boolean,
    numDownload: Number,
    createdBy: String,
    email: String,
    shareToken: String,
    filteredSensitivity: Boolean,
    commitID: String,
    date: {
      submitted: Date,
      processed: Date,
      created: Date,
    },
    other: Object,
  },
  repositories: [
    {
      version: String,
      doi: String,
      downloadLink: mongoose.Schema.Types.Mixed,
      bioComputeObject: {
        doi: String,
        downloadLink: String,
      },
    },
  ],
  availableDatatypes: [
    {
      name: String,
      genomeType: String,
      details: Object,
    },
  ],
});

const DataObject = mongoose.model("DataObject", dataObjectSchema);
module.exports = router;
