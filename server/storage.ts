import { users, pages, type User, type InsertUser, type Page, type InsertPage } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getPage(id: number): Promise<Page | undefined>;
  getPagesByUser(userId: number): Promise<Page[]>;
  createPage(page: InsertPage & { userId: number }): Promise<Page>;
  updatePage(id: number, updates: Partial<InsertPage>): Promise<Page | undefined>;
  deletePage(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getPage(id: number): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.id, id));
    return page || undefined;
  }

  async getPagesByUser(userId: number): Promise<Page[]> {
    return await db.select().from(pages).where(eq(pages.userId, userId));
  }

  async createPage(pageData: InsertPage & { userId: number }): Promise<Page> {
    const now = new Date().toISOString();
    const [page] = await db
      .insert(pages)
      .values({
        ...pageData,
        createdAt: now,
        updatedAt: now,
      })
      .returning();
    return page;
  }

  async updatePage(id: number, updates: Partial<InsertPage>): Promise<Page | undefined> {
    const [page] = await db
      .update(pages)
      .set({
        ...updates,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(pages.id, id))
      .returning();
    return page || undefined;
  }

  async deletePage(id: number): Promise<boolean> {
    const result = await db.delete(pages).where(eq(pages.id, id));
    return (result.rowCount || 0) > 0;
  }
}

export const storage = new DatabaseStorage();
