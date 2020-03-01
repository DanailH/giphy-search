# Documentation for Giphy Search web app

This is a short documentation regarding how the `Giphy Search` app works and some of its features. The time it took to develop this app was around 7h.

# Files and workflow

The entry file for the project is the `index.js`. In it there is a simple React router definition that loads the root `/` and catches all routes that do not match the root. If that happens the user is redirected back to the root url. This setup allows to keep the state of the app and share it easily with others.

On the root url the component that loads is the `App.js` which can be found inside the `/containers` folder. This is a smart component in a sense that this is the place where the call to fetch the data from the Giphy API is done. The component checks if there is anything in the `q` query param in the url and if there is it fetches the data and it passes it down to the `Gallery` component to be rendered.

The `Gallery` is responsible for laying our the layout - either render the images/gifs in one column of 3. By default it renders them in 1 column view and after clicking the button for 3 columns view it rerenders the elements in the needed configuration. The data for each image/gif is passed down to the `GalleryItem` component to handle that specific image. In addition this component handles the Load More functionality by checking the page scroll position and notifies the `App` component to fetch more data before reaching to the bottom so that the user can have a seamless scroll feel.

The `GalleryItem` component is the one responsible for displaying the image/gif. By default it loads the static image and on hover it loads the gif. This is done because this way the browser doesn't have to load the more heavy gif initially and it increases the performance of the app.

The `SearchBar` component is the one that handles the user input for a search result. After the user types something into the input and submits the form the component pushes the search query into the url in the form of a query parameter. After that the `App` component gets notified and fetches the search results only if the search query is different than the one that was requested the last round.

The call to the Giphy API is abstracted into the `giphyService` file in the form of a reusable function that accepts parameters in order to fetch the need data.

Last but not least the `useQuery` custom react hook is located in the `helperHooks` file and is used to handle the url parsing needed to get the value of the `q` query parameter.

## Decision taken
This app doesn't use state management like Redux because the complexity is not that high and this way there are fewer dependencies on which the app relies. Also I didn't used Typescript mostly for the same reason but also because with pure JS the implementation was faster. Regarding styling - the app has a basic responsive style and no CSS compiler like SASS or a library like Bootstrap was used reason being again to keep it light and simple. The only additional library that was added was Material Icons for the icons in the buttons.

## Improvements
If there was more time and if the app needs to more more scalable I would add state management library, Redux to be specific to handle the complexity and be able to easily implement additional features. In addition if multiple developers needs to work on this app I would consider migrating it to Typescript because of the benefit of the strong typization.
Also css library like Bootstrap will be a nice edition if the design is not very opinionated and there are reusable parts of it and I would pair it with SASS.
