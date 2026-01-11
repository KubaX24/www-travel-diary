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

            document.querySelector('.dialog-submit').addEventListener('click', (e) => {
                const selectId = e.currentTarget.dataset.select
                this.#submitListener(selectId)
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

export class DialogBuilder {
    static createAddPlace() {
        return `
            <form>
                <div>
                    <label for="dialog-place-name">Name</label>
                    <input type="text" placeholder="Name" id="dialog-place-name">
                </div>
                <div>
                    <label for="dialog-place-description">Description</label>
                    <textarea placeholder="Description" id="dialog-place-description"></textarea>
                </div>
                <div>
                    <label for="dialog-place-distance">Distance in KM</label>
                    <input type="number" placeholder="Distance" id="dialog-place-distance">
                </div>
                <div>
                    <label for="dialog-place-start-date">Start date</label>
                    <input type="date" id="dialog-place-start-date">
                </div>
                <div>
                    <label for="dialog-place-end-date">End date</label>
                    <input type="date" id="dialog-place-end-date">
                </div>
                <button class="dialog-submit" data-select="0" type="button">Add</button>
            </form>
        `
    }
}