module.exports.helloWorld = function (req, res, next) {
    res.send('Hello World!');
};

module.exports.goodbye = function (req, res, next) {
    res.send('Goodbye, guys!');
};

module.exports.home = function(req, res, next){

    let messageObj = {
        message: "Welcome to My Portfolio"
    };

    res.json(messageObj);
}