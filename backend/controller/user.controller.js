import User from "../model/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// controller for handling registeration
export const register = async (req, res) => {

    try {
        const { firstname, lastname, email, password, role } = req.body;
        // Check if email or password is missing
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Provide your email address and password",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // hasing the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstname : firstname,
            lastname : lastname,
            email: email,
            password: hashedPassword,
            role,
            isVerified : false // default for new admins
            
        });
        await newUser.save();

        // response after successful sign up
        res.status(201).json({
            message: 'User created successfully',
            success: true
        });

    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// controller handling log in 
export const Login = async function (req, res) {
    try {
        const { email, password } = req.body;
        // Check if any entry is missing
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Provide your email and password"
            })
        }

        // Find user by email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Please register user with this email address",
            });
        }
        // Compare hashed passwords
        const hasEqualPassword = await bcrypt.compare(password, user.password);
        if (!hasEqualPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid password or email address provided",
            });
        }
        // Generate JWT token
        const jwkToken = jwt.sign({
            email: email,
            userId: user._id,
            role : user.role
        }, process.env.SECRET_TOKEN);

        // Set cookie options
        const cookieOptions = {
            httpOnly: false, // Prevents client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === 'production', // Sends cookie only over HTTPS in production
            sameSite: 'strict', // Protects against CSRF by restricting cross-site cookie sending
            maxAge: 60 * 60 * 1000 // Cookie expires in 1 hour (same as JWT token expiration)
        };

        res.cookie("UserAuth", jwkToken, cookieOptions).status(200).json({
            success: true,
            message: "User Login successfully",
            loginToken: jwkToken,
            role: user.role,
            isVerified : user.isVerified
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


// to handle logout request
export const logout = async (req, res) => {
    try {
        // Clear user authentication cookie
        res
            .clearCookie("UserAuth")
            .status(200)
            .json({ success: true, message: "User Logout Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}