export async function getAIRecommendation(req, res, userPrompt, products){
    const API_KEY = process.env.GEMENI_API_KEY;
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`

    try{
        const gemeniPrompt = `
            Here is a list of available products:
            ${JSON.stringify(products, null, 2)}

            Based on the following user request, fillter and suggest the best matching products:
            "${userPrompt}"

            Only return the matching products in JSON formate.
        `;

        const response = await fetch(URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                contents: [{parts: [{text: gemeniPrompt}] }]
            })
        })

        const data = await response.json();

        const aiResponseText = data?.candidates?.[0]?.content?.parts?.text?.trim() || ""

        const cleanedText = aiResponseText.replace(/```json|```/g, ``).trim()

        if(!cleanedText){
            return res.status(500).json({
                success: false,
                message: "AI response is empty or invalid."
            });
        }

        
    } catch{

    }


}


