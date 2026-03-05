import React, { useEffect, useState, useContext, useCallback, useMemo } from "react";
import { View, FlatList, RefreshControl, Text, Pressable } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { fetchJobs } from "../../api/jobsApi";
import { Job } from "../../types/JobTypes";
import JobCard from "../../components/JobCard";
import SearchBar from "../../components/SearchBar";
import ThemeToggle from "../../components/ThemeToggle";
import styles from "./JobFinderStyles";
import { ThemeContext } from "../../context/ThemeContext";
import { lightTheme, darkTheme } from "../../styles/globalStyles";

const PAGE_SIZE = 10;

export default function JobFinderScreen({ navigation }: any) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { isDark } = useContext(ThemeContext);
  const t = isDark ? darkTheme : lightTheme;

  const loadJobs = async () => {
    try {
      setRefreshing(true);
      const data = await fetchJobs();
      setJobs(data);
      if (search.trim() === "") {
        setFilteredJobs(data);
      } else {
        setFilteredJobs(data.filter(job =>
          job.title?.toLowerCase().includes(search.toLowerCase())
        ));
      }
    } catch (error) {
      console.log("Error loading jobs:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => { loadJobs(); }, []);

  useFocusEffect(
    useCallback(() => {
      if (search.trim() === "") setFilteredJobs(jobs);
    }, [jobs])
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    setCurrentPage(1);
    setFilteredJobs(jobs.filter(job =>
      job.title?.toLowerCase().includes(text.toLowerCase())
    ));
  };

  const totalPages = Math.ceil(filteredJobs.length / PAGE_SIZE);

  const pagedJobs = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredJobs.slice(start, start + PAGE_SIZE);
  }, [filteredJobs, currentPage]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const pageNumbers = useMemo(() => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  const Pagination = () => (
    <View style={[styles.pagination, { borderTopColor: t.cardBorder }]}>
      <Pressable
        style={[styles.pageBtn, { backgroundColor: t.card, borderColor: t.cardBorder, opacity: currentPage === 1 ? 0.4 : 1 }]}
        onPress={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Text style={[styles.pageBtnText, { color: t.title }]}>‹</Text>
      </Pressable>

      {pageNumbers.map((p, i) =>
        p === "..." ? (
          <Text key={"dots" + i} style={[styles.pageDots, { color: t.muted }]}>…</Text>
        ) : (
          <Pressable
            key={p}
            style={[styles.pageBtn, {
              backgroundColor: currentPage === p ? t.applyBtn : t.card,
              borderColor: currentPage === p ? t.applyBtn : t.cardBorder,
            }]}
            onPress={() => goToPage(p as number)}
          >
            <Text style={[styles.pageBtnText, { color: currentPage === p ? "#fff" : t.title }]}>{p}</Text>
          </Pressable>
        )
      )}

      <Pressable
        style={[styles.pageBtn, { backgroundColor: t.card, borderColor: t.cardBorder, opacity: currentPage === totalPages ? 0.4 : 1 }]}
        onPress={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Text style={[styles.pageBtnText, { color: t.title }]}>›</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: t.background }]}>
      <View style={[styles.header, { backgroundColor: t.headerBg }]}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>Hello, User 👋</Text>
            <Text style={styles.headerSubtitle}>Find your dream job</Text>
          </View>
          <ThemeToggle />
        </View>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <SearchBar value={search} onChange={handleSearch} />
      </View>

      <FlatList
        data={pagedJobs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        style={styles.flatList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadJobs} tintColor={t.salary} />
        }
        renderItem={({ item }) => (
          <JobCard
            job={item}
            onPress={() => navigation.navigate("JobFinderInfo", { job: item })}
            onApply={() => navigation.navigate("ApplicationForm", { job: item, fromSaved: false })}
          />
        )}
        ListFooterComponent={totalPages > 1 ? <Pagination /> : null}
      />
    </View>
  );
}