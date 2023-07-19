const express = require('express');
const router = express.Router();
const User = require('../models/SignUpModels');
const Transaction = require('../models/TransactionModel');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cors(corsOptions));
router.use(cookieParser('secret'));
router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));


router.use(passport.initialize());
router.use(passport.session());



// Authentication Strategy
var localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (!user) {
            return done(null, false);
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});
// End of Authentication

router.post("/register", (req, res) => {
    const id = Math.floor(100000000 + Math.random() * 9000000000);
    User.findOne({ email: req.body.email }, function (err, data) {
        if (err) {
            console.log(err);
        }
        if (data) {
            console.log("User Already Exists !");
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) throw err;
                    password = hash;
                    const newUser = new User({
                        account: id,
                        name: req.body.name,
                        email: req.body.email,
                        contact: req.body.contact,
                        address: req.body.address,
                        amount: req.body.amount,
                        password: password
                    });
                    newUser.save(function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send('done');
                        }
                    });
                });
            });

        }
    });

});

router.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send("Successfully Authenticated");
            });
        }
    })(req, res, next);
});
router.get("/account", (req, res) => {
    res.send(req.user);
});

router.post('/account/transaction', (req, res) => {
    const id = Math.floor(100000000 + Math.random() * 9000000000);
    const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()} `;
    if (req.body.amount > req.user.amount) {
        res.send("Insufficient Balance");
    } else {
        const newTrans = new Transaction({
            id: id,
            from: req.user.account,
            to: req.body.to,
            amount: req.body.amount,
            Date: date,
        });
        newTrans.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.send('done');
            }
        });
    }
    User.findOneAndUpdate({ account: req.user.account },
        { amount: req.user.amount - req.body.amount }, null, function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                // console.log("Original Doc : ",docs);
            }
        });
    User.findOne({ account: req.body.to }, function (err, data) {
        if (err) {
            console.log(err);
        } if (data) {
            User.findOneAndUpdate({ account: req.body.to },
                { amount: data.amount + parseInt(req.body.amount) }, null, function (err, docs) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        // console.log("Original Doc : ",docs);
                    }
                });
        }
    });

});
router.get('/transaction', (req, res) => {
    Transaction.find({ $or: [{ from: req.user.account }, { to: req.user.account }] }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(docs);
            // console.log(docs);
        }
    });
});
router.get('/credit', (req, res) => {
    Transaction.find({ to: req.user.account }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(docs);
            // console.log(docs);
        }
    });
});
router.get('/debit', (req, res) => {
    Transaction.find({ from: req.user.account }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(docs);
            // console.log(docs);
        }
    });
});
router.get('/logout', (req, res) => {
    req.logout();
    res.send("done");
})


module.exports = router