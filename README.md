# Custom Zoom WebSDK - Angular
This project is an Angular app that uses the Zoom Web SDK to start and join Zoom meetings and webinars. It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Installation

To get started, clone the repo:

$ git clone https://github.com/Precious-Usanga/custom-zoom-webapp.git

Setup
Once cloned, navigate to the custom-zoom-webapp directory:

$ cd custom-zoom-webapp

Then install the dependencies:

$ npm install

Open the custom-zoom-webapp directory in your code editor.

Open the src/environments/environment.ts and src/environments/environment.prod.ts  file, and enter values for the variables:

Variable	Description
signatureEndpoint	Required, the endpoint url that returns a signature. Get a signature endpoint here.
apiKey	Required, your Zoom JWT App API Key. You can get yours here.
leaveUrl	Required, the url the user is taken to once the meeting is over.
Example:

signatureEndpoint = 'http://localhost:4000'
apiKey = 'xu3asdfaJPaA_RJW2-9l5_HAaLA'
leaveUrl = 'http://localhost:4200'
Save environment.ts.

Run the app:

$ ng serve --open

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
