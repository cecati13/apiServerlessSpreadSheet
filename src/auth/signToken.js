import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

const jwtConfig = {
    expiresIn: '4h'
};

export function signToken(payload) {
    return jwt.sign(payload, config.secret, jwtConfig);
}
