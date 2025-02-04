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
Object.defineProperty(exports, "__esModule", { value: true });
const twitter_api_v2_1 = require("twitter-api-v2");
require("dotenv/config");
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Instantiate with desired auth type (here's Bearer v2 auth)
    const twitterClient = new twitter_api_v2_1.TwitterApi(`${process.env.BEARER_TOKEN}`);
    // Tell typescript it's a readonly app
    const readOnlyClient = twitterClient.readOnly;
    // Play with the built in methods
    const user = yield readOnlyClient.v2.userByUsername('plhery');
    yield twitterClient.v2.tweet('Hello, this is a test.');
    // You can upload media easily!
}))();
//# sourceMappingURL=index.js.map