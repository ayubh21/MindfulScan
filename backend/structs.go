package main

type PromptRequest struct {
	Prompt string `json:"prompt"`
}

type FakeDataRequest struct {
	Page int `json:"page"`
}
