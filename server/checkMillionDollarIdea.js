const checkMillionDollarIdea = (req, res, next) => {
    const {numWeeks, weeklyRevenue} = req.body;
    if (numWeeks * weeklyRevenue >= 1000000) {
        next();
    } else {
        return res.sendStatus(400);
    }


};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
