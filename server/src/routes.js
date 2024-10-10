const UserController = require('./controllers/UserController');
const UserAuthenController = require('./controllers/UserAuthenController');
const isAuthenController = require('./authen/isAuthenController');
const BlogController = require('./controllers/BlogController');
const SmartphonesController = require('./controllers/SmartphonesController');
let multer = require("multer");

// upload section
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function (req, file, callback) {
        console.log(file);
        callback(null, file.originalname);
    }
});
let upload = multer({ storage: storage }).array("userPhoto", 10);

module.exports = (app) => {
    app.get('/users', isAuthenController, UserController.index);
    app.get('/user/:userId', UserController.show);
    app.post('/user', UserController.create);
    app.put('/user/:userId', UserController.put);
    app.delete('/user/:userId', UserController.remove);
    app.post('/login', UserAuthenController.login);
    app.post('/blog', BlogController.create);
    app.put('/blog/:blogId', BlogController.put);
    app.delete('/blog/:blogId', BlogController.remove);
    app.get('/blog/:blogId', BlogController.show);
    app.get('/blogs', BlogController.index);

// Routes สำหรับ Smartphone
app.post('/smartphone', SmartphonesController.createSmartphone); // สร้าง Smartphone
app.get('/smartphones', SmartphonesController.getAllSmartphones); // ดึงข้อมูล Smartphones ทั้งหมด
app.get('/smartphone/:id', SmartphonesController.getSmartphoneById); // ดึงข้อมูล Smartphone โดย id
app.put('/smartphone/:id', SmartphonesController.updateSmartphone); // อัปเดตข้อมูล Smartphone
app.delete('/smartphone/:id', SmartphonesController.deleteSmartphone); // ลบ Smartphone
    // upload
    app.post("/upload", function (req, res) {
        upload(req, res, function (err) {
            if (err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });
    });

    // delete file uploaded function
    app.post('/upload/delete', async function (req, res) {
        try {
            const fs = require('fs'); 
            console.log(req.body.filename);

            fs.unlink(process.cwd() + '/public/uploads/' + req.body.filename, (err) => {
                if (err) throw err;
                res.send("Delete successful");
            });
        } catch (err) {
            res.status(500).send({
                error: 'An error has occurred trying to delete the file'
            });
        }
    });
};
