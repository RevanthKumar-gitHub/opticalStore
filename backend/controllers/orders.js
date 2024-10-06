const asyncHandler = require("express-async-handler");
const db = require("../db");

const newOrder = asyncHandler(async (req, res) => {
  const { customer_id, discount, total, advance, due, order_status, products } =
    req.body;

  if (!customer_id || !total || !order_status) {
    res.status(400);
    throw new Error("Fill Mandateroy fields");
  }
  const { rows: customerRows } = await db.query(
    "SELECT customer_id from customers WHERE customer_id = $1",
    [customer_id]
  );
  if (customerRows.length === 0) {
    res.status(404);
    throw new Error("customer doesnot exists!");
  }
  try {
    await db.query("BEGIN");

    const orderQuery =
      "INSERT INTO orders(customer_id,discount,total,advance,due,order_status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";

    const orderResult = await db.query(orderQuery, [
      customer_id,
      discount,
      total,
      advance,
      due,
      order_status,
    ]);

    const order_id = orderResult.rows[0].order_id;

    const orderDetailQuery =
      "INSERT INTO order_details(frame_id,frame_quantity,lens_id,lens_quantity,order_id) VALUES($1,$2,$3,$4,$5)";

    for (const product of products) {
      const { frame_id, frame_quantity, lens_id, lens_quantity } = product;

      if (frame_id) {
        const { rows: frameRows } = await db.query(
          "SELECT * FROM frames WHERE frame_code = $1",
          [frame_id]
        );
        if (!frame_quantity) {
          res.status(400);
          throw new Error("Frame Quantity is  required");
        }
        if (frameRows.length === 0 || frame_quantity > frameRows[0].quantity) {
          res.status(400);
          throw new Error("Frames are out of stock");
        }
        await db.query("UPDATE frames SET quantity = $1 WHERE frame_code =$2", [
          frameRows[0].quantity - frame_quantity,
          frame_id,
        ]);
      }

      if (lens_id) {
        const { rows: lensRows } = await db.query(
          "SELECT * FROM lens WHERE lens_code = $1",
          [lens_id]
        );
        if (!lens_quantity) {
          res.status(400);
          throw new Error("Lens Quantity is  required");
        }
        if (lensRows.length === 0 || lens_quantity > lensRows[0].quantity) {
          res.status(400);
          throw new Error("Lens are out of stock");
        }

        await db.query("UPDATE lens SET quantity = $1 WHERE lens_code =$2", [
          lensRows[0].quantity - lens_quantity,
          lens_id,
        ]);
      }

      await db.query(orderDetailQuery, [
        frame_id,
        frame_quantity,
        lens_id,
        lens_quantity,
        order_id,
      ]);
    }

    await db.query("COMMIT");
    res.status(200).json({
      success: true,
      message: "Order confirmed!",
      order_id: order_id,
    });
  } catch (error) {
    await db.query("ROLLBACK");
    res.status(500);
    throw new Error(error.message);
  }
});

const changeOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Get order details
  const { rows: orderDetails } = await db.query(
    "SELECT total, advance, due, order_status FROM orders WHERE order_id = $1",
    [id]
  );

  if (orderDetails.length === 0) {
    res.status(400);
    throw new Error("Invalid Order ID!");
  }

  const { order_status } = orderDetails[0];

  if (order_status === "PENDING") {
    const advance = 0;
    const due = 0;

    try {
      const { rows: orderStatus } = await db.query(
        "UPDATE orders SET advance=$1, due=$2, order_status=$3 WHERE order_id=$4 RETURNING *",
        [advance, due, "COMPLETED", id]
      );

      if (orderStatus.length > 0) {
        res.status(200).json({
          success: true,
          message: "Order Completed!",
          order: orderStatus[0],
        });
      } else {
        res.status(400);
        throw new Error("Cannot update order!");
      }
    } catch (error) {
      res.status(500);
      throw new Error("Cannot update order!");
    }
  } else {
    res.status(400);
    throw new Error("Order is not in PENDING status!");
  }
});

module.exports = { newOrder, changeOrderStatus };
