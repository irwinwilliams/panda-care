# Process Environment Variable

Set OPENAI_API_KEY to your Open API Key

Terminal: export OPENAI_API_KEY={key}

Verify set: echo $OPENAI_API_KEY <br>
Key should be displayed <br>

The server needs the above in order to successfully make requests to Open AI

# Server

To run:

1. node server.js
   OR
2. npm start

# Configuaration

Note: Copy config-template.js and paste into a new file called config.js. Place your environment specific configs in the config.js file. Save the file. This is needed to get the app to run.