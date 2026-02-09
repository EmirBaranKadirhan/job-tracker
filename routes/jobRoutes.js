const express = require('express')
const router = express.Router()
const companyList = require('../controllers/jobController')
const authNewJobMiddleware = require('../middlewares/authMiddleware')


router.get("/index", authNewJobMiddleware, companyList.showCompanyList)




router.get("/newJob", (req, res) => {
    res.render("newJob")
})
router.post("/newJob", authNewJobMiddleware, companyList.addJob)

router.delete("/index/:id", authNewJobMiddleware, companyList.deleteJob)

router.get("/editJob/:id", authNewJobMiddleware, companyList.editJobGet)

router.put("/editJob/:id", authNewJobMiddleware, companyList.editJobPost)


module.exports = router