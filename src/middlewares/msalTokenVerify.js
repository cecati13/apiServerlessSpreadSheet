import passport from "passport";

export function msalTokenVerify(req, res, next) {
  try {
    passport.authenticate(
      "oauth-bearer",
      { session: false },
      (err, user, info) => {
        if (err) {
          /**
           * An error occurred during authorization. Either pass the error to the next function
           * for Express error handler to handle, or send a response with the appropriate status code.
           */
          return res.status(401).json({ error: err.message });
        }
        /**
         * update for v2
         */
        /**
         * if (!user) {
            // If no user object found, send a 401 response.
            return res.status(401).json({ error: 'Unauthorized' });
            }
         * 
         */
        

        if (info) {
          // access token payload will be available in req.authInfo downstream
          req.authInfo = info;
          return next();
        }
      }
    )(req, res, next);
  } catch (error) {
    next(error);
  }
}
