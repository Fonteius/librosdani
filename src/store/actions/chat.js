import * as actionTypes from './actionTypes';

export const addChat = (chat) => {
	return {
		type: actionTypes.ADD_CHAT,
		chatData: chat,
	};
};

export const addChatStart = () => {
	return {
		type: actionTypes.ADD_CHAT_START,
	};
};

export const addChatSuccess = (id, chat) => {
	return {
		type: actionTypes.ADD_CHAT_SUCCESS,
		chatId: id,
		chatData: chat,
	};
};

export const addChatFail = (error) => {
	return {
		type: actionTypes.ADD_CHAT_FAIL,
		error: error,
	};
};
