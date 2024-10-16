const UserController = require('./controllers/UserController');
const UserAuthenController = require('./controllers/UserAuthenController');
const isAuthenController = require('./authen/isAuthenController');
const BlogController = require('./controllers/BlogController');
const SmartphonesController = require('./controllers/SmartphoneController');
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

    app.get('/smartphones', SmartphonesController.index); // ดึงข้อมูลสมาร์ทโฟนทั้งหมด
    app.post('/smartphones', SmartphonesController.create); // สร้างสมาร์ทโฟน
    app.get('/smartphone/:smartphoneId', SmartphonesController.show); // ดึงข้อมูลสมาร์ทโฟนตาม ID
    app.put('/smartphone/:smartphoneId', SmartphonesController.put); // อัปเดตสมาร์ทโฟน
    app.delete('/smartphone/:smartphoneId', SmartphonesController.remove); // ลบสมาร์ทโฟน
    // Upload section
    app.post("/upload", function (req, res) {
        upload(req, res, function (err) {
            if (err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });
    });

    // Delete file uploaded function
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
