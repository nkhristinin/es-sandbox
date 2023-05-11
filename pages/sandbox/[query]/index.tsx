import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Loader, Center } from '@mantine/core';
import { useAppDispatch } from '../../../store/hooks';
import { changeQuery } from '../../../store/sandbox';

export default function Page() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (router.query.query) {
            dispatch(changeQuery(atob(router.query.query as string)));
            router.push('/');
        }
    }, [router.query.query]);

    return <Center h="100vh"><Loader /></Center>;
}
