# Getting Started

To run the app locally, create an account and a new project in Google Cloud and follow the steps to create google application credentials <a href="https://cloud.google.com/docs/authentication/application-default-credentials?hl=pt-br">here</a>, then put the JSON file with the credentials in the root directory. After that, create a ```.env``` file in the root directory with the following values:

- ```SECRET_KEY``` - Anything, but it is recommended to generate one with a safe method
- ```DATABASE_URL``` - The url of a PostgreSQL database with this structure: ```postgresql://{USERNAME}:{PASSWORD}@{HOST}/{NAME}```
- ```STORAGE_BUCKET_NAME``` - The name of the Google Cloud Storage
- ```GOOGLE_APPLICATION_CREDENTIALS``` - ```application_default_credentials.json```

Install all the api dependencies in the ```requirements.txt``` file and run the api with ```python main.py``` command, then go to the ```client``` directory with ```cd client``` command, after that, install the client dependencies with ```npm install``` command. To run the client, type ```npm start```