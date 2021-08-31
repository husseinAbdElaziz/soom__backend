// import joi from 'joi';

// module.exports.validateUserData = (userData: any) => {
//   const userSchema = joi.object({
//     username: joi.string().min(5).messages({
//       'string.min': `usernameTooShort`,
//       'any.required': `usernameRequired`,
//     }),
//     password: joi.string().min(6).required().messages({
//       'string.min': `passwordTooShort`,
//       'any.required': `passwordRequired`,
//     }),
//     email: joi.string().email().required().messages({
//       'string.email': `mailNotvalid`,
//       'any.required': `emailRequired`,
//     }),
//     phone: joi.number(),
//   });
//   return userSchema.validate(userData);
// };

// /**
//  * @param {*} challengeData
//  * @returns challenge data validation errors
//  */
// module.exports.validateChallenge = (challengeData) => {
//   const challengeSchema = joi.object({
//     ownerId: joi.required().messages({
//       'any.required': `ownerRequired`,
//     }),
//     projectName: joi.string().min(4).required().messages({
//       'string.min': `projectNameTooShort`,
//       'any.required': `projectNameRequired`,
//     }),
//   });

//   return challengeSchema.validate(challengeData);
// };
