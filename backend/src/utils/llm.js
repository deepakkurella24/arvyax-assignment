const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function analyzeText(text){

  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "user",
        content: `
        Return ONLY valid JSON.
        Do NOT include markdown.
        Do NOT include explanation.

        Format:

        {
        "emotion": "",
        "keywords": [],
        "summary": ""
        }

        Text: ${text}
        `
      }
    ]
  });

  let output = completion.choices[0].message.content;


  output = output.replace(/```json/g,"").replace(/```/g,"").trim();
  console.log(output);
  return JSON.parse(output);
}

module.exports = analyzeText;