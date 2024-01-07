package main

import (
	"encoding/csv"
	"math/rand"
	"os"
	"strings"

	"github.com/brianvoe/gofakeit/v6"
	"github.com/google/uuid"
)

type FakeData struct {
	Id         string `json:"id"`
	Tweet      string `json:"tweet"`
	Name       string `json:"name"`
	ProfilePic string `json:"profile_pic"`
}

func NewFakeData(tweet string) FakeData {
	formattedTweet := strings.Replace(tweet, "&#128514;", "", -1)
	finalTweet := strings.Replace(formattedTweet, "\\\"", "", -1)
	fTweet := strings.Replace(finalTweet, "&#8220;", "", -1)
	return FakeData{
		Id:         uuid.NewString(),
		Tweet:      fTweet,
		Name:       gofakeit.Name(),
		ProfilePic: "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png",
	}
}

func readCsvFile(filePath string) ([][]string, error) {
	f, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	csvReader := csv.NewReader(f)
	records, err := csvReader.ReadAll()
	if err != nil {
		return nil, err
	}

	return records, nil
}

func loadFakeData() ([]FakeData, error) {
	var fakeTweets []FakeData
	records, err := readCsvFile("./dataset.csv")
	if err != nil {
		return nil, err
	}

	for _, row := range records {
		tweet := row[6]
		t := NewFakeData(tweet)
		fakeTweets = append(fakeTweets, t)
	}

	rand.Shuffle(len(fakeTweets), func(i, j int) { fakeTweets[i], fakeTweets[j] = fakeTweets[j], fakeTweets[i] })

	return fakeTweets, nil
}
