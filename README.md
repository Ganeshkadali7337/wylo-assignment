# React Post Management App

This is a simple React application for managing posts. Users can create, edit, and view posts. The application also features a dark and light mode toggle.

## Features

- Dark and light mode toggle only for the home page where posts are displayed.
- Display posts in a masonry layout.
- Create new posts with a title, description, and image.
- Edit existing posts with pre-filled data.
- Delete, change, or add images to posts.
- Persistent storage using local storage for all CRUD operations.

## Technologies Used

- React for creating user interface.
- CSS for styling.
- Cloudinary API for creating public URLs for uploaded images.
- React Icons for icons like edit, add post.

## Usage

- On the home screen, you will see a list of posts displayed in a masonry layout.
- Toggle between dark and light mode using the button at the top of the home page.
- To create a new post, click the "Add Post" button at the bottom of the screen.
- Fill in the post details and click "Add and Save Post".
- To edit a post, click the "Edit" icon on the post card. Make your changes and click "Update & Save Post".
- To delete the existing image from a post, click on "Delete Image" button.
- To change, or add an image to a post, click on "choose" file and select the image.

## Components

### PostsDisplay

- - The PostsDisplay component displays a list of posts in a masonry layout. Each post has an edit icon to navigate to the edit screen.

### CreateAndUpdatePost

- - The CreateAndUpdatePost component is used for both creating and editing posts. It handles form submission and updates local storage.

### PostCardItem

- - The PostCardItem Component is used for creating the card for each post contaioning title description image.

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
