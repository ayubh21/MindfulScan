package main

import "regexp"

func removeUnicode(input string) string {
	// Define a regular expression to match Unicode characters
	unicodeRegex := regexp.MustCompile(`$tc(reg, "#string", "[^\s#-€!]", "")$`)

	// Replace Unicode characters with an empty string
	result := unicodeRegex.ReplaceAllString(input, "")

	return result
}
