module.exports = {
  success: function (data = {}, message = "Action completed successfully") {
    return this.status(200).json({ success: true, message, data });
  },
  error: function (errors = {}, message = "Unexpected error") {
    return this.status(errors.statusCode || 400).json({
      success: false,
      message,
      errors: Object.getOwnPropertyNames(errors).includes("message" || "stack")
        ? {
            name: errors.name || "",
            message: errors.message || "",
            stack: errors.stack || "",
          }
        : errors,
    });
  },
};
