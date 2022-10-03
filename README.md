 This project consists in a movie rating website where the movies are
imported using an API (https://www.omdbapi.com/). The page has four main 
components: search, movies row, series row and favourites row. 

 A movie can be rated (and the imdb rating is displayed in the right top 
corner), saved to favourites and if you hover over the poster the plot of 
the movie is displayed at the bottom of the poster.   

 The search available at the top of the page and can be done by choosing 
the year when the movie was released, the type of search (you can  search 
for a movie, series of both) and typing the name of the movie that you 
want to search. Considering the constraints of the API, the request to the 
API for a search must include the name, but the year and type of search 
are optional.

Every time when a search request is made (either if you search a movie or 
when the movie/series row is loaded), the request returns a list of 10 
movies, but  this list contains only a few of the fields of that movie 
(title, poster, year, imdbID and type). And to get all the information for 
a movie, like the plot  and imdbRating, there is another request made for 
each of the movies in the list. This is the reason that when the page 
loads it takes a few seconds. 

For the movies and series rows I created two arrays that contain words 
(movie/series titles) and every time the page reloads, a random word is 
chosen from  that array and the API search request is made based on that 
word, so every time the page is loading the list of movies/series 
displayed is different.

The favourite component stores every favourite movie (from latest to 
oldest) in an array in local storage and when the favourite row is 
displayed the array  from the local storage is loaded into the app. 

For the rating component of the application, when the user clicks on the 
rating of the movie, a popup appears (actually a modal:) ) that contains 
10 stars and  when you click on it the rating is saved in the local 
storage in an array containing all the user ratings. The user rating 
doesn't affect the movie rating.  Also, when a movie is removed from the 
favourites row, it is also removed from the local storage.

For the API error dealing part of the app I considered only the errors 
when a movie is not found when the title of the searched movie/series is 
too short  and the response from the request would retrieve too many 
movies. Also, when the poster of the movie doesn't exist, I chose not to 
display that movie because I  wouldn't help the user and visually would be 
unpleasant.

I started working on this project following this tutorial 
(https://www.youtube.com/watch?v=jc9_Bqzy2YQ) and I continued with this 
tutorial  (https://www.youtube.com/watch?v=eDw46GYAIDQ) for the rating 
part and also (https://www.youtube.com/watch?v=ZCvemsUfwPQ) for creating 
the rating popup. And  the rest is (in my web) history :) .  

For the style of the page I mainly used bootstrap classes and icons. 

Througout this entire description of the project I used the word movie for 
a movie/series. 




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
