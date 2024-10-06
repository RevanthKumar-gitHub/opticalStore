const { addFrames, getFramesDetails, updateFrameDetails, deleteFrames, lessStockFrames, getProduct } = require("../controllers/frames");
const isAuthenticated = require("../middlewares/auth");

const router = require("express").Router();

router.post("/addFrames", isAuthenticated, addFrames);
router.get("/allFrames", isAuthenticated, getFramesDetails);
router.put("/updateFrames/:id", isAuthenticated, updateFrameDetails);
router.delete("/deleteFrames/:id", isAuthenticated, deleteFrames);
router.get("/lowStockFrames", isAuthenticated, lessStockFrames);
router.get("/getProduct/:id", isAuthenticated, getProduct);


module.exports = router;
