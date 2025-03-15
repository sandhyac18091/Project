const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.email.endsWith('@admin.com')) {
        next();
    } else {
        res.status(403).json({ message: "Access denied: Admins only" });
    }
};
export default authorizeAdmin