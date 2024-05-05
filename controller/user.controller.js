import User from "../config/connection/model/user.model.js";
import asyncHandler from "express-async-handler"
import ApiError from "../utils/apiError.js";
import { deleteOne, getAll, updateOne } from "./factor.controller.js";
import { uploadImageToCloudinary } from "../config/upload.js";

// const addUser = createOne(User)
const updateUser = updateOne(User)
const deleteUser = deleteOne(User)
const getAllUsers = getAll(User)
const addUser = asyncHandler(async (req, res) => {
    let newDoc;
    const {
        IdNumber,
        outgoingNumber,
        transactionNumber,
        userOccupation,
        userSerialNumber,
        name,
        releaseDate,
        dateBoking,
        WifeSerialNumber,
        wifeName,
        type,
        condition,
        nationality
    } = req.body
    if (req.file) {
        const imageUrl = await uploadImageToCloudinary(req.file.path);
        // console.log(imageUrl.secure_url)
        // Check if a user with the provided properties already exists
        const existingUser = await User.findOne({ IdNumber });
        if (existingUser) {
            return res.status(409).json({ message: 'User with provided properties already exists' });
        }
        // Create the document with the image URL
        newDoc = await User.create({
            IdNumber,
            outgoingNumber,
            transactionNumber,
            userOccupation,
            userSerialNumber,
            name,
            releaseDate,
            dateBoking,
            WifeSerialNumber,
            wifeName,
            type,
            condition,
            nationality,
            image: imageUrl
        });
    } else {
        // Check if a user with the provided properties already exists
        const existingUser = await User.findOne({ IdNumber: req.body.IdNumber });
        if (existingUser) {
            return res.status(409).json({ message: 'User with provided properties already exists' });
        }
        // Create the document without the image
        newDoc = await User.create(req.body);
    }
    res.status(201).json({ data: newDoc });
});



const findMariagePermit = asyncHandler(async (req, res) => {
    const { idNumber, outgoingNumber } = req.params
    const data = await User.findOne({ IdNumber: idNumber, outgoingNumber })
    if (data) {
        res.status(200).json({ message: "founded", data })
    }
    res.status(404).json({ message: "document not founded" })
})
const inquireAboutATransaction = asyncHandler(async (req, res) => {
    const { transactionNumber } = req.body
    const data = await User.findOne({ transactionNumber: transactionNumber })
    if (data) {
        res.status(200).json({ message: "founded", data })
    }
    res.status(404).json({ message: "document not founded" })
})
export {
    addUser,
    updateUser,
    deleteUser,
    findMariagePermit,
    getAllUsers,
    inquireAboutATransaction
}