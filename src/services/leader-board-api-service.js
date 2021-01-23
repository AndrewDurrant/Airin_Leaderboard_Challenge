const LeaderBoardApiService = {
  getLeaderBoardData() {
    return fetch(`https://us-central1-airin-rec-sandbox.cloudfunctions.net/leaderboard/`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }).then((res) => 
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },

  getProfilePicture(uid) {
    return fetch(`https://us-central1-airin-rec-sandbox.cloudfunctions.net/leaderboard/img/${uid}.png`, {
      method: 'GET',
      headers: {
        'content-type': 'image/png',
      }
    }).then((res) => 
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.url
    )
  }
};

export default LeaderBoardApiService;