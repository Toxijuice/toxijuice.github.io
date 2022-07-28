local renderer = require("renderer")

local index = 1
local imageIndex = 0
local framerate = 1/7
local switchFrames = 120

renderer.init()

while true do
    index = index + 1
    if(index % switchFrames == 0) then
        imageIndex = imageIndex + 1
        renderer.switchImageByIndex(imageIndex)
    else
        renderer.draw(index)
    end
    sleep(framerate)
end