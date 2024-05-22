# Eliq Drinks App

## Overview

Eliq Drinks App is a white-label drinks application designed to showcase a list of alcoholic drinks with their details fetched from TheCocktailDB API. The app is designed to be configurable through a `config.json` file, enabling easy branding and customization. The app is built using Angular 17 and can be deployed to GitHub Pages for demonstration purposes.

## Features

- **Home Screen**: Displays a list of drinks with images and names.
- **Details Screen**: Provides detailed information about a selected drink, including an image, ingredients, and instructions in multiple languages.
- **White-Label Configuration**: Supports customization through a `config.json` file to change branding and UI elements.

## Technologies Used

- Angular 17
- Angular Router
- HttpClient (for API requests)
- Angular Material (for UI components)
- GitHub Pages (for deployment)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or higher)
- Angular CLI (v17)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/monstermario/Eliq-Drinks-App.git
   cd Eliq-Drinks-App
2. **Install dependencies:**

    ```bash
   npm install
3. **Run the application:**
    ```bash
   npm start
### Configuration
The app uses a config.json file to manage branding and UI elements. Here is an example of the config.json file:
    
    {
        "appName": "Eliq Drinks",
        "themeColor": "#ff4081",
    }
### Building the App
To build the app for production, run:
    
    ng build --prod

### API Documentation
API documentation can be found at [TheCocktailDB API](https://www.thecocktaildb.com/api.php).

### Design Decisions

1. Angular Material: Used for consistent and modern UI components.
2. HttpClient: Simplifies HTTP requests to the API.
3. Configurable UI: The config.json file allows for easy rebranding and customization without altering the core codebase.
4. Modular Architecture: Organized code into components and services for maintainability and scalability.

### Conclusion
This project demonstrates the use of Angular 17 to build a white-label drinks application with configurable UI elements. By following the instructions above, you can set up, run, and customize the app to fit various branding requirements.
