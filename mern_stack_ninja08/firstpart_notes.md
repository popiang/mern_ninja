# backend
1. create backend folder
2. npm init -y
3. create server.js file
   - install express
   - import express and create app
   - install dotenv, create .env file, require in server.js
   - try run and listen to port
4. create routes folder and create workout.js routes file
   - require express and create router
   - create routes for get all, get single, post, path and delete
   - export the router
5. require the routes in server.js file
   - set the route as middleware in app.use, and set the path too
   - add express.json() middleware too for req body
6. create database in mongodb atlas
   - get the connection string and save in the .env file
   - install mongoose require in server.js
   - create connection to db using mongoose.connect(), handle the then and catch
7. create models folder and workoutModel.js file
   - require mongoose
   - create Schema
   - then create workoutSchema
   - add timestamps
   - create the workout model and export it
8. to test the schema
   - require Workout in workout.js router
   - in the post router, accept title, load and reps from req.body
   - use try and catch
   - use Workout.create the create and send the response
   - handle the error in catch
   - test create using postman and check the data in the db 
9. create controllers
   - create folder controllers and create workoutController.js file
   - require Workout model and mongoose
   - create controllers for getAllWorkouts, getAWorkout, createWorkout, updateAWorkout, deleteAWorkout
   - add all the required validations
   - export all the workouts
   - require all the controllers in workout routes file
   - put all the controllers in all the routes
   - test them

# frontend
1. create-react-app frontend
2. remove all unnecessary files
3. tidy up the remaining files
4. npm install react-router-dom
5. create pages folder
   - create Home.js
   - rfc
   - create component div.home->h2
6. create components folder
   - create Navbar.js file
   - rfc
   - import Link
   - create Navbar component header->div.container->Link->h1
7. in App.js
   - import BrowserRouter, Routes, Route
   - import Home & Navbar
   - create component div.App->BrowserRouter->Navbar,div.pages->Routes->Route=>path="/" element=Home
   - add ccs styles
8. fetch data
   - in package.json, at the top of the page add:
     - "proxy": "http://localhost:4000"
	 - create WorkoutDetails.js in components folder
	   - accept workout as a prop
	   - return a component to display the workout details
   - in Home.js
	 - import useEffect and useState
	 - import WorkoutDetails
	 - create workouts state
	 - use useEffect to fetch workouts from backend
	  - only on render
	  - use fetch
	    - set to setWorkouts if response ok
	 - return div.home->div.workouts->workouts.map->WorkoutDetails
9. workout form
   - create WorkoutForm.js in components folder
   - import useState
   - create state
     - title, load, reps, error
   - create the form first, onSubmit=handleSubmit
   - create handleSubmit
     - async because will use fetch
	 - preventdefault
	 - create a workout object using title, load and reps
	 - fetch post api to create
	   - await
	   - url is the same
	   - second fetch arguments is options object
	     - method post
		 - body JSON.stringify(workout)
		 - header, content type
	   - await fetch to reponse
	 - await reponse to json
	 - if reponse not ok, set errror
	 - if response ok, reset all states and console.log
   - add css styles
   - import WorkoutForm in Home.js and add after workout div
   - test 
10. add react context
   - create context folder and create WorkoutContext.js
   - import createContext and useReducer
   - create WorkoutContext using createContext and export it
   - create WorkoutContextProvider and export it
     - use useReducer
	 - return WorkoutContext.Provider with state and dispatch as props
	 - don't forget the children
	 - in index.js, import WorkoutContextProvider and wrap the App
   - create workoutReducer and export it
     - accept state & action
	 - use switch
	 - set case for SET_WORKOUTS & CREATE_WORKOUT
	 - don't forget the default
   - create hooks folder and create useWorkoutsContext.js
     - the idea is not to use the WorkoutContext directly and we can add extract checking on the context
	 - import WorkoutContext
	 - import useContext
	 - create useWorkoutContext and export it
	   - create context using useContext with WorkoutContext as the argument
	   - check if context is null, return error message
	   - return context 
   - use in Home.js
     - remove useState usage
	 - import useWorkoutContext
	 - get workouts and dispatch from useWorkoutsContext()
	 - if response ok, set dispatch(type: SET_WORKOUTS, payload: json.data.workouts)
	 - the home page will work as before
   - use in WorkoutForm
     - import useWorkoutsContext
	 - get dispatch from useWorkoutsContext
	 - if response ok, call dispatch(type: CREATE_WORKOUT, payload; json.data)
	 - now when a new workout is added, it will automatically displayed in the list
11. delete workout
   - in WorkoutDetails import useWorkoutsContext
   - get dispatch from useWorkoutsContext
   - add span as a delete button at the bottom of the workout details
   - add onclick with handleClick function
   - create handleClick function
     - async function
	 - await fetch delete api, append workout id in the url and set the method to DELETE
	 - await the reponse to json
	 - if response ok call dispatch(type: DELETE_WORKOUT, payload: json.data)
   - in WorkoutContext add DELETE_WORKOUT in the reducer
     - filter the workout id !== action.payload
12. improve error message
   - in workoutController, in createWorkout function, create an emptyFields array
   - check title, load and reps if they are missing, and if the are we push into the array "titie", "load" or "reps" respectively
   - then after that check if the length of the array is more than 0
   - if yes, return a response with a nice error mesasge and the emptyFields array
   - in WorkoutForm, create emptyFields array state
   - if the response is not ok, set the emptyFields state with the data from the api reponse
   - in the form, for every input, create a dynamic class, checking in emptyFields.includes title, load or reps, and add error class name 
   - in css stylesheet, add the css style
13. final touches
   - use google icon to get trash can and put the link in the index.html
   - in the delete span, add class name 'material-symbols-outline'
   - for the date, install date-fns and import formatDistanceToNow in WorkoutDetails
   - use formatDistanceToNow function to display the date
     - new Date(workout.createdAt), {addSuffix: true}