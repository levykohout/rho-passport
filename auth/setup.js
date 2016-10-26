const passport=require ('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

exports.setup = function(){
    //passport configuration when someone ask for the local strategy use the ff information from the request
    passport.use('local',new LocalStrategy({
        usernameField:'username',
        passwordField:'password'
    },findAndComparePassword ));
    passport.serializeUser(function(user,done){ //converts a user to user id
        done(null, user.id);
    });

    passport.deserializeUser(function(id,done){ //given that id find the user
        User.findBy(id).then(function(user){
            done(null, user);
        }).catch(function(err){
            done(err);
        });

    });
};
//lookup the user by their username
function findAndComparePassword(username, password, done){ //done function to call passport when authentication is done

User.findOne({username:username}).then(function(user){
    if (!user){
        return done(null,false);
    }
    //compare their password
    if(password===user.password){
        return done (null, user);
    }

    done(null,false)
}).catch(function(err){
    console.log('Error finding user', err);
    done(err);
});


}
