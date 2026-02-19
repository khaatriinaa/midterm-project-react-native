import { Job } from "../types/JobTypes";
import { v4 as uuidv4 } from "uuid";

export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await fetch("https://empllo.com/api/v1");

    console.log("Status:", response.status);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    console.log("API DATA:", data);

    const jobsArray = Array.isArray(data) ? data : data.jobs ?? [];

    return jobsArray.map((job: any) => ({
      id: uuidv4(),
      title: job.title ?? "No Title",
      company: job.company ?? "Unknown Company",
      salary: job.salary ?? "Not specified",
      location: job.location ?? "Not specified",
      description: job.description ?? "",
    }));
  } catch (error) {
    console.log("API ERROR:", error);
    return [];
  }
};
