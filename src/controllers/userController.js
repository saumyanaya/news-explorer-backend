exports.getUserInfo = async (req, res) => {
  try {
    // Get user info from JWT payload
    const { email, name } = req.user;
    res.json({ email, name });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
