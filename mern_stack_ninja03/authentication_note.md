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
9. login & signup page
	- create both in pages folder
	- create standard form with email & password as input
	- console log the email and password when submitted
	- add routes in app.js
	- add link in navbar
	- add style for the forms and navbar
10. useSignup
	- create custom hook useSignup
	- create state for error and isLoading
	- call useAuthContext to get dispatch
	- create signup function
		- call signup using fetch
		- if response not ok, set error 
		- if response ok, save json to localstorage and update auth context
	- return signup, isLoading & error
11. useLogout
	- create custom hook useLogout
	- import useAuthContext and get the dispatch function
	- create logout function
	- remove use in localstorage
	- call dispatch with type LOGOUT
	- return the logout function
