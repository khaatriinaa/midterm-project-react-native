import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { fetchJobs } from "../../api/jobsApi";
import { Job } from "../../types/JobTypes";
import styles from "./JobFinderStyles";
import JobCard from "../../components/JobCard";
import SearchBar from "../../components/SearchBar";

export default function JobFinderScreen({ navigation }: any) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const loadJobs = async () => {
    setRefreshing(true);
    const data = await fetchJobs();
    setJobs(data);
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadJobs();
    }, [])
  );

  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello 👋</Text>
        <Text style={styles.greeting}>Find your dream job</Text>
      </View>

      <SearchBar value={search} onChange={setSearch} />

      <FlatList
        contentContainerStyle={styles.list}
        data={filtered}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadJobs} />
        }
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onApply={() =>
              navigation.navigate("ApplicationForm", { fromSaved: false })
            }
          />
        )}
      />

      <Pressable
        style={styles.savedNav}
        onPress={() => navigation.navigate("SavedJobs")}
      >
        <Text style={styles.btnText}>Saved Job</Text>
      </Pressable>
    </View>
  );
}
