package main

import (
	"context"
	"fmt"

	"github.com/sashabaranov/go-openai"
)

const SystemPropmt = `
Determine if the following message contains hate speech or offensive language. We understand that
there is hate speech if it has statements of an intense and irrational nature of rejection, enmity and abhorrence against an individual or against a group, being the targets of these expressions for possessing a protected characteristic. The protected characteristics that we consider are: 
• women: women or feminist movement
• lgbti: against gays, lesbians, trans-sexuals and other gender identities
• racism: immigrants, xenophobia, against aboriginal peoples • class: low-income people or class reasons.

Answer one or more of the characteristics separated by a comma, or "nothing" if there is no hate speech. Think step by step before answering.
`

type GptClient struct {
	*openai.Client
}

func NewGptClient(apiKey string) *GptClient {
	c := openai.NewClient(apiKey)
	return &GptClient{c}
}

func (gpt *GptClient) SendPrompt(ctx context.Context, prompt string) (*openai.ChatCompletionResponse, error) {
	resp, err := gpt.Client.CreateChatCompletion(
		ctx,
		openai.ChatCompletionRequest{
			Model: openai.GPT4,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleSystem,
					Content: SystemPropmt,
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: prompt,
				},
			},
		},
	)

	if err != nil {
		return nil, fmt.Errorf("failed to send prompt to chatgpt: %v", err)
	}

	return &resp, nil
}
