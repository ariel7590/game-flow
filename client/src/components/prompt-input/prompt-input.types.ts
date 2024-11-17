import { ChangeEvent } from "react";

export interface PromptInputProps {
    style?: string,
	handlePrompt: (event: ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
}
