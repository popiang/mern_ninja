# steps
1. create route
   - login & sign up, empty function at the moment
2. create controller
   - login & sign up, basic response at the moment
   - hook it to the user router
3. bring routes to server.js
4. create model for user
	- hook it to user controller 
	- create login and signup api in postman to test 
5. create static method for signup in User
	- check if user already exist, throw error if yes
	- install bcrypt 
	- generate salt and hash the password
	- create user and return user
	- in user controller, use the signup function to create user
	- test in postman
6. install validator and do validation
	- check if email and password are provided
	- check if email is valid using validator
	- check if password is strong enough using validator
	- test
7. jwt
	- install jsonwebtoken, require in controller
	- create a function to generate the token
	- create secret key in config file and call it in the function
	- call the function in signup function after saving user in db
	- return the token in the response
	- try in postman
8. login
	- create static function in user model
	- validate email & password
	- check if email exist in db, if no throw error
	- use bcrypt to compare password and hashed password in retrieved user
	- if not match, throw error 
	- if match, return user
	- in controller, use the static login function
	- create token
	- return token in response
9. in the frontend, create userContext for LOGIN and LOGOUT 
   and then create the useAuthContext
10. login & signup page
	- create both in pages folder
	- create standard form with email & password as input
	- console log the email and password when submitted
	- add routes in app.js
	- add link in navbar
	- add style for the forms and navbar
11. useSignup
	- create custom hook useSignup
	- create state for error and isLoading
	- call useAuthContext to get dispatch
	- create signup function
		- call signup using fetch
		- if response not ok, set error 
		- if response ok, 
		  - save json to localstorage
		  - call dispatch to update auth context
		  - setIsLoading to false
	- return signup, isLoading & error
	- call useSignup hook in signup page
	  - get the signup, isLoading and error from useSignup
	  - call await signup(email, password) in handlesubmit
	  - display error below button if there's any
	  - set button to disabled if isLoading is true
	  - test in browser
12. useLogout
	- create custom hook useLogout
	- import useAuthContext and get the dispatch function
	- create logout function
	- remove use in localstorage
	- call dispatch with type LOGOUT
	- return the logout function
	- in navbar, add logout button in a div before login and signup div
	- create handleSubmit function, call logout function from useLogout hook
	- add css to style the logout button
	- test in browser
13. useLogin
	- create useLogin hook, pretty similar with useSignup
	- use it in Login page as usual just like in Signup page
	- test in browser
14. set initial auth status
	- in navbar import useAuthContext and get the user
	- display user email next to logout button
	- conditionally display login & signup and email and logout using user
	- in authContext inside AuthContextProvider, use useEffect to get user in localStorage and JSON.parse it
	- if got user, dispatch LOGIN
	- test
15. protecting api routes
	- in backend, create middleware folder and create requireAuth middleware file
	- get authorization from req.headers, check if not available send 401 response
	- get the token from authorization using split function
	- require jwt, try catch, using jwt.verify and get the _id
	- require User, findOne using _id, and select only _id
	- assign it the resut to req.user
	- call next
	- if error, send 401 response
	- export requireAuth
	- require in workoutRoutes, call it in router.use
	- try using postman
16. making authorized requests
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
17. protecting react routes in App.js
	- import Navigate from react-router-dom to redirect user, use to be Redirect, Navigate is newer
	- import useAuthContext to get user
	- check user in the 3 routes to display components accordingly, if not use navigate to redirect accordingly
18. assign workout to user
	- delete all workouts first
	- add user_id in workoutSchema type string and required
	- in workout controller, add user id when create a workout
	- user id is available in req as we have added it in requireAuth middleware upon successfull authentication
	- now during get all workouts, do the same. get the user id in req, send it in the query
	- then, during logout, we remove the current workouts in the context
	- so in useLogout, we call useWorkoutContext and use dispatch with the type set workouts to set the payload to null
	- the reason is so that we will not see flashes of workouts of the previous user when we log in
	


