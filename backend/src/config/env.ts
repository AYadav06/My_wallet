import dotenv from "dotenv";

dotenv.config();

export const ENV={
    DB_URL:process.env.DB_URL  ||"",
    JWT_SECRETE:process.env.JWT_SECRETE  || "defaultSecrete"
}