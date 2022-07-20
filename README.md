# Display Headers

Debug HTTP headers from incoming request.

## Get started

This project is a web app will help you debug/visualize HTTP headers from incoming request. Each call on this project that should help you visualize HTTP headers is called an invocation.

The idea originated from the usage of an AWS Cloudfront Lambda@Edge that is executing in order to transfer the right HTTP response from a prerendering service (https://prerender.io).

The website is hosted on Vercel using the Sveltekit framework and the invocations data is store on a Firestore realtime database.

## How to deploy

1. Create a Firebase project as long as a Firestore database (https://firebase.google.com/)
2. Create a Firebase web app and store variables in `.env.local` (for dev purpose)
3. Create a new Vercel app from this repository, or a fork of it (https://vercel.com/)
4. Store variables in the environment variables of your Vercel project
5. Deploy your Vercel app

## How to use

1. Handle HTTP endpoints that should redirect to the route `/invoke`
2. Access the dashboard on route `/` and visualize your upcoming invocations
3. And voilà!
