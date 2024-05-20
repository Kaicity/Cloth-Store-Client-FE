# Cloth Store Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.5.

## Install Nodejs npm to run Angular:
Link download: https://nodejs.org/en/download/package-manager/current

## Install Angular Framework
Run `npm install -g @angular/cli`

## Install Tailwind CSS 
Run `npm install -D tailwindcss postcss autoprefixer`

## Deloyment Docker
This is an instructional clip: https://youtu.be/GE7tn2l9B1E

Build image for this : " docker build -t clientfe . "

Create Container from image : " docker run -p 4201:4201 --name client clientfe "

## Start run project

Run `ng serve` for a dev server. Navigate to `http://localhost:4201/`. The application will run project from your local.

## Code config if folder path capital letters, lower case letters not correct is change path name in class import paths

Example: `import {environment} from "../../../Environment/Environment";` if path error you can edit it `import {environment} from "../../../environment/environment`

## Images demo our websites
  - Products list page
    ![product-list](src/assets/Screenshot%202024-05-19%20235908.png)

    ##
  - Cart page
    ![product-list](src/assets/Screenshot%202024-05-20%20000651.png)

    ##
  - Order Page
    ![product-list](src/assets/Screenshot%202024-05-20%20001122.png)
