/**
 * @description function to catch async error
 * @param fn needed to cache async handle
 * @returns funcion with promise cache handled
 */
exports.catchAsync = (fn) => (req, res, next) => fn(req, res, next).catch(next);
