import { Client, auth } from "twitter-api-sdk";
import 'dotenv/config';
import mongoose from 'mongoose';
import express, { Express, Request, Response } from 'express';

// Initial connection
mongoose.connect("mongodb://127.0.0.1:27017/");

const app = express();

const authClient = new auth.OAuth2User({
  client_id: process.env.CLIENT_ID as string,
  client_secret: process.env.CLIENT_SECRET as string,
  callback: "http://127.0.0.1:5000/callback",
  scopes: ["tweet.read", "users.read"],
});

const client = new Client(authClient);

const STATE = "my-state";

app.get("/callback", async (req, res) => {
  try {
    const { code, state } = req.query;
    if (state !== STATE) {
      res.status(500).send("State isn't matching");
      return;
    }
    await authClient.requestAccessToken(code as string);
    res.redirect("/tweets");
  } catch (error) {
    console.log(error);
  }
});

app.get("/login", async (req, res) => {
  const authUrl = authClient.generateAuthURL({
    state: STATE,
    code_challenge_method: "s256",
  });
  res.redirect(authUrl);
});

app.get("/tweets", async (req, res) => {
  const tweets = await client.tweets.findTweetById("20");
  res.send(tweets.data);
});

app.get("/revoke", async (req, res) => {
  try {
    const response = await authClient.revokeAccessToken();
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});



app.listen(3000, () => {
  console.log(`Go here to login: http://127.0.0.1:3000/login`);
});



(async () => {
  const client = new Client(process.env.BEARER_TOKEN as string);
  console.log(client);
  // await client.tweets.addOrDeleteRules(
  //   {
  //     add: [
  //       { value: "cat has:media", tag: "cats with media" },
  //       { value: "cat has:media -grumpy", tag: "happy cats with media" },
  //       { value: "meme", tag: "funny things" },
  //       { value: "meme has:images" },
  //     ],
  //   }
  // );
  // const rules = await client.tweets.getRules();
  // console.log(rules);
  // const stream = client.tweets.searchStream({
  //   "tweet.fields": ["author_id", "geo"],
  // });
  // for await (const tweet of stream) {
  //   console.log(tweet.data?.author_id);
  // }
  //

  const { data } = await client.users.findUserByUsername("notGarrettOkay");
  if (!data) throw new Error("Couldn't find user");
  let count = 0;
  for await (const followers of client.users.usersIdFollowers(data.id)) {
    console.log(followers);
    if (++count == 3) {
      break;
    }
  }
})();
