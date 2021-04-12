import React, { Component } from "react";

const Input = ({
	name,
	label,
	value,
	onChange,
	inputType,
	placeholder,
	error,
	required,
}) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				value={value}
				name={name}
				onChange={onChange}
				id={name}
				type={inputType ? inputType : "text"}
				className="form-control"
				required={required}
				placeholder={placeholder ? placeholder : ""}
			/>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default Input;
