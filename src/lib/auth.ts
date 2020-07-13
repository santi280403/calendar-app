import passport from 'passport';
import * as passportGoogle from 'passport-google-oauth20';
import * as passportLocal from 'passport-local';
import { Request } from 'express';

//interface
import { User } from '../interface/user';

//helpers 
import helpers from '../lib/helpers';

import pool from '../database';

const GoogleStrategy = passportGoogle.Strategy;
const LocalStrategy = passportLocal.Strategy;

//register

passport.use('signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req: Request, email, password, done) => {
    const { username, passc } = req.body;

    const emailUSer: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const userName: any = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    //exists username
    if (userName.length > 0) {
        return done(null, false, req.flash('danger', 'The username is already exist'));
    }
    //exists email
    if (emailUSer.length > 0) {
        return done(null, false, req.flash('danger', 'The email is already exist'));
    }
    //fill all the files
    if (!username || !email || !password || !passc) {
        return done(null, false, req.flash('danger', 'Fill the camps'))
    }
    //password match
    if (password !== passc) {
        return done(null, false, req.flash('danger', "The passwords don't match"))
    }

    console.log(req.body);

    const newUser: User = {
        username,
        password,
        email
    }

    newUser.password = await helpers.ecryptPassword(password);
    const result: any = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    done(null, newUser);

}));

//srialize and deserialize
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows: any = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});

//login
passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req: Request, email, password, done) => {
    const rows: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length > 0) {
        const user = rows[0]
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            done(null, user, req.flash('success', 'Welcome' + user.username))   
        } else {
            done(null, false, req.flash('danger', 'Password Incorrect'));
        }
    } else {
        return done(null, false, req.flash('danger', "The email don't exist"));
    }

}));