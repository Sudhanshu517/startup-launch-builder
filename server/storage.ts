import { users, pages, type User, type InsertUser, type Page, type InsertPage } from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private pages: Map<number, Page>;
  private currentUserId: number;
  private currentPageId: number;

  constructor() {
    this.users = new Map();
    this.pages = new Map();
    this.currentUserId = 1;
    this.currentPageId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getPage(id: number): Promise<Page | undefined> {
    return this.pages.get(id);
  }

  async getPagesByUser(userId: number): Promise<Page[]> {
    return Array.from(this.pages.values()).filter(page => page.userId === userId);
  }

  async createPage(pageData: InsertPage & { userId: number }): Promise<Page> {
    const id = this.currentPageId++;
    const now = new Date().toISOString();
    const page: Page = {
      id,
      ...pageData,
      createdAt: now,
      updatedAt: now,
    };
    this.pages.set(id, page);
    return page;
  }

  async updatePage(id: number, updates: Partial<InsertPage>): Promise<Page | undefined> {
    const page = this.pages.get(id);
    if (!page) return undefined;

    const updatedPage: Page = {
      ...page,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.pages.set(id, updatedPage);
    return updatedPage;
  }

  async deletePage(id: number): Promise<boolean> {
    return this.pages.delete(id);
  }
}

export const storage = new MemStorage();
