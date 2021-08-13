const multer = require('multer');
const path = require('path');
const mime = require('mime-types');
/**
 * @description multer options to upload images
 * 1. set file destination in destination function
 * 2. validate file mime type to accept only images
 * 3. extract image extention to add to file name
 * 4. save image with time now as name
 * @param config {allowOnlyImages, isFiles}
 * @returns upload options
 */
exports.multerOptions = (config) => {
  // multer config
  const storage = multer.diskStorage({
    // set image destination path
    destination: function (req, file, cb) {
      // change files dir if files
      if (config.isFiles) {
        cb(null, path.join('uploads', 'files'));
      } else {
        cb(null, path.join('uploads', 'users'));
      }
    },

    // set file name config
    filename: function (req, file, cb) {
      // validate image type Regex
      if (config.allowOnlyImages) {
        if (!file.mimetype.match(/image\//)) {
          return cb(new Error('OnlyImageAllowed'), false);
        }
      } else if(config.allowOnlyVoice){
        if (
          !file.mimetype.match(
            /^image\/(jpe?g|png)$|^application\/pdf$|^application\/postscript$|^audio\/webm$/i
          )
        ) {
          return cb(new Error('OnlyImagesPdfAiAllowed'), false);
        }
      }

      // get file extention useing mime-types package
      const fileExtention = mime.extension(file.mimetype);

      // set file name
      if (!config.isFiles) {
        cb(null, `${file.fieldname}-${req.user._id}.${fileExtention}`);
      } else {
        cb(
          null,
          `${file.fieldname}-${
            file.originalname
          }-${Date.now()}.${fileExtention}`
        );
      }
    },
  });

  const limit = {
    fileSize: 3000000000,
  };

  // return uploade image options
  const upload = multer({ storage:storage, limits: limit });
  return upload;
};
