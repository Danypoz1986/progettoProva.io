import React from 'react';

function SightseeingInfo({ data, city }) {
  if (!data || !data.results || data.results.length === 0) {
    return (
      <div className="card mt-4 p-3">
        <h2>No sightseeing information available for {city}.</h2>
      </div>
    );
  }

  return (
    <div className="card mt-4 p-3">
      <h2>Sightseeing in {city}</h2>
      {data.results.map((place, index) => (
        <p key={index}>
          <strong>{place.name}</strong><br />
          {place.formatted_address}
        </p>
      ))}
    </div>
  );
}

export default SightseeingInfo;
