import crypto from 'crypto'

export const checksum = (source) => {
    return crypto.createHash('md5')
                 .update(source, 'utf8')
                 .digest('hex')
}
