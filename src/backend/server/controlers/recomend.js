const Groq = require('groq-sdk');
const env = require('../../../env');

const groq = new Groq({ apiKey: env.groqCloudApi });


function cleanString(input) {
    return input.replace(/[0-9*\/\\\.]/g, '').trim();
}

async function recomend(req, res) {

    bookmarks = req.body.bookmarks;
    likedGenres = req.body.likedGenres;

    try {
        const chatCompletion = await groq.chat.completions.create({
            "messages": [
                {
                    "role": "user",
                    "content": `Recommend 15 individual books (not entire series) they need to be similar to the following: [${bookmarks.join(', ')}]. You may include books by the same author as those on the list. The recommendations should strictly be in the genres of ${likedGenres.join(', ')}. Provide the response in the following format: Title - Author - Description.`
                }
            ],
            "model": "llama3-8b-8192",
            "temperature": 1,
            "max_tokens": 3040,
            "top_p": 1,
            "stream": false,
            "stop": null
        });

        const responseText = chatCompletion.choices[0].message.content.trim();

        const recommendedBooksArray = responseText.split('\n').map(book => {
            const match = book.match(/(.+?) - (.+?) - (.+)/);
            if (match) {
                return {
                    title: cleanString(match[1]).trim(),
                    author: match[2].trim(),
                    description: match[3].trim(),
                };
            }
            return null;
        });

        const filteredBooks = recommendedBooksArray.filter(book => book !== null);

        res.json({ recommendedBooks: filteredBooks });
    } catch (error) {
        console.error(`API Request failed: ${error.message}`);
        res.status(400).json({ msg: 'Error occurred' });
    }
}

module.exports = {
    recomend
};
