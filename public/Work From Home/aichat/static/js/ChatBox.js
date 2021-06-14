
const messages = ['Got a question?', /*html*/ `
   Post it here and we will respond via email as soon as possible
    `];
let saveMyLastMenu = messages[1];
class ChatBox {
    constructor(botReply, user) {
        this.robot = { id: '1', name: 'WORK FORM HOME', img: 'https://storage.googleapis.com/virtual-event-273009.appspot.com/PRAVEN/WDV2Nov/chat-speech-circle%20icon.png' };
        //const fragment = (document.getElementById('chat__template') as HTMLTemplateElement).content;
        const fragment = Helper.getFragmentFromHTML(/*html*/ `
        <section class="msger">
            <header class="msger-header">
                <div class="msger-header-title">
                    <i class="fas fa-comment-alt"></i>WORK FORM HOME- ASK US
                </div>
                <div class="msger-header-options">
                    <span><i class="fas fa-cog"></i></span>
                </div>
            </header>
            <main class="msger-chat" id="message-container"></main>
            <div class="msger-inputarea">
                <input type="text" class="msger-input" placeholder="Enter your message..." id="input">
                <button type="submit" class="msger-send-btn" id="send">Send</button>
            </div>
        </section>
        `);
        const container = fragment.firstElementChild;
        const sendButton = Helper.findElementByIdFromFragment(fragment, 'send');
        sendButton.addEventListener('click', this.onClickSendButton.bind(this));
        const inputDom = Helper.findElementByIdFromFragment(fragment, 'input');
        inputDom.addEventListener('keyup', this.onInputKeyup.bind(this));
        const messageContainer = Helper.findElementByIdFromFragment(fragment, 'message-container');
        messageContainer.addEventListener('click', this.onClickMessageContainer.bind(this));
        const loadingSVG = document.getElementById('bot-loader-ui');
        Helper.detachDomFromParent(loadingSVG);
        const loadingMessageContainer = document.createElement('div');
        loadingMessageContainer.innerHTML = this.getUserMessageHtml(this.robot, loadingSVG.outerHTML);
        this.container = container;
        this.messageContainer = messageContainer;
        this.inputDom = inputDom;
        this.botReply = botReply;
        this.user = user;
        this.loadingMessageContainer = loadingMessageContainer;
        this.sendMessage(this.robot, messages[0]);
        this.sendMessage(this.robot, messages[1]);

        let self=this;
        //Taking previuse data from database
        this.user.rdb.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                 var childData = childSnapshot.val();
                 self.sendMessage(self.user,childData.msg,childData.time);
                // self.sendMessage(self.robot, 'Thanky',new Date);
            });
        });
    }
    getContainer() {
        return this.container;
    }
    onClickMessageContainer(e) {
        const target = e.target;
        const dataMId = target.getAttribute('data-m-id');
        if (dataMId) {
            this.sendMessageByUser(target.textContent.trim());
        }
    }
    onInputKeyup(e) {
        if (e.code === 'Enter') {
            this.onClickSendButton(e);
        }
    }
    onClickSendButton(e) {
        const inputDom = this.inputDom;
        const message = inputDom.value.trim();
        if (message) {
            this.sendMessageByUser(message);
            inputDom.value = '';
        }
    }
    sendMessageByUser(message) {

        this.user.rdb.push().set({
            msg:message,
            time:Helper.formatDate(new Date()),
            date:new Date().toDateString(),
        });

        this.sendMessage(this.user, message);
        const reply = this.botReply.getReply(message);
        var isMenu = reply.includes("data-m-id");
        if (isMenu) {
            saveMyLastMenu = reply;
        }
        this.messageContainer.appendChild(this.loadingMessageContainer);
        this.scrollMessageContainerToBottom();
        setTimeout(() => {
            Helper.detachDomFromParent(this.loadingMessageContainer);
            this.sendMessage(this.robot, reply);
            if (!isMenu) {
                //Showing Menu
                // setTimeout(()=> {
                //     this.sendMessage(this.robot, saveMyLastMenu);
                // },800);
            }
        }, Math.floor(Math.random() * (1500 - 800)) + 800);
    }
    sendMessage(user, message,time=null) {
        const messageContainer = this.messageContainer;
        messageContainer.insertAdjacentHTML('beforeend', this.getUserMessageHtml(user, message,time));
        this.scrollMessageContainerToBottom();
    }
    getUserMessageHtml(user, message,time=null) {
        var className = 'left-msg';
        if (user.id !== '1') {
            className = 'right-msg';
            message = Helper.getStringFromHTML(message);
        }
        let now='';
        if(time)
        {
             now=time;
        }else{
            now=Helper.formatDate(new Date());
        }


        const html = /*html*/ `
        <div class="msg ${className}">
            <div class="msg-img" style="background-image: url(${user.img})"></div>
            <div class="msg-bubble">
                <div class="msg-info">
                    <div class="msg-info-name">${user.name}</div>
                    <div class="msg-info-time">${now}</div>
                </div>
                <div class="msg-text">${message}</div>
            </div>
        </div>
        `;
        return html;
    }

     

    scrollMessageContainerToBottom() {
        if (this.container.parentElement) {
            this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
        }
        else
            console.log('No');
    }
}
