import busboy from "busboy";
import os from "node:os";
import fs from "node:fs";
import path from "node:path";

const allowedTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "application/pdf",
];
const maxSize = 5000000; // 5MB

export const formDataParser = (req, res, next) => {
  const bb = busboy({
    headers: req.headers,
    limits: {
      fileSize: maxSize,
    },
  });

  const fields = {};
  const files = [];
  const fileWrites = [];
  const tmpdir = os.tmpdir();

  bb.on("field", (key, value) => {
    fields[key] = value;
  });

  bb.on("file", (fieldname, file, info) => {
    const { mimeType, filename, encoding } = info;
    if (!allowedTypes.includes(mimeType)) {
      file.resume();
      return next(new Error("FILES_TYPE_ERROR"));
    }
    const newName = fieldname + "-" + filename;
    const filepath = path.join(tmpdir, newName);
    const writeStream = fs.createWriteStream(filepath);
    file.pipe(writeStream);

    fileWrites.push(
      new Promise((resolve, reject) => {
        file.on("end", () => writeStream.end());
        writeStream.on("finish", () => {
          fs.readFile(filepath, (err, buffer) => {
            if (err) {
              return reject(err);
            }

            const size = Buffer.byteLength(buffer);
            if (size >= maxSize) {
              file.resume();
              return next(new Error("LIMIT_FILE_SIZE"));
            }
            files.push({
              fieldname,
              originalname: filename,
              encoding: encoding,
              mimetype: mimeType,
              buffer,
              size,
            });

            try {
              fs.unlinkSync(filepath);
            } catch (error) {
              return reject(error);
            }

            resolve();
          });
        });
        writeStream.on("error", reject);
      })
    );
  });

  bb.on("finish", () => {
    Promise.all(fileWrites)
      .then(() => {
        req.body = fields;
        req.files = files;
        next();
      })
      .catch(next);
  });

  bb.on("error", (err) => {
    next(err);
  });

  bb.end(req.rawBody);
};
