import { render, screen, waitFor } from '@testing-library/react';
import DashboardUserProgress from '../dashboard/DashboardUserProgress';
import http from '../../utils/http';
import { vi, describe, it, expect } from 'vitest';

vi.mock('../../utils/http', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('DashboardUserProgress', () => {
    const mockData = [
        { courseId: 1, courseTitle: 'Investing 101', completedLessons: 3, totalLessons: 4 },
        { courseId: 2, courseTitle: 'Saving Basics', completedLessons: 0, totalLessons: 3 },
    ];

    it('shows loading Spinner when data is being loaded', async () => {
        (http.get as any).mockReturnValue(new Promise(() => {}));
        render(<DashboardUserProgress />)
        expect(screen.getByText(/User Progress Loading/i)).toBeInTheDocument();
    });

    it('shows "No progress yet" when there is no data', async () => {
        (http.get as any).mockResolvedValue({ data: [] });
        render(<DashboardUserProgress />);
        await waitFor(() => expect(screen.getByText(/No progress yet/i)).toBeInTheDocument());
    });

    it('shows Progressbar and labels correctly', async () => {
        (http.get as any).mockResolvedValue({ data: mockData });
        render(<DashboardUserProgress />);

        for (const course of mockData) {
        await waitFor(() => expect(screen.getByText(course.courseTitle)).toBeInTheDocument());
        const percent = course.totalLessons > 0
            ? Math.round((course.completedLessons / course.totalLessons) * 100)
            : 0;
        expect(screen.getByText(`${percent}%`)).toBeInTheDocument();
        expect(screen.getByText(`${course.completedLessons} of ${course.totalLessons} lessons completed`)).toBeInTheDocument();
        expect(screen.getByRole('progressbar', { name: `progress for ${course.courseTitle}` })).toBeInTheDocument();
        }
    });

    it('shows when backend has an error', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        (http.get as any).mockRejectedValue(new Error('Network error'));
        render(<DashboardUserProgress />);
        await waitFor(() => expect(screen.getByText(/No progress yet/i)).toBeInTheDocument());
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Failed to fetch all Entries of course progress'), expect.any(Error));
        consoleSpy.mockRestore();
    });

})

