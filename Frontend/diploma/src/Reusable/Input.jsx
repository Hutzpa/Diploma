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
	maxLength,
}) => {
	return (
		<div className="form-group">
			{label && <label htmlFor={name}>{label}</label>}
			<input
				value={value}
				name={name}
				onChange={onChange}
				id={name}
				type={inputType ? inputType : "text"}
				className="form-control"
				required={required}
				placeholder={placeholder ? placeholder : ""}
				maxLength={maxLength ? maxLength : ""}
			/>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default Input;
