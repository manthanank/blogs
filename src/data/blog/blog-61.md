---
author: Manthan Ankolekar
pubDatetime: 2025-03-19T08:44:00Z
modDatetime: 
title: Building an AI-Powered Image Editor with Google's Gemini API
postSlug: building-an-ai-powered-image-editor-with-googles-gemini-api
featured: false
draft: false
tags:
  - Node.js
  - Google Gemini API
  - Express.js
ogImage: ""
description: "Learn how to build an AI-powered image editor using Node.js and Google's Gemini API. This guide covers API setup, image editing, and project structure."
---

## **Introduction**  

AI is transforming image editing by allowing users to enhance and modify images based on text prompts. In this blog, we’ll explore how I built the **Gemini Image Editor**, a **Node.js** application that leverages **Google’s Gemini API** to edit images with AI.  

This project allows users to upload an image, describe modifications, and receive an AI-enhanced version.  

## **Project Overview**  

The **Gemini Image Editor** is a REST API that supports:  
✅ **Uploading images** and applying modifications.  
✅ **Google Gemini API integration** for AI-powered editing.  
✅ **Multer file upload handling**.  
✅ **Express.js backend** with easy-to-use API endpoints.  

## **Tech Stack**  

- **Node.js** - Backend runtime  
- **Express.js** - Web framework  
- **Google Generative AI SDK** - Image modification  
- **Multer** - File upload handling  
- **dotenv** - Environment variables  

## **Getting Started**  

### **1. Clone the Repository**

```sh
git clone https://github.com/manthanank/gemini-image-editor.git
cd gemini-image-editor
```

### **2. Install Dependencies**

```sh
npm install
```

### **3. Configure Environment Variables**

Create a `.env` file and add your **Google Gemini API key**:  

```env
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
```

### **4. Start the Server**

```sh
npm start
```

Your server will run at <http://localhost:5000> 🚀  

---

## **API Endpoints**  

### **Modify an Image**

📌 **Endpoint:** `POST /api/image/modify`  
📌 **Request Body:**

- `prompt` (string): Modification instructions
- `image` (file): The image to modify  

📌 **Response:**

```json
{
  "message": "Image modified successfully",
  "imagePath": "uploads/modified_1710342456.png"
}
```  

## **Project Structure**  

```plaintext
gemini-image-editor/
├── controllers/       # Business logic
├── middleware/        # Multer file upload
├── routes/            # API endpoints
├── services/          # Google Gemini AI logic
├── uploads/           # Stores images
├── server.js          # Entry point
├── package.json       # Dependencies
└── .env               # Environment variables
```

---

## **Core Implementation**  

### **1. Setting Up the Express Server**

The `server.js` file initializes the app and ensures the `uploads/` directory exists:  

```js
const app = require("./app");
const { port } = require("./config/env");
const fs = require("fs");

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

### **2. Handling Image Upload & Modification**

The `imageController.js` file manages requests:

```js
const { modifyImage } = require("../services/geminiService");

async function modifyImageController(req, res) {
  const { prompt } = req.body;
  const imageFile = req.file;

  if (!prompt || !imageFile) {
    return res.status(400).json({ error: "Prompt and image are required" });
  }

  try {
    const modifiedImagePath = await modifyImage(prompt, imageFile.path);
    res.status(200).json({ message: "Image modified successfully", imagePath: modifiedImagePath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { modifyImageController };
```

### **3. Multer Middleware for File Uploads**

The `uploadMiddleware.js` file sets up **Multer** to store images in `uploads/`:

```js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
```

### **4. Google Gemini API Integration**

The `geminiService.js` file connects to Gemini and modifies the image:

```js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const { geminiApiKey } = require("../config/env");

const genAI = new GoogleGenerativeAI(geminiApiKey);

async function modifyImage(prompt, imagePath) {
  const imageData = fs.readFileSync(imagePath);
  const base64Image = imageData.toString("base64");

  const contents = [
    { text: prompt },
    {
      inlineData: {
        mimeType: "image/png",
        data: base64Image,
      },
    },
  ];

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp-image-generation",
    generationConfig: {
      responseModalities: ["Text", "Image"],
    },
  });

  try {
    const response = await model.generateContent(contents);
    for (const part of response.response.candidates[0].content.parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        const outputPath = `uploads/modified_${Date.now()}.png`;
        fs.writeFileSync(outputPath, buffer);
        return outputPath;
      }
    }
  } catch (error) {
    console.error("Error modifying image:", error);
    throw new Error("Failed to modify image");
  }
}

module.exports = { modifyImage };
```

---

## **Conclusion**  

With **Node.js, Express, Multer, and Google Gemini API**, we’ve built an **AI-powered image editor** that allows users to **upload images, apply modifications using text prompts, and receive AI-enhanced versions**. 🚀  

🔹 **Potential Enhancements:**  
🔹 Add a **frontend UI** with **Angular** for an interactive user experience.  
🔹 Support **cloud storage** for better image management.  
🔹 Allow multiple **modifications in one request**.  

**👉 Ready to explore AI-powered image editing? Try the [GitHub Repository](https://github.com/manthanank/gemini-image-editor)!**  
