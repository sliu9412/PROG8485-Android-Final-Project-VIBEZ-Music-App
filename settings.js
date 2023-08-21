module.exports = {
    server: {
        host: "0.0.0.0",
        port: 8080 || process.env.PORT,
    },
    mongoDB: {
        url: "mongodb+srv://apiconestoga:bKkaXG3iTgWZHmgL@mongoclusterconestoga.qmnph5u.mongodb.net",
        database: "androidFinal",
        collections: {
            user: "user",
            home: "home",
        },
    },
    spotify: {
        userInfo: "https://api.spotify.com/v1/me",
        playlist: "https://api.spotify.com/v1/users/{user_id}/playlists",
    },
    app: {
        homeFragmentMaxDisplayCount: 10,
    },
};