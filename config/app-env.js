import { config } from "dotenv";
config();


export const dbUrl = process.env.DB_URI;
export const jwtSecret = process.env.JWT_SECRET;
export const jwtAudience = process.env.JWT_AUDIENCE;
export const jwtIssuer = process.env.JWT_ISSUER;

