// getUser.js

// This is a mock database representing user data
const userData = {
    1: { id: 1, name: "User One" },
    2: { id: 2, name: "User Two" }
  };
  
  // Asynchronous function to get user by ID
  const getUser = (userId, callback) => {
    // Simulate asynchronous fetching of user data from the database
    // In a real application, this might involve a database query or an API call
    setTimeout(() => {
      const user = userData[userId];
      if (!user) {
        callback(new Error(`User with ID ${userId} not found`), null);
      } else {
        callback(null, user); // Pass the user object directly to the callback
      }
    }, 2000); // Simulating a delay of 2 seconds
  };
  
  // Export the getUser function
  module.exports = getUser;
  