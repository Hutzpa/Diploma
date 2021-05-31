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
	onSubmit,
	classNameInput,
	classNameLabel,
}) => {
	return (
		<div className="form-group">
			{label && (
				<label className={classNameLabel ? classNameLabel : ""} htmlFor={name}>
					{label}
				</label>
			)}
			<input
				value={value}
				name={name}
				onChange={onChange}
				id={name}
				type={inputType ? inputType : "text"}
				className={classNameInput ? classNameInput : "form-control"}
				required={required}
				placeholder={placeholder ? placeholder : ""}
				maxLength={maxLength ? maxLength : ""}
				onSubmit={onSubmit}
			/>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default Input;
