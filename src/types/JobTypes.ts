export interface ApiJob {
  id: string;
  title: string;
  mainCategory?: string;
  companyName?: string;
  companyLogo?: string;
  jobType?: string;
  workModel?: string;
  seniorityLevel?: string;
  minSalary?: number | null;
  maxSalary?: number | null;
  currency?: string;
  locations?: string[];
  tags?: string[];
  description?: string;
  benefits?: string;
  pubDate?: number;
  expiryDate?: number;
  applicationLink?: string;
  guid?: string;
}

export interface Job extends ApiJob {
  id: string;
}