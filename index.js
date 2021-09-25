const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const { Console } = require('console');

const app = express();
app.set('view engine', ejs);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: 'test_authen', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) =>{
    ////
    if(username == 'admin' && password == 'test') {
        let user = {
            user_id: 1,
            fisrt_name: 'Admin',
            last_name: 'Super'
        
        };
        return done(null,user);
    } else {
        return done(null, false, {message: 'Incorrect password.'});
    }

}));

app.post('/login', (req, res, next) =>{
    //
    Console.log('logging in..');
    Console.log(req);
    next();
}, passport.authenticate('local',{
    successRedirect: '/success',
    failureRedirect: '/fail'
})
}))

passport.serializeUser((user, done) =>{
    console.log('serialize user');
    done(null,user);
})

passport.deserializeUser((user,done) =>{
    console.log('derialize user');
    done(null,user);
})



app.get('/success', (req, res) =>{
    res.render('success');
})

app.get('/faill', (req, res) =>{
    res.render('faill');
})


app.post('/login', (req, res, next) =>{
    //
})

const listerner = app.listen(3000, () =>{
    console.log('App is runnung on port' + listerner.address().port);
})