"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const config_1 = __importDefault(require("config"));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: config_1.default.get('oauthClientId') || '',
    clientSecret: config_1.default.get('oauthClientSecret') || '',
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Handle user profile (save to DB, etc.)
    done(null, profile);
}));
