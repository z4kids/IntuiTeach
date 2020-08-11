/**
 * A middleware to ensure the user is logged in, and it redirects them if they are not logged in.
 * @param {Request<ParamsDictionary, any, any, qs.ParsedQs>} req 
 * @param {Response<any>} res 
 */
function isLoggedIn(req, res, next) {
    if (!req.session.user) {
        res.redirect('/auth')
    }
    next()
}
module.exports = isLoggedIn