export default async function handler(req, res) {
    // 1. Setup CORS so your GitHub Pages site can securely talk to this API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight browser requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt } = req.body;

        // 2. Contact Groq securely using the environment variable hidden on Vercel
        const groqResponse = await fetch("https://api.groq.com/api/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await groqResponse.json();
        const reply = data.choices[0].message.content;

        // Send the safe response back to your website
        return res.status(200).json({ reply });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
