export const checkAdminAuth = (req, res) => {
  if ( req.role !== 'admin') {
    // If the user is not authenticated or not an admin
    return res.status(401).json({
      success: false,
      message: 'Not authorized',
    });
  }

  // If the user is authenticated as admin
  return res.status(200).json({
    success: true,
    message: 'Admin authenticated successfully',
    user: req.user, // Optionally return user details
  });
};
