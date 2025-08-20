import { useEffect, useState } from 'react'
import http from '../../utils/http';
import { SectionLoader } from '../Loading';

type Props = {courseId: number; courseTitle: string; completedLessons: number; totalLessons: number;};

const DashboardUserProgress = () => {
  
  const [progresses, setProgresses] = useState<Props[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProgresses = async () => {
      setLoading(true);
      try {
        const res = await http.get<Props[]>('/api/user/course/progress');
        setProgresses(res.data);
      } catch (e) {
        console.error('Failed to fetch all Entries of course progress', e);
        setProgresses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProgresses();
  }, []);
  
  if (loading) return <SectionLoader label=' User Progress Loading...' />;
  if (progresses.length === 0) return <div>No progress yet</div>;


  return (
    <div>
      <div>
          {progresses.map((progress) => {
            const {completedLessons: completed, totalLessons: total, courseTitle} = progress;
            const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
            const percentLabel = loading ? "—" : `${percent}%`;
            const caption = loading ? "Loading…" : `${completed} of ${total} lessons completed`;
            const barWidth = loading ? '30%' : `${Math.min(percent, 100)}%`;
            const barClass = loading ? 'bg-primary/50 animate-pulse' : 'bg-primary';

            return (
              <div key={progress.courseId}>
                <div className='flex items-center justify-between'>
                  <h4>{courseTitle}</h4>
                  <span className='text-sm'>{percentLabel}</span>
                </div>

                <div className='w-full h-2 overflow-hidden rounded-full bg-primary/30'>
                  <div
                      role='progressbar'
                      aria-label = {`progress for ${courseTitle}`}
                      className={`h-2 ${barClass} rounded-full transition-all`}
                      style= {{ width:barWidth }}
                  >
                  </div>
                </div>
                  <p className='text-sm'>{caption}</p>
              </div>
            )    
          })}
      </div>
    </div>
  
  );
};

export default DashboardUserProgress