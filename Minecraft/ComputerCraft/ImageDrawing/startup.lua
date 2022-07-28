term.setBackgroundColor(0x4000)
term.clear()
term.setTextColor(0x8000)
for y = 1, 20 do
    term.write("DO NOT TOUCH THE COMPUTER!!!")
    term.setCursorPos(1, y)
end
shell.run("ImageDrawing/main.lua")
