Below is a step-by-step tutorial you can give to a student or use yourself.

# Step-by-Step Tutorial: Use Gemini Canvas to Create a Polaroid Web App

## 1. Open Gemini Canvas

Go to **Gemini** and open **Canvas**.

Gemini Canvas is designed to help users create web apps, games, documents, and interactive prototypes from natural-language prompts. Google describes Canvas as a workspace where you can turn ideas into apps and web pages quickly. ([Gemini][1])

## 2. Start a New Canvas Project

Click something like:

**New Canvas**
or
**Create with Canvas**

The exact button name may change, but the goal is to start a new blank Canvas project.

## 3. Prepare Your Reference Image

Because the app design should be inspired by your Polaroid camera reference image, upload the image into Gemini.

You can say:

> I will upload a reference image. Please use it only as visual inspiration for the camera design.

Then upload the image.

## 4. Paste the English Prompt

Copy and paste this prompt into Gemini Canvas:

```text
Please create a web-based Polaroid camera app.

In the center of the webpage, display a Polaroid-style instant camera. The camera design should be inspired by the reference image I provide.

The app should be able to access the user’s webcam directly. When the user clicks the camera/shutter button, it should take a photo using the webcam.

After the photo is taken, generate a Polaroid-style instant photo on the page. The photo should have a white border, a thicker white bottom border, rounded corners, and a soft shadow, similar to a real Polaroid/Instax photo.

The photo should appear with a slow “printing out” animation, like an instant camera gradually ejecting and developing the photo.

Users should be able to freely drag the generated photo around the blank area of the webpage. They should be able to move it up, down, left, and right.

The photo should have the color tone and texture of an Instax-style instant photo, including a slightly soft contrast, warm tones, subtle film grain, and a nostalgic instant-film look.

Please make the webpage clean, playful, and visually appealing. Use HTML, CSS, and JavaScript. The final result should work as a single-page web app.
```

## 5. Ask Gemini to Generate the First Version

After pasting the prompt, click **Submit**, **Generate**, or press **Enter**.

Gemini Canvas should generate a web app with code and a live preview. Canvas-style tools commonly show the generated HTML/CSS/JavaScript and a preview side by side, so you can test the app immediately. ([WOWHOW][2])

## 6. Test the Web App

In the preview area, test these features one by one:

1. Does the camera design appear in the center?
2. Does the browser ask for webcam permission?
3. Does the webcam video appear?
4. Does the shutter button take a photo?
5. Does the photo look like a Polaroid/Instax photo?
6. Does the photo print out slowly?
7. Can you drag the photo around the blank area?

When the browser asks for camera permission, choose **Allow**.

## 7. Fix Common Problems with Follow-Up Prompts

Gemini may not get everything right the first time. Use short follow-up prompts to improve the app.

### If the webcam does not work

Paste this:

```text
The webcam is not working correctly. Please fix the JavaScript using navigator.mediaDevices.getUserMedia. Add proper error handling and show a friendly message if the user denies camera permission.
```

### If the photo does not look like Instax

Paste this:

```text
Please improve the generated photo style. Make it look more like an Instax instant photo: warmer color tone, softer contrast, slight fade, subtle film grain, white border, thicker bottom border, and realistic shadow.
```

### If the printing animation is missing

Paste this:

```text
Please add a slow instant-camera printing animation. After the user takes a photo, the photo should gradually slide out from the camera and fade in as if it is developing.
```

### If dragging does not work

Paste this:

```text
Please make every generated photo draggable with mouse and touch support. Users should be able to drag photos freely anywhere on the page.
```

### If the layout is not beautiful

Paste this:

```text
Please improve the UI design. Make the page clean, playful, and modern. Put the Polaroid camera in the center, leave enough blank space around it for photos, and make the camera visually similar to the reference image.
```

## 8. Ask Gemini to Combine Everything into One File

When the app works, ask Gemini:

```text
Please combine the final version into a single HTML file with embedded CSS and JavaScript, so I can save it as index.html and run it directly in a browser.
```

This is useful because the student can later copy the code into a normal project folder.

## 9. Save and Run Locally

Create a file named:

```text
index.html
```

Paste the final code from Gemini into the file.

Then open it in Chrome.

Important: webcam access may not always work properly when opening a file directly as `file://`. If that happens, run it through a local server.

For example, if Python is installed, open the project folder in a terminal and run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## 10. Final Quality Checklist

Before calling the project finished, check:

| Feature                                 | Done? |
| --------------------------------------- | ----- |
| Polaroid-style camera appears in center | ☐     |
| Reference image style is reflected      | ☐     |
| Webcam permission works                 | ☐     |
| User can take a photo                   | ☐     |
| Photo has white Polaroid border         | ☐     |
| Photo has thicker bottom border         | ☐     |
| Photo has Instax-style color tone       | ☐     |
| Photo has film grain/texture            | ☐     |
| Photo prints out slowly                 | ☐     |
| Photo can be dragged freely             | ☐     |
| Works on desktop browser                | ☐     |
| Layout is clean and attractive          | ☐     |

## 11. Suggested Final Improvement Prompt

After the app works, paste this final polishing prompt:

```text
Please review the entire app and polish it like a finished student project. Improve code organization, comments, UI details, responsive layout, accessibility labels, camera permission error messages, and the realism of the Polaroid photo effect. Keep everything in a single-page HTML/CSS/JavaScript web app.
```

This should help Gemini Canvas produce a cleaner final version.

[1]: https://gemini.google/overview/canvas/?utm_source=chatgpt.com "Gemini Canvas — write, code, & create in one space with AI"
[2]: https://wowhow.cloud/blogs/how-to-use-gemini-canvas-build-apps-without-coding?utm_source=chatgpt.com "How to Use Gemini Canvas to Build Full Apps Without Coding"
