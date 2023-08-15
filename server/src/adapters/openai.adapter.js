const { Configuration, OpenAIApi } = require("openai");
const config = require('../config/config');

class OpenAIAdapter {
  static async extractExperienceFields(experience, requiredFields) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY, // Set your OpenAI API key
    });

    const openai = new OpenAIApi(configuration);

    const messages = [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": experience}, // Use the provided experience text
    ];

    try {
      /*const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
      });

      const responseContent = completion.data.choices[0].message.content;
      */

      // Some mocked data for testing
      const responseContent = `{
        "name": "asasd",
        "last_name": "asdfxx",
        "date_of_birth": null,
        "education": [
            {
                "degree": "dsdsd",
                "institution": "asdad"
            },
            {
                "degree": "dsdsd",
                "institution": "asdad"
            }
        ],
        "work_experience": [],
        "hobbyes": null
    }`;

      // Parse the response JSON into two different objects
      const parsedResponse = JSON.parse(responseContent);
      
      const nullFields = [];
      const findNullFields = (obj, path = "") => {
        for (const key in obj) {
          if (obj[key] === null || (Array.isArray(obj[key]) && obj[key].length === 0)) {
            nullFields.push(path + key);
          } else if (typeof obj[key] === "object") {
            findNullFields(obj[key], path + key + ".");
          }
        }
      };
      findNullFields(parsedResponse);

      return {
        foundFields: parsedResponse,
        missingFields: nullFields,
      };
    } catch (error) {
      // Handle error
      console.error("Error calling OpenAI API:", error);
      throw error;
    }
  }
}

module.exports = OpenAIAdapter;
