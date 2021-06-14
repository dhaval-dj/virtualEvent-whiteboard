class Helper {
    static findElementByIdFromFragment(fragment, id) {
        const elem = fragment.getElementById(id);
        elem.removeAttribute('id');
        return elem;
    }
    static formatDate(date) {
        const h = "0" + date.getHours();
        const m = "0" + date.getMinutes();
        return `${h.slice(-2)}:${m.slice(-2)}`;
    }
    static getStringFromHTML(html) {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    }
    static getFragmentFromHTML(html) {
        const template = document.createElement('template');
        template.innerHTML = html;
        return template.content;
    }
    static detachDomFromParent(dom) {
        if (dom.parentElement) {
            dom.parentElement.removeChild(dom);
        }
    }
}
