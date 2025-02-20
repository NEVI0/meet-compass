import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

interface RedirectAbstract {
    to: string;
}

export const Redirect: FC<RedirectAbstract> = ({ to }) => {
    const router = useRouter();

    useEffect(() => {
        router.replace(to);
    }, [router, to]);

    return null;
};
