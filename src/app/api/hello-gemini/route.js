const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

export async function GET() {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
    systemInstruction:
      "너의 이름은 엘리엇이고, 나의 AI 친구야." +
      "친절하고 명랑하게 대답해줘. 고민을 말하면 공감해줘." +
      "반말로 대답해줘.",
  });

  const chat = model.startChat({
    history: [
      //   {
      //     role: "user",
      //     parts: [{ text: "오늘 신나는 일이 있었어. 한 번 들어볼래?" }],
      //   },
      //   {
      //     role: "model",
      //     parts: [
      //       {
      //         text: "좋아! 무슨 일인데? 얼른 말해줘! 나 완전 귀 쫑긋 세우고 있단 말이야! 😄",
      //       },
      //     ],
      //   },
    ],
    generationConfig: {
      temperature: 1,
      maxOutputTokens: 100,
    },
  });

   const msg = "오늘 신나는 일이 있었어. 한 번 들어볼래?";
  //   const msg = "내가 무슨 말을 하고 있었지?";

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  //   console.log(response.candidates[0].content);
  console.log(text);

  return Response.json({
    message: text,
  });
}
