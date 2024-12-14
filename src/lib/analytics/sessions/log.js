"use server"

export async function logSession(sessionId, action) {

    try {

        let payload = {
            distinctId: sessionId
        };


        payload[action == "create" ? "startTime" : "endTime"] = new Date();
        
        await fetch(`${process.env.ANALYTICS_API_URL}/sessions`, {
            method: action == "create" ? "POST" : "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.ANALYTICS_API_KEY}`
            },
            body: JSON.stringify(payload),
        });

    } catch (err) {

        console.log(err);

        captureException(err);

    };

};