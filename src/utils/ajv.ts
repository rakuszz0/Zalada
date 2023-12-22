import Ajv from 'ajv'

export function ajvFilePlugin(ajv: Ajv) {
    return ajv.addKeyword({
        keyword: 'isFile',
        compile: (_schema, parent) => {
            // Updates the schema to match the file type
            parent.type = 'file'
            parent.format = 'binary'
            delete parent.isFile

            return (field /* MultipartFile */) => !!field.file
        },
        error: {
            message: 'should be a file'
        }
    })
}