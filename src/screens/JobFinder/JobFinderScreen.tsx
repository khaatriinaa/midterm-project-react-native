import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  Pressable,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { fetchJobs } from "../../api/jobsApi";
import { Job } from "../../types/JobTypes";
import JobCard from "../../components/JobCard";
import SearchBar from "../../components/SearchBar";
import ThemeToggle from "../../components/ThemeToggle";
import styles from "./JobFinderStyles";
import { ThemeContext } from "../../context/ThemeContext";

export default function JobFinderScreen({ navigation }: any) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const { isDark } = useContext(ThemeContext);

  const loadJobs = async () => {
    try {
      setRefreshing(true);
      const data = await fetchJobs();
      setJobs(data);

      if (search.trim() === "") {
        setFilteredJobs(data);
      } else {
        const filtered = data.filter(job =>
          job.title?.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredJobs(filtered);
      }
    } catch (error) {
      console.log("Error loading jobs:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (search.trim() === "") {
        setFilteredJobs(jobs);
      }
    }, [jobs])
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = jobs.filter(job =>
      job.title?.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      {/* Blue Header */}
      <View style={styles.header}>
        {/* Hello + Toggle on the same row */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Hello, User 👋</Text>
            <Text style={styles.headerSubtitle}>Find your dream job</Text>
          </View>
          <ThemeToggle />
        </View>
      </View>

      {/* Search bar overlapping header */}
      <View style={{ paddingHorizontal: 16 }}>
        <SearchBar value={search} onChange={handleSearch} />
      </View>

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadJobs} />
        }
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onApply={() =>
              navigation.navigate("ApplicationForm", {
                job: item,
                fromSaved: false,
              })
            }
          />
        )}
      />
    </View>
  );
}
