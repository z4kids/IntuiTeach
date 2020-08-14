/**
 * A middleware to ensure the user is logged in, and it redirects them if they are not logged in.
 * @param {Request<ParamsDictionary, any, any, qs.ParsedQs>} req 
 * @param {Response<any>} res 
 */
function isLoggedIn(req, res, next) {
    //If the user isn't logged in, redirect them to the /auth route
    if (!req.session.user) {
        res.redirect('/auth')
    }
    else {
        next()
    }
}
module.exports = isLoggedIn