import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { trpcClient } from '../../trpcClient';

/**
 * @description Service for managing user-related operations. User roles, login status, data etc
 */
@Injectable({ providedIn: 'root' })
export class UserService {
  authToken: WritableSignal<string | null> = signal(
    localStorage.getItem('userRequestToken') || null
  );
  signedIn = computed(() => {
    return this.authToken() !== null;
  });

  async signIn(email: string, password: string) {
    try {
      const res = await trpcClient.user.signIn.mutate({ email, password });
      this.authToken.set(res);
      localStorage.setItem('userRequestToken', res);
      return { success: true, error: '' };
    } catch (error: unknown) {
      this.authToken.set(null);
      localStorage.removeItem('userRequestToken');
      return {
        success: false,
        error: (error as Error)?.message || 'An error occurred during sign in',
      };
    }
  }
  async signUp(email: string, password: string) {
    try {
      const res = await trpcClient.user.signUp.mutate({ email, password });
      this.authToken.set(res);
      localStorage.setItem('userRequestToken', res);
      return { success: true, error: '' };
    } catch (error: unknown) {
      this.authToken.set(null);
      localStorage.removeItem('userRequestToken');
      return {
        success: false,
        error: (error as Error)?.message || 'An error occurred during sign up',
      };
    }
  }
}
