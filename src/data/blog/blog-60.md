---
author: Manthan Ankolekar
pubDatetime: 2025-03-18T08:44:00Z
modDatetime: 
title: Building an AI-Powered Image Generator with Google's Gemini API
postSlug: building-an-ai-powered-image-generator-with-googles-gemini-api
featured: false
draft: false
tags:
  - Node.js
  - Google Gemini API
  - Express.js
ogImage: ""
description: "Learn how to build an AI-powered image generator using Node.js and Google's Gemini API. This guide covers API setup, image generation, and project structure."
---

## **Introduction**  

AI-powered image generation has taken creative applications to new heights, allowing users to generate stunning visuals from simple text prompts. In this blog, we will explore how I built a **Gemini Image Generator**, a Node.js application that leverages **Google’s Generative AI (Gemini API)** to create images based on user input.  

## **Project Overview**  

The **Gemini Image Generator** is a lightweight REST API that allows users to send text prompts and receive AI-generated images. It is built using **Node.js, Express, and Google’s Generative AI SDK**.  

### **Key Features:**

✅ Accepts user text prompts to generate images.  
✅ Uses **Google Gemini API** for AI-based image generation.  
✅ Saves generated images on the server.  
✅ REST API endpoints for easy integration with other applications.  

## **Tech Stack**  

The project is built with:  

- **Node.js** - Backend runtime.  
- **Express.js** - Lightweight web framework.  
- **Google Generative AI SDK** - AI-powered image generation.  
- **dotenv** - Environment variable management.  
- **cors** - Cross-origin support.  

## **Getting Started**  

### **1. Clone the Repository**

```sh
git clone https://github.com/manthanank/gemini-image-generator.git
cd gemini-image-generator
```

### **2. Install Dependencies**

```sh
npm install
```

### **3. Configure Environment Variables**

Create a `.env` file in the root directory and add:  

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

### **Generate an Image**

📌 **Endpoint:** `POST /api/image/generate`  
📌 **Request Body:**

```json
{
  "prompt": "a futuristic cityscape with neon lights"
}
```

📌 **Response:**

```json
{
  "message": "Image generated successfully",
  "imagePath": "temp/generated_image.png"
}
```  

## **Project Structure**  

```plaintext
gemini-image-generator/
├── controllers/       # Business logic
├── routes/            # API routes
├── services/          # Google Gemini AI logic
├── temp/              # Generated images
├── server.js          # Entry point
├── package.json       # Dependencies
└── .env               # Environment variables
```

## **Core Implementation**  

### **1. Setting Up the Express Server**

The `server.js` file initializes the app and listens for requests:

```js
const app = require("./app");
const { port } = require("./config/env");

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```

### **2. Handling Image Generation Requests**

The **imageController.js** file manages requests:

```js
const { generateImage } = require("../services/geminiService");

async function generateImageController(req, res) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const imagePath = await generateImage(prompt);
    res.status(200).json({ message: "Image generated successfully", imagePath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { generateImageController };
```

### **3. Integrating the Gemini API**

The `geminiService.js` file calls Google's AI API:

```js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");
const { geminiApiKey } = require("../config/env");

const genAI = new GoogleGenerativeAI(geminiApiKey);

async function generateImage(prompt) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp-image-generation",
    generationConfig: { responseModalities: ['Text', 'Image'] }
  });

  try {
    const response = await model.generateContent(prompt);
    for (const part of response.response.candidates[0].content.parts) {
      if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, 'base64');
        const filePath = path.join(__dirname, '../temp/generated_image.png');
        fs.writeFileSync(filePath, buffer);
        return filePath;
      }
    }
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image");
  }
}

module.exports = { generateImage };
```

---

## **Conclusion**  

By integrating **Google’s Gemini API** with **Node.js**, we’ve built an AI-powered **image generation API** that can transform text into creative visuals. This project can be expanded to support **image style selection, real-time previews, and cloud storage integration**.  

If you found this useful, ⭐ **star the repo** and feel free to contribute! 🚀  

👉 [GitHub Repository](https://github.com/manthanank/gemini-image-generator)  
