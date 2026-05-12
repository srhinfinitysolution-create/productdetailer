export enum Platform {
  Shopify = 'Shopify',
  Amazon = 'Amazon',
  Etsy = 'Etsy',
  WooCommerce = 'WooCommerce',
  General = 'General Store'
}

export enum Tone {
  Professional = 'Professional',
  Friendly = 'Friendly',
  Luxury = 'Luxury',
  Persuasive = 'Persuasive',
  Minimal = 'Minimal'
}

export enum Length {
  Short = 'Short (50-100 words)',
  Medium = 'Medium (150-300 words)',
  Long = 'Long (300+ words)'
}

export interface ProductFormData {
  productName: string;
  category: string;
  features: string;
  targetAudience: string;
  platform: Platform;
  tone: Tone;
  keywords: string;
  length: Length;
}

export interface GeneratedResult {
  content: string;
  timestamp: Date;
}