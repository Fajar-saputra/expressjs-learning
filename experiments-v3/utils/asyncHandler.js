const asyncHandlerv1 = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const asyncHandlerv2 = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = { asyncHandlerv2 };
