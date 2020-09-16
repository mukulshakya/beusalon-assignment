const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String, trim: true, lowercase: true, required: true },
    noOfOrders: { type: Number, default: 0 },
  },
  { timestamps: true }
);

UserSchema.statics = {
  list() {
    return this.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "userId",
          as: "orders",
        },
      },
      { $unwind: "$orders" },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          noOfOrders: { $sum: 1 },
          averageBillValue: { $sum: "$orders.subTotal" },
        },
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          name: 1,
          noOfOrders: 1,
          averageBillValue: 1,
        },
      },
    ]);
  },
};

module.exports = model("users", UserSchema);
