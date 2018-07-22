const express = require('express')
const next = require('next')
const multer = require('multer')
const bodyParser = require('body-parser')
const fileUploadMiddleware = require('./file-upload-middleware')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const csv = require("csv");
var obj = csv();
app.prepare()
  .then(() => {
    const server = express()

    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(bodyParser.json())


    const storage = multer.memoryStorage()
    const upload = multer({ storage })

    server.post('/files', upload.single('file'), fileUploadMiddleware)


        // accepts the POST form submit of the CSV file
        // server.post("/files", function(req, res) {
        //     // the name under "files" must correspond to the name of the
        //     // file input field in the submitted form (here: "csvdata")
        //     obj.from.path(req.file, {
        //         delimiter: ",",
        //         escape: '"'
        //     })
        //     // when a record is found in the CSV file (a row)
        //     .on("record", function(row, index) {
        //         var firstName, lastName;
        //
        //         // skip the header row
        //         if (index === 0) {
        //             return;
        //         }
        //
        //         // read in the data from the row
        //         firstName = row[0].trim();
        //         lastName = row[1].trim();
        //
        //         // perform some operation with the data
        //         // ...
        //         console.log("firstName", firstName);
        //         console.log("lastName", lastName);
        //     })
        //     // when the end of the CSV document is reached
        //     .on("end", function() {
        //         // redirect back to the root
        //         res.redirect("/");
        //     })
        //     // if any errors occur
        //     .on("error", function(error) {
        //         console.log(error.message);
        //     });
        // });


    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
