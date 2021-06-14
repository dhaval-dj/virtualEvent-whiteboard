class BotReply {
    constructor(replies, randomAnswers) {
        this.replies = replies;
        this.randomAnswers = randomAnswers;
    }
    getReply(message) {
        var _a;
        message = message.trim().toLowerCase();
        const replies = this.replies;
        for (var i = 0, len = replies.length; i < len; i++) {
            var botMessage = replies[i];
            if (botMessage.message.toLowerCase() === message) {
                if (botMessage.haveSubMenu) {
                    const buttonContainer = document.createElement('div');
                    buttonContainer.setAttribute('class', 'msg-bubble btn-area');
                    // const menuHead=document.createElement('div');
                    // menuHead.innerHTML=botMessage.answer;
                    for (var x = 0, subLen = (_a = botMessage.subMenu) === null || _a === void 0 ? void 0 : _a.length; x < subLen; x++) {
                        const button = document.createElement('div');
                        button.setAttribute('class', 'action-btn');
                        button.setAttribute('data-m-id', '1');
                        button.innerHTML = botMessage.subMenu[x];
                        buttonContainer.appendChild(button);
                    }
                    //buttonContainer.appendChild(menuHead);
                    const dummy = document.createElement('div');
                    dummy.innerHTML = botMessage.answer;
                    dummy.appendChild(buttonContainer);
                    return dummy.innerHTML;
                }
                else {
                    return botMessage.answer;
                }
            }
        }
        const randomAnswers = this.randomAnswers;
        return randomAnswers[Math.floor(Math.random() * randomAnswers.length)];
    }
}
