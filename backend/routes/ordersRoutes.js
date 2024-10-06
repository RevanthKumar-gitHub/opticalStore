const { newOrder, changeOrderStatus } = require("../controllers/orders");
const isAuthenticated = require("../middlewares/auth");
const router = require("express").Router();

router.post("/newOrder", isAuthenticated, newOrder);
router.put("/completeOrder/:id", isAuthenticated, changeOrderStatus);

module.exports = router;
