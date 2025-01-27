export interface Character {
  name: string;
  role: string;
  style: string;
  context: string;
  expertise: string[];
  behavior: Behavior;
  key_phrases: string[];
  social_profile: SocialProfile;
}

export interface Behavior {
  response_tone: string;
  interaction_focus: string[];
  quirks: string[];
}

export interface SocialProfile {
  posting_style: string;
  topics: string[];
  post_types: string[];
  engagement_strategy: EngagementStrategy;
  posting_schedule: string;
}

export interface EngagementStrategy {
  audience_focus: string[];
  tone: string;
  response_behavior: string[];
}
