export const storeFetch = async (path, method) => {

    let res = await fetch(`https://api.lemonsqueezy.com/v1/${path}`, {
        method,
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NGQ1OWNlZi1kYmI4LTRlYTUtYjE3OC1kMjU0MGZjZDY5MTkiLCJqdGkiOiJmY2FjMzcwYTY4YjAxMzM0YTk3OGY5MGYzZTQ1MDhkODI4ZGMyMzkzZWYyMWFjMTQxMDg2ZjUxODU0ZmY1OTBiYWI4MmQ4YzY1YjQ2Yzk5MyIsImlhdCI6MTcxMzk2OTUyNC4wNzUyNjMsIm5iZiI6MTcxMzk2OTUyNC4wNzUyNjYsImV4cCI6MjAyOTUwMjMyNC4wNDcxODQsInN1YiI6IjE4Njg4MjYiLCJzY29wZXMiOltdfQ.Y6IB3S1tbhtKkTy8oA-nFtVWrGgsavM_bxlc9xAFp3jBnxXuf5Khybl_kHfdWYikr-STHil8uTjktftXTDcMDM0Aac_SCieRm69IThUUJzf0KBMRXHVhz9JPCVHBZiuBHn2OWXI13nFvsvzrcy2louKFMwotDY2QbfH-Crg1EmZrR2mdBJeuRycNrtB-0quGwvY-UKJWYZzWIdCoU9YzU9648kfAq3an8iSFnXkEc90k5rHnCLdVR6WytTHFmDDZq1pHEnM48qMy870B7ZdF6yvvCTNz-YL7BsBxh1hE7aStUNISiuWygFwJalSvwu3luJfLMvUKR4bFFk6jDDTHGxpPHeYV68qoA6J3EV8GEuK_HSCGfRT-iayrC8W6ruimJSYo7B2O378w6KuKyUurEhxLIyCNygPzENDqSbDknB82pGesxnejOf7_IzjVLZLsa-OarrjLsA4VFq2vNJMl24htFK1t13aEq1yZY9uI1Tqjhja1QY7YCaoIpfW4KFiN`,
        },
    });

    res = await res.json();
    return res;

};