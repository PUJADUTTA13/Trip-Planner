
const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const mongoose = require("mongoose");

const Trip = require("../models/Trip");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// 1. Generate AI Trip
router.post("/generate", async (req, res) => {
  try {
    const {
      destination,
      days,
      budget,
      travelers,
      travelStyle,
    } = req.body;

    if (!destination || !days || !budget || !travelers || !travelStyle) {
      return res.status(400).json({
        message: "Please provide all trip details.",
      });
    }

    const prompt = `
      Act as a professional travel planner.

      Create a detailed ${days}-day travel itinerary for:

      Destination: ${destination}
      Budget: ${budget}
      Number of Travelers: ${travelers}
      Travel Style: ${travelStyle}

      Requirements:
      1. Create a day-wise travel itinerary.
      2. Include places to visit each day.
      3. Suggest local food and activities.
      4. Include approximate daily expenses.
      5. Suggest practical travel tips.
      6. Keep recommendations suitable for the selected budget.
      7. Do not invent exact hotel availability or booking prices.

      Format the response with clear headings and bullet points.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    res.status(200).json({
      success: true,
      itinerary: response.text,
    });

  } catch (error) {
    console.error("Trip Generation Error:", error.message);

    res.status(500).json({
      message: "Unable to generate trip. Please try again.",
    });
  }
});


// 2. Save Generated Trip
router.post("/save", authMiddleware, async (req, res) => {
  try {
    const {
      destination,
      days,
      budget,
      travelers,
      travelStyle,
      itinerary,
    } = req.body;

    if (
      !destination ||
      !days ||
      !budget ||
      !travelers ||
      !travelStyle ||
      !itinerary
    ) {
      return res.status(400).json({
        message: "All trip details are required.",
      });
    }

    const trip = await Trip.create({
      userId: req.user.id,
      destination,
      days,
      budget,
      travelers,
      travelStyle,
      itinerary,
    });

    res.status(201).json({
      success: true,
      message: "Trip saved successfully!",
      trip,
    });

  } catch (error) {
    console.error("Save Trip Error:", error.message);

    res.status(500).json({
      message: "Unable to save trip.",
    });
  }
});


// 3. Get All Trips of Logged-in User
router.get("/my-trips", authMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      trips,
    });

  } catch (error) {
    console.error("Fetch Trips Error:", error.message);

    res.status(500).json({
      message: "Unable to fetch your trips.",
    });
  }
});


// 4. Get Single Trip
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid trip ID.",
      });
    }

    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found.",
      });
    }

    res.status(200).json({
      success: true,
      trip,
    });

  } catch (error) {
    console.error("Fetch Trip Error:", error.message);

    res.status(500).json({
      message: "Unable to fetch trip.",
    });
  }
});


// 5. Delete Saved Trip
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid trip ID.",
      });
    }

    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Trip deleted successfully!",
    });

  } catch (error) {
    console.error("Delete Trip Error:", error.message);

    res.status(500).json({
      message: "Unable to delete trip.",
    });
  }
});

module.exports = router;
