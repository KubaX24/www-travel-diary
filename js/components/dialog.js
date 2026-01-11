export class Dialog {

    #submitListener;

    constructor(id, name, content, buttonId = null) {
        this.id = "dialog-" + id
        this.name = name
        this.content = content

        this.closeButtonId = this.id + "-close"

        if (buttonId !== null) {
            this.buttonId = buttonId
            document.getElementById(this.buttonId).addEventListener('click', () => {
                this.open()
            })
        }
    }

    open() {
        if (!document.getElementById(this.id)) {
            document.body.insertAdjacentHTML('beforeend', this.drawDialog());

            document.getElementById(this.closeButtonId).addEventListener('click', () => {
                this.close()
            })

            document.querySelectorAll('.dialog-submit').forEach((element) => {
                element.addEventListener('click', (e) => {
                    const selectId = e.currentTarget.dataset.select
                    this.#submitListener(selectId)
                })
            })
        }
    }

    close() {
        document.getElementById(this.id).remove()
    }

    addSubmitListener(listener) {
        this.#submitListener = listener
    }

    drawDialog() {
        return `
        <div class="dialog-back" id="${this.id}">
            <div class="dialog">
                <div class="dialog-header">
                    <h3>${this.name}</h3>
                    <button id="${this.closeButtonId}"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="dialog-content">
                    ${this.content}
                </div>
            </div>
        </div>
        `
    }
}