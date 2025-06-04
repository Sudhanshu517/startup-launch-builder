import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  sections: jsonb("sections").notNull().default('[]'),
  settings: jsonb("settings").notNull().default('{}'),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const sectionSchema = z.object({
  id: z.string(),
  type: z.enum(['hero', 'features', 'testimonials', 'cta', 'about', 'pricing']),
  content: z.record(z.any()),
  style: z.record(z.any()).optional(),
  order: z.number(),
});

export const pageSettingsSchema = z.object({
  primaryColor: z.string().default('#3B82F6'),
  fontFamily: z.string().default('Inter'),
  backgroundColor: z.string().default('#ffffff'),
  responsive: z.boolean().default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPageSchema = createInsertSchema(pages).pick({
  name: true,
  sections: true,
  settings: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Page = typeof pages.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
export type Section = z.infer<typeof sectionSchema>;
export type PageSettings = z.infer<typeof pageSettingsSchema>;
