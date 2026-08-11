import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class AppService {
  async generateStartupPitch(keyword: string): Promise<string> {
    if (!keyword) return "Please provide a keyword!";
    
    // Get the API key from environment variables (we will set this in Render)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return "API Key not found! Please set GEMINI_API_KEY.";

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Act as an overly enthusiastic tech startup founder in Silicon Valley. I will give you a keyword. You must pitch a ridiculous, over-the-top, but highly confident billion-dollar startup idea based on this keyword. Keep it to 3-4 sentences max. Include buzzwords like 'AI', 'Blockchain', or 'Synergy'. The keyword is: ${keyword}`;

    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      console.error(error);
      return "Whoops! Our servers are currently pivoting. Please try again.";
    }
  }
}
