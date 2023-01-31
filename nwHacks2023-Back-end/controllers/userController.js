const admin = require("firebase-admin");
const asyncHandler = require("express-async-handler");

require("../config/firebase-config");
const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} = require("firebase/auth");
const { getAuth: getAdminAuth } = require("firebase-admin/auth");


const userSignup = asyncHandler(async (req, res) => {
    let { email, password } = req.body;

    try {

        email = email.toLowerCase().trim();

        const auth = getAuth();
        const credential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const adminAuth = getAdminAuth();
        const token = await adminAuth.createCustomToken(credential.user.uid);

        res.status(201).json({
            success: true,
            token: token,
            // userId: credential.user.uid,
            message: "Login success",
        });
    } catch (error) {

        switch (error.code) {
            case "auth/invalid-email":
                res.status(404).json({
                    success: false,
                    message: "Invalid email. Please try again.",
                });
                break;
            case "auth/email-already-in-use":
                res.status(401).json({
                    success: false,
                    message: "Email already in use. Please try again.",
                });
                break;
            default:
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
                break;
        }

    }
});


const userLogin = asyncHandler(async (req, res) => {
    let { email, password } = req.body;

    try {
        email = email.toLowerCase().trim();
        const credential = await signInWithEmailAndPassword(
            getAuth(),
            email,
            password
        );
        const token = await getAdminAuth().createCustomToken(
            credential.user.uid
        );



        res.status(200).json({
            success: true,
            token: token,
            userId: credential.user.uid,
            message: "Login success",
        });
    } catch (error) {
        switch (error.code) {
            case "auth/user-not-found":
                res.status(404).json({
                    success: false,
                    message: "User not found",
                });
                break;
            case "auth/wrong-password":
                res.status(401).json({
                    success: false,
                    message: "Wrong password",
                });
                break;
            default:
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
                break;
        }


    }
});


const userLogout = asyncHandler(async (req, res) => {
    try {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                res.status(200)
                    .cookie("token", null, {
                        expires: new Date(Date.now()),
                    })
                    .json({
                        success: true,
                        message: "Logged out successfully",
                    });
            })
            .catch((error) => {
                res.status(500).json({ success: false, message: error });
            });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


const userProfile = asyncHandler(async (req, res) => {
    try {
        // const userId = req.params.id;
        // const fbuuid = req.token.uid;

        // const user = await User.findOne({firebase_uuid: fbuuid}).exec();
        // if (userId !== req.token.uid) {
        //     res.status(403).json({ success: false, error: { code: 'unauthorized' } });
        // }

        // const user = await User.findById(req.params.id)

        res.status(201).json({
            success: true,
            user: 'user',
            message: `User info request success`,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = {
    userSignup,
    userLogin,
    userLogout,
    userProfile
}
