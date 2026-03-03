import React, { createContext, useState, ReactNode } from "react";
import { Job } from "../types/JobTypes";

interface JobsContextType {
  savedJobs: Job[];
  saveJob: (job: Job) => void;
  removeJob: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const JobsContext = createContext<JobsContextType>({
  savedJobs: [],
  saveJob: () => {},
  removeJob: () => {},
  isSaved: () => false,
});

export const JobsProvider = ({ children }: { children: ReactNode }) => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  const saveJob = (job: Job) => {
    setSavedJobs(prev => {
      if (prev.find(j => j.id === job.id)) return prev;
      return [...prev, job];
    });
  };

  const removeJob = (id: string) => {
    setSavedJobs(prev => prev.filter(job => job.id !== id));
  };

  const isSaved = (id: string) => {
    return savedJobs.some(job => job.id === id);
  };

  return (
    <JobsContext.Provider value={{ savedJobs, saveJob, removeJob, isSaved }}>
      {children}
    </JobsContext.Provider>
  );
};
