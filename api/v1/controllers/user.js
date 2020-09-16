const db = require("../../../models");

exports.getUserList = async (req, res) => {
  try {
    const users = await db.User.list();
    return res.success(users);
  } catch (e) {
    return res.error(e);
  }
};

exports.updateOrderCount = async (req, res) => {
  try {
    const users = await db.User.list();

    for (const user of users) {
      await db.User.findByIdAndUpdate(user.userId, {
        noOfOrders: user.noOfOrders,
      });
    }

    return res.success({}, "Successfully updated");
  } catch (e) {
    return res.error(e);
  }
};
