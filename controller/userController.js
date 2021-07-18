const users = require('../models/user')
const bcrypt = require('bcrypt')

// SIGN-UP
const signUp = async (req, res) => {
    const email = req.body.email;

    // check if email address already exists on database
    const user = await users.find((user) => user.email === email)
    if (user) {
        return res.status(400).json({ msg: user.email + " already exist" })
    }
    fullName = req.body.fullName;
    password = req.body.password;
    confirmPassword = req.body.confirmPassword
    if (confirmPassword !== password) {
        return res.status(400).json({ msg: "Password & Confirm Password is not Matched" });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // save user data into database
    const id = users.length + 1;
    const newUser = { id, fullName, email, hashedPassword }
    users.push(newUser)
    return res.status(200).json({ msg: "Your are successfully registered", data: users })
};

// SIGN-IN
const signIn = async (req, res) => {
    const email = req.body.email;

    // check if email address exists on database
    user = await users.find((user) => user.email === email)
    if (!user) {
        return res.status(400).json({ msg: "Email does not exist!" })
    }
    try {
        const validPassword = await bcrypt.compare(req.body.password, user.hashedPassword);
        if (!validPassword) return res.status(400).json({ msg: "invalid password" })

        return res.status(200).json({ msg: " logged in successfully", data: users });
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = { signUp, signIn }