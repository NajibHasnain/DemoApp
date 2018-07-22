const axios = require('axios')
const cloudinary = require('cloudinary')
const csv = require("csv");
var fs = require('fs');
var mysql = require("mysql");


var connection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: 'admin',
  database: 'testdb'
});

connection.connect(function(error) {
  if(!!error) {
    console.log('error');
  } else {
    console.log('connected');
  }
})

function fileUploadMiddleware(req, res) {
  // console.log("req.body", req.body);
  // console.log("req.file", req.file);
  console.log("req.data", req.data);
  //console.log("req.headers", req.headers);

  var readStream = fs.createReadStream(req.data.file);
  readStream.on('data', function(data) {
    readStream.pause();
    csv.parse(data.toString(), { delimiter: ','}, function(err, output) {
      console.log("output", output);
      connection.query("Insert into customers ('fisrtName', 'LastName') values  ('1', '2')", function(error, rows, fields){
      if(!!error) {
        console.log("error");
      } else {
        console.log("successful query");
        console.log("rows", rows);
      }
    })
    });
  });
  readStream.on('end', function() {
    console.log('file stored');
    //logger.info('file stored');
  });

  //accepts the POST form submit of the CSV file
  //server.post("/files", function(req, res) {
    //console.log("req body", req.body);
      // the name under "files" must correspond to the name of the
      // file input field in the submitted form (here: "csvdata")
      // csv()
      // .from.stream(fs.createReadStream(req.file.originalname))
      // .to.path(__dirname+'/test.txt')
      // .transform( function(row){
      //   return row;
      // })
      // // when a record is found in the CSV file (a row)
      // .on("record", function(row, index) {
      //     var firstName, lastName;
      //
      //     // skip the header row
      //     if (index === 0) {
      //         return;
      //     }
      //
      //     // read in the data from the row
      //     firstName = row[0].trim();
      //     lastName = row[1].trim();
      //
      //     // perform some operation with the data
      //     // ...
      //     console.log("firstName", firstName);
      //     console.log("lastName", lastName);
      // })
      // // when the end of the CSV document is reached
      // .on("end", function() {
      //     // redirect back to the root
      //     res.redirect("/");
      // })
      // // if any errors occur
      // .on("error", function(error) {
      //     console.log(error.message);
      // });
  //});

  // cloudinary.uploader.upload_stream((result) => {
  //   console.log(`${req.headers.origin}/api/changeProfilePicture`)
  //   axios({
  //     url: `${req.headers.origin}/api/changeProfilePicture`, //API endpoint that needs file URL from CDN
  //     method: 'post',
  //     data: {
  //       url: result.secure_url,
  //       name: req.body.name,
  //       description: req.body.description,
  //     },
  //   }).then((response) => {
  //     // you can handle external API response here
  //     res.status(200).json({ success: true, fileUrl: result.secure_url })
  //   }).catch((error) => {
  //     console.log(error)
  //     res.status(500).json(error.response.data);
  //   });
  // }).end(req.file.buffer);
}

module.exports = fileUploadMiddleware
