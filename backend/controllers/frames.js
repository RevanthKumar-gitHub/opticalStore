const asyncHanlder = require("express-async-handler");
const db = require("../db");
const { frameCodeGenerator } = require("../utils/frameCodeGenerator");

const addFrames = asyncHanlder(async (req, res) => {
  const {
    frame_company,
    quantity,
    frame_type,
    frame_model,
    purchase_price,
    sale_price,
  } = req.body;

  if (
    !frame_company ||
    !quantity ||
    !frame_type ||
    !frame_model ||
    !purchase_price ||
    !sale_price
  ) {
    res.status(400);
    throw new Error("All Fields are Mandatory!");
  }

  const frame_code = frameCodeGenerator(4);

  try {
    const { rows } = await db.query(
      "INSERT INTO frames(frame_code,frame_company,quantity,frame_type,frame_model,purchase_price,sale_price) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [
        frame_code,
        frame_company,
        quantity,
        frame_type,
        frame_model,
        purchase_price,
        sale_price,
      ]
    );
    if (rows.length > 0) {
      res.status(201).json({
        success: true,
        message: "Frames Added!",
        frames: rows[0],
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getFramesDetails = asyncHanlder(async (req, res) => {
  const { rows } = await db.query("SELECT * FROM frames");
  if (rows.length > 0) {
    res.status(200).json({
      success: true,
      frames: rows,
    });
  } else {
    res.status(500);
    throw new Error("No Frames");
  }
});

const updateFrameDetails = asyncHanlder(async (req, res) => {
  const frame_code = req.params.id;
  const {
    new_frame_company,
    new_quantity,
    new_frame_type,
    new_frame_model,
    new_purchase_price,
    new_sale_price,
  } = req.body;
  const { rows } = await db.query(
    "SELECT * FROM frames WHERE frame_code = $1",
    [frame_code]
  );
  if (rows.length === 0) {
    res.status(404);
    throw new Error("Wrong Frame code");
  }
  let {
    frame_company,
    quantity,
    frame_type,
    frame_model,
    sale_price,
    purchase_price,
  } = rows[0];
  if (new_frame_company) {
    frame_company = new_frame_company;
  }
  if (new_quantity) {
    quantity = new_quantity;
  }
  if (new_frame_type) {
    frame_type = new_frame_type;
  }
  if (new_frame_model) {
    frame_model = new_frame_model;
  }
  if (new_purchase_price) {
    purchase_price = new_purchase_price;
  }
  if (new_sale_price) {
    sale_price = new_sale_price;
  }

  try {
    const { rows } = await db.query(
      "UPDATE frames SET frame_company=$1,quantity=$2,frame_type=$3,frame_model=$4,purchase_price=$5,sale_price=$6 WHERE frame_code = $7 RETURNING *",
      [
        frame_company,
        quantity,
        frame_type,
        frame_model,
        purchase_price,
        sale_price,
        frame_code,
      ]
    );
    if (rows.length > 0) {
      res.status(201).json({
        success: true,
        message: "Frames Updated!",
        frames: rows[0],
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteFrames = asyncHanlder(async (req, res) => {
  const frame_code = req.params.id;

  const { rows } = await db.query(
    "DELETE FROM frames WHERE frame_code = $1 RETURNING *",
    [frame_code]
  );

  if (rows.length > 0) {
    res.status(200).json({
      success: true,
      message: "Frames deleted!",
      frame: rows[0],
    });
  } else {
    res.status(404);
    throw new Error("Frame not found!");
  }
});

const lessStockFrames = asyncHanlder(async (req, res) => {
  const stock_quantity = 5;

  const { rows } = await db.query(
    "SELECT frame_code,quantity FROM frames WHERE quantity<=$1",
    [stock_quantity]
  );

  res.status(200).json({
    success: true,
    lowStockFrames: rows,
  });
});

const getProduct = asyncHanlder(async (req, res) => {
  const { id } = req.params;

  const { rows: frame } = await db.query(
    "SELECT * FROM frames WHERE frame_code = $1",
    [id]
  );

  const { rows: lens } = await db.query(
    "SELECT * FROM lens WHERE lens_code = $1",
    [id]
  );

  if (frame.length > 0) {
    res.status(200).json({
      success: true,
      product: frame,
    });
  }
  if (lens.length > 0) {
    res.status(200).json({
      success: true,
      product: lens,
    });
  }

  res.status(400);
  throw new Error("Invalid Frame Code");
});
module.exports = {
  addFrames,
  getFramesDetails,
  updateFrameDetails,
  deleteFrames,
  lessStockFrames,
  getProduct,
};
