import React, { useState, useEffect, useRef, MouseEvent } from "react";
import { IDropdownProps } from "./dropdown.types";

const Dropdown = ({ children }: IDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick.bind);

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick.bind);
		};
	}, []);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div ref={dropdownRef}>
			<button onClick={toggleDropdown}>Toggle Dropdown</button>
			{isOpen && (
				<div className='dropdown-content'>
					{children}
				</div>
			)}
		</div>
	);
};

export default Dropdown;
