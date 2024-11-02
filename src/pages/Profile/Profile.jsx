import "./Profile.css";
import Header from "../../assets/Header/Header";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { checkSignInStatus, signIn, signOut } from "../../utils/Auth";

export default function Profile() {
  // Username text
  const [username, setUsername] = useState("");

  // Saved treatment records
  const [treatmentRecords, setTreatmentRecords] = useState([]);

  // Refs
  const signInRef = useRef(null);
  const signOutRef = useRef(null);
  const userTextRef = useRef(null);
  const treatmentRecordsRef = useRef(null);
  const noRecordsRef = useRef(null);

  // Handle sign in auth and element display
  async function handleSignIn() {
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
    const { isSignedIn, user } = await checkSignInStatus();

    if (isSignedIn) {
      signInRef.current.style.display = "none";
      signOutRef.current.style.display = "flex";
      userTextRef.current.style.display = "flex";
      treatmentRecordsRef.current.style.display = "flex";
      setUsername(user.email.split("@")[0]);
    } else {
      signInRef.current.style.display = "flex";
      signOutRef.current.style.display = "none";
      userTextRef.current.style.display = "none";
      treatmentRecordsRef.current.style.display = "none";
    }
  }

  useEffect(() => {
    handleAuth();

    // Try to fetch treatment records

    if (treatmentRecords.length === 0) {
      noRecordsRef.current.style.display = "flex";
    }
  }, []);

  return (
    <div className="profile-page">
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
              className="profile-icon"
              icon={faUser}
            ></FontAwesomeIcon>
            Sign in
          </button>
          <span className="profile-user" ref={userTextRef}>
            Glowing in as <span className="profile-username">{username}</span>
          </span>
          <button
            className="profile-button sign-out"
            ref={signOutRef}
            onClick={async () => {
              await handleSignOut();
            }}
          >
            <FontAwesomeIcon
              className="profile-icon"
              icon={faUser}
            ></FontAwesomeIcon>
            Sign out
          </button>
        </div>
        <div
          className="profile-section treatment-records"
          ref={treatmentRecordsRef}
        >
          <label className="profile-label">Treatment Records</label>
          <label className="no-records" ref={noRecordsRef}>
            No saved treamtent records
          </label>
        </div>
      </div>
    </div>
  );
}
