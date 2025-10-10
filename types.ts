export interface MartialArt {
  name: string;
  image: string;
  color: string;
}

export interface Duration {
  label: string;
  value: string;
}

export interface CoursePlanDay {
  title: string;
  details: string[];
}

export interface CoursePlanResponse {
    plan: CoursePlanDay[];
}