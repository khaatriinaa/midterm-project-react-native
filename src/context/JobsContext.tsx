import React, { createContext, useState, ReactNode } from "react";
import { Job } from "../types/JobTypes";

interface JobsContextType {
  savedJobs: Job[];
  appliedJobs: Job[];
  saveJob: (job: Job) => void;
  removeJob: (id: string) => void;
  isSaved: (id: string) => boolean;
  applyJob: (job: Job) => void;
  isApplied: (id: string) => boolean;
}

export const JobsContext = createContext<JobsContextType>({
  savedJobs: [],
  appliedJobs: [],
  saveJob: () => {},
  removeJob: () => {},
  isSaved: () => false,
  applyJob: () => {},
  isApplied: () => false,
});

export function JobsProvider({ children }: { children: ReactNode }) {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);

  const saveJob = (job: Job) => {
    setSavedJobs((prev) =>
      prev.find((j) => j.id === job.id) ? prev : [...prev, job]
    );
  };

  const removeJob = (id: string) => {
    setSavedJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const isSaved = (id: string) => savedJobs.some((j) => j.id === id);

  const applyJob = (job: Job) => {
    setAppliedJobs((prev) =>
      prev.find((j) => j.id === job.id) ? prev : [...prev, job]
    );
  };

  const isApplied = (id: string) => appliedJobs.some((j) => j.id === id);

  return (
    <JobsContext.Provider value={{ savedJobs, appliedJobs, saveJob, removeJob, isSaved, applyJob, isApplied }}>
      {children}
    </JobsContext.Provider>
  );
}