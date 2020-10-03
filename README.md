# Cycling @ SG
A web app that recommends you routes or let you plan your own custom routes for your next cycling trip!



# Installation and configuration
### 1. Install node.js if you don't have it already
- Install node.js @ https://nodejs.org/en/

### 2. Install required packages for backend  
- Open a command prompt in `cycling-sg` directory  
- Run the command: `npm install`
- Run the command: `npm install @material-ui/core`
- Run the command: `npm install @material-ui/icons`
- Run the command: `npm install -S @react-google-maps/api`

### 3. Install required packages for frontend  
- Open a command prompt in `cycling-sg/client` directory  
- Run the command: `npm install`

### 4. Configure for local development  
- Go to `server/config/` directory  
- Copy and paste `prod.js`  
- Rename the copied file to `dev.js`  
- Replace `process.env.MONGODB_URI` in `dev.js` with the mongodb URI that is sent in the group chat  
- Save the file

### 5. Run backend server  
- Open a command prompt in `cycling-sg` directory  
- Run the command: `npm run backend`

### 6. Run frontend server  
- Open a 2nd command prompt in `cycling-sg` directory  
- Run the command: `npm run frontend`  
- Wait for a while, after it is done it should open a tab in your browser, which will be the web app

### 7. Access the web app  
- If the web app is not opened in the browser automatically, you can access the web app through http://localhost:3000  



# Test if the web app is working
### 1. Access the web app, you should see a list of items above `ADD TEST` button  

### 2. Click the `ADD TEST` button once, and refresh the tab after you have clicked on it  

### 3. If the number of rows has increased by one, this means the web app is working correctly  