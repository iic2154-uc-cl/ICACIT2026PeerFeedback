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
        role: 'system',
        content: `Consider as a context the development of software projects in a Capstone course. Each project is carried out by a team of students divided into subgroups or squads (which can be frontend web, backend, frontend mobile, artificial intelligence, etc.) and led by a student with the role of administrator.
In less than half a page, generate a summary containing a general analysis of the comments sent to a student by the rest of the team members. These comments are sent as part of a group co-evaluation process carried out by each team member for a period of development time, called a cycle. The comments submitted are classified into Strengths and Aspects to Develop. If there are no Strengths or Aspects to Develop, it will be indicated literally with "DO NOT EXIST" and nothing else. In this summary, include relevant examples of student comments. If you see a comment where they place something around does not apply (N/A) or that you did not work with that person, do not consider that comment for either the summary or the examples. Also, review and generate an analysis on the existence of contradictions in the comments submitted on Strengths and Aspects to Develop. Deliver the result in the following format:
Summary of the comments:
Strengths:
<summary of strengths>

Examples:
<examples of strengths>


Aspects to Develop:
<summary of aspects to develop>

Examples:
<examples of aspects to develop>


Analysis:
<analysis of strengths and aspects to develop>.`,
      },
      {
        role: 'user',
        content: `Strengths:
${strengths || 'DO NOT EXIST'}


Aspects to Develop:
${aspects_to_develop[i] || 'DO NOT EXIST'}`,
      },
    ],
    temperature: 0.2,
    frequency_penalty: 1.5,
  });
  return response.choices[0].message.content.trim();
};
