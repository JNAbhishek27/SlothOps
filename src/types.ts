export type ActiveTab = 'chat' | 'fridge' | 'files' | 'snooze' | 'devpost' | 'opensource';

export interface ChatSummaryResult {
  twoLineSummary: string;
  actionItemsForUser: string[];
  dramaOrAlerts: string | null;
  lazyCannedReplies: string[];
  estimatedMinutesSaved: number;
  mentalEnergySpared: string;
  modelUsed: string;
}

export interface GroceryItem {
  item: string;
  category: string;
  priority: 'Essential' | 'High' | 'Medium' | 'Nice to have';
}

export interface RecipeResult {
  recipeTitle: string;
  prepTime: string;
  cookTime: string;
  dishesUsed: string;
  steps: string[];
  lazyTip: string;
  missingGroceries: GroceryItem[];
  effortLevel?: string;
  ingredientsAnalyzed?: string;
}

export interface CleanFolder {
  name: string;
  purpose: string;
  files: {
    original: string;
    suggested: string;
    action: string;
  }[];
}

export interface FileTidyResult {
  summary: string;
  folders: CleanFolder[];
  junkCandidates: {
    original: string;
    reason: string;
    action: string;
  }[];
  bashScript: string;
  powershellScript: string;
}

export interface SleepStoryResult {
  title: string;
  narrative: string;
  breathingPacer: {
    label: string;
    seconds: number;
  }[];
  recommendedSoundscape: string;
  slothWisdom: string;
}

export interface ModelEngineOption {
  id: string;
  name: string;
  type: 'Open-Weight' | 'Tabular Foundation' | 'Local Browser' | 'Server Fallback';
  provider: string;
  description: string;
  offlineCapable: boolean;
  privacyRating: string;
}
