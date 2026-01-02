import { Router } from "express";
import express from 'express'
import { storyController } from "./story.controller";

export const storyRouter: Router = express.Router()

storyRouter.get("/", storyController.getStories)
storyRouter.post("/", storyController.createStory)