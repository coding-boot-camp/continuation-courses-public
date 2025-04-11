import React from 'react';
import { Link } from 'react-router-dom';

// Renders the list of thoughts
const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }
  return (
    <div>
      <h3>{title}</h3>
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought.createdAt} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${thought.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {thought.username}'s thought on{" "}
                {new Date(parseInt(thought.createdAt)).toString()}
              </Link>{" "}
            </p>

            {/* add thought text */}
            {thought.thought && <p className="px-2 mt-2">{thought.thought}</p>}
            {/* add thought image */}
            {thought.image && (
              <p className="px-2">
                <img
                  className="mt-3 ml-4 thought-image"
                  src={thought.image}
                  alt="S3 bucket response"
                />
              </p>
            )}
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
