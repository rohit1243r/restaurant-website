const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "uploads");
    },
    filename: (req, file, cd) => {
        cd(null, 
            Date.now()+"-"+file.originalname
        );
    }
})

const upload = multer({storage});

module.exports = upload