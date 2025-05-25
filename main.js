async function newChat(user_id) {
    const headers = {
        "content-type": "application/json"
    }

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

    let result = await (await fetch("https://api.humanornot.ai/human-or-not/chat/", {
        headers,
        body: JSON.stringify({
            user_id,
            origin: "decisionBox"
        }),
        method: "POST",
    })).json();

    const URL = "https://api.humanornot.ai/human-or-not/chat/" + result.chat_id;

    /*
        {
            "spot_on_guess_counter": number,
            "partner_type": string,
        }
    */
    result.guess = async (partner_type) => // type - bot/human
        (await fetch(URL + "/guess", {
            headers,
            body: JSON.stringify({ user_id, partner_type }),
            method: "PUT",
        })).json();

    result.sendMessage = async (text) => // message 
        (await fetch(URL + "/send-message", {
            headers,
            body: JSON.stringify({ user_id, text }),
            method: "PUT",
        })).json();

    return result;
}
