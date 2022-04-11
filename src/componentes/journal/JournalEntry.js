import React from "react";

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGNieo5B8YXFzL-OABfS6B1SdYWeqbnSYqng&usqp=CAU)",
        }}
      ></div>
      <div className="journal__entry-body">
        <p className="journal__entrey-title">Un nuevo día</p>
        <p className="journal__entry-content">lorem impumdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa dsa </p>
      </div>
      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>11</h4>
      </div>
    </div>
  );
};
