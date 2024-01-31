import React from "react";

const InputLabel = ({ type, placeholder, label, handler }) => {
  return (
    <div className="contInput">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => {
          handler.handleChange(e.target.value);
        }}
        onBlur={handler.handleBlur}
        onFocus={handler.handleFocus}
        style={{border:handler.error != ""?"2px solid red":"2px solid #A1A1A1"}}
      />
      {handler.error != "" ? (
        <span className="conterrorInput">{handler.error}</span>
      ) : null}
    </div>
  );
};

/*

*/
export default InputLabel;
