// Handle a fetch requests response
// Cast it to resolve / reject based on 2xx status
// Always return a consistent data structure
const handleResponse = (res) => {
    let resFunction = 'text';

    // Work out if response should be json decoded
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        resFunction = 'json';
    }

    // Decode the response, return resolved / rejected with the status and data
    return res[resFunction]().then(function(resData) {
        // Reformat the response for consistency
        const sdkResponse = {
            ok: res.ok,
            status: res.status,
            data: resData,
        };

        // Add unauthenticated urls to sdk response
        if (res.status === 401) {
            sdkResponse.url = `${process.env.VUE_APP_APP_URL}/login`;
            sdkResponse.urlWithRedirect = `${sdkResponse.url}?redirect=${encodeURIComponent(window.location.href)}`;
        }

        // Resolve if 2xx status, otherwise reject
        return res.ok ? Promise.resolve(sdkResponse) : Promise.reject(sdkResponse);
    });
}

/**
 * The SDK closure, to be compiled to a UMD library.
 * Exposed as window.futureproofSdk().
 *
//  * @example
 * // returns { ok: true, status: 200, data: {} }
 * const sdk = futureproofSdk();
 * const userIsLoggedIn = await sdk.auth.session();
 * return userIsLoggedIn;
 */
function FutureproofSdk() {
    const apiUrl = process.env.VUE_APP_FUNCTIONS_URL;

    const defaultFetchOptions = {
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    const sdkApi = {
        quizzes: {
            get(quizId) {
                return fetch(`${apiUrl}/quizzes/${quizId}`, {
                    ...defaultFetchOptions,
                }).then(handleResponse);
            },
            submit(quizId, answers) {
                const formAnswers = {
                    ...answers,
                };

                for (let question in formAnswers) {
                    const questionAnswers = formAnswers[question];

                    if (questionAnswers instanceof Array === false) {
                        formAnswers[question] = [questionAnswers];
                    }
                }

                return fetch(`${apiUrl}/quizzes/${quizId}/submit`, {
                    ...defaultFetchOptions,
                    method: 'post',
                    body: JSON.stringify(formAnswers),
                }).then(handleResponse);
            },
        }
    };

    return sdkApi;
}

export default FutureproofSdk;