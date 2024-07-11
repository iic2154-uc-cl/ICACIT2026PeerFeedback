const { OpenAI } = require('openai');

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.ORGANIZATION_ID,
};
const openai = new OpenAI(configuration);

export const peerEvaluationSummarizationAndAnalysis = async (
  strengths, // student's concatenation of their strengths
  aspects_to_develop, // student's concatenation of their aspects to develop
  model // GPT model name
) => {
  const response = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: 'user',
        content: `Generate a summary text containing the comments sent to a student who is a member of a team of students assigned to a software development project. The comments sent are classified into Strengths and Aspects to Develop. In addition, generate me an analysis and check if there are contradictions in the comments sent on Strengths and Aspects to Develop:
Strengths:
${strengths}

Aspects to develop:
${aspects_to_develop}.`,
      },
    ],
    temperature: 0.5,
  });
  return response.choices[0].message.content.trim();
};
