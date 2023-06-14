import { FormEvent, useState, useEffect, useRef } from "react";
import "./Reports.css";
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { PublicClientApplication } from '@azure/msal-browser';


const Reports: React.FC = () =>  {
	const [accessToken, setAccessToken] = useState<string | "">("");
	
	useEffect(() => {
		const fetchAccessToken = async () => {
		

		  const appId = 'f5cc3339-4a6f-4a8c-ab37-43d7ed8d45ad';
		  const tenantId = '74f2dfde-2e88-43a9-a501-ff6faa44578d';
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
			id: 'c035facd-ed07-4cad-b7b6-b5275e942483',
			embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=c035facd-ed07-4cad-b7b6-b5275e942483&groupId=955106fa-c6f3-436e-bed0-3b561c5fa7bb&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLUVBU1QtQS1QUklNQVJZLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
			accessToken: accessToken,    // Keep as empty string, null or undefined
			tokenType: models.TokenType.Aad
		}}
	/>)	
};
export default Reports;