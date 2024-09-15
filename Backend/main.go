package main

import (
	"fmt"
    "io"
	"net/http"
	"os"
	"path/filepath"
    "time"
)

const uploadPath = "./uploads"

// uploadHandler handles the file upload
func uploadHandler(response http.ResponseWriter, request *http.Request) {
    start := time.Now()
    var checkpoint time.Time

    if request.Method == http.MethodPost {
		file, _, err := request.FormFile("file")
		if err != nil {
			http.Error(response, "Unable to get file from form\n", http.StatusBadRequest)
			return
		}
		defer file.Close()

        // TODO: check for size constraints

		// Create the uploads directory if it doesn't exist
		if _, err := os.Stat(uploadPath); os.IsNotExist(err) {
			err := os.Mkdir(uploadPath, os.ModePerm)
			if err != nil {
				http.Error(response, "Unable to create upload directory\n", http.StatusInternalServerError)
				return
			}
		}

        // TODO: Only allow certain image formats
        

        // TODO: Hash images to prevent repeats
        
        
        // TODO: Compress files

		
        // Create a file in the uploads directory
		destFile, err := os.Create(filepath.Join(uploadPath, time.Now().String()))
		if err != nil {
			http.Error(response, "Unable to create file\n", http.StatusInternalServerError)
			return
		}
		defer destFile.Close()

        // TODO: Reformat images to webp for size

		// Copy the uploaded file to the destination file
		_, err = io.Copy(destFile, file)
		if err != nil {
			http.Error(response, "Unable to save file\n", http.StatusInternalServerError)
			return
		}

		fmt.Fprintf(response, "File successfully uploaded\n")
	} else {
		http.Error(response, "Invalid request method\n", http.StatusMethodNotAllowed)
	}

    checkpoint = time.Now()
    fmt.Printf("Saved to file in: %v\n", checkpoint.Sub(start))
}

func main() {
	http.HandleFunc("/upload", uploadHandler)
	fmt.Println("Server started at http://localhost:8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Println("Server failed:", err)
	}
}

