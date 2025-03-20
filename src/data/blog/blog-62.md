---
author: Manthan Ankolekar
pubDatetime: 2025-03-20T08:44:00Z
modDatetime: 
title: Building an AI-Powered Image Studio App with Angular and Node.js 
postSlug: building-an-ai-powered-image-studio-app-with-angular-and-nodejs
featured: false
draft: false
tags:
  - Angular
  - Node.js
  - Google Gemini API
  - Express.js
ogImage: ""
description: "Learn how to build an AI-powered image studio app using Angular and Node.js. This guide covers API setup, image generation, and project structure."
---

## Introduction

AI-powered image generation and modification are revolutionizing the digital content landscape. With the advancements in AI, users can create unique images from text prompts or modify existing ones with ease. In this blog, we will explore how I built **AI Image Studio App**, a web application that leverages Google’s **Gemini AI** for image processing.  

## Features of AI Image Studio App

This application enables users to:  
✅ **Generate AI Images**: Create unique images using text prompts.  
✅ **Modify Existing Images**: Edit uploaded images through AI-powered modifications.  
✅ **Store Images in Cloudinary**: Securely save all generated and modified images.  
✅ **User-Friendly UI**: Built with **Angular 19** and **TailwindCSS** for a modern and responsive experience.  

## Tech Stack

🔹 **Frontend**: Angular 19, TailwindCSS, RxJS  
🔹 **Backend**: Node.js, Express.js, MongoDB, Cloudinary  
🔹 **AI Model**: Google **Gemini AI** for image generation and modification  

---

## Project Structure  

The project consists of **two main parts**:  

### 1️⃣ Frontend (Angular)

📌 Built with Angular 19, it provides a seamless UI for users to interact with the AI image tools.  
📌 Uses **RxJS** for reactive state management and **TailwindCSS** for styling.  
📌 Integrates with the backend API for sending text prompts and images for AI processing.  

### 2️⃣ Backend (Node.js + Express)

📌 Runs an **Express.js server** that handles API requests.  
📌 Uses **MongoDB** to store image metadata.  
📌 Integrates **Google Generative AI (Gemini)** to generate and modify images.  
📌 Stores images in **Cloudinary** for fast retrieval and sharing.  

---

## Setting Up the Project  

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/manthanank/ai-image-studio-app.git
cd ai-image-studio
```

### 2️⃣ Install Frontend Dependencies

```bash
npm install
```

### 3️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

### 4️⃣ Configure Environment Variables

Create a `.env` file in the backend directory and add the following:  

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

### 5️⃣ Run the Application

Start the **backend server**:  

```bash
cd backend
npm run dev
```

Start the **Angular frontend**:  

```bash
cd ..
npm start
```

Open <http://localhost:4200> in your browser 🎉  

---

## Key API Endpoints  

🚀 **POST** `/api/image/generate` → Generates an image from a text prompt.  
🚀 **POST** `/api/image/modify` → Modifies an uploaded image using AI.  
🚀 **GET** `/api/image/all` → Retrieves all stored images.  

---

## Deployment

The application is deployed using **Vercel**:  

- 🌍 **Frontend**: [AI Image Studio App](https://ai-image-studio-app-app.vercel.app)  
- 🔗 **Backend**: [AI Image Studio API](https://ai-image-studio-app-api.vercel.app)  

---

## Conclusion

AI Image Studio App is a powerful tool for **AI-driven image generation and editing**. Built with Angular and Node.js, it provides an intuitive user experience while leveraging the power of **Google Gemini AI**.  
