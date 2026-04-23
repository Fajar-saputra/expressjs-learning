// Explicit Return
const asyncHandlerv1 = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

// Short Arrow Function
const asyncHandlerv2 = (fn) => (req, res, next) => 
    Promise.resolve(fn(req, res, next)).catch(next);

module.exports = {asyncHandlerv1}
