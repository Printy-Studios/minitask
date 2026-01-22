import fs from 'fs';

export default function deleteFile(path) {
    return fs.rmSync(path);
}