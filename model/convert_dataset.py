import pandas as pd
import json
import math

df = pd.read_csv('./small_dataset_1.csv')

for _, row in df.iterrows():
    tweet = row['tweet']
    count = int(row['count'])
    hateSpeechCount = int(row['hate_speech'])
    offensiveLanguageCount = int(row['offensive_language'])
    neitherCount = int(row['neither'])
    biggestCount = max([hateSpeechCount, offensiveLanguageCount, neitherCount])
    biggestCountPercentage = (biggestCount / count) * 100

    counts = [
        {"name": "hate", "count": count},
        {"name": "offensive", "count": offensiveLanguageCount},
        {"name": "neither", "count": neitherCount},
    ]

    mostCountdDict = {}
    for c in counts:
        if c['count'] == biggestCount:
            mostCountdDict = c
            mostCountdDict['tweet'] = tweet
            mostCountdDict['percentage'] = f"{biggestCountPercentage}%"
            break

    try:
        name = mostCountdDict["name"]
        formattedPercentage = math.floor(biggestCountPercentage)
        gptData = {
            "messages": [
                { "role": "system", "content": "Determine if the following message contains hate speech.The protected characteristics that we consider are: women: women or feminist movement, lgbti: against gays, lesbians, trans-sexuals and other gender identities, racism: immigrants, xenophobia, against aboriginal peoples, class: low-income people or class reasons."},
                { "role": "user", "content": tweet},
                { "role": "assistant", "content": f"this tweet has a {formattedPercentage}% of being {name}"}
            ]
        }

        with open("converted_data.jsonl", 'a') as f:
            f.write(json.dumps(gptData) + '\n')
        
    except Exception as err:
        print(f"error: {err}")

print("Done looping")