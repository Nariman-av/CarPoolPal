const admin = require("firebase-admin");
const asyncHandler = require("express-async-handler");


const createEvent = asyncHandler(async (req, res) => {
    let { name, date, userId, location, description, time } = req.body;

    try {
        console.log('headers: ', req.headers);
        console.log('body: ', req.body);

        // Add user to firestore
        await admin.firestore().collection("events").add({
            name: name,
            time: time,
            userId: userId,
            location: location,
            description: description,
            createdAt: new Date().toISOString(),
        })

        res.status(201).json({
            success: true,
            message: "An event is successfully created",
        });
    } catch (error) {

        switch (error.code) {
            default:
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
                break;
        }

    }
});

const createTrip = asyncHandler(async (req, res) => {
    let { name, departLocation, departTime, eventId, tripDescription, emptySlots } = req.body;

    try {
        // Add user to firestore
        await admin.firestore().collection("trips").add({
            tripDescription,
            departLocation,
            departTime,
            emptySlots,
            eventId,
            createdAt: new Date().toISOString(),
        })

        res.status(201).json({
            success: true,
            message: "An trip is successfully created",
        });
    } catch (error) {

        switch (error.code) {
            default:
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
                break;
        }

    }
});

const showEvents = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    try {
        const docsRef = await admin.firestore().collection("events").where('userId', '==', userId).get();
        const events = docsRef.docs.map(doc => {
            const newDoc = doc.data();
            newDoc.id = doc.id;
            return newDoc;
        });

        console.log(events);

        res.status(200).json({
            success: true,
            data: events,
            message: "Events are successfully retrieved",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

const showTrips = asyncHandler(async (req, res) => {
    const { eventId } = req.body;

    try {
        const docsRef = await admin.firestore().collection("trips").where('eventId', '==', eventId).get();
        const trips = docsRef.docs.map(doc => {
            const newDoc = doc.data();
            newDoc.id = doc.id;
            return newDoc;
        });

        console.log(trips);

        res.status(200).json({
            success: true,
            data: trips,
            message: "trips are successfully retrieved",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

const showTrip = asyncHandler(async (req, res) => {
    const { tripId } = req.body;

    try {
        const docsRef = await admin.firestore().collection("trips").doc(tripId).get();
        const trip = { ...docsRef.data(), id: docsRef.id };

        console.log(trip);

        res.status(200).json({
            success: true,
            data: trip,
            message: "trips are successfully retrieved",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


module.exports = {
    createEvent,
    showEvents,
    showTrips,
    createTrip,
    showTrip
}
