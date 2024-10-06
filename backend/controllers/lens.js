const asyncHandler = require("express-async-handler");
const db = require("../db");
const { frameCodeGenerator } = require("../utils/frameCodeGenerator");

const addLens = asyncHandler(async (req, res) => {
  const {
    spherical,
    cylinder,
    axis,
    addition,
    lens_model,
    lens_type,
    lens_category,
    quantity,
    purchase_price,
    sales_price,
  } = req.body;

  if (
    !lens_model ||
    !lens_type ||
    !lens_category ||
    !quantity ||
    !purchase_price ||
    !sales_price
  ) {
    res.status(400);
    throw new Error("Fill Mandatory Fields!");
  }
  const lens_code = frameCodeGenerator(3);

  try {
    const { rows } = await db.query(
      "INSERT INTO lens(lens_code,spherical,cylinder,axis,addition,lens_model,lens_type,lens_category,quantity,purchase_price,sales_price) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
      [
        lens_code,
        spherical,
        cylinder,
        axis,
        addition,
        lens_model,
        lens_type,
        lens_category,
        quantity,
        purchase_price,
        sales_price,
      ]
    );

    if (rows.length > 0) {
      res.status(201).json({
        success: true,
        message: "lens added !",
        lens: rows[0],
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const updateLens = asyncHandler(async (req, res) => {
  const lens_code = req.params.id;

  const {
    new_spherical,
    new_cylinder,
    new_axis,
    new_addition,
    new_lens_model,
    new_lens_type,
    new_lens_category,
    new_quantity,
    new_purchase_price,
    new_sales_price,
  } = req.body;

  const { rows } = await db.query("SELECT * FROM lens WHERE lens_code = $1", [
    lens_code,
  ]);

  let {
    spherical,
    cylinder,
    axis,
    addition,
    lens_model,
    lens_type,
    lens_category,
    quantity,
    purchase_price,
    sales_price,
  } = rows[0];

  //update data
  if (new_cylinder) {
    cylinder = new_cylinder;
  }
  if (new_spherical) {
    spherical = new_spherical;
  }
  if (new_axis) {
    axis = new_axis;
  }
  if (new_addition) {
    addition = new_addition;
  }
  if (new_quantity) {
    quantity = new_quantity;
  }
  if (new_purchase_price) {
    purchase_price = new_purchase_price;
  }
  if (new_sales_price) {
    sales_price = new_sales_price;
  }
  if (new_lens_type) {
    lens_type = new_lens_type;
  }
  if (new_lens_category) {
    lens_category = new_lens_category;
  }
  if (new_lens_model) {
    lens_model = new_lens_model;
  }

  //insert updated data
  try {
    const { rows } = await db.query(
      "UPDATE lens SET spherical=$1,cylinder=$2,axis=$3,addition=$4,lens_model=$5,lens_type=$6,lens_category=$7,quantity=$8,purchase_price=$9,sales_price=$10 WHERE lens_code=$11 RETURNING *",
      [
        spherical,
        cylinder,
        axis,
        addition,
        lens_model,
        lens_type,
        lens_category,
        quantity,
        purchase_price,
        sales_price,
        lens_code,
      ]
    );

    if (rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "lens updated !",
        lens: rows[0],
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const allLens = asyncHandler(async (req, res) => {
  const { rows } = await db.query("SELECT * FROM lens");
  if (rows.length > 0) {
    res.status(200).json({
      success: true,
      lens: rows,
    });
  }
});

const deleteLens = asyncHandler(async (req, res) => {
  const lens_code = req.params.id;

  try {
    const { rows } = await db.query(
      "DELETE FROM lens WHERE lens_code=$1 RETURNING *",
      [lens_code]
    );
    if (rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "lens deleted!",
        lensDeleted: rows[0],
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
module.exports = { addLens, updateLens, allLens, deleteLens };
