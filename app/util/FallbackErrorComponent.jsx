// components/FallbackErrorComponent.js
import React from 'react';

const FallbackErrorComponent = ({ error }) => (
  <div>
    <h1>Oops! Something went wrong.</h1>
    <p>{error.message}</p>
  </div>
);

export default FallbackErrorComponent;