steps
1. create route
2. create controller
3. bring routes to server.js
4. create model for user
5. create static method for signup in user
	- check if user already exist
	- install bcrypt and hash the password
	- save user
6. install validator and do validation
	- check if email and password are provided
	- check if email is valid using validator
	- check if password is strong enough using validator
7. jwt
	- install jsonwebtoken, require in controller
	- create a function to generate the token
	- create secret key in config file and call it in the function
	- call the function in signup function after saving user in db
	- return the token in the response
8. login
	- create static function in user model
	- validate email & password
	- check if email exist, if no throw error
	- use bcrypt to compare, password and hashed password in retrieved user
	- if match, return user
	- in controller, use the static login function
	- create token
	- return token in response

