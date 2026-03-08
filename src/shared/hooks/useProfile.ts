import { useState, useEffect } from 'react';
import { ProfileService } from '../services/profileService';
import { ProfileData } from '../types';

export function useProfile() {
    const [data, setData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadData() {
            try {
                setLoading(true);
                const profileData = await ProfileService.getProfile();
                if (isMounted) {
                    setData(profileData);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err : new Error('Failed to fetch profile'));
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadData();

        return () => {
            isMounted = false;
        };
    }, []);

    return { data, loading, error };
}
