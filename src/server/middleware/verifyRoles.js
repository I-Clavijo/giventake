const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const selfUserRoles = req?.user.roles
    if (!selfUserRoles) return res.sendStatus(401)

    const rolesArray = [...allowedRoles]
    const result = selfUserRoles.map(role => rolesArray.includes(role)).find(val => val === true)
    if (!result) return res.sendStatus(401)
    next()
  }
}

export default verifyRoles
