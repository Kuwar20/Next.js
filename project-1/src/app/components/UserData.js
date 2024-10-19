// components/UserData.js
import React from 'react';

function fetchUserData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "John Doe", email: "john@example.com" });
    }, 4000); // Simulate a delay of 4 seconds
  });
}

const UserData = async () => {
  const data = await fetchUserData(); // Simulate fetching user data

  return (
    <div className="p-4 border">
      <h2>User Data</h2>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
    </div>
  );
};

export default UserData;
