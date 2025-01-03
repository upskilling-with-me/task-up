import { Button } from "@mui/material";

export type Theme = "light" | "dark";

interface HeaderProps {
	theme: Theme;
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export const Header = ({ theme, setTheme }: HeaderProps) => {
	const handleThemeChange = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<div className="header">
			<h1>Task Us</h1>
			<Button
				type="button"
				variant="outlined"
				color="inherit"
				onClick={handleThemeChange}
			>
				{theme}
			</Button>
		</div>
	);
};
