"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twitter_api_sdk_1 = require("twitter-api-sdk");
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
// Initial connection
mongoose_1.default.connect("mongodb://127.0.0.1:27017/");
// Twitter things
const authClient = new twitter_api_sdk_1.auth.OAuth2User({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    callback: "http://127.0.0.1:5555/auth/callback",
    scopes: ["tweet.read", "users.read", "offline.access"],
});
// Express temp address for catching the callback.
const app = (0, express_1.default)();
const port = 5555;
app.get("/auth/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query; // Get the auth code from query params
    if (!code) {
        res.status(400).send('Authorization code not found');
        return;
    }
    try {
        // Exchange the authorization code for an access token
        const token = yield authClient.requestAccessToken(code);
        // Now you have the access token, which you can use to make API calls on behalf of the user
        console.log('Access token:', token);
        // Send a response back to the user or store the token as needed
        res.send('Authentication successful!');
    }
    catch (error) {
        console.error('Error during access token exchange:', error);
        res.status(500).send('Something went wrong!');
    }
}));
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Initialize auth client first
    var _a, e_1, _b, _c;
    var _d;
    const token = yield authClient.requestAccessToken();
    // Instantiate with desired auth type (here's Bearer v2 auth)
    const twitterClient = new twitter_api_sdk_1.Client(authClient);
    const stream = twitterClient.tweets.sampleStream({
        "tweet.fields": ["author_id"],
    });
    try {
        for (var _e = true, stream_1 = __asyncValues(stream), stream_1_1; stream_1_1 = yield stream_1.next(), _a = stream_1_1.done, !_a; _e = true) {
            _c = stream_1_1.value;
            _e = false;
            const tweet = _c;
            console.log((_d = tweet.data) === null || _d === void 0 ? void 0 : _d.author_id);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_e && !_a && (_b = stream_1.return)) yield _b.call(stream_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    // Tell typescript it's a readonly app
    // const readOnlyClient = twitterClient.readOnly;
    // Play with the built in methods
    // You can upload media easily!
}))();
//# sourceMappingURL=index.js.map