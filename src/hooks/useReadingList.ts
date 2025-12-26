import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "iptv-quebec-reading-list";

export interface ReadingListItem {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  category: string;
  date: string;
  readTime: string;
  addedAt: number;
}

const getStoredList = (): ReadingListItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveList = (list: ReadingListItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Failed to save reading list:", e);
  }
};

export const useReadingList = () => {
  const [readingList, setReadingList] = useState<ReadingListItem[]>([]);

  useEffect(() => {
    setReadingList(getStoredList());
  }, []);

  const addToReadingList = useCallback((item: Omit<ReadingListItem, "addedAt">) => {
    setReadingList((prev) => {
      if (prev.some((i) => i.slug === item.slug)) return prev;
      const newList = [{ ...item, addedAt: Date.now() }, ...prev];
      saveList(newList);
      return newList;
    });
  }, []);

  const removeFromReadingList = useCallback((slug: string) => {
    setReadingList((prev) => {
      const newList = prev.filter((i) => i.slug !== slug);
      saveList(newList);
      return newList;
    });
  }, []);

  const isInReadingList = useCallback(
    (slug: string) => readingList.some((i) => i.slug === slug),
    [readingList]
  );

  const clearReadingList = useCallback(() => {
    setReadingList([]);
    saveList([]);
  }, []);

  return {
    readingList,
    addToReadingList,
    removeFromReadingList,
    isInReadingList,
    clearReadingList,
  };
};
