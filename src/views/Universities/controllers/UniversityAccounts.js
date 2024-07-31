import { useQueryClient } from "react-query";
import { createUser, fetchUniversities } from "../models/UniversityAccounts";
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePaginationFetch } from "../../../assets/hooks/usePaginationFetch";
/**
 * Hook to use the create user mutation.
 * @returns {Object} - The mutation object.
 */
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(createUser, {
    onSuccess: (data) => {
      // Optionally invalidate queries or perform other actions on success
      queryClient.invalidateQueries('users'); // Assuming you have a 'users' query to invalidate
      console.log("User created successfully:", data);
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });
};

export const useUniversityController = (limitNumber, initialUniversities) => {
  const [university, setUniversity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddUniversity, setShowAddUniversity] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
  const [nextdoc, setNextdoc] = useState(null);
  const fetchRef = useRef(true);
  const updateRef = useRef(false);

  const { data, load: myload } = usePaginationFetch(
    nextdoc,
    fetchRef.current,
    limitNumber,
    updateRef,
    q1, // Define these queries as needed
    q2
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const universities = await fetchUniversities(nextdoc, limitNumber);
        setUniversity((prev) => [...prev, ...universities]);
        setInitialUniversityValue((prev) => [...prev, ...universities]);
        fetchRef.current = false;
        setLoading(false);
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };
    fetchData();
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchValue(searchValue), 1000);
    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    performSearch(debouncedSearchValue);
  }, [debouncedSearchValue, initialUniversities]);

  const performSearch = (value) => {
    if (value) {
      if (value.trim() !== '') {
        setUniversity(
          initialUniversities.filter((university) =>
            university.name.toLowerCase().includes(value.toLowerCase())
          )
        );
      } else {
        setUniversity(initialUniversities);
      }
    } else {
      setUniversity(initialUniversities);
    }
  };

  const searchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const updateUniversity = () => {
    setNextdoc(null);
    updateRef.current = !updateRef.current;
    fetchRef.current = true;
    setUniversity([]);
    setInitialUniversityValue([]);
  };

  const observer = useRef();
  const last = useCallback(
    (element) => {
      if (myload) {
        return;
      }
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (data.length === limitNumber) setNextdoc(data[limitNumber - 1]);
        }
      });
      if (element) observer.current.observe(element);
    },
    [myload, nextdoc]
  );

  return {
    university,
    loading,
    showAddUniversity,
    searchValue,
    searchChangeHandler,
    updateUniversity,
    last,
    setShowAddUniversity,
    setSearchValue,
  };
};
