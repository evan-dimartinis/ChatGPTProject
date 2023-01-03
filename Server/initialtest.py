import requests

newsapikey = 'b412eac3dead46d99a9d65e13e49bfa1'

# Set the API endpoint URL
api_endpoint = "https://api.openai.com/v1/completions"

# Set the prompt text
prompt = "Write a 300 word article about a random peer-reviewed study about sleep that was published in the last 10 years. Include a title for the article."

# Set the API key
api_key = "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"

# Set the headers
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {api_key}"
}

# Set the request body
data = {
    "model": "text-davinci-003",
    "prompt": prompt,
    "max_tokens": 2048
}

# Send the request and get the response
#response = requests.post(api_endpoint, headers=headers, json=data)
response = requests.get('http://127.0.0.1:5000/users')

# Print the response
print(response.json())