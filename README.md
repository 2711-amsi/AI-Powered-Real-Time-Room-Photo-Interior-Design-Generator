# Interior Designer AI

## Project Structure
This project is an AI-powered furniture interior designing system that generates customized designs based on user input. It integrates Replicative API for generating designs, with a React.js front-end and a Node.js/Express.js backend. Users can upload images, take a quiz for design preferences, view 3D renders of furniture, and provide ratings for the designs.

### Folder Structure
- `frontend/` - Contains the React.js front-end code.
- `backend/` - Contains the Node.js/Express.js backend code.

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Visual Studio Code (VSCode)](https://code.visualstudio.com/)

## Setup and Deployment

### 1. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/siegblink/interior-designer-ai.git
```

### 2. Backend Setup
- Open your project folder in VSCode.
- Open the terminal and run the following commands:
```bash
cd backend
npm install
npm start
```

### 3. Frontend Setup
- Open another terminal and run the following commands:
```bash
cd frontend
npm install
npm start
```

### 4. Access the Application
Once both the frontend and backend are running, open your browser and go to:
```
http://localhost:5000
```

## Features
- **User Input Quiz**: Collects user preferences for generating furniture designs.
- **Image Upload**: Users can upload images for inspiration.
- **3D Rendering**: View generated furniture designs in 3D.
- **History**: View previously generated designs along with ratings.
- **Ratings**: Users can rate the designs generated by the AI.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI**: Replicative API for generating furniture designs

## License
This project is licensed under the [MIT License](LICENSE).
