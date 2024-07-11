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
        content: `In less than half a page, generate a summary text containing the comments sent to a student who is a member of a team of students assigned to a software development project. The comments submitted are classified into Strengths and Aspects to Develop. If there are no Strengths or Aspects to Develop, it will be indicated with "do not exist". In this summary, include relevant examples of student comments. In addition, generate an analysis and check for contradictions in the comments submitted on Strengths and Aspects to Develop. Deliver the result in the following format:
"
Summary of the comments:
Strengths:
<summary of strengths>.

Examples:
<examples of strengths>


Aspects to Develop:
<summary of aspects to develop>

Examples:
<examples of aspects to develop>


Analysis:
<analysis of strengths and aspects to develop>.
"

The following are the comments submitted by the students:
Strengths:
${strengths || 'Do not exist'}


Aspects to Develop:
${aspects_to_develop || 'Do not exist'}`,
      },
    ],
    temperature: 0.2,
    frequency_penalty: 1.5,
  });
  return response.choices[0].message.content.trim();
};
