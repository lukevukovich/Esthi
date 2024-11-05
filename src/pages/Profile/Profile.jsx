import "./Profile.css";
import "../../App.css";
import Header from "../../assets/Header/Header";
import { faUser, faCheckCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
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
  const [treatmentRecords, setTreatmentRecords] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);

  // Refs
  const loadingPageRef = useRef(null);
  const signInRef = useRef(null);
  const signOutRef = useRef(null);
  const userTextRef = useRef(null);
  const noRecordsSignInRef = useRef(null);
  const noRecordsRef = useRef(null);

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
      setUser(null);
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
    if (loadingPage) {
      loadingPageRef.current.style.display = "flex";
    } else {
      loadingPageRef.current.style.display = "none";
    }
  }, [loadingPage]);

  async function loadTreatmentRecords() {
    const records = await getTreatmentRecords();
    setTreatmentRecords(records);
  }

  useEffect(() => {
    handleAuth();
  }, []);

  return (
    <div className="profile-page">
      <div className="loading-page" ref={loadingPageRef}><FontAwesomeIcon icon={faSpinner} className="button-icon spinner"></FontAwesomeIcon></div>
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
          <label className="no-records" ref={noRecordsSignInRef}>
            Sign in to save treatment records
          </label>
          <label className="no-records" ref={noRecordsRef}>
            No saved treamtent records
          </label>
          <div className="treatment-records-pane">
            {treatmentRecords.map((record, index) => (
              <TreatmentRecordTile
                key={index}
                treatmentRecord={record}
                treatmentRecords={treatmentRecords}
                setTreatmentRecords={setTreatmentRecords}
              ></TreatmentRecordTile>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
