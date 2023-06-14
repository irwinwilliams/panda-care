import { FormEvent, useState } from "react";
import axios from "axios";

import "./Assistant.css";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client'
export default function Assistant() {

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
