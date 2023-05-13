import json
import requests

url = "http://35.230.78.123/api/message"

def lambda_handler(event, context):
    # TODO implement
    print(event)
    session_id = event["sessionId"]
    data = {
        "session_id": session_id,
        "message": event["inputTranscript"]
    }
    response = requests.post(url, json=data)
    print(response.text)
    resp_text = response.json()["message"]
    return {
        "sessionState": {
            "dialogAction": {
                "type": "ElicitIntent"
            },
            "intent": {
                "name": "FallbackIntent",
                "state": "Fulfilled"
            }
        },
        "messages": [
            {
                "contentType": "PlainText",
                "content": resp_text
            }
        ]
    }

if __name__ == "__main__":
    lambda_handler({"sessionId": "test",
                    "inputTranscript": "who are you?"
                    }, {})