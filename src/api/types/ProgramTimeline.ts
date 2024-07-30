export const PROGRAM_TIMELINE_CATEGORY = {
  KIDS: 'KIDS',
  ADULTS: 'ADULTS'
} as const;

export type ProgramTimelineCategory =
  (typeof PROGRAM_TIMELINE_CATEGORY)[keyof typeof PROGRAM_TIMELINE_CATEGORY];

export type ProgramTimeline = {
  id: string;
  created_at: string;
  title: string;
  locations?: string[];
  time_start?: string;
  time_end?: string;
  note?: string;
  icon?: string;
  category: ProgramTimelineCategory;
};
