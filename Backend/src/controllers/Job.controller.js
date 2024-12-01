import Job from "../models/JobSchema.js";

// Add a job
export const addjob = async (req, res) => {
  const {
    companyName,
    logoUrl,
    jobPosition,
    jobType,
    mode,
    location,
    jobDescription,
    aboutCompany,
    skills,
    additionalInformation,
    salary,
  } = req.body;

  // Validate required fields
  if (!companyName || !logoUrl || !jobPosition || !jobType || !mode || !location || !jobDescription || !aboutCompany || !skills) {
    return res.status(400).json({ message: "All required fields must be filled." });
  }

  const job = new Job({
    companyName,
    logoUrl,
    jobPosition,
    jobType,
    mode,
    location,
    jobDescription,
    aboutCompany,
    skills,
    additionalInformation,
    salary,
    userid: req.userId, // Retrieved from the middleware
  });

  await job.save();
  res.status(201).json({ message: "Job added successfully", job });
};

// Edit a job
export const editjob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true } // Return the updated document
  );

  if (!updatedJob) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.status(200).json({ message: "Job updated successfully", job: updatedJob });
};

// Get all jobs
export const getalljobs = async (req, res) => {
  const jobs = await Job.find(
    {},
    {
      companyName: 1,
      logoUrl: 1,
      jobPosition: 1,
      jobType: 1,
      mode: 1,
      location: 1,
      skills: 1,
      salary: 1,
    }
  );

  res.status(200).json({ jobs });
};

// Get job details
export const getjobdetails = async (req, res) => {
  const jobDetails = await Job.findById(req.params.id);

  if (!jobDetails) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.status(200).json({ jobDetails });
};


export const getjobbyid = async (req,res) =>{
    const job = await Job.findById(req.params.id);

    if(!job){
        return res.status(404).json({message : "No job found"})
    }

    res.status(200).json({job})
}

