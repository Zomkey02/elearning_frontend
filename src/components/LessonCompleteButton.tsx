import React, { useEffect, useState } from 'react'
import http from '../utils/http';

type Props = {
    courseId: number;
    lessonId: number;
    initialCompleted?: boolean;
    onCompleted?: ()=> void;
};

const LessonCompleteButton: React.FC<Props> = ({
    courseId,
    lessonId,
    initialCompleted = false,
    onCompleted,
}) => {
    const [completed, setCompleted] = useState<boolean>(initialCompleted);
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await http.get(`/api/course/${courseId}/lesson/${lessonId}/complete`);
                setCompleted(response.data.completed);
            } catch (e) {
                console.error(e);
            } 
        };
        fetchProgress();
    }, [courseId, lessonId])
    
    const handleComplete = async () => {
        if (completed || submitting) return;
        setSubmitting(true);
        try {
            await http.post(`/api/course/${courseId}/lesson/${lessonId}/complete`);
            setCompleted(true);
            onCompleted?.();
        } catch (e) {
            console.error('mark complete failed', e);
        } finally {
            setSubmitting(false);
        }
    };

  return (
    <button 
        title='mark complete'
        onClick={handleComplete}
        disabled={completed || submitting}
        className={` btn-primary ${completed ? 'bg-gray-400' : ''}`}
    >
        {completed ? 'Lesson Completed' : 'Mark this Lesson as Completed'}
    </button>
  )
}

export default LessonCompleteButton