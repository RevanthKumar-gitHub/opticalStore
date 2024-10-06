const asyncHanlder = require("express-async-handler");
const db = require("../db");
const { phoneNumberValidate } = require("../utils/validating");

const createCustomer = asyncHanlder(async (req, res) => {
  const { customer_name, phoneNumber, city } = req.body;
  if (!customer_name || !phoneNumber || !city) {
    res.status(400);
    throw new Error("Enter Mandatory Fields!");
  }

  try {
    await phoneNumberValidate(phoneNumber);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }

  //see if phoneNumber already exists;
  const isCustomerExists = await db.query(
    "SELECT * FROM customers WHERE phoneNumber = $1",
    [phoneNumber]
  );
  if (isCustomerExists.rows.length > 0) {
    res.status(400);
    throw new Error("Customer Already Exists");
  }

  try {
    const { rows } = await db.query(
      "INSERT INTO customers(customer_name,phoneNumber,city) VALUES($1,$2,$3) RETURNING *",
      [customer_name, phoneNumber, city]
    );
    if (rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "Created Successfully!",
        customer: rows[0],
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error("Problem at creating Customer");
  }
});

const updateCustomer = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  const { new_customer_name, new_phoneNumber, new_city } = req.body;

  if (new_phoneNumber) {
    try {
      await phoneNumberValidate(new_phoneNumber);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }

  const { rows } = await db.query(
    "SELECT * FROM customers WHERE customer_id = $1",
    [id]
  );
  if (rows.length === 0) {
    res.status(404);
    throw new Error("Invalid Customer Id");
  }

  let { customer_name, phonenumber, city } = rows[0];

  if (new_customer_name) {
    customer_name = new_customer_name;
  }
  if (new_phoneNumber) {
    phonenumber = new_phoneNumber;
  }
  if (new_city) {
    city = new_city;
  }

  try {
    const { rows } = await db.query(
      "UPDATE customers SET customer_name = $1,phoneNumber=$2,city=$3 WHERE customer_id = $4 RETURNING *",
      [customer_name, phonenumber, city, id]
    );
    if (rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "Updated Successfully",
        customer: rows[0],
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error("Problem at Updating customer");
  }
});

const getCustomer = asyncHanlder(async (req, res) => {
  const { id } = req.params;

  const { rows } = await db.query(
    "SELECT * FROM customers WHERE customer_id = $1",
    [id]
  );

  if (rows.length === 0) {
    res.status(400);
    throw new Error("Customer doestnot Exists");
  }

  res.status(200).json({
    success: true,
    customer: rows[0],
  });
});

const getCustomerByPhone = asyncHanlder(async (req, res) => {
  const { phoneNumber } = req.params;

  const { rows } = await db.query(
    "SELECT * FROM customers WHERE phonenumber = $1",
    [phoneNumber]
  );

  if (rows.length === 0) {
    res.status(400);
    throw new Error("Customer doesnot Exists");
  }

  res.status(200).json({
    success: true,
    customer: rows[0],
  });
});

const deleteCustomer = asyncHanlder(async (req, res) => {
  const { id } = req.params;

  const isCustomerExists = await db.query(
    "SELECT * FROM customers WHERE customer_id = $1",
    [id]
  );
  if (isCustomerExists.rows.length === 0) {
    res.status(400);
    throw new Error("Customer Doesnot Exists");
  }

  try {
    const { rows } = await db.query(
      "DELETE FROM customers WHERE customer_id = $1 RETURNING *",
      [id]
    );
    if (rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "Deleted successfully!",
        customer: rows[0],
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error("Cannot Delete Customer");
  }
});

const getAllCustomers = asyncHanlder(async (req, res) => {
  const { rows } = await db.query("SELECT * FROM customers");
  res.status(200).json({
    success: true,
    customers: rows,
  });
});

const addSight = asyncHanlder(async (req, res) => {
  const { spherical, cylinder, axis, addition, side } = req.body;
  const { id } = req.params;

  if (!side) {
    res.status(400);
    throw new Error("Side is needed");
  }

  const { rows: customer } = await db.query(
    "SELECT * FROM customers WHERE customer_id=$1",
    [id]
  );

  if (customer.length === 0) {
    res.status(404);
    throw new Error("Customer does not exist!");
  }

  if (side !== "left" && side !== "right") {
    res.status(400);
    throw new Error("Invalid side");
  }

  try {
    await db.query("BEGIN");
    const { rows: customerSight } = await db.query(
      "SELECT * FROM customer_sight WHERE customer_id=$1",
      [id]
    );
    if (customerSight.length === 0) {
      //new customer sight
      const insertSight =
        "INSERT INTO sight(spherical,cylinder,axis,addition) VALUES($1,$2,$3,$4) RETURNING *";
      const { rows: insertSightRes } = await db.query(insertSight, [
        spherical,
        cylinder,
        axis,
        addition,
      ]);

      if (side === "right") {
        const customerEyeId =
          "INSERT INTO customer_sight(customer_id,right_eye_id) VALUES($1,$2) ";
        await db.query(customerEyeId, [id, insertSightRes[0].sight_id]);
      }
      if (side === "left") {
        const customerEyeId =
          "INSERT INTO customer_sight(customer_id,left_eye_id) VALUES($1,$2) ";
        await db.query(customerEyeId, [id, insertSightRes[0].sight_id]);
      }
    } else {
      if (!customerSight[0].left_eye_id || !customerSight[0].right_eye_id) {
        //new side sight
        const insertSight =
          "INSERT INTO sight(spherical,cylinder,axis,addition) VALUES($1,$2,$3,$4) RETURNING *";
        const { rows: insertSightRes } = await db.query(insertSight, [
          spherical,
          cylinder,
          axis,
          addition,
        ]);

        if (side === "right") {
          const customerEyeId =
            "UPDATE customer_sight SET right_eye_id = $1 WHERE customer_id = $2 ";
          await db.query(customerEyeId, [insertSightRes[0].sight_id, id]);
        }
        if (side === "left") {
          const customerEyeId =
            "UPDATE customer_sight SET left_eye_id = $1 WHERE customer_id = $2 ";
          await db.query(customerEyeId, [insertSightRes[0].sight_id, id]);
        }
      } else {
        //new sight
        const updateSight =
          "UPDATE sight SET spherical=$1,cylinder=$2,axis=$3,addition=$4 WHERE sight_id = $5 RETURNING *";

        if (side === "right") {
          await db.query(updateSight, [
            spherical,
            cylinder,
            axis,
            addition,
            customerSight[0].right_eye_id,
          ]);
        }
        if (side === "left") {
          await db.query(updateSight, [
            spherical,
            cylinder,
            axis,
            addition,
            customerSight[0].left_eye_id,
          ]);
        }
      }
    }
    await db.query("COMMIT");
    res.status(201).json({
      success: true,
      message: "Sight updated!",
    });
  } catch (error) {
    await db.query("ROLLBACK");
    res.status(500);
    throw new Error(error.message);
  }
});

const getSight = asyncHanlder(async (req, res) => {
  const { id } = req.params;
  const { side } = req.body;

  const { rows: customerSight } = await db.query(
    "SELECT * FROM customer_sight WHERE customer_id = $1",
    [id]
  );
  if (customerSight.length === 0) {
    res.status(400);
    throw new Error("no sight !");
  } else {
    if (side === "left") {
      const { rows: sightRes } = await db.query(
        "SELECT * FROM sight WHERE sight_id = (SELECT left_eye_id FROM customer_sight WHERE customer_id=$1)",
        [id]
      );
      res.status(200).json({
        success: true,
        sight: sightRes,
      });
    }
    if (side === "right") {
      const { rows: sightRes } = await db.query(
        "SELECT * FROM sight WHERE sight_id = (SELECT right_eye_id FROM customer_sight WHERE customer_id=$1)",
        [id]
      );
      res.status(200).json({
        success: true,
        sight: sightRes,
      });
    }
  }
  res.status(400);
  throw new Error("Sight Doesnot Exists!");
});

module.exports = {
  createCustomer,
  updateCustomer,
  getCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerByPhone,
  addSight,
  getSight,
};
