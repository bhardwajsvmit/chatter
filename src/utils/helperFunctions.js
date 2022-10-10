export const doFetch = async (type, data, url) => {

    let reqData = { ...data };
    if (data === null || data === undefined) {
        reqData = {};
    }

    let token = '';

    return fetch(url, {
        method: type,
        headers:
            type !== "GET"
                ? {
                    "Authorization": `${token}`,
                    "content-type": "Application/json"
                }
                : {
                    "Authorization": `${token}`
                },
        body: type !== "GET" ? JSON.stringify({ ...reqData }) : null,
    })
        .then((res) => {
            if (res) {
                return res.json()
            }

            return null;
        })
        .catch((err) => console.log(err));
};

