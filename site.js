class Site {
    constructor(name, cursorImage) {
        this.name = name;
        this.cursorImage = cursorImage;
    }
    name() {
        return this.name;
    }
    cursorImage() {
        return this.cursorImage;
    }
    changeCursorImage(newCursorImage) {
        this.cursorImage = newCursorImage;
    }
}