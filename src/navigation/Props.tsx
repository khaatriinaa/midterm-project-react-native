import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  JobFinder: undefined;
  SavedJobs: undefined;
  ApplicationForm: { fromSaved: boolean };
};

export type ApplicationFormProps =
  NativeStackScreenProps<RootStackParamList, "ApplicationForm">;
