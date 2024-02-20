import { useState } from 'react';


export const useLoading = () => {
    const promiseList: PromiseLike<unknown>[] = [];
    const [isLoading, setIsLoading] = useState(false);
    const [isCompletedOnce, setIsCompletedOnce] = useState(false);

    function checkIsLoading() {
        if (!!promiseList.length) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }

    function add<T>(callback: () => PromiseLike<T>) {
        const promise = callback();

        subscribe(promise);
        checkIsLoading();
        return promise;
    }

    function subscribe<T>(promise: PromiseLike<T>): PromiseLike<T> {
        if (promiseList.indexOf(promise) !== -1) {
            throw new Error('Promise is already registered!');
        }

        promiseList.push(promise);

        promise.then(() => complete(promise), () => complete(promise));
        return promise;
    }

    function complete(promise: PromiseLike<unknown>) {
        function timeout() {
            return new Promise((resolve) => {
                setTimeout(resolve, 0);
            });
        }

        timeout().then(() => {
            const index = promiseList.indexOf(promise);
            if (index === -1)
                throw new Error('Promise is not registered!');

            promiseList.splice(index, 1);
            setIsCompletedOnce(true);
            checkIsLoading();
        });
    }

    return { isLoading, isCompletedOnce, add, subscribe };
}
