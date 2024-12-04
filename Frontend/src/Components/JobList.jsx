import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';

const JobList = ({ Search }) => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const userdetails = JSON.parse(localStorage.getItem('UserDetails'));
  const token = userdetails?.token;
  

  useEffect(() => {
    if (Search) {
      const UpdatedJobs = jobs.filter((job) =>
        job.jobPosition.toLowerCase().includes(Search.toLowerCase())
      );
      setFilteredJobs(UpdatedJobs);
    } else {
      setFilteredJobs(jobs);
    }
  }, [Search, jobs]);

  useEffect(() => {
    
    fetch('http://localhost:8000/api/v1/job/getalljobs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setJobs(data.jobs || []);
        setFilteredJobs(data.jobs || []);
      })
      .catch((error) => console.error('Error fetching jobs:', error));
  }, [token]);

  return (
    <div className="job-list">
      {filteredJobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobList;
