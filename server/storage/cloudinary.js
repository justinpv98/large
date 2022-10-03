const config = require("../config/config");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config(config.cloudinary);

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 1024 * 1024, // 1mb
  },
});

function uploadImage(file, folder) {
  if (file) {
    return new Promise(async (resolve, reject) => {
      const adminApiOptions = {
        folder,
        resource_type: "auto",
        overwrite: true,
        quality: "auto",
      };

      if (Array.isArray(file)) {
        const req = file.map((img) => {
          return cloudinary.uploader.upload(img.path, adminApiOptions);
        });

        try {
          const result = await Promise.all(req);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      } else {
        try {
          const result = await cloudinary.uploader.upload(
            file.path,
            adminApiOptions
          );
          resolve(result);
        } catch (err) {
          reject(err);
        }
      }
    });
  }
}

function deleteImage(publicId) {
  return new Promise(async (resolve, reject) => {
    const adminApiOptions = {
      folder,
      resource_type: "auto",
      overwrite: true,
      quality: "auto",
    };

    if (Array.isArray(file)) {
      const req = file.map((img) => {
        return cloudinary.uploader.upload(img.path, adminApiOptions);
      });

      try {
        const result = await Promise.all(req);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    } else {
      try {
        const result = await cloudinary.uploader.upload(
          file.path,
          adminApiOptions
        );
        resolve(result);
      } catch (err) {
        reject(err);
      }
    }
  });
}

module.exports = {
  upload,
  uploadImage,
  deleteImage,
};
