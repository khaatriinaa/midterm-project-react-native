import React, { useContext } from "react";
import { View, FlatList } from "react-native";
import { JobsContext } from "../../context/JobsContext";
import JobCard from "../../components/JobCard";

export default function SavedJobsScreen({ navigation }: any) {
  const { savedJobs } = useContext(JobsContext);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={savedJobs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onApply={() =>
              navigation.navigate("ApplicationForm", { fromSaved: true })
            }
          />
        )}
      />
    </View>
  );
}
