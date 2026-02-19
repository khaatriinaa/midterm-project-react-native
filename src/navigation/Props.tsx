import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  JobFinder: undefined;
  SavedJobs: undefined;
  ApplicationForm: { fromSaved?: boolean } | undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
  route: any;
};
