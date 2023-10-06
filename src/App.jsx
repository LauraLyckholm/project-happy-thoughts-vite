import { useState, useEffect } from "react";
import { Header } from "./Components/Header/Header";
import { PostThought } from "./Components/PostThought/PostThought";
import { ThoughtCard } from "./Components/Thoughts/ThoughtCard";
import "./app.css"

// Decalring a variable for the API-URL
const apiUrl = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";

export const App = () => {
  // Sets an empty array as a state for the state with name thoughts, and creates a setter-function for changing thoughts
  const [thoughts, setThoughts] = useState([]);

  const handleThoughtFetch = async () => {
    await fetch(apiUrl)
      .then((response) => {
        // If the response isn't ok, throw an error message
        if (!response.ok) {
          throw new Error("Response was not ok");
        } // Otherwise return the response as a JSON-object
        return response.json();
      })
      // Then set the thoughtsData as the value of the state thoughts
      .then((thoughtsData) => {

        setThoughts(thoughtsData);
      })
      // If something goes wrong, show an error in the console. 
      .catch((error) => {
        console.error("Error fetching thoughts", error);
      });
  }

  useEffect(() => {
    handleThoughtFetch();
  }, [])

  return (
    <section className="app-section-wrapper">
      <Header />
      <PostThought apiUrl={apiUrl} thoughts={thoughts} setThoughts={setThoughts} handleThoughtFetch={handleThoughtFetch} />
      {thoughts.length > 0 && (
        <ThoughtCard apiUrl={apiUrl} thoughts={thoughts} />
      )}
    </section >
  );
};
