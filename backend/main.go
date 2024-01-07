package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

type PromptRequest struct {
	Prompt string `json:"prompt"`
}

func main() {
	fmt.Println("starting backend")

	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}

	apiKey := os.Getenv("CHATGPT_API_KEY")
	client := NewGptClient(apiKey)
	app := fiber.New()

	app.Post("/api/prompt", func(c *fiber.Ctx) error {
		var payload PromptRequest

		if err := c.BodyParser(&payload); err != nil {
			return err
		}

		resp, err := client.SendPrompt(c.Context(), payload.Prompt)
		if err != nil {
			return err
		}

		data := map[string]string{
			"response": resp.Choices[0].Message.Content,
		}

		return c.JSON(data)
	})

	app.Listen(":25566")
}
