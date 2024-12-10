import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
  jobPosition: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  totalsize:{
    type : Number,
    require : true,
  },
  currentsize : {
    type : Number,
    require : true,
  },
  location: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  aboutCompany: {
    type: String,
    required: true,
  },
  skills: {
    type:[String],
    required: true,
  },
  additionalInformation: {
    type: String,
    required: false,
  },
  salary: {
    type: String,
    required: false,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
},{ timestamps: true });

const Job = mongoose.model("Job", jobSchema);

export default Job;