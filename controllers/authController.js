const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken')

const registerGet = (req, res) => {
    res.render('register')

}

const registerPost = async (req, res) => {
    try {
        // formdan gelen verileri aliriz
        const { username, email, password } = req.body
        if (!username || !email || !password) {               // bunlardan herhangi biri dogruysa asagidaki kod satiri calisacak
            return res.status(400).send("Lütfen tüm alanları doldurun")
        }

        // email daha once var mi
        const existingUser = await User.findOne({ email: email })    // users koleksiyonunda, email alanı = formdan gelen email olan bir kayıt var mı
        if (existingUser) {
            return res.status(409).send("Bu email zaten kayıtlı")

        }
        // sifre hashleme
        const hashedPassword = await bcrypt.hash(password, 10);

        // yeni kullanici olustur
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        })

        await newUser.save()      // yeni kullaniciyi veritabanina kaydet
        return res.redirect('/index');     // kayit islemi basarili ise login sayfasina yonlendir

    } catch (err) {
        console.log(err)
        res.status(500).send("Sunucu hatası")
    }
}



const loginPost = async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })      // tarayicidan gelen email ile veritabaninda eslesen kaydi bul, yani user db'deki ilgili kayit hepsi !
    console.log(user)


    if (!user) {
        return res.status(401).send("Gecersiz Email")
    }

    const match = await bcrypt.compare(password, user.password)      // tarayicidan gelen sifre ile veritabanindaki sifreyi karsilastir

    if (!match) {
        return res.status(401).send("Gecersiz Sifre")
    }


    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })  // kullanici id sini token icerisinde sakla

    res.cookie('token', token, {
        httpOnly: true
    })

    return res.redirect('/index')
}



const logout = (req, res) => {

    res.clearCookie('token');           // Token cookie'sini temizle

    return res.redirect('/auth/login')
}


module.exports = {
    registerGet,
    registerPost,
    loginPost,
    logout
}