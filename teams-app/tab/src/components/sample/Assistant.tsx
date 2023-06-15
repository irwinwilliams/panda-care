import { FormEvent, useState } from "react";
import { useEffect } from "react";
import "./Assistant.css";
import axios, { AxiosResponse } from "axios";

const serverUrl = "https://pandacaresvr.azurewebsites.net";
export default function Assistant() {

	useEffect(() => {
		const chatbotForm = document.querySelector("#chatbot-form") as HTMLFormElement;
		const chatbotInput = document.querySelector("#chatbot-input") as HTMLInputElement;
		const chatbotBody = document.querySelector("#chatbot-body") as HTMLDivElement;

		chatbotForm?.addEventListener("submit", (e) => {
			e.preventDefault();
			const message = chatbotInput.value.trim();
			if (message === "") return;

			// Add user chat
			addChatMessageAndScrollToBottom("user-message", message);
			chatbotInput.value = "";

			// Add bot response
			try {
				console.log(message);
				const msg = { data: message };
				getBotResponse(msg)
					.then((botResponse) => {
						addChatMessageAndScrollToBottom("bot-message", botResponse.data);
					})
					.catch((err) => {
						addChatMessageAndScrollToBottom(
							"bot-message",
							"Sorry, an error occurred. Please try again"
						);
						console.log(err);
					});
			} catch (err) {
				addChatMessageAndScrollToBottom(
					"bot-message",
					"Sorry, an error occurred. Please try again"
				);
				console.log(err);
			}
		});


		function getBotResponse(msg: { data: string }): Promise<AxiosResponse> {
			return axios.post(`${serverUrl}/botresponse`, msg)
			  .then((res) => {
				console.log(res);
				return res;
			  })
			  .catch((err) => {
				console.log(err);
				throw err;
			  });
		  }
		
		  function addChatMessageAndScrollToBottom(className: string, text: string) {
			const isScrolledToBottom =
			  chatbotBody.scrollHeight - chatbotBody.clientHeight <=
			  chatbotBody.scrollTop + 1;
		
			const messageContainer = document.createElement("div");
			messageContainer.classList.add("chat-message", className);
		
			const messageText = document.createElement("p");
			messageText.innerText = text;
		
			messageContainer.appendChild(messageText);
			chatbotBody.appendChild(messageContainer);
		
			if (isScrolledToBottom)
			  chatbotBody.scrollTop =
				chatbotBody.scrollHeight - chatbotBody.clientHeight;
		  }
	}, []);

	return (
		<div className="welcome page">
			<div className="chatbot-container">
				<div className="chatbot-header">
					<h1>Daycare Assistant</h1>
				</div>
				<div className="chatbot-body" id="chatbot-body">
					<div className="chat-message bot-message">
						<p>
							🐼 Hi, you can ask me questions about any child enrolled in Panda Care Daycare. 🐼
						</p>
					</div>
				</div>
				<div className="chatbot-footer">
					<form id="chatbot-form">
						<input
							type="text"
							id="chatbot-input"
							placeholder="Type your message..."
						/>
						<button id="chatbot-submit" type="submit">Send</button>
					</form>
				</div>
			</div>
		</div>
	);
}
