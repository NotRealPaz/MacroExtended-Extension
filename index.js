import { getContext } from "../../../extensions.js";
import {
	MacroCategory,
	MacroValueType,
	macros,
} from "../../../macros/macro-system.js";

function getLastMessages() {
	const chat = getContext().chat;
	const result = { last: "", lastUser: "", lastChar: "" };

	if (!Array.isArray(chat) || chat.length === 0) return result;

	for (let i = chat.length - 1; i >= 0; i--) {
		const message = chat[i];

		// Skip swipe-in-progress messages
		if (message.swipes && message.swipe_id >= message.swipes.length) {
			continue;
		}

		const text = message.mes ?? "";

		// If we haven't recorded the overall last message yet, set it.
		if (!result.last) result.last = text;

		// Record last user message (non-system) if applicable.
		if (message.is_user && !message.is_system && !result.lastUser) {
			result.lastUser = text;
		}

		// Record last character message (non-user, non-system) if applicable.
		if (!message.is_user && !message.is_system && !result.lastChar) {
			result.lastChar = text;
		}

		// Stop early if we've found all three.
		if (result.last && result.lastUser && result.lastChar) break;
	}

	return result;
}

macros.registry.registerMacro("isLastMessageFromUser", {
	category: MacroCategory.CHAT,
	description: "Returns true if the last message is from the user.",
	returns: "Whether the last message is coming from user.",
	returnType: MacroValueType.BOOLEAN,
	handler: () => {
		const { last, lastUser } = getLastMessages();
		return last === lastUser;
	},
});

macros.registry.registerMacro("isLastMessageFromChar", {
	category: MacroCategory.CHAT,
	description: "Returns true if the last message is from the character.",
	returns: "Whether the last message is coming from character.",
	returnType: MacroValueType.BOOLEAN,
	handler: () => {
		const { last, lastChar } = getLastMessages();
		return last === lastChar;
	},
});
