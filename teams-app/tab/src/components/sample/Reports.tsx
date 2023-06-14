import { FormEvent, useState, useEffect, useRef } from "react";
import "./Reports.css";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { PublicClientApplication } from '@azure/msal-browser';


const Reports: React.FC = () =>  {
	const [accessToken, setAccessToken] = useState<string | "">("");
	
	useEffect(() => {
	const fetchAccessToken = async () => {
		
		const appId = '04684327-4cd5-4499-b5f3-613e57cf4d96';
		const tenantId = '7af15061-17ce-4b49-a4de-bfae9376602e';
		const authority = `https://login.microsoftonline.com/${tenantId}`;
		const scopes = ['https://analysis.windows.net/powerbi/api/Dashboard.Read.All'];
		  

		const msalConfig = {
			auth: {
			  clientId: appId,
			  authority: authority,
			  redirectUri: window.location.origin,
			},
		};
	
		const msalInstance = new PublicClientApplication(msalConfig);
	
		try {
			const response = await msalInstance.loginPopup({

			scopes: scopes,
		});
	
		if (response && response.accessToken) {
			setAccessToken(response.accessToken);
			console.log(response.accessToken);
		}
		} catch (error) {
			// Handle token acquisition failure
			console.error('Failed to acquire access token:', error);
		  }
		};
	
		fetchAccessToken();
	  }, []);
	  
	return (<PowerBIEmbed
		embedConfig = {{
			type: 'report',   // Supported types: report, dashboard, tile, visual, qna and paginated report
			id: '37854ffb-688c-4aef-8a28-d3e2fb824479',
			embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=37854ffb-688c-4aef-8a28-d3e2fb824479&groupId=6d6de5cc-1b3a-40eb-9f64-a8ccc70fc5e9&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLUVBU1QtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
			accessToken: accessToken,    // Keep as empty string, null or undefined
			tokenType: models.TokenType.Aad
		}}
	/>)	
};
export default Reports;