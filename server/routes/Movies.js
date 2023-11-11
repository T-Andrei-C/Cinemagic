const express = require("express");
const router = express.Router();
const path = require("path");

const {reader} = require("../fileReader");
const filePath = path.join("./json-files/movies.json");

router.route("/").get(async (req, res) => {
    try {
        const response = await reader(filePath);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send("Data could not be found");
    }
});

router.route("/:title").get(async (req, res) => {
    try {
        const response = await reader(filePath);
        const movie = await response.find(movie => movie.Title === req.params.title);
        res.status(200).json(movie);
    } catch (error){
        console.error(error);
        res.status(500).send("Data could not be found");
    }
})

module.exports = router;