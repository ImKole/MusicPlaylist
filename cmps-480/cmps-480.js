var http = require("http");
var fs = require("fs");
var mysql = require("mysql");
var credentials = require("./credentials");
var qs = require("querystring");

http.createServer(function(req, res) {
  try {
    var path = req.url.replace(/\/?(?:\?.*)?$/, "");//.toLowerCase();
    if (path === "/users") {
      users(req, res);
    }
    else if (path === "/add_user") {
      addUser(req, res);
    }
    else if (path === "/playlists") {
      getPlaylists(req, res);
    }

    else if (path === "/findSongs") {
      findSongs(req, res);
    }
    else if (path === "/updateRank") {
      updateRank(req, res);
    }

    else if (path === "/getSongs") {
      getSongs(req, res);
    }
    else if (path === "/savedplaylists") {
      getSavedPlaylists(req, res);
    }
    else {
      serveStaticFile(res, path);
    }
  }
  catch (e) {
    try {
      console.log("ERROR(500): " + e);
      res.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
      res.end("500 Internal Server error");
    }
    catch (e) {
      console.log("ERROR(^^^): " + e);
    }
  }
}).listen(3000);

function serveStaticFile(res, path, contentType, responseCode) {
  if (!path) path = "/home.html";
  if (!responseCode) responseCode = 200;
  if (!contentType) {
    contentType = "application/octet-stream";
    if (path.endsWith(".html")) {
      contentType = "text/html; charset=utf-8";
    }
    else if (path.endsWith(".js")) {
      contentType = "application/javascript; charset=utf-8";
    }
    else if (path.endsWith(".json")) {
      contentType = "application/json; charset=utf-8";
    }
    else if (path.endsWith(".css")) {
      contentType = "text/css; charset=utf-8";
    }
    else if (path.endsWith(".png")) {
      contentType = "image/png";
    }
    else if (path.endsWith(".jpg")) {
      contentType = "text/jpeg";
    }
  }
  fs.readFile(__dirname + "/public" + path, function(err, data) {
    if (err) {
      res.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"});
      res.end("404 Not Found");
    }
    else {
      res.writeHead(200, {"Content-Type": contentType});
      res.end(data);
    }
  });
}

function sendResponse(req, res, data) {
  res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
  res.end(JSON.stringify(data));
}

// start Function to fetch playlists
function getPlaylists(req, res) {
  var conn = mysql.createConnection(credentials.connection);
  conn.connect(function(err) {
    if (err) {
      console.error("ERROR: cannot connect to database: " + err);
      sendResponse(req, res, { success: false, message: "Cannot connect to database: " + err });
      return;
    }
    conn.query("SELECT * FROM Playlist", function(err, rows) {
      if (err) {
        console.error("Query failed: " + err);
        sendResponse(req, res, { success: false, message: "Query failed: " + err });
      } else {
        sendResponse(req, res, { success: true, data: rows, message: "Query successful!" });
      }
      conn.end();
    });
  });
}

function findSongs(req, res) {
  var conn = mysql.createConnection(credentials.connection);
  conn.connect(function(err) {

    if (err) {
      console.error("ERROR: cannot connect to database: " + err);
      sendResponse(req, res, { success: false, message: "Cannot connect to database: " + err });
      return;
    }

    conn.query("SELECT * FROM Songs", function(err, rows) {

      if (err) {
        console.error("Query failed: " + err);
        sendResponse(req, res, { success: false, message: "Query failed: " + err });
      } else {
        sendResponse(req, res, { success: true, data: rows, message: "Query successful!" });
      }
      conn.end();
    });
  });

}

function users(req, res) {
  var conn = mysql.createConnection(credentials.connection);
  // connect to database
  conn.connect(function(err) {
    if (err) {
      console.error("ERROR: cannot connect: " + err);
      return;
    }
    // query the database
    conn.query("SELECT * FROM USERS", function(err, rows, fields) {
      // build json result object
      var outjson = {};
      if (err) {
        // query failed
        outjson.success = false;
        outjson.message = "Query failed: " + err;
      }
      else {
        // query successful
        outjson.success = true;
        outjson.message = "Query successful!";
        outjson.data = rows;
      }
      // return json object that contains the result of the query
      sendResponse(req, res, outjson);
    });
    conn.end();
  });
}

function addUser(req, res) {
  var body = "";
  req.on("data", function (data) {
    body += data;
    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
    if (body.length > 1e6) {
      // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
      req.connection.destroy();
    }
  });
  req.on("end", function () {
    var injson = JSON.parse(body);
    var conn = mysql.createConnection(credentials.connection);
    // connect to database
    conn.connect(function(err) {
      if (err) {
        console.error("ERROR: cannot connect: " + e);
        return;
      }
      // Update the database
      conn.query("UPDATE songs SET rank = ? WHERE id = ?", 
        [injson.rank, injson.song_id], 
        function(err, result) {
        // build json result object
        const outjson = {};
        if (err) {
          // query failed
          outjson.success = false;
          outjson.message = "Query failed: " + err;
        }
        else {
          // query successful
          outjson.success = true;
          outjson.message = "Query successful!";
        }
        // return json object that contains the result of the query
        res.json(outjson);
      });
      conn.end();
    });
  });
}

// Get Songs functiojn for Mood buttons
function getSongs(req, res) {
  const urlParts = require('url').parse(req.url, true);
  const moodId = urlParts.query.moodid;

  if (!moodId) {
    sendResponse(req, res, { success: false, message: "Missing moodid query parameter" });
    return;
  }

  const conn = mysql.createConnection(credentials.connection);

  conn.connect(err => {
    if (err) {
      console.error("ERROR: cannot connect to database: " + err);
      sendResponse(req, res, { success: false, message: "Cannot connect to database: " + err });
      return;
    }

    conn.query("SELECT * FROM Songs WHERE mood_id = ?", [moodId], (err, rows) => {
      if (err) {
        console.error("Query failed: " + err);
        sendResponse(req, res, { success: false, message: "Query failed: " + err });
      } else {
        sendResponse(req, res, { success: true, data: rows, message: "Query successful!" });
      }
      conn.end();
    });
  });
}

// Function to fetch playlists
const url = require('url');

function getSavedPlaylists(req, res) {
  var conn = mysql.createConnection(credentials.connection);
  conn.connect(function(err) {
    if (err) {
      console.error("ERROR: cannot connect to database: " + err);
      sendResponse(req, res, { success: false, message: "Cannot connect to database: " + err });
      return;
    }

    // Extract user from URL: ?user=2
    const queryObject = url.parse(req.url, true).query;
    const userId = parseInt(queryObject.user) || 1;

    //query that joins three tables to fetch the required playlist and song details
    const sql = `
      SELECT
          sp.playlist_id,
          p.playlist_name,
          s1.song_title AS song_title_1, s1.artist AS artist_1,
          s2.song_title AS song_title_2, s2.artist AS artist_2,
          s3.song_title AS song_title_3, s3.artist AS artist_3,
          s4.song_title AS song_title_4, s4.artist AS artist_4,
          s5.song_title AS song_title_5, s5.artist AS artist_5
      FROM Saved_playlist sp
          JOIN Playlist p ON sp.playlist_id = p.playlist_id
          LEFT JOIN Songs s1 ON p.Songs_song_id_1 = s1.song_id
          LEFT JOIN Songs s2 ON p.Songs_song_id_2 = s2.song_id
          LEFT JOIN Songs s3 ON p.Songs_song_id_3 = s3.song_id
          LEFT JOIN Songs s4 ON p.Songs_song_id_4 = s4.song_id
          LEFT JOIN Songs s5 ON p.Songs_song_id_5 = s5.song_id
      WHERE sp.user_id = ? `
    ;

    console.log(`Running Query for user_id: ${userId}`);

    conn.query(sql, [userId], function(err, results) {
      if (err) {
        console.error("Query failed: " + err);
        sendResponse(req, res, { success: false, message: "Query failed: " + err });
        conn.end();
        return;
      }

      sendResponse(req, res, { success: true, data: results, message: "Queries successful!" });
      conn.end();
    });
  });
}

console.log("Server started on localhost: 3000; press Ctrl-C to terminate....");

