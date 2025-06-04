import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPageSchema, pageSettingsSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all pages (for demo purposes, we'll use user ID 1)
  app.get("/api/pages", async (req, res) => {
    try {
      const pages = await storage.getPagesByUser(1);
      res.json(pages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pages" });
    }
  });

  // Get a specific page
  app.get("/api/pages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const page = await storage.getPage(id);
      
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      
      res.json(page);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch page" });
    }
  });

  // Create a new page
  app.post("/api/pages", async (req, res) => {
    try {
      const pageData = insertPageSchema.parse(req.body);
      const page = await storage.createPage({
        ...pageData,
        userId: 1, // Demo user
      });
      res.status(201).json(page);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid page data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create page" });
    }
  });

  // Update a page
  app.put("/api/pages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertPageSchema.partial().parse(req.body);
      
      const page = await storage.updatePage(id, updates);
      
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      
      res.json(page);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid update data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update page" });
    }
  });

  // Delete a page
  app.delete("/api/pages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deletePage(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Page not found" });
      }
      
      res.json({ message: "Page deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete page" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
