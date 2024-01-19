import fs from "fs"
import path from "path";
import * as CommonDto from "../models/Common";

export async function uploadImage({ file, dir, filename }: CommonDto.UploadImage) {
    const image = fs.readFileSync(file.path)

    const buffer = Buffer.from(image).toString("base64")

    const pathdir = path.join(__dirname, '../../../uploads', dir, filename)

    fs.writeFileSync(pathdir, buffer, {encoding: "base64"})

    if(fs.existsSync(file.path)) {
        fs.unlinkSync(file.path)
    }

    return pathdir
}