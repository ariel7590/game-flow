"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportConfig = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const config_1 = __importDefault(require("config"));
const passportConfig = () => {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: config_1.default.get('oauthClientId') || '',
        clientSecret: config_1.default.get('oauthClientSecret') || '',
        callbackURL: '/users/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        // Handle user profile (save to DB, etc.)
        done(null, profile);
    }));
    // Serialize user (for session handling)
    passport_1.default.serializeUser((user, done) => {
        done(null, user);
    });
    // Deserialize user
    passport_1.default.deserializeUser((user, done) => {
        done(null, user);
    });
};
exports.passportConfig = passportConfig;
