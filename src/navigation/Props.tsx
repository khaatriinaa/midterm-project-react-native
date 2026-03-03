import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { Job } from "../types/JobTypes";

export type RootStackParamList = {
  JobFinder: undefined;
  SavedJobs: undefined;
  ApplicationForm: { job: Job; fromSaved?: boolean };
};

export type JobFinderNavProp = NativeStackNavigationProp<
  RootStackParamList,
  "JobFinder"
>;

export type ApplicationFormRouteProp = RouteProp<
  RootStackParamList,
  "ApplicationForm"
>;