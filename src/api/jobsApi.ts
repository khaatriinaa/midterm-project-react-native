import { Job } from "../types/JobTypes";
import { generateUUID } from "../utils/generateUUID";

const BASE_URL = "https://empllo.com/api/v1";

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const jobsArray = data.jobs;

    if (!Array.isArray(jobsArray)) {
      console.warn("Jobs array not found:", data);
      return [];
    }

    const jobsWithId: Job[] = jobsArray.map((job: any) => ({
      id: job.guid, // use stable unique identifier
      // 🔥 Fetch ALL API fields
      title: job.title,
      mainCategory: job.mainCategory,
      companyName: job.companyName,
      companyLogo: job.companyLogo,
      jobType: job.jobType,
      workModel: job.workModel,
      seniorityLevel: job.seniorityLevel,
      minSalary: job.minSalary,
      maxSalary: job.maxSalary,
      currency: job.currency,
      locations: job.locations,
      tags: job.tags,
      description: job.description,
      benefits: job.benefits,
      pubDate: job.pubDate,
      expiryDate: job.expiryDate,
      applicationLink: job.applicationLink,
      guid: job.guid,
    }));

    return jobsWithId;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};