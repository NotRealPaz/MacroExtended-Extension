import { getContext } from "../../../extensions.js";
import {
  MacroCategory,
  MacroValueType,
  macros,
} from "../../../macros/macro-system.js";

const context = getContext();

const findLastMessage = (filter = null) => {
  const chat = context.chat;

  if (!Array.isArray(chat) || chat.length === 0) return "";

  for (let i = chat.length - 1; i >= 0; i--) {
    const message = chat[i];

    // Skip swipe-in-progress messages
    if (message.swipes && message.swipe_id >= message.swipes.length) {
      continue;
    }

    if (!filter || filter(message)) {
      return message.mes;
    }
  }

  return null;
};

macros.registry.registerMacro("isLastMessageFromUser", {
  category: MacroCategory.CHAT,
  description: "Returns true if the last message is from the user.",
  returns: "Whether the last message is coming from user.",
  returnType: MacroValueType.BOOLEAN,
  handler: () => {
    const last = findLastMessage();
    const lastUser = findLastMessage(
      (message) => message.is_user && !message.is_system,
    );

    return last === lastUser;
  },
});

macros.registry.registerMacro("isLastMessageFromChar", {
  category: MacroCategory.CHAT,
  description: "Returns true if the last message is from the character.",
  returns: "Whether the last message is coming from character.",
  returnType: MacroValueType.BOOLEAN,
  handler: () => {
    const last = findLastMessage();
    const lastChar = findLastMessage(
      (message) => !message.is_user && !message.is_system,
    );

    return last === lastChar;
  },
});
