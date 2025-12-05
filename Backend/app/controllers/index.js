module.exports.helloWorld = function (req, res, next) {
    res.send('Hello World!');
};

module.exports.goodbye = function (req, res, next) {
    res.send('Goodbye, guys!');
};

module.exports.home = function(req, res, next){
    let messageObj = {
        message: "Welcome to My Portfolio",
        status: "Backend is running",
        endpoints: {
            auth: "/api/auth/signup, /api/auth/signin",
            projects: "/api/projects",
            contacts: "/api/contacts",
            services: "/api/services",
            users: "/api/users"
        }
    };

    res.json(messageObj);
}