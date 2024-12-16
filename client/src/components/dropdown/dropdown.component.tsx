import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { IDropdownProps } from "./dropdown.types";
import * as dropdownStyle from "./dropdown.tailwind";

const Dropdown = ({
	children,
	btnText,
	btnStyle,
	btnVariant,
}: IDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleOutsideClick = (event: Event) => {
			!dropdownRef.current?.contains(event.target as Node)
				? setIsOpen(false)
				: null;
		};

		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div ref={dropdownRef}>
			<Button
				className={`${dropdownStyle.btn} ${btnStyle}`}
				variant={btnVariant}
				onClick={toggleDropdown}
			>
				{btnText}
			</Button>
			{isOpen && (
				<div className={dropdownStyle.openDropdown}>
					{children}
				</div>
			)}
		</div>
	);
};

export default Dropdown;
