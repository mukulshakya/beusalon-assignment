const {
  Schema,
  model,
  SchemaTypes: { ObjectId },
} = require("mongoose");

const OrderSchema = new Schema({
  userId: { type: ObjectId, ref: "users" },
  subTotal: { type: Number, required: true },
  orderDate: { type: Date, required: true },
});

module.exports = model("order", OrderSchema);
