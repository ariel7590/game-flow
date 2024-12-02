import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import config from 'config';


export const passportConfig=()=>{
  passport.use(new GoogleStrategy({
    clientID: config.get('oauthClientId') || '',
    clientSecret: config.get('oauthClientSecret') || '',
    callbackURL: '/users/auth/google/callback'
}, (accessToken: string, refreshToken: string, profile: Profile, done: any) => {
    // Handle user profile (save to DB, etc.)
    done(null, profile);
}));

// Serialize user (for session handling)
passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  // Deserialize user
  passport.deserializeUser((user, done) => {
    done(null, user as any);
  });
}
