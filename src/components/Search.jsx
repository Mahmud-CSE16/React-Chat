import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState();
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };

  const handleKay = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async (e) => {
    // check wheather  the chat group exist if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
      }

      //create user chats
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoUrl: user.downloadURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoUrl: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    } catch (error) {
      console.log(currentUser.photoURL);
      setErr(true);
    }

    setUser(null);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find user"
          onKeyDown={handleKay}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.downloadURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
