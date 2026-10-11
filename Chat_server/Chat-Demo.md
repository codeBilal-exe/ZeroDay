# ZeroDay Demo Guide

## Start the app

1. Open a terminal in `Chat_server`.
2. Install dependencies and start the server:

   ```sh
   npm install
   npm start
   ```

3. Keep the terminal open and visit [http://localhost:3000](http://localhost:3000).
4. Open the same address in a separate browser profile or private window. The two sessions can now use different demo accounts.

## Demo accounts

| Username | Password | Demo role |
| --- | --- | --- |
| `bilal.asif` | `zeroday123` | Presenter account |
| `usaid.rehan` | `zeroday` | Connected account for chat and feed |
| `raheemxd` | `zeroday` | Connected account |
| `mina.codes` | `zeroday` | Connected account |
| `daniyal.noor` | `zeroday` | Unconnected account for requests |

## Show live messaging

1. Sign in as `bilal.asif` in one session and `usaid.rehan` in the other.
2. Open **Messages** in both sessions and select the Bilal-Usaid chat.
3. Send a message from either session and show it appearing in the other.
4. Reply from the second session to show two-way messaging.
5. In an open chat, select the connection rating beside the contact name to change it. The rating appears in the chat header, not the inbox list.

## Show live feed updates

1. In Bilal's session, open **Home** and create a post.
2. Show the new post in Usaid's home feed.
3. Select a reaction in one session and show the updated counts in the other.
4. Open **Comment**, add a comment, and show it in the other session. Comments stay collapsed until the Comment control is selected.

## Show a connection request

1. Leave Bilal signed in in the first session.
2. Sign out of the second session and sign in as `daniyal.noor`.
3. In Daniyal's session, open **Connections** and find Bilal.
4. Send Bilal a connection request, then show it in Bilal's **Pending** tab.

## If live updates do not appear

- Make sure `npm start` is still running without a server error.
- Open both sessions at the same host, such as `localhost:3000`.
- Reload both pages after starting the server, then sign in as different accounts.
- Open the site through the local server. Opening an HTML file directly does not provide the WebSocket relay.

The relay is temporary and in memory. Refreshing a page or restarting the server resets new messages and posts to the sample content. Connection request acceptance, saved posts, blocks, and theme preferences are not synchronized.
