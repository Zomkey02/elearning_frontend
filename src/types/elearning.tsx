export type Course = {
  id: number;
  title: string;
  summary: string;
  description?: string;
  duration?: string;
  thumbnail?: string | null;
  lessons?: Lesson[];
  category?: 'investing-basics' | 'passive-investing-strategies' | 'personal-finance';
};

export type CourseFormValues = {
    title: string;
    slug: string;
    summary: string;
    thumbnail: FileList;
    description: string;
    duration: number;
    status: 'draft' | 'published';
    thumbnailUrl: string;
    category: 'investing-basics' | 'passive-investing-strategies' | 'personal-finance';
};

export type Lesson = {
    id: number;
    title: string;
    description: string;
    summary?: string;
    content?: string;
    thumbnail?: string | null;
    duration?: number;
    level?: 'beginner' | 'intermediate' | 'advanced';
    status?: 'draft' | 'published';
    layout_type?: 'standard' | 'video-focused' | 'image-left' | 'interactive';
}

export type LessonFormValues = {
    course_id: string
    title: string
    slug: string
    summary: string
    content: string
    thumbnail: FileList
    duration: number
    level: 'beginner' | 'intermediate' | 'advanced'
    status: 'draft' | 'published'
    layout_type: 'standard' | 'video-focused' | 'image-left' | 'interactive'
    thumbnailUrl?: string;
}

