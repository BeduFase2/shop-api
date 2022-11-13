const permission = (...allowedRoles) => {
  return (req, res, next) => {
    const { user } = req;
    if (user && allowedRoles.includes(user.type)) {
      return next();
    }
    return res.status(403).json({ message: 'Sin permisos en el sistema' });
  };
}

module.exports = permission;