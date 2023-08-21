const express = require("express");
const router = express.Router();

// Endpoint for retrieving playlists
router.get("/playlists", async (req, res) => {
  try {
    // Extract user ID from the Spotify URI
    const uid = req.query.spotifyURI.split(":").reverse()[0];

    // Construct the URL for fetching user's playlists
    const url = req._settings.spotify.playlist.replace("{user_id}", uid);

    // Fetch user's playlists from the Spotify API
    const playlist = await res._sr(url);

    // Process the fetched playlist data
    const data = playlist.items.map((item) => {
      return {
        name: item.name,
        uri: item.uri,
        trackCount: item.tracks.total,
        imageURL: item.images.length > 0 ? item.images[0].url : "",
      };
    });

    // Send the processed playlist data as response
    res.send({
      message: null,
      data: data,
    });
  } catch (e) {
    console.error('Playlist error: ', e);
    res.send({
      message: `Error: ${e.message}`,
      data: [],
    });
  }
});

module.exports = router;
