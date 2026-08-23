/* =====================================================================
   DUNGEON OSHA COMPLIANCE OFFICER
   Firebase configuration -- isolated from game logic on purpose.

   Loaded BEFORE the game script in index.html, so `firebaseConfig` is a
   global by the time the leaderboard initialises.

   Only `databaseURL` is strictly required: the Realtime Database needs
   nothing else when its rules are public. apiKey/appId matter only for
   Auth, Storage and Analytics, none of which this game uses.

   To point this at your own project:
     1. https://console.firebase.google.com  ->  Add project
     2. Build > Realtime Database > Create Database (test mode to start)
     3. Project settings > Your apps > Web </>  and copy the values here
     4. Leaderboard writes land under /leaderboard

   With no valid databaseURL the game still runs end to end -- scores just
   fall back to a local leaderboard held in this browser.
   ===================================================================== */
const firebaseConfig = {
  databaseURL: "https://blackj-ebdf6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:   "blackj-ebdf6",
  authDomain:  "blackj-ebdf6.firebaseapp.com"
};

// Node where run results are stored.
const LEADERBOARD_PATH = "leaderboard";
