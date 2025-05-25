/*
    Default:
    {
        "chat_id": string,
        "chat_time": number,
        "user_id": string,
        "created_at": number,
        "num_participants": number,
        "partner_id": string,
        "partner_group": string,
        "is_my_turn": boolean,
        "turn_time": number,
        "is_active": boolean,
        "messages": array
    }
*/
async function newChat(user_id, chat_id) {
    let URL = "https://api.humanornot.ai/human-or-not/chat/";

    const fetchApi = async (api, body, method) =>
        (await fetch(URL + api, {
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ user_id, ...body }),
            method,
        })).json();

    const result = chat_id ? { chat_id } : (await fetchApi('', { origin: "decisionBox" }, "POST"));

    URL += result.chat_id;

    /*
        {
            "spot_on_guess_counter": number,
            "partner_type": string,
        }
    */
    result.guess = partner_type => fetchApi('/guess', { partner_type }, "PUT"); // type - bot/human
    result.sendMessage = text => fetchApi('/send-message', { text }, "PUT"); // message 

    return result;
}
