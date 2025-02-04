import { TwitterApi } from 'twitter-api-v2';
import 'dotenv/config';


(async () => {
  // Instantiate with desired auth type (here's Bearer v2 auth)
  const twitterClient = new TwitterApi(`${process.env.BEARER_TOKEN}`);

  // Tell typescript it's a readonly app
  // const readOnlyClient = twitterClient.readOnly;

  // Play with the built in methods
  await twitterClient.v2.tweet('Hello, this is a test.');
  // You can upload media easily!
})();


