import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import config from 'config';


passport.use(new GoogleStrategy({
    clientID: config.get('oauthClientId') || '',
    clientSecret: config.get('oauthClientSecret') || '',
    callbackURL: '/auth/google/callback'
}, (accessToken: string, refreshToken: string, profile: Profile, done: any) => {
    // Handle user profile (save to DB, etc.)
    done(null, profile);
}));
