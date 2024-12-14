import bcryptjs from "bcryptjs";
import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken";
import { generateOTP, sendOtpEmail } from "../utils/otpUtils.js";



export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashPassword = await bcryptjs.hash(password, 10);

        const duplicateUsername = await User.collection.findOne({ username });
        if (duplicateUsername) {
            return res.status(400).send({ message: "Username already exists" })
        }

        const otp = generateOTP();
        const otpExpiration = Date.now() + 15 * 60 * 1000;

        const user = new User({
            username: username,
            password: hashPassword,
            otp: otp,
            otpExpiration: otpExpiration,
            isVerified: false
        })
        const data = await user.save();

        await sendOtpEmail(username, otp)

        res.status(201).send({ message: "User registerd successfully", result: data })
    } catch (error) {
        res.status(500).send({ message: "Something went wrong.", error: error })
    }
};





export const verifyOtp = async (req, res) => {
    try {
        const { username, otp } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }

        if (user.otp !== otp) {
            return res.status(400).send({ message: "Invalid OTP" });
        }

        if (Date.now() > user.otpExpiration) {
            return res.status(400).send({ message: "OTP has expired" });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiration = undefined;
        await user.save();

        // const token = jwt.sign({ _id: user._id }, process.env.secretKey, { expiresIn: "1h" });

        res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong.", error: error });
    }
};



export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        const comparePassword = await bcryptjs.compare(password, user.password);

        if (user && comparePassword) {
            const token = jwt.sign({ _id: user._id }, process.env.SECRETKEY, { expiresIn: "1h" })
            res.status(200).send({ result: user, token: token })
        } else {
            res.status(400).send({ message: "Email or password is invalid" })
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong.", error: error });
    }
};