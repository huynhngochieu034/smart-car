import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JWT_EXPIRES_TIME, JWT_SECRET_KEY } from "./config/jwt.config";

@Module({
    imports: [
        {
            ...JwtModule.register({
                secret: JWT_SECRET_KEY,
                signOptions: { expiresIn: JWT_EXPIRES_TIME },
            }),
            global: true
        }
    ],
    exports: [JwtModule]
})
export class JWTModule { }