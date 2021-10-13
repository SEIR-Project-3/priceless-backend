# priceless-backend

API created for the priceless app.

## Description

This API was created to provide full CRUD functionality for apps that have a one to many relationship between a user account and an item. The premise is that all items that are created must have an owner tied to them, and an item cannot be created by an unauthenticated user.

Features:

- User authentication and account creation
- Change password functionality
- Passwords are hashed when stored
- All items owned by user account are removed upon account deletion

## Installation

Fork and clone this repo.

```bash
#install dependencies
npm install cors bcrypt express passport passport-jwt jsonwebtoken

#install test dependencies
npm install mocha chai --save-dev
```

## Usage

Examples of account creation and authentication routes.

```javascript
// SIGN UP
router.post('/signup', async (req, res, next) => {
	try {
		const password = await bcrypt.hash(req.body.password, 10);
		const user = await User.create({
			username: req.body.username,
			email: req.body.email,
			password,
		});
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
});

// SIGN IN
router.post('/signin', async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		const token = await createUserToken(req, user);
		res.json({ token, user });
	} catch (error) {
		next(error);
	}
});
```

License

MIT License

Copyright (c) [2021] [Andrew McLean, Brandon Doris, Emmanuel Kobara, Haden Dyer]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
