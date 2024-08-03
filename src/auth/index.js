import passport from "passport";

import { JwtStrategy } from "./strategies/jwt.strategy.js";
import { MicrosoftStrategy } from "./strategies/msal.strategy.js";

export const authStrategy = () => {
    passport.use(JwtStrategy);
    passport.use(MicrosoftStrategy)
}