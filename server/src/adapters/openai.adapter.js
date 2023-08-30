const { Configuration, OpenAIApi } = require("openai");
const config = require('../config/config');

const extractExperiencePrompt = {
  systemMsg: `Perform the following tasks:

  Convert the text into a structured JSON format. Ensure that the JSON includes all the following keys, even if their values are null:
  
  1. Name
  2. Birth Date
  3. Location
  4. Phone
  5. Email
  6. Links
  7. Objective
  8. Education
  9. work_experience
  10. courses_and_awards
  11. Technical Skills
  12. Soft Skills
  13. Languages
  14. Volunteer Experience
  15. Papers Published
  16. Authored Works
  17. Personal Projects
  18. Academic Projects
  19. Professional Membership
  20. Hobbies
  21. References (on request)
  Extract as much relevant information from the provided text to populate the values for these keys. If specific information is not available in the text, set the value for that key to null. 
  
  Ensure the following structures for these keys:
  
  Education: Each entry should have Degree, Major, Year, University, GPA, and details (an array of additional details).
  work_experience: Each entry should have position, company, year, and details (an array of job-related tasks or achievements).
  Volunteer Experience: Each entry should have Organisation, Role, and Date.
  
  Return the structured JSON, as the output.`,
}

class OpenAIAdapter {
  static async extractExperienceFields(experience, requiredFields) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY, // Set your OpenAI API key
    });

    const openai = new OpenAIApi(configuration);

    const messages = [
      { "role": "system", "content": extractExperiencePrompt.systemMsg },
      { "role": "user", "content": experience },
    ];

    try {

      let responseContent
      if (process.env.OPENAI_API_KEY != "mock") {
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages,
        });

        responseContent = completion.data.choices[0].message.content;
      }else{
        responseContent = `{\n  \"Name\": \"ALÓN LIWSKY\",\n  \"Birth Date\": null,\n  \"Location\": \"Israel\",\n  \"Phone\": \"+972 54-863-8328\",\n  \"Email\": \"alsaliwsky@gmail.com\",\n  \"Links\": \"/linkedin.com/in/alon-liwsky\",\n  \"Objective\": \"Find challenges for my career, continue learning new technologies and acquire impactful experiences as a software engineer.\",\n  \"Education\": [\n    {\n      \"Degree\": \"BS COMPUTER SCIENCE AND SOFTWARE DEVELOPMENT\",\n      \"Major\": null,\n      \"Year\": \"2016 – 2020\",\n      \"University\": \"Universidad del Aconcagua\",\n      \"GPA\": null,\n      \"details\": [\n        \"Thesis “Concurrency in Go”\",\n        \"First place at UDA Soft 2017\",\n        \"Scholarship for the best grades\"\n      ]\n    },\n    {\n      \"Degree\": \"ASSOCIATE'S DEGREE IN HUMANITIES AND SOCIAL SCIENCES\",\n      \"Major\": null,\n      \"Year\": \"2013 – 2015\",\n      \"University\": \"CUC, Central University High School “Don José de San Martin”\",\n      \"GPA\": null,\n      \"details\": [\n        \"Active participation in the student's center taking different charges\",\n        \"Delegate of the course in 2014 y 2015\"\n      ]\n    }\n  ],\n  \"work_experience\": [\n    {\n      \"position\": \"Sr BackEnd Engineer\",\n      \"company\": \"Ardan Labs\",\n      \"year\": \"2021 - 2022\",\n      \"details\": [\n        \"Worked on Bread Financial\",\n        \"Rewrote the Disclosures service to comply with legal and product requirements, improve performance and scalability\",\n        \"Designed and implemented the API versioning system for gRPC, HTTP, and Message brokers, allowing for backward compatibility and easy adoption of new versions across the company.\",\n        \"Collaborated with cross-functional teams, including product managers, designers, and front-end developers, to deliver high-quality products that met the needs of clients and users.\"\n      ]\n    },\n    {\n      \"position\": \"SSr BackEnd Engineer\",\n      \"company\": \"Mercado Libre\",\n      \"year\": \"2019 - 2021\",\n      \"details\": [\n        \"Build and maintain the investment systems with over 15 millions accounts.\",\n        \"Design and implement scalable and efficient solutions for new investment methods.\",\n        \"Experiences in data storage design, system architecture, performance, concurrency, onboarding new team-members.\",\n        \"Worked with Golang, MySQL, message systems, DynamoDB, Docker, New Relic, DataDog, Nginx.\"\n      ]\n    },\n    {\n      \"position\": \"Developer\",\n      \"company\": \"Freelance\",\n      \"year\": \"2016 - 2019\",\n      \"details\": [\n        \"Web development projects with technologies as Cordova, API REST, jQuery, PHP, SQL...\"\n      ]\n    },\n    {\n      \"position\": \"Computer Science professor\",\n      \"company\": \"UNCuyo-PAMI\",\n      \"year\": \"April 2019 - December 2019\",\n      \"details\": [\n        \"Computer workshops for seniors\"\n      ]\n    }\n  ],\n  \"courses_and_awards\": [\n    {\n      \"course\": \"JAVA and BACK-END development course\",\n      \"year\": null,\n      \"institution\": \"National Technology University\",\n      \"duration\": \"1 month\",\n      \"details\": \"Taught in National Technology University in cooperation with Everis company with 1 month of duration (135 classroom hours)\"\n    },\n    {\n      \"course\": \"Best grade point average award\",\n      \"year\": \"2018-2019\",\n      \"institution\": null,\n      \"duration\": null,\n      \"details\": \"100% scholarship for the obtained grades during 2018-2019.\"\n    },\n    {\n      \"course\": \"Pedagogy and leadership courses\",\n      \"year\": null,\n      \"institution\": null,\n      \"duration\": null,\n      \"details\": \"During my years in Hejalutz Lamerjav I have received and given a handful of pedagogy and leadership courses\"\n    },\n    {\n      \"course\": \"1st place at UDASoft 2017\",\n      \"year\": null,\n      \"institution\": null,\n      \"duration\": null,\n      \"details\": \"For the Project “Disc and processor politics simulator”\"\n    }\n  ],\n  \"Technical Skills\": [\n    \"Golang\",\n    \"MySQL\",\n    \"Docker\",\n    \"Kubernetes\",\n    \"gRPC\",\n    \"Message brokers\",\n    \"Cloud computing\"\n  ],\n  \"Soft Skills\": null,\n  \"Languages\": null,\n  \"Volunteer Experience\": [\n    {\n      \"Organisation\": \"Tnua Noar Hejalutz Lamerjav\",\n      \"Role\": \"Diverse Leadership Roles\",\n      \"Date\": \"2015 - 2020\"\n    }\n  ],\n  \"Papers Published\": null,\n  \"Authored Works\": null,\n  \"Personal Projects\": null,\n  \"Academic Projects\": null,\n  \"Professional Membership\": null,\n  \"Hobbies\": [\n    \"Philosophy\",\n    \"Education\",\n    \"Sports (martial arts, basketball, climbing)\",\n    \"Travel\",\n    \"Physics, mathematics, A.I. and all the nerd stuff\"\n  ],\n  \"References (on request)\": null\n}`
      }

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
