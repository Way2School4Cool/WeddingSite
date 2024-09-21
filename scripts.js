function openNav() {
    document.getElementById("side-panel").style.width = "250px";
}

function closeNav() {
    document.getElementById("side-panel").style.width = "0";
}

// Function to handle form submission
function handleImageUploadForm(formId) {
    console.log('Form handler initialized');  // Debugging log to see if the function is called

    const imageURL = 'http://192.168.50.10:8085/uploadimage';
    const imageForm = document.getElementById(formId);

    if (!imageForm) {
        console.error('Form not found! Check the form ID.');
        return;
    }

    console.log('Form found:', imageForm);

    imageForm.addEventListener('submit', async (event) => {
        event.preventDefault();  // Prevent the default form submission behavior
        console.log('Form submission intercepted');

        const formData = new FormData(imageForm);

        try {
            console.log('Sending image to server...');
            // Send the image file using fetch
            const response = await fetch(imageURL, {
                method: 'POST',
                body: formData
            });

            console.log('Response received:', response);

            // Handle different response codes
            if (response.status === 200) {
                const result = await response.text();  // Get response text
                alert(`Success: ${result}`);
            } else if (response.status === 400) {
                alert('Bad Request: ' + response.statusText);
            } else if (response.status === 500) {
                alert('Server Error: ' + response.statusText);
            } else {
                alert(`Unexpected response code: ${response.status}`);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error uploading image:', error);
            alert('An error occurred while uploading the image.');
        }
    });
}

// Call the function and pass the form ID
handleImageUploadForm('image-upload-form');
