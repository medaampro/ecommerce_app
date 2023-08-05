## Introduction:

e-commerce application based on microservices architecture, built for learning purposes.


## Main features:

- email/password authentication.
- products sorted by popularity, newness.
- search bar to find products quickly.
- selection filters to display products according to your selections.
- pagination to display a maximum number of products on a single page.
- make purchase using credit card or paypal.
- order management dashboard for admin users.
- responsive design to support a wide range of devices.


## Main technologies:

- MongoDB Atlas: It provides a free cloud service to store MongoDB collections.
- Mongoose: An ODM (Object Data Modelling) library for MongoDB and Node.js.
- Node.js: A runtime environment to help build fast server applications using JS.
- Express.js: A popular Node.js framework to build scalable server-side for web applications.
- React.js: A JavaScript library for building user interfaces.
- Redux.js: A predictable & global state container for React apps.
- JSON Web Tokens or JWTs: A standard to securely authenticate HTTP requests.
- Formidable: Node.js packages that help in dealing with file uploads.
- JOI: schema description language and data validator for JavaScript.
- Braintree: Payment service API to handle user payment requests.


## Getting Started

#### Prerequisites

node and npm installed.\
to support credit card payments you need braintree sandbox account.\
to support paypal payments you need to link paypal sandbox to the braintree sandbox ([follow documentation](https://developer.paypal.com/braintree/docs/guides/paypal/testing-go-live/node#linked-paypal-testing)).

#### Clone & Setup environment variable

run the following commands: 

```
git clone git@github.com:medaampro/ecommerce_app.git
cd ecommerce_app && touch .env
```

add thoses lines to .env file:

```
PORT       = 8000
URI        = "You can obtain it after creating a collection on mongodb atlas"
JWT_SECRET = "Choose it wisely"
merchantId = "Copy it from your Braintree account"
publicKey  = "Copy it from your Braintree account"
privateKey = "Copy it from your Braintree account"
```

#### Start the app locally

run the following commands: 

```
npm install
node index.js &
cd client
npm install
npm start &
```


#### Any more suggestions are always welcome in the PRs!
