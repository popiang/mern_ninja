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
12. useLogin
	- create useLogin hook, pretty similar with useSignup
	- use it in Login page as usual
13. set initial auth status
	- in navbar import useAuthContext and get the user
	- display user email next to logout button
	- conditionally display login & signup and email and logout using user
	- in authContext, use useEffect to get user in localStorage and JSON.parse it
	- if got user, dispatch LOGIN
14. protecting api routes
	- in backend, create middleware folder and create requireAuth middleware file
	- get authorization from req.headers, check if not available send 401 response
	- get the token from authorization using split function
	- require jwt, try catch, using jwt.verify and get the _id
	- require User, findOne using _id, and select only _id
	- call next
	- if error, send 401 response
	- export requireAuth
	- require in workoutRoutes, call it in router.use
	- try using postman
15. making authorized requests
	- add authorization headers in Home, WorkoutForm and WorkoutDetails
	- authorization: `Bearer user.token`
	- add useAuthContext to get user to get user.token
	- in Home
		- check if user exist only then call fetchWorkout
		- in fetchWorkout,add Authorization in headers in fetch
	- in WorkoutForm
		- check if user not exist, setError and then just return, so the rest of the code will not be executed
		- add authorization in headers
	- in WorkoutDetails
		- add in authorizatio in headers
		- check user in handle click before fetch, if user is not exist simply return
16. protecting react routes
	- import Navigate from react-router-dom to redirect user, use to be Redirect, Navigate is newer
	- import useAuthContext to get user
	- check user in the 3 routes to display components accordingly, if not use navigate to redirect accordingly
17. assign workout to user
	- delete all workouts first
	- add user_id in workoutSchema type string
	


