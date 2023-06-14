// Import required packages
import * as restify from "restify";
import cors from 'cors';

// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
import {
  CloudAdapter,
  ConfigurationServiceClientCredentialFactory,
  ConversationReference,
  createBotFrameworkAuthenticationFromConfiguration,
  TurnContext,
} from "botbuilder";

import {
  CardFactory,
  AdaptiveCardInvokeValue,
  AdaptiveCardInvokeResponse,
  Activity,
} from "botbuilder";
import rawUpdateCard from "./adaptiveCards/realtime-update.json";
import rawURegistrationCard from "./adaptiveCards/registration.json";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";


// This bot's main dialog.
import { TeamsBot } from "./teamsBot";
import config from "./config";

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about adapters.
const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
  MicrosoftAppId: config.botId,
  MicrosoftAppPassword: config.botPassword,
  MicrosoftAppType: "MultiTenant",
});

const botFrameworkAuthentication = createBotFrameworkAuthenticationFromConfiguration(
  null,
  credentialsFactory
);

const adapter = new CloudAdapter(botFrameworkAuthentication);

// Catch-all for errors.
const onTurnErrorHandler = async (context: TurnContext, error: Error) => {
  // This check writes out errors to console log .vs. app insights.
  // NOTE: In production environment, you should consider logging this to Azure
  //       application insights.
  console.error(`\n [onTurnError] unhandled error: ${error}`);

  // Send a trace activity, which will be displayed in Bot Framework Emulator
  await context.sendTraceActivity(
    "OnTurnError Trace",
    `${error}`,
    "https://www.botframework.com/schemas/error",
    "TurnError"
  );

  // Send a message to the user
  await context.sendActivity(`The bot encountered unhandled error:\n ${error.message}`);
  await context.sendActivity("To continue to run this bot, please fix the bot source code.");
};

// Set the onTurnError for the singleton CloudAdapter.
adapter.onTurnError = onTurnErrorHandler;

// Create the bot that will handle incoming messages.
const conversationReferences: { [key: string]: Partial<ConversationReference> } = {};
const bot = new TeamsBot(conversationReferences);

// Create HTTP server.
const server = restify.createServer();

server.use(restify.plugins.bodyParser());

server.use(cors({'origins': ['*']}));


server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log(`\nBot Started, ${server.name} listening to ${server.url}`);
});

// Listen for incoming requests.
server.post("/api/messages", async (req, res) => {
  await adapter.process(req, res, async (context) => {
    await bot.run(context);
  });
});

//listen for notifications about registration and send back a card confirming registration
server.post("/api/registration", async (req, res) => {
  console.log("registration");
  //extract realtimedata from request body
  var registrationData = JSON.parse(req.body);
  console.log(registrationData);
  //const card = AdaptiveCards.declare<RegistrationDataInterface>(rawURegistrationCard).render(registrationData);

});


export interface RealtimeUpdateDataInterface {
  childName: string;
  timeOfDay: string;
  updateType: string;
  comments: string; 
  parentName: string;
  conversationReference: any;
}

// Listen for incoming notifications and send proactive messages to users.
server.post("/api/notify", async (req, res) => {
  console.log("notify");

  //extract realtimedata from request body
  var realtimeUpdateData = JSON.parse(req.body);
  realtimeUpdateData.conversationReference = JSON.parse(realtimeUpdateData.conversationReference);

  //{"childName":"Mel","timeOfDay":"10:00 am","updateType":"Nutrition","comments":"Ate all fruits and vegetables","parentName":"Jimmy"}
  console.log(realtimeUpdateData);
  await adapter.continueConversationAsync(config.botId, realtimeUpdateData.conversationReference, async (context) => {
        const card = AdaptiveCards.declare<RealtimeUpdateDataInterface>(rawUpdateCard).render(realtimeUpdateData);
        await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
  });


  // for (const conversationReference of Object.values(conversationReferences)) {
  //   await adapter.continueConversationAsync(config.botId, conversationReference, async (context) => {
  //         const card = AdaptiveCards.declare<RealtimeUpdateDataInterface>(rawUpdateCard).render(realtimeUpdateData);
  //         await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
  //   });
  // }

  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.write("<html><body><h1>Proactive messages have been sent.</h1></body></html>");
  res.end();
});
