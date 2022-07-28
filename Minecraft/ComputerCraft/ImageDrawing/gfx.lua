local gfx = {}
gfx.cols = {0x1,0x2,0x4,0x8,0x10,0x20,0x40,0x80,0x100,0x200,0x400,0x800,0x1000,0x2000,0x4000,0x8000}
gfx.m = peripheral.find("monitor")


function gfx.init()
    gfx.m.setTextScale(0.5)
    gfx.m.setCursorPos(1,1)
    gfx.m.setTextColor(colors.white)
    gfx.m.setBackgroundColor(gfx.cols[16])
    gfx.m.clear()
end

function gfx.pixel(x, y, col)
    if(col == 0) then return end
    gfx.m.setCursorPos(x, y)
    gfx.m.setBackgroundColor(gfx.cols[col])
    gfx.m.write(" ")
end

function gfx.drawImage(img, w, h)
    local x = 1
    local y = 1

    local offs = 1
    for j = 1, #img do
        for i = 1, img[j][2] do
            x = offs % w
            y = offs / w + 1
            gfx.pixel(x, y, img[j][1])
            offs = offs + 1
        end
    end
end

function gfx.drawAnimation(animation, frame)
    gfx.drawImage(animation.frames[(frame % (#animation.frames))+1], animation.w, animation.h)
end

gfx.init()

return gfx
