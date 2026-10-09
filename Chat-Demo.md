# ZeroDay Live Demo Guide

## Before the demo

1. Open a terminal in the ZeroDay project root.
2. Start the app:

   ~~~sh
   npm install
   npm start
   ~~~

3. Keep that terminal running and open http://localhost:3000.
4. Open the same address in a second, separate browser session, such as a private window. Separate sessions let you sign in as different users.

## Demo accounts

| Username | Password | Use |
| --- | --- | --- |
| bilal.asif | zeroday123 | Main presenter account |
| usaid.rehan | zeroday | Connected account for live chat and feed |
| raheemxd | zeroday | Connected account |
| mina.codes | zeroday | Connected account |
| daniyal.noor | zeroday | Unconnected account for friend requests |

## Show live chat

1. Sign in as bilal.asif in the first session and usaid.rehan in the second.
2. Open Messages in both sessions and open the Bilal–Usaid conversation.
3. Send a short message from either session.
4. Show that it appears in the other session’s open conversation and channel list.
5. Reply from the other session to demonstrate two-way messaging.

## Show a live post, reaction, and comment

1. In Bilal’s session, open Home → New post.
2. Enter a short title and message, leave All Connections selected, then publish.
3. Show the post in Usaid’s Home feed.
4. Click Useful on one side and show the count update on the other.
5. Click Comment, add a short comment, and show it on the other side.

## Show a friend request

1. Keep Bilal signed in on the first session.
2. In the second session, use the profile menu to log out, then sign in as daniyal.noor.
3. In Bilal’s session, open Connections → Find People and send Daniyal a request.
4. In Daniyal’s session, open Connections → Pending to show the incoming request.

## If updates do not appear

- Make sure npm start is still running.
- Confirm both sessions use the same local host, such as localhost.
- Reload both pages after starting the server and sign in to different accounts.
- Open the app through http://localhost:3000 or a local preview on localhost; opening an HTML file directly does not provide the live relay.

Live messages, posts, reactions, comments, and sent friend requests are relayed only while the server is running. They are not saved: refreshing returns the feed and conversations to their sample state. Friend request acceptance, saved posts, blocks, and theme preferences are not synchronized.
