import { useState, useEffect } from 'react';
import { sanitize } from '../utils/sanitize';

/**
 * A hook that takes an unsafe string and returns a sanitized, safe HTML object
 * that can be used with dangerouslySetInnerHTML.
 */
export function useSafeRender(unsafeHtml: string) {
    const [safeHtml, setSafeHtml] = useState<{ __html: string }>({ __html: '' });

    useEffect(() => {
        setSafeHtml({
            __html: sanitize(unsafeHtml)
        });
    }, [unsafeHtml]);

    return safeHtml;
}
