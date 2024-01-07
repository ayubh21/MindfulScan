package main

import (
	"encoding/csv"
	"fmt"
	"math/rand"
	"os"
	"strings"

	"github.com/brianvoe/gofakeit/v6"
	"github.com/google/uuid"
	"github.com/pcpratheesh/go-censorword"
)

var detector = gocensorword.NewDetector(
	gocensorword.WithCensorReplaceChar("*"),
)

type FakeData struct {
	Id              string `json:"id"`
	Tweet           string `json:"tweet"`
	UncensoredTweet string `json:"tweet_uncensored"`
	Name            string `json:"name"`
	ProfilePic      string `json:"profile_pic"`
}

func NewFakeData(tweet string) FakeData {
	cleanTweet := removeUnicode(tweet)
	wordsToReplace := []string{
		"&#128064;",
		"&#128565;",
		"&#128588;",
		"&#9995;",
		"&#128553;",
		"&#8221;",
		"&#128175;",
		"&#128514;",
		"\\\"",
		"&#8220;",
	}

	var formattedTweet string = cleanTweet
	for _, word := range wordsToReplace {
		formattedTweet = strings.Replace(formattedTweet, word, "", -1)
	}

	filterString, err := detector.CensorWord(formattedTweet)
	if err != nil {
		fmt.Println(err)
	}

	return FakeData{
		Id:              uuid.NewString(),
		Tweet:           filterString,
		UncensoredTweet: formattedTweet,
		Name:            gofakeit.Name(),
		ProfilePic:      "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png",
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
