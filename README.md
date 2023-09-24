# Project Web App - Remote Dev

## Description
This project is a web app developed as a part of a course from [ByteGrad](http://bytegrad.com). The project helped to sharpen my fundamental javascript skills. The application allows for searching and bookmarking of remote developer jobs (gets test data provided via an API endpoint from ByteGrad). 


## Key Features
- **Modular Design** The app follows development best practices by splitting the codebase into modular components.

- **Bundling** Uses webpack to create files that are minified, transpiled and ready for distribution.

- **State Handling and Rendering** These principles are exceedingly common in modern frameworks. Implementing them within this project helps to understand them better at a lower level. State is handled through a global object and 'render' functions are created for the basic components.


## Installation
To set up this project locally, follow these steps: 

1. Clone the repository: `git clone https://github.com/KadonDEngle/rmtdev-app`
2. Navigate to the project directory: `cd rmtdev-app`
3. Install dependencies (used for build process): `npm install`


## Development
Working on the app:

1. In this project, the build process is not too sophisticated. Before starting development, it's important to comment out the line `import './index.css';` in the `./src/index.js` file. This line is used during the build process to instruct webpack to minify the CSS file. However, it won't work in development because the browser won't recognize it as a module.
2. The `index.html` file in `./src` can now be opened within a web browser to see the application in 'development mode'.


## Building
To create distribution-ready files, follow these steps:

1. Build the project: `npm run build` or `npx webpack`
2. Webpack is only configured to minify and transpile js and css files, so you must copy the html file from `./src` into the dist file after it is created with the build script. You must also change the links to the css and js files in the `<head>` tag.
3. The `index.html` file in `./dist` can now be opened within a web browser to see the application.


## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.