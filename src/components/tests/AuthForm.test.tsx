import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthForm from '../AuthForm';
import { vi, describe, it, test, expect } from 'vitest';

// mock http-client
vi.mock('../../utils/http', () => ({
    default: {
        get: vi.fn().mockResolvedValue({}),
        post: vi.fn().mockRejectedValue({
        response: { data: { errors: { email: ['Email is already taken'] } } },
        }),
    },
}));

describe('AuthForm', () => {
    const onSuccess = vi.fn(); // the mock-function

    it('renders all fields', () => {
        render(
        <AuthForm
            legend="Sign Up"
            buttonText="Sign Up"
            endpoint="/api/register"
            onSuccess={onSuccess}
            includeUsername
            includePasswordConfirmation
        />
        );

        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    });

    test('shows validation errors on empty submit', async () => {
        render(
        <AuthForm
            legend="Sign Up"
            buttonText="Sign Up"
            endpoint="/api/register"
            onSuccess={onSuccess}
            includeUsername
            includePasswordConfirmation
        />
        );

        const submitButton = screen.getByRole('button', { name: /Sign Up/i });
        await userEvent.click(submitButton);

        await waitFor(() => {
        expect(screen.getByText('Username is required')).toBeInTheDocument();
        expect(screen.getByText('Email is required')).toBeInTheDocument();
        expect(screen.getByText('Password is required')).toBeInTheDocument();
        expect(screen.getByText('Please confirm your password')).toBeInTheDocument();
        });
    });

    test('shows error when email is already taken', async () => {
        render(
        <AuthForm
            legend="Sign Up"
            buttonText="Sign Up"
            endpoint="/api/register"
            onSuccess={onSuccess}
            includeUsername
            includePasswordConfirmation
        />
        );

        await userEvent.type(screen.getByLabelText(/Username/i), 'testuser');
        await userEvent.type(screen.getByLabelText(/Email/i), 'test@example.com');
        await userEvent.type(screen.getByLabelText(/^Password$/i), 'Password1!');
        await userEvent.type(screen.getByLabelText(/Confirm Password/i), 'Password1!');

        const submitButton = screen.getByRole('button', { name: /Sign Up/i });
        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Email is already taken')).toBeInTheDocument();
            expect(onSuccess).not.toHaveBeenCalled();
        });
    });
});