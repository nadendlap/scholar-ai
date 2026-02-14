export type Subject = 'Mathematics' | 'Science' | 'History' | 'English' | 'Technology' | 'Arts' | 'Language';
export type CourseLevel = 'Standard' | 'Honors' | 'AP';

export interface Course {
  id: string;
  name: string;
  code: string;
  subject: Subject;
  level: CourseLevel;
  color: string;
  icon: string;
  mastery: number;
  units: Unit[];
}

export interface Unit {
  id: string;
  title: string;
  mastery: number;
  completed: boolean;
}

export interface Exam {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  date: string;
  weight: number;
  importance: 'High' | 'Medium' | 'Low';
}

export interface Reminder {
  id: string;
  targetId: string;
  targetName: string;
  message: string;
  time: string;
  type: 'course' | 'exam';
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  category: 'Milestone' | 'Academic' | 'Social';
}

export interface LessonContent {
  eli5: {
    introduction: string;
    analogies: { title: string; explanation: string; icon: string }[];
    keyPoints: string[];
  };
  examReady: {
    definition: string;
    technicalTerms: string[];
    examTips: string;
    commonMistakes: string;
  };
  examples: {
    title: string;
    steps: string[];
    answer: string;
  }[];
}

export interface RelatedMaterial {
  title: string;
  icon: string;
  description: string;
}

export interface Question {
  id: string;
  question: string;
  options: { [key: string]: string };
  correctAnswer: string;
  explanationELI5: string;
  explanationExamReady: string;
  misconceptions: { [key: string]: string };
  relatedMaterials: RelatedMaterial[];
  tags: string[];
}

export interface UserStats {
  xp: number;
  streak: number;
  level: number;
  completedLessons: number;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}