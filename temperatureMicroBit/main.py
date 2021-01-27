def on_button_pressed_a():
    serial.write_number(input.temperature())
    basic.show_string("" + str((input.temperature())))
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    serial.write_number(2)
    basic.show_string("B")
input.on_button_pressed(Button.B, on_button_pressed_b)

basic.show_string("Hi")

def on_forever():
    basic.show_icon(IconNames.YES)
basic.forever(on_forever)
