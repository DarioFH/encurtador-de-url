import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"

@Injectable()
export class EncryptUtils {
    async generateHash(senha: string): Promise<string> {
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(senha, salt)
        return hash
    }

    async compareHash(senha: string, hash: string): Promise<boolean> {
        const check = await bcrypt.compare(senha, hash);
        return check
    }
}