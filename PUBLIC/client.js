let aa = "localhost:8089"
  , c = document.getElementById("canvas")
  , d = c.getContext("2d")
  , ba = document.getElementById("form")
  , e = document.getElementById("message")
  , [f,k,l,n,r,u,v,w,x,y,z,ca,da,ea,fa,ha,ia,ja,ka,la,ma,na] = [document.getElementById("bLeft"), document.getElementById("bRight"), document.getElementById("bUp"), document.getElementById("bDown"), document.getElementById("bShift"), document.getElementById("ChatMessage"), document.getElementById("Notification"), document.getElementById("cb1"), document.getElementById("cb2"), document.getElementById("cb3"), document.getElementById("cb4"), document.getElementById("cb5"), document.getElementById("cb6"), document.getElementById("cb1t"), document.getElementById("cb2t"), document.getElementById("cb3t"), document.getElementById("cb4t"), document.getElementById("cb5t"), document.getElementById("cb6t"), document.getElementById("cb7t"), document.getElementById("message"), document.getElementById("snap")];
ba.addEventListener("submit", a=>{
    a.preventDefault();
    e.value && (a = e.value,
    null !== a && (A.send(JSON.stringify(["message", a.slice(0, 128).toString()])),
    e.value = ""))
}
);
na.addEventListener("click", a=>{
    a.preventDefault();
    a = c.toDataURL("image/png");
    let h = document.createElement("a");
    h.href = a;
    h.download = `${B.replace(/[^A-Za-z0-9_]+$/, "").replaceAll(" ", "").substr(0, 6)}${Date.now()}.png`;
    h.click();
    h.remove()
}
);
if (0 <= window.navigator.appVersion.indexOf("Android") || 0 <= window.navigator.appVersion.indexOf("iOS"))
    f.removeAttribute("hidden"),
    k.removeAttribute("hidden"),
    l.removeAttribute("hidden"),
    n.removeAttribute("hidden"),
    r.removeAttribute("hidden");
d.font = "bold 16px Calibri, Carlito, sans-serif";
d.scale(1, 1);
let A = new WebSocket(`ws://${aa}`);
var C = {}, D = w.checked, E = x.checked, oa = y.checked, pa = z.checked, qa = ca.checked, F = da.checked, ra = ea.checked, sa = fa.checked, ta = ha.checked, ua = ia.checked, va = ja.checked, G = ka.checked, H = la.checked, I = 0, wa = 0, J = 0, K = 0, L = !1, M = 60, 
Draw = (a,h,b,g="#FFFFFF",m=!1,t=16,P=!0,p=!1)=>{
    d.font = `${P ? "bold " : ""}${p ? "italic " : ""}${t}px Calibri`;
    m && (d.fillStyle = "#00000080",
    d.fillRect(h - ("center" == d.textAlign ? d.measureText(a).width / 2 : 0), b - 12, d.measureText(a).width, 16));
    d.fillStyle = g;
    m = d.fillStyle;
    t = "FF";
    void 0 !== m[6] && void 0 !== m[7] && (t = m[6] + m[7]);
    d.fillStyle = `#000000 ${t}`;
    d.fillText(a, h + 1, b + 1);
    d.fillStyle = g;
    d.fillText(a, h, b)
}
, O = {}, B = "", xa = 0, ya = 0, Q = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], R = [], S = 0, V = "", W = 0, za = !1, X = [], Y = ["Made by dottych", "github.com/dottych", "youtube.com/@dottych", "Discord: dotty#7939"], Z = "", Aa = {
    "#FF6969": "red",
    "#69AA69": "green",
    "#3369FF": "blue",
    "#69FFFF": "cyan",
    "#69FF69": "lime",
    "#FFFF69": "yellow",
    "#FFAA69": "orange",
    "#6969FF": "purple",
    "#FF69FF": "pink",
    "#FFFFFF": "white",
    "#000000": "black",
    "#AAAAAA": "gray",
    "#AA6969": "brown",
    "#AA0000": "maroon",
    "#0000AA": "indigo",
    "#006900": "forest"
}, Ba = a=>{
    let h = a - I;
    M = 1E3 / h;
    I = a;
    d.clearRect(0, 0, c.width, c.height);
    d.fillStyle = "gray";
    d.fillRect(0, 0, c.width, c.height);
    [D,E,oa,pa,qa,F,ra,sa,ta,ua,va,G,H] = [w.checked, x.checked, y.checked, z.checked, ca.checked, da.checked, ea.checked, fa.checked, ha.checked, ia.checked, ja.checked, ka.checked, la.checked];
    if (void 0 !== Q[8])
        for (a = 0; 16 > a; a++)
            for (var b = 0; 9 > b; b++)
                if (0 < Q[b][a])
                    switch (Q[b][a]) {
                    case 1:
                        d.fillStyle = "#858585";
                        d.fillRect(80 * a, 80 * b, 80, 80);
                        break;
                    case 2:
                        d.fillStyle = "#909090";
                        d.fillRect(80 * a, 80 * b, 80, 80);
                        break;
                    case 3:
                        d.fillStyle = "#AAAAAA",
                        d.fillRect(80 * a, 80 * b, 80, 80)
                    }
    if (H)
        for (a = 0; a < X.length; a++)
            1 > X[a][2] ? X.splice(a, 1) : (d.fillStyle = `${X[a][3]}${1 == X[a][2].toString(16).length ? "0" + X[a][2].toString(16) : X[a][2].toString(16)}`,
            d.fillRect(X[a][0] + 4, X[a][1] + 4, 8, 8),
            X[a][2]--);
    else
        X = [];
    d.textAlign = "center";
    for (a = 0; a < Object.keys(O).length; a++)
        if (b = O[Object.keys(O)[a]],
        Object.keys(O)[a] != B) {
            var g = b.g;
            g = Math.floor(g + 2 / (5 * h) * h * (b.x - g));
            var m = b.h;
            m = Math.floor(m + 2 / (5 * h) * h * (b.y - m));
            b.g = b.x;
            b.h = b.y;
            d.beginPath();
            d.fillStyle = b.color;
            d.arc(g + 8, m + 8, 8, 0, 2 * Math.PI);
            d.fill();
            d.closePath();
            if (G) {
                b = Object.keys(O)[a];
                var t = d.measureText(Object.keys(O)[a]).width / 2
                  , P = 1280 - d.measureText(Object.keys(O)[a]).width / 2;
                DRAW(b, Math.min(Math.max(g + 8, t), P), Math.min(Math.max(m - 16, 16), 704), "#FFFFFF", F)
            }
        } else
            d.beginPath(),
            d.fillStyle = "#AAAAAA",
            d.arc(b.x + 8, b.y + 8, 9, 0, 2 * Math.PI),
            d.fill(),
            d.closePath(),
            d.beginPath(),
            d.fillStyle = b.color,
            d.arc(b.x + 8, b.y + 8, 8, 0, 2 * Math.PI),
            d.fill(),
            d.closePath(),
            G && (g = Object.keys(O)[a],
            m = d.measureText(Object.keys(O)[a]).width / 2,
            t = 1280 - d.measureText(Object.keys(O)[a]).width / 2,
            DRAW(g, Math.min(Math.max(b.x + 8, m), t), Math.min(Math.max(b.y - 16, 16), 704), "#FFFFFF", F));
    [xa,ya] = [void 0 === O[B] ? 0 : O[B].x, void 0 === O[B] ? 0 : O[B].y];
    let[,,p,q,,T,U] = [0, 0, 0, 0, 0, !1, !1];
    b = 2 / 15 * h;
    a = O[B];
    try {
        if (!ma.matches(":focus")) {
            if (C[37] || C.left || C[65])
                p = -b;
            if (C[39] || C.right || C[68])
                p = b;
            if (C[38] || C.j || C[87])
                q = -b;
            if (C[40] || C.i || C[83])
                q = b
        }
        p = 0 !== q ? p / Math.sqrt(2) : p;
        q = 0 !== p ? q / Math.sqrt(2) : q;
        if (a.x !== a.g)
            for (b = 0; 9 > b; b++)
                for (g = 0; 16 > g; g++)
                    2 <= Q[b][g] && !T && (T = a.x + p < 80 * g + 80 && a.x + p + 16 > 80 * g && a.y < 80 * b + 80 && a.y + 16 > 80 * b);
        if (a.y !== a.h)
            for (b = 0; 9 > b; b++)
                for (g = 0; 16 > g; g++)
                    2 <= Q[b][g] && !U && (U = a.x < 80 * g + 80 && a.x + 16 > 80 * g && a.y + q < 80 * b + 80 && a.y + q + 16 > 80 * b);
        T || (O[B].x = Math.min(Math.max(O[B].x + p, 0), 1264));
        U || (O[B].y = Math.min(Math.max(O[B].y + q, 0), 704));
        za = C[16] || C.shift ? !0 : !1
    } catch (Ea) {}
    d.textAlign = "left";
    DRAW("Balls Online", 16, 16, "#EEEEEE");
    ra && (DRAW(`FPS: ${Math.ceil(M)}`, 16, 32, 30 > M ? 15 > M ? "red" : "yellow" : "lime", D),
    DRAW(`Ping: ${isNaN(J) ? 0 : J}ms`, 16, 48, 100 < J ? 250 < J ? "red" : "yellow" : "lime", D),
    DRAW(`Status: ${0 == A.readyState || 3 == A.readyState || 2 == A.readyState ? "offline" : "online"}`, 16, 64, 0 == A.readyState || 3 == A.readyState || 2 == A.readyState ? "red" : "lime", D),
    DRAW(`Client run: ${Math.floor(I / 1E3)}s`, 16, 96, "#AAAAFF", D),
    DRAW(`Server run: ${Math.floor((wa + I) / 1E3)}s`, 16, 112, "#AAAAFF", D),
    DRAW("Version: 0.4.3", 16, 144, "#AAAAFF", D),
    DRAW(`Platform: ${window.navigator.platform}`, 16, 160, "#AAAAFF", D));
    sa && (DRAW("Info", 192, 16, "#EEEEEE"),
    DRAW(`Client ID: ${B}`, 192, 32, "#DDDDDD", E),
    DRAW(`Client X: ${void 0 === O[B] ? 0 : Math.floor(O[B].x)}`, 192, 48, "#DDDDDD", E),
    DRAW(`Client Y: ${void 0 === O[B] ? 0 : Math.floor(O[B].y)}`, 192, 64, "#DDDDDD", E),
    DRAW(`Players: ${Object.keys(O).length}`, 192, 96, "#DDDDDD", E));
    if (ta)
        for (DRAW("Chat", 384, 16, "#EEEEEE"),
        a = 0; a < R.length; a++)
            DRAW(R[a], 384, 16 * (a + 2), a == R.length - 1 ? `${"#DDDD"}${1 == Math.round(S).toString(16).length ? "0" + Math.round(S).toString(16) : Math.round(S).toString(16)}` : "#DDDDDD", oa),
            221 > S && (S += .1 * h);
    DRAW(Z, 1024, 16, "#EEEEEE", !1, 16, !0, !0);
    if (ua)
        for (DRAW("Player list", 16, 192, "#EEEEEE"),
        a = 0; a < Object.keys(O).length; a++)
            b = O[Object.keys(O)[a]],
            DRAW(`${Object.keys(O)[a]} - ${Math.round(b.x)}, ${Math.round(b.y)}`, 16, 192 + 16 * (a + 1), b.color, pa);
    va && 0 < W && (DRAW(V, (1280 - d.measureText(V).width) / 2, 360, `#EEEEEE ${255 < W ? "FF" : (1 == Math.round(W).toString(16).length ? "0" : "") + Math.round(W).toString(16)}`, qa),
    W -= .1 * h);
    requestAnimationFrame(Ba)
}
, Ca;
A.addEventListener("open", ()=>{
    console.log("Connected to server")
}
);
A.addEventListener("message", a=>{
    a = JSON.parse(a.data);
    switch (a[0]) {
    case "id":
        B = a[1];
        null !== window.localStorage.getItem("name") && A.send(JSON.stringify(["message", `/name ${window.localStorage.getItem("name")}`]));
        null !== window.localStorage.getItem("color") && A.send(JSON.stringify(["message", `/color ${window.localStorage.getItem("color")}`]));
        break;
    case "time":
        wa = a[1];
        break;
    case "spawn":
        O[a[1]] = {
            x: a[2],
            y: a[3],
            g: 0,
            h: 0,
            color: a[4]
        };
        break;
    case "despawn":
        delete O[a[1]];
        break;
    case "move":
        O[a[1]].x = a[2];
        O[a[1]].y = a[3];
        break;
    case "ping":
        L = !1;
        K = 0;
        J = Math.ceil(performance.now() - Ca);
        break;
    case "map":
        Q = a[1];
        break;
    case "message":
        R.push(`${a[1]}: ${a[2]}`);
        8 < R.length && R.shift();
        S = document.hasFocus() ? 0 : 221;
        u.currentTime = 0;
        u.play();
        break;
    case "rename":
        let h = O[a[1]];
        delete O[a[1]];
        a[1] == B && (B = a[2],
        window.localStorage.setItem("name", a[2]));
        O[a[2]] = {
            x: h.x,
            y: h.y,
            g: 0,
            h: 0,
            color: h.color
        };
        break;
    case "restart":
        location.reload();
        break;
    case "notification":
        V = a[1];
        W = 510;
        u.pause();
        v.currentTime = 0;
        v.play();
        break;
    case "draw":
        document.hasFocus() && H && X.push([a[1], a[2], 255, a[3]]);
        break;
    case "audio":
        console.log("Audio loading from " + a[1]);
        (new Audio(a[1])).play();
        break;
    case "color":
        a[1] == B && window.localStorage.setItem("color", Aa[a[2]]),
        O[a[1]].color = a[2]
    }
}
);
window.addEventListener("keydown", a=>{
    C[a.keyCode] = !0
}
);
window.addEventListener("keyup", a=>{
    C[a.keyCode] = !1
}
);
l.addEventListener("touchstart", ()=>{
    C.j = !0
}
);
n.addEventListener("touchstart", ()=>{
    C.i = !0
}
);
f.addEventListener("touchstart", ()=>{
    C.left = !0
}
);
k.addEventListener("touchstart", ()=>{
    C.right = !0
}
);
r.addEventListener("touchstart", ()=>{
    C.shift = !0
}
);
l.addEventListener("touchend", ()=>{
    C.j = !1
}
);
n.addEventListener("touchend", ()=>{
    C.i = !1
}
);
f.addEventListener("touchend", ()=>{
    C.left = !1
}
);
k.addEventListener("touchend", ()=>{
    C.right = !1
}
);
r.addEventListener("touchend", ()=>{
    C.shift = !1
}
);
setInterval(()=>{
    try {
        A.readyState == WebSocket.CLOSED || xa == O[B].x && ya == O[B].y || (A.send(JSON.stringify(["move", Math.round(O[B].x), Math.round(O[B].y)])),
        za && A.send(JSON.stringify(["draw"])))
    } catch (a) {}
}
, 50);
let Da = setInterval(()=>{
    A.readyState != WebSocket.CLOSED ? (L ? 10 < K && (A.close(),
    location.reload(),
    clearInterval(Da)) : (A.send(JSON.stringify(["ping"])),
    L = !0,
    Ca = performance.now()),
    K++) : (location.reload(),
    clearInterval(Da))
}
, 1E3);
Z = Y[0];
setInterval(()=>{
    Z = Y[Math.floor(Math.random() * Y.length)]
}
, 5E3);
requestAnimationFrame(Ba);
