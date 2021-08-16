const multer = require('multer');
const path = require('path');
const mime = require('mime-types');
/**
 * @description multer options to upload images
 * 1. set file destination in destination function
 * 2. validate file mime type to accept only images
 * 3. extract image extention to add to file name
 * 4. save image with time now as name
 * @param config { isUserImage }
 * @returns upload options
 */
exports.multerOptions = (config) => {
  // multer config
  const storage = multer.diskStorage({
    // set image destination path
    destination: function (req, file, cb) {
      // change files dir if files
      if (config?.isUserImage) {
        cb(null, path.join('uploads', 'users'));
      } else {
        cb(null, path.join('uploads', 'products'));
      }
    },

    // set file name config
    filename: function (req, file, cb) {
      // validate image type Regex
      if (!file.mimetype.match(/image\//)) {
        return cb(new Error('OnlyImageAllowed'), false);
      }

      // get file extention useing mime-types package
      const fileExtention = mime.extension(file.mimetype);

      // set file name
      if (config?.isUserImage) {
        cb(null, `${file.fieldname}_${req.user._id}.${fileExtention}`);
      } else {
        cb(
          null,
          `${file.fieldname}_${file.originalname.replace(
            /\./g,
            '_'
          )}_${Date.now()}.${fileExtention}`
        );
      }
    },
  });

  const limit = {
    fileSize: 3000000000,
  };

  // return uploade image options
  const upload = multer({ storage: storage, limits: limit });
  return upload;
};
