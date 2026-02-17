const express = require('express')
const router = express.Router()
const companyList = require('../controllers/jobController')
const authNewJobMiddleware = require('../middlewares/authMiddleware')


router.get("/index", authNewJobMiddleware, companyList.showCompanyList)

router.get('/', (req, res) => {
    const token = req.cookies ? req.cookies.token : undefined;
    if (token) {
        // opsiyonel: token doğrulamak istersen try/catch ile jwt.verify yap
        return res.redirect('/index');
    }
    return res.redirect('/auth/login');
});


router.get("/newJob", (req, res) => {
    res.render("newJob")
})
router.post("/newJob", authNewJobMiddleware, companyList.addJob)

router.delete("/index/:id", authNewJobMiddleware, companyList.deleteJob)

router.get("/editJob/:id", authNewJobMiddleware, companyList.editJobGet)

router.put("/editJob/:id", authNewJobMiddleware, companyList.editJobPost)


module.exports = router