const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// Render the account page only if the user is logged in
router.get('/account', withAuth, async (req, res) => {
  try {
    // check session and see if user is logged in
    if (req.session.logged_in) {
        res.render('account');
    } else {
        res.redirect('/login');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/account/:id', async (req, res) => {
  try {
    const userName = req.session.user;
    // const userName = req.params.username
    const userData = await User.findByPk(userName);
    const name = userData.get({plain: true});
    res.render('dashboard', 
      name
    );
  } catch (error) {
    res.status(500).json({error});
  }
});

// router.get('/dashboard', async (req, res) => {    
//   req.session.user = {
//   id: userData.id,
//   username: userData.username,
// };
//   const { username } = req.body;
//   console.log('username:', username);
//   const userData = await User.findOne({ 
//   where: { username },
//   include: [{ model: Wallet }] 
//   });
//   return res.render('dashboard', { 
//   user: {
//     username: 'userName'
//   }
// })}
// );

// const userData = await User.findOne({ 
//   where: { username },
//   include: [{ model: Wallet }] 
//   });

// router.get('/dashboard', async (req, res) => {
//   // const user = req.body;
//   const {logged_in, user} = req.session;
//   if (!logged_in) {
//     res.render('login')
//   }
//   console.log('accountROutes', req.session)
//   console.log('user', user)
//   res.render('dashboard', {user});
// });

// router.get('/', async (req, res) => {
//   try {
//   const {username} = req.body;
//   const userData = await User.findByPk(username);
//   const user = userData.get({plain: true});
//   res.render('dashboard', {
//     user
//   })
// } catch (err) {
//   res.status(500).json({err})
// }
// });

// router.get('/dashboard', function(req, res) {
//   User.find(function (err, users, res) {
//     if (err) return res.sendStatus(500);
//     res.render('dashboard', { userList : users });
//   });
// });

module.exports = router;
