const mongoose = require('mongoose');
const Job = require('../models/Jobs');


const showCompanyList = async (req, res) => {
    //res.send({ name: "Emir" })
    const jobsList = await Job.find({ user: req.userId });

    console.log("jobsList:", jobsList);
    res.render("index", { jobs: jobsList })
}


const addJob = async (req, res) => {
    try {

        const { companyName, position, status, notes } = req.body

        const job = await Job.create({

            user: req.userId,
            companyName,
            position,
            status,
            notes
        })

        res.redirect("/index")
    } catch (error) {
        console.log(error)
        res.status(500).send("Sunucu hatası");
    }
}


const deleteJob = async (req, res) => {

    try {

        const jobId = req.params.id

        const deleted = await Job.findOneAndDelete({
            _id: jobId,
            user: req.userId
        })

        if (!deleted) {

            return res.status(401).send("Kayit bulunamadi veya yetkin yok")
        }

        return res.redirect("/index")

    } catch (error) {

        console.log(error)

    }


}


const editJobGet = async (req, res) => {

    try {

        const job = await Job.findOne({
            _id: req.params.id,
            user: req.userId
        })

        if (!job) {

            return res.status(401).send("Kayit Bulunamadi")
        }

        return res.render("editJob", { job })

    } catch (error) {

        console.log(error)
    }

}


const editJobPost = async (req, res) => {

    try {

        const { companyName, position, status, notes } = req.body

        const updatedJob = await Job.findOneAndUpdate({
            _id: req.params.id,                                 // findOneAndUpdate ==> buna gore ilk {} kisim filtre ozelligi tasir ikinci {} kisim ise guncellenecek degerler
            user: req.userId
        },
            {
                companyName,
                position,
                status,
                notes
            },

            { new: true }
        )

        if (!updatedJob) {

            res.status(401).send("Kayit Bulunamadi veya Yetkin Yok")
        }

        return res.redirect("/index")

    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    showCompanyList,
    addJob,
    deleteJob,
    editJobGet,
    editJobPost
}


