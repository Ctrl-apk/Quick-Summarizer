// Hugging Face API token (replace with your token)
const apiKey = "YOUR_API_KEY"; // Replace with your actual Hugging Face API key

// Select HTML elements
const summarizeBtn = document.getElementById('summarizeBtn');
const textInput = document.getElementById('textInput');
const summaryOutput = document.getElementById('summaryOutput');

// Summarization function using Hugging Face API
async function getSummary(text) {
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: text }),
    });

    const data = await response.json();
    if (data && data[0] && data[0].summary_text) {
        return data[0].summary_text; // Return the summarized text
    } else {
        return "Sorry, we couldn't summarize this text.";
    }
}

// Event listener for the Summarize button
summarizeBtn.addEventListener('click', async () => {
    const text = textInput.value.trim();

    if (text === "") {
        summaryOutput.textContent = "Please enter some text to summarize.";
        return;
    }

    summaryOutput.textContent = "Summarizing...";
    
    try {
        const summary = await getSummary(text);
        summaryOutput.textContent = summary;
    } catch (error) {
        summaryOutput.textContent = "An error occurred. Please try again.";
    }
});
