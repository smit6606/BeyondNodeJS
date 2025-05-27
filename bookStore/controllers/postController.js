// module.exports.postPage = (req, res) => {
//     res.render('post');
// }

const postPage = (req, res) => {
    res.render('post');
}

const aboutPage = (req, res) => {
    res.render('about');
}

const contactPage = (req, res) => {
    res.render('contact');
}

module.exports = {
    postPage,
    aboutPage,
    contactPage
}