import "./Profile.css";
import "../../App.css";
import Header from "../../assets/Header/Header";
import {
  faUser,
  faCheckCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { checkSignInStatus, signIn, signOut } from "../../utils/Auth";
import TreatmentRecordTile from "../../assets/TreatmentRecordTile/TreatmentRecordTile";
import { getTreatmentRecords } from "../../utils/TreatmentRecordAPI";

export default function Profile() {
  // States
  const [signedIn, setSignedIn] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [allTreatmentRecords, setAllTreatmentRecords] = useState([]);
  const [treatmentRecords, setTreatmentRecords] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  // Refs
  const loadingPageRef = useRef(null);
  const signInRef = useRef(null);
  const signOutRef = useRef(null);
  const userTextRef = useRef(null);
  const noRecordsSignInRef = useRef(null);
  const noRecordsRef = useRef(null);
  const searchSortPaneRef = useRef(null);
  const sortRef = useRef(null);

  // Handle sign in auth and element display
  async function handleSignIn() {
    setLoadingPage(true);
    const success = await signIn();

    if (success) {
      await handleAuth();
    }
  }

  // Handle sign out auth and element display
  async function handleSignOut() {
    const success = await signOut();

    if (success) {
      await handleAuth();
    }
  }

  // Handle element display based on sign in status
  async function handleAuth() {
    setLoadingPage(true);

    const { isSignedIn, user } = await checkSignInStatus();

    if (isSignedIn) {
      setSignedIn(true);
      setUser(user);
    } else {
      setSignedIn(false);
      setUser(null);
    }
  }

  async function handleSignedInChange() {
    if (signedIn) {
      signInRef.current.style.display = "none";
      signOutRef.current.style.display = "flex";
      userTextRef.current.style.display = "flex";
      noRecordsSignInRef.current.style.display = "none";
      if (treatmentRecords.length === 0) {
        noRecordsRef.current.style.display = "flex";
      }
      await loadTreatmentRecords();
    } else {
      signInRef.current.style.display = "flex";
      signOutRef.current.style.display = "none";
      userTextRef.current.style.display = "none";
      noRecordsRef.current.style.display = "none";
      noRecordsSignInRef.current.style.display = "flex";
      searchSortPaneRef.current.style.display = "none";
      setUser(null);
      setAllTreatmentRecords([]);
      setTreatmentRecords([]);
    }

    setLoadingPage(false);
  }

  // Handle element display based on sign in status
  useEffect(() => {
    handleSignedInChange();
  }, [signedIn]);

  // Handle element display based on user
  useEffect(() => {
    if (user) {
      let newUsername = user.email.split("@")[0].toLowerCase();
      setUsername(newUsername);
    } else {
      setUsername("");
    }
  }, [user]);

  // Handle element display based on treatment records
  useEffect(() => {
    if (treatmentRecords.length > 0) {
      noRecordsRef.current.style.display = "none";
    } else {
      if (signedIn) {
        noRecordsRef.current.style.display = "flex";
      }
    }
  }, [treatmentRecords]);

  useEffect(() => {
    if (allTreatmentRecords.length > 0) {
      searchSortPaneRef.current.style.display = "flex";
    } else {
      searchSortPaneRef.current.style.display = "none";
    }
  }, [allTreatmentRecords]);

  useEffect(() => {
    if (loadingPage) {
      loadingPageRef.current.style.display = "flex";
    } else {
      loadingPageRef.current.style.display = "none";
    }
  }, [loadingPage]);

  async function loadTreatmentRecords() {
    const records = await getTreatmentRecords();
    setAllTreatmentRecords(records);
    setTreatmentRecords(records);
  }

  useEffect(() => {
    handleAuth();
  }, []);

  function searchRecords() {
    if (search === "") {
      if (sort !== "") {
        sortRecords(allTreatmentRecords);
      } else {
        setTreatmentRecords(allTreatmentRecords);
      }
    } else {
      let records = allTreatmentRecords;
      let searchRecords = records.filter((record) => {
        return record.name.toLowerCase().includes(search.toLowerCase());
      });

      if (sort !== "") {
        sortRecords(searchRecords);
      } else {
        setTreatmentRecords(searchRecords);
      }
    }
  }

  function sortRecords(existingRecords) {
    let records = [...(existingRecords || treatmentRecords)];

    if (sort === "name-ascending") {
      records = records.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (sort === "name-descending") {
      records = records.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    } else if (sort === "newest") {
      records = records.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    } else if (sort === "oldest") {
      records = records.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    }

    setTreatmentRecords(records);
  }

  useEffect(() => {
    searchRecords();
  }, [search]);

  useEffect(() => {
    if (sort !== "") {
      sortRef.current.style.color = "black";
    } else {
      sortRef.current.style.color = "gray";
    }

    sortRecords();
  }, [sort]);

  return (
    <div className="profile-page">
      <div className="loading-page" ref={loadingPageRef}>
        <FontAwesomeIcon
          icon={faSpinner}
          className="button-icon spinner"
        ></FontAwesomeIcon>
      </div>
      <Header />
      <div className="profile-content">
        <div className="profile-section">
          <label className="profile-label">Profile</label>
          <button
            className="profile-button sign-in"
            ref={signInRef}
            onClick={async () => {
              await handleSignIn();
            }}
          >
            <FontAwesomeIcon
              className="button-icon"
              icon={faUser}
            ></FontAwesomeIcon>
            Sign in
          </button>
          <div className="profile-user" ref={userTextRef}>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="button-icon"
            ></FontAwesomeIcon>
            <span className="profile-username">{username}</span>
          </div>
          <button
            className="profile-button sign-out"
            ref={signOutRef}
            onClick={async () => {
              await handleSignOut();
            }}
          >
            <FontAwesomeIcon
              className="button-icon"
              icon={faUser}
            ></FontAwesomeIcon>
            Sign out
          </button>
        </div>
        <div className="profile-section treatment-records">
          <label className="profile-label">Treatment Records</label>
          <div className="search-sort-pane" ref={searchSortPaneRef}>
            <input
              placeholder="Search client"
              className="record-search"
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>
            <select
              className="record-sort"
              ref={sortRef}
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
              }}
            >
              <option value="">Sort</option>
              <option value="name-ascending">A to Z</option>
              <option value="name-descending">Z to A</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <label className="no-records" ref={noRecordsSignInRef}>
            Sign in to save treatment records
          </label>
          <label className="no-records" ref={noRecordsRef}>
            No saved treatment records found
          </label>
          <div className="treatment-records-pane">
            {treatmentRecords.map((record, index) => (
              <TreatmentRecordTile
                key={index}
                treatmentRecord={record}
                treatmentRecords={treatmentRecords}
                setTreatmentRecords={setTreatmentRecords}
                setAllTreatmentRecords={setAllTreatmentRecords}
              ></TreatmentRecordTile>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
