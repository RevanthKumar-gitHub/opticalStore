const { addLens, updateLens, allLens, deleteLens } = require("../controllers/lens");
const isAuthenticated = require("../middlewares/auth");

const router = require("express").Router();

router.post("/addLens", isAuthenticated, addLens);
router.put("/updateLens/:id", isAuthenticated, updateLens);
router.get("/allLens", isAuthenticated, allLens);
router.delete("/deleteLens/:id", isAuthenticated, deleteLens);

module.exports = router;
