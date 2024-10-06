const {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomer,
  getAllCustomers,
  getCustomerByPhone,
  addSight,
  getSight,
} = require("../controllers/customers");
const isAuthenticated = require("../middlewares/auth");

const router = require("express").Router();

router.post("/createCustomer", isAuthenticated, createCustomer);
router.put("/updateCustomer/:id", isAuthenticated, updateCustomer);
router.get("/customer/:id", isAuthenticated, getCustomer);
router.delete("/deleteCustomer/:id", isAuthenticated, deleteCustomer);
router.get("/allCustomers", isAuthenticated, getAllCustomers);
router.get(
  "/customerByPhone/:phoneNumber",
  isAuthenticated,
  getCustomerByPhone
);
router.post("/addSight/:id", isAuthenticated, addSight);
router.post("/getSight/:id", isAuthenticated, getSight);

module.exports = router;
