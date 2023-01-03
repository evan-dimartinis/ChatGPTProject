from flask_restful import Resource
import requests
        
class History(Resource):
    def get(self):
        return {'data': 'Evan'}, 200

    def post(self):
        return {'data': 'Evan History'}, 200
    pass

    def send_gpt_request(self, period, wordcount, keywords):
        api_endpoint = "https://api.openai.com/v1/completions"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }
        data = {
            "model": "text-davinci-003",
            "prompt": self.buildout_prompt(period, wordcount, keywords),
            "max_tokens": 2048
        }
        response = requests.post(api_endpoint, headers=headers, json=data)
        return {}

    def buildout_prompt(self, period, wordcount, keywords):
        prompt = 'Write an article for me.'
        if wordcount is not None:
            prompt += f'I want the article to be {wordcount} words. '
        if period is not None:
            prompt += f'I want the article to be about an event from the years {period}. '
        if keywords is not None:
            prompt += f'I want the article to mention at least one of the following keywords: {keywords}. '
