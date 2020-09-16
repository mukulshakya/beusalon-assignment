const {
  Types: { ObjectId },
} = require("mongoose");

const users = ["Rahul", "Mukul", "Ankita", "Ramesh"];

module.exports = users.map((user) => ({
  _id: new ObjectId(),
  name: user,
  getOrders() {
    return Array(Math.ceil(Math.random() * 10))
      .fill("")
      .map(() => ({
        userId: this._id,
        subTotal: Math.ceil(Math.random() * 1000),
        orderDate: new Date().setDate(
          new Date().getDate() - Math.ceil(Math.random() * 500)
        ),
      }));
  },
}));
