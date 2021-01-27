input.onButtonPressed(Button.A, function () {
    basic.showString("" + input.temperature())
    serial.writeLine("A: " + input.temperature())
});

input.onButtonPressed(Button.B, function () {
    serial.writeLine("B")
    basic.showString(serial.readString())
});

basic.showString("Hi")
basic.forever(function () {
    basic.showIcon(IconNames.Yes)
});