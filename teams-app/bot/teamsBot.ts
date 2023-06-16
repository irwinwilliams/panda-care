import {
  TeamsActivityHandler,
  CardFactory,
  TurnContext,
  AdaptiveCardInvokeValue,
  AdaptiveCardInvokeResponse,
  Activity,
  ConversationReference,
} from "botbuilder";
import rawWelcomeCard from "./adaptiveCards/welcome.json";
import rawLearnCard from "./adaptiveCards/learn.json";
import rawRegistrationCard from "./adaptiveCards/registration.json";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import getBotResponse from "./getBotResponse";

export interface DataInterface {
  likeCount: number;
}

export interface RegistrationDataInterface {
  parentName: string;
  email: string;
  phone: string;
  address: string;
  childName: string;
  dateOfBirth: string;
  medicalConditions: string;
  conversationReference: string;
}

export class TeamsBot extends TeamsActivityHandler {
  // record the likeCount
  likeCountObj: { likeCount: number };
  conversationReferences: { [key: string]: Partial<ConversationReference> };
  //let constructor accept conversationReferences
  constructor(conversationReferences: { [key: string]: Partial<ConversationReference> }) {

    super();
    this.conversationReferences = conversationReferences;
    this.likeCountObj = { likeCount: 0 };


    this.onMessage(async (context, next) => {
      console.log("Running with Message Activity.");
      //get adaptive card invoke value

      this.addConversationReference(context.activity);
      //console.log(conversationReferences);
      let txt = context.activity.text;
      const removedMentionText = TurnContext.removeRecipientMention(context.activity);
      if (removedMentionText) {
        // Remove the line break
        txt = removedMentionText.toLowerCase().replace(/\n|\r/g, "").trim();
      }

      if (context.activity.value && JSON.stringify(context.activity.value).indexOf("register") > -1) {
        txt = "register";
      }

      // Trigger command by IM text
      switch (txt) {
        case "welcome": {
          const card = AdaptiveCards.declareWithoutData(rawWelcomeCard).render();
          await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
          break;
        }
        case "learn": {
          this.likeCountObj.likeCount = 0;
          const card = AdaptiveCards.declare<DataInterface>(rawLearnCard).render(this.likeCountObj);
          await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
          break;
        }
        case "register": {
          const card = AdaptiveCards.declareWithoutData(rawRegistrationCard).render();
          await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
          break;
        }
        //add default case
        default: {
          //get the parent's email from the conversation reference
          var parentName = this.conversationReferences[context.activity.conversation.id].user.name;
          var parentList = await fetch("https://pandapandapanda.azurewebsites.net/api/PandaCareFamBam?code=u0uwuzjwQ9bSDoVdGlg9Z748y5A12qd7VLyag-2T--mhAzFuqIaqlw==", {
            method: "GET",
          });
          //parse the parent list to find the child based on the parent name
          var parentListJson = await parentList.json();
          //console.log(parentListJson);
          var childName = "";
          for (var i = 0; i < parentListJson.length; i++) {
            if (parentListJson[i].ParentName == parentName) {
              childName = parentListJson[i].ChildName[0];
              break;
            }
          }
          console.log(JSON.stringify({ messageText: txt, parentName: parentName, childName: childName }));
          
          //call the assistant web service.
          var botResponse = await getBotResponse("http://localhost:3080", { messageText: txt, parentName: parentName, childName: childName });
          //send the response back to the user as a plain text message
          //console.log(botResponse.data);
          await context.sendActivity(botResponse.data);
          break;
        }
        /**
         * case "yourCommand": {
         *   await context.sendActivity(`Add your response here!`);
         *   break;
         * }
         */
      }

      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      for (let cnt = 0; cnt < membersAdded.length; cnt++) {
        if (membersAdded[cnt].id) {
          const card = AdaptiveCards.declareWithoutData(rawWelcomeCard).render();
          await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
          break;
        }
      }
      await next();
    });
  }

  // Invoked when an action is taken on an Adaptive Card. The Adaptive Card sends an event to the Bot and this
  // method handles that event.
  async onAdaptiveCardInvoke(
    context: TurnContext,
    invokeValue: AdaptiveCardInvokeValue
  ): Promise<AdaptiveCardInvokeResponse> {
    console.log("Running with Adaptive Card Invoke Activity.");
    if (invokeValue.action.verb === "send-registration-form") {
      const card = AdaptiveCards.declareWithoutData(rawRegistrationCard).render();
      await context.sendActivity({ attachments: [CardFactory.adaptiveCard(card)] });
    }
    else if (invokeValue.action.verb === "register") {
      var payload = invokeValue.action.data as unknown as RegistrationDataInterface;
      payload.conversationReference = JSON.stringify(this.conversationReferences[context.activity.conversation.id]);
      console.log("Registration Data: ");
      console.log(JSON.stringify(payload));

      var url = "http://localhost:7072/api/PandaSave";
      //use fetch instead of axios
      const response = await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      //parse the respons
      const data = await response.text();
      console.log(data);
      //send the response back to the user
      await context.sendActivity(data);
      return { statusCode: 200, type: undefined, value: undefined };
    } else if (invokeValue.action.verb === "userlike") {
      this.likeCountObj.likeCount++;
      const card = AdaptiveCards.declare<DataInterface>(rawLearnCard).render(this.likeCountObj);
      await context.updateActivity({
        type: "message",
        id: context.activity.replyToId,
        attachments: [CardFactory.adaptiveCard(card)],
      });
      return { statusCode: 200, type: undefined, value: undefined };
    }
  }

  // add conversationReference to conversationReferences
  addConversationReference(activity:Activity)
  {
    const conversationReference = TurnContext.getConversationReference(activity);
    this.conversationReferences[conversationReference.conversation.id] = conversationReference;
  }
}
