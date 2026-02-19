import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { fetchJobs } from "../../api/jobsApi";
import { JobsContext } from "../../context/JobsContext";
import { ThemeContext } from "../../context/ThemeContext";
import { Job } from "../../types/JobTypes";
import styles from "./JobFinderStyles";
import JobCard from "../../components/JobCard";
import ThemeToggle from "../../components/ThemeToggle";

export default function JobFinderScreen({ navigation }: any) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const { saveJob, savedJobs } = useContext(JobsContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);

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
    <View style={[styles.container, isDark && styles.dark]}>
        
        {/* Theme Toggle Component */}
        <ThemeToggle />

        <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={loadJobs}
            />
        }
        renderItem={({ item }) => (
            <JobCard
            job={item}
            onApply={() =>
                navigation.navigate("ApplicationForm", {
                fromSaved: false,
                })
            }
            />
        )}
        />

        <Pressable
        style={styles.savedNav}
        onPress={() => navigation.navigate("SavedJobs")}
        >
        <Text style={styles.btnText}>Go to Saved Jobs</Text>
        </Pressable>
    </View>
    );

}
