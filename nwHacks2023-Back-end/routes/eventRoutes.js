const router = require("express").Router();
const { createEvent, showEvents, showTrips, createTrip, showTrip } = require('../controllers/eventController')

const { isAuthenticated } = require('../middleware/authMiddleware')

module.exports = function (app) {
    router.post("/", showEvents);
    router.post("/add", createEvent);
    router.post("/trips", showTrips);
    router.post("/trips/add", createTrip);
    router.post("/trips/single", showTrip);
    app.use('/api/events', router);
}


