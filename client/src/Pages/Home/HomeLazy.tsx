import { FC, Suspense, lazy } from 'react';

import { Skeleton } from '@Components/Skeleton/Skeleton';

import styles from './header.module.scss';

const Home = lazy(() => import('./Home'));


const HomeSkeleton: FC = () => (
    <Skeleton width={100} height={50} />
);

export const HomeLazy: FC = ({  }) => {

    return ( 
        <Suspense fallback={<HomeSkeleton />}>
            <Home />
        </Suspense>
    );
}
