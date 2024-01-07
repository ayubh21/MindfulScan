package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	fmt.Println("starting backend")

	fakeData, err := loadFakeData()
	if err != nil {
		log.Fatal(err)
	}

	err = godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}

	apiKey := os.Getenv("CHATGPT_API_KEY")
	client := NewGptClient(apiKey)
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowHeaders:     "Origin, Content-Type, Accept, Content-Length, Accept-Language, Accept-Encoding, Connection, Access-Control-Allow-Origin",
		AllowOrigins:     "*",
		AllowCredentials: true,
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))

	app.Post("/api/prompt", func(c *fiber.Ctx) error {
		var payload PromptRequest

		if err := c.BodyParser(&payload); err != nil {
			fmt.Println(err)
			return err
		}

		fmt.Println("Sending prompt to ChatGPT:", payload.Prompt)
		resp, err := client.SendPrompt(c.Context(), payload.Prompt)
		if err != nil {
			fmt.Println(err)
			return err
		}

		if len(resp.Choices) == 0 {
			fmt.Println("Most likely out of balance")
			return fmt.Errorf("error sending request to chatgpt")
		}

		speechResponse := SpeechResponse{}
		err = json.Unmarshal([]byte(resp.Choices[0].Message.Content), &speechResponse)
		if err != nil {
			fmt.Println(err)
			return err
		}

		data := map[string]interface{}{
			"response": speechResponse,
		}

		return c.JSON(data)
	})

	app.Get("/api/fakedata", func(c *fiber.Ctx) error {
		pageStr := c.Query("page")
		if pageStr == "" {
			jsonString := `{"error": "no provided page number"}`
			return c.Status(400).JSON(jsonString)
		}

		i, err := strconv.Atoi(pageStr)
		if err != nil {
			jsonString := `{"error": "invalid page number"}`
			return c.Status(400).JSON(jsonString)
		}

		if i == 0 {
			jsonString := `{"error": "invalid page number"}`
			return c.Status(400).JSON(jsonString)
		}

		startIndex := (i - 1) * 200 // items per page
		endIndex := i * 200

		if endIndex > len(fakeData) {
			endIndex = len(fakeData)
		}

		validData := fakeData[startIndex:endIndex]

		return c.JSON(validData)
	})

	err = app.Listen(":25566")
	if err != nil {
		log.Fatal(err)
	}
}
