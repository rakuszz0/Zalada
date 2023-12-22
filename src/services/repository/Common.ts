import { File } from "fastify-multer/lib/interfaces";
import fs from "fs"
import path from "path";

export async function uploadImage({ file, dir, filename }: {file: Required<File>, filename: string, dir: string}) {
    const image = fs.readFileSync(file.path)

    const buffer = Buffer.from(image).toString("base64")

    const pathdir = path.join(__dirname, '../../../uploads', dir, filename)

    fs.writeFileSync(pathdir, buffer, {encoding: "base64"})

    if(fs.existsSync(file.path)) {
        fs.unlinkSync(file.path)
    }

    return pathdir
}