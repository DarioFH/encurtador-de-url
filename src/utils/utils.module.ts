import { Module } from "@nestjs/common";
import { EncryptUtils } from "./encrypt-utils.providers";

@Module({
    providers: [
        EncryptUtils,
    ],
    exports: [
        EncryptUtils,
    ],
})
export class UtilsModule {}