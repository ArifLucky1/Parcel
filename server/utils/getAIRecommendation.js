export async function getAIRecommendation(req, res, userPrompt, products){
    const API_KEY = process.env.GEMENI_API_KEY;
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`
}


