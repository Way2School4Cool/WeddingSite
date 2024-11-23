function openNav() {
    document.getElementById("side-panel").style.width = "250px";
}

function closeNav() {
    document.getElementById("side-panel").style.width = "0";
}

// Function to handle form submission
function handleImageUploadForm(formId) {
    console.log('Form handler initialized');  // Debugging log to see if the function is called

    const imageURL = 'https://www.katyacaleb.com:8085/uploadimage';
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

function handleSongUploadForm(formId) {
    console.log('Song handler initialized');
    const songURL = 'https://www.katyacaleb.com:8085/uploadsong';
    const songForm = document.getElementById(formId);

    if (!songForm) {
        console.error('Form not found! Check the form ID.');
        return;
    }

    console.log('Form found:', songForm);

    songForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log('Form submission intercepted');

        const formData = new FormData(songForm);

        try {
            console.log('Sending song data to server...');
            const response = await fetch(songURL, {
                method: 'POST',
                body: formData
            });

            console.log('Response received:', response);

            if (response.status === 200) {
                const result = await response.text();
                alert(`Success: ${result}`);
            } else if (response.status === 400) {
                alert('Bad Request: ' + response.statusText);
            } else if (response.status === 500) {
                alert('Server Error: ' + response.statusText);
            } else {
                alert(`Unexpected response code: ${response.status}`);
            }
        } catch (error) {
            console.error('Error uploading song:', error);
            alert('An error occurred while uploading the song information.');
        }
    });
}

function handleRSVPUploadForm(formId) {
    console.log('RSVP handler initialized');
    const rsvpURL = 'https://www.katyacaleb.com:8085/uploadrsvp';
    const rsvpForm = document.getElementById(formId);

    if (!rsvpForm) {
        console.error('Form not found! Check the form ID.');
        return;
    }

    console.log('Form found:', rsvpForm);

    rsvpForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log('Form submission intercepted');

        const formData = new FormData(rsvpForm);

        try {
            console.log('Sending RSVP data to server...');
            const response = await fetch(rsvpURL, {
                method: 'POST',
                body: formData
            });

            console.log('Response received:', response);

            if (response.status === 200) {
                const result = await response.text();
                alert(`Success: ${result}`);
                rsvpForm.reset();
            } else if (response.status === 400) {
                alert('Bad Request: Please check that all fields are filled out correctly');
            } else if (response.status === 500) {
                alert('Server Error: ' + response.statusText);
            } else {
                alert(`Unexpected response code: ${response.status}`);
            }
        } catch (error) {
            console.error('Error submitting RSVP:', error);
            alert('An error occurred while submitting your RSVP. Please try again later.');
        }
    });
}

// Replace the direct function calls with a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize forms that exist on the page
    if (document.getElementById('image-upload-form')) {
        handleImageUploadForm('image-upload-form');
    }
    
    if (document.getElementById('song-upload-form')) {
        handleSongUploadForm('song-upload-form');
    }
    
    if (document.getElementById('rsvp-upload-form')) {
        handleRSVPUploadForm('rsvp-upload-form');
    }
});