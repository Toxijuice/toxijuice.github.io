local renderer = {}

local gfx = require("gfx")
local animation

renderer.animations = {
    "animations/toxirotate",
    "animations/falsrotate",
    "animations/hellionrotate"
}

function renderer.switchImage(animationPath)
    animation = require(animationPath)
    gfx.drawImage(animation.base, animation.w, animation.h)
end

function renderer.switchImageByIndex(index)
    renderer.switchImage(renderer.animations[index % #renderer.animations + 1])
end

function renderer.init()
    renderer.switchImageByIndex(0)
end

function renderer.draw(frameIndex)
    gfx.drawAnimation(animation, frameIndex)
end

return renderer