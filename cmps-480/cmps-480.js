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
    else if (path === "/mood_playlist") {
      getMoodPlaylist(req, res); 
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
  if (!path) path = "/index.html";
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

// Function to fetch playlists
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
      // query the database
      //conn.query("INSERT INTO USERS (NAME) VALUE ('" + injson.name + "')", function(err, rows, fields) {
      conn.query("INSERT INTO USERS (NAME) VALUE (?)", [injson.name], function(err, rows, fields) {
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
        }
        // return json object that contains the result of the query
        sendResponse(req, res, outjson);
      });
      conn.end();
    });
  });
}


//Function to retrieve Mood Playlist

function getMoodPlaylist(req, res) {
  var conn = mysql.createConnection(credentials.connection);
  
  // Initialize a variable to hold the incoming request body
  let body = '';

  // Listen for chunks of data being sent in the body of the POST request
  req.on('data', chunk => {
    body += chunk;  // Append each chunk of data to the body variable
  });

  // When all data is received, process the request
  req.on('end', () => {
    try {
      // Parse the incoming JSON data
      const requestData = JSON.parse(body);  
      const mood = requestData.mood;  // Extract the mood from the JSON data

      // Check if mood is provided, otherwise send an error response
      if (!mood) {
        sendResponse(req, res, { success: false, message: "Mood not provided" });
        return;
      }

      // Query the database for songs that match the provided mood
      conn.query("SELECT * FROM Songs WHERE mood_id = ?", [mood], function(err, rows) {
        var outjson = {};  // Initialize an object to store the response data
        
        if (err) {
          outjson.success = false;
          outjson.message = "Query failed: " + err;  // In case of an error with the query
        } else {
          outjson.success = true;
          outjson.message = "Query successful!";  // Query was successful
          outjson.data = rows;  // Include the resulting rows (songs)
        }

        // Send the response back to the client
        sendResponse(req, res, outjson);
      });

      conn.end();  // Close the database connection
    } catch (error) {
      console.error("ERROR parsing JSON: " + error);  // Log parsing errors
      sendResponse(req, res, { success: false, message: "Invalid JSON" });  // Send error response
    }
  });
}
// End of Function to retrieve Mood Playlist

console.log("Server started on localhost: 3000; press Ctrl-C to terminate....");
