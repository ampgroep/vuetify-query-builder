var yi = Object.defineProperty;
var hi = (e, t, n) => t in e ? yi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Mt = (e, t, n) => (hi(e, typeof t != "symbol" ? t + "" : t, n), n);
import { Fragment as J, reactive as an, computed as m, watchEffect as De, toRefs as zl, capitalize as Hl, isVNode as bi, Comment as Ci, warn as on, ref as N, unref as we, provide as _e, inject as ce, shallowRef as W, defineComponent as Tn, camelize as jl, h as rn, getCurrentInstance as Si, TransitionGroup as pi, Transition as Xe, createVNode as u, mergeProps as U, isRef as wt, toRef as H, Text as xi, watch as G, onBeforeMount as ql, nextTick as me, withDirectives as ke, resolveDirective as Qe, vShow as ut, onScopeDispose as ge, effectScope as $n, toRaw as Ne, onBeforeUnmount as Je, onMounted as ct, resolveDynamicComponent as wi, readonly as Fn, Teleport as Vi, cloneVNode as ki, createTextVNode as Ut, openBlock as ue, createElementBlock as xe, normalizeStyle as _i, createElementVNode as Ve, createBlock as zt, withCtx as at, toDisplayString as el, createCommentVNode as Me, resolveComponent as tl, renderList as nl } from "vue";
const Ii = {
  name: "QueryBuilderRule",
  components: {},
  props: {
    rule: {
      type: Object,
      required: !0
    },
    id: {
      type: Number,
      required: !0
    },
    fields: {
      type: Array,
      required: !0
    }
  },
  computed: {
    operator: {
      get: function() {
        return this.operators.find((e) => e.value === this.rule.query.operator.toLowerCase() || e.text === this.rule.query.operator.toLowerCase()) ?? this.operators[0];
      },
      set: function(e) {
        e.type !== this.operator.type && (this.value = ""), this.rule.query.operator = e.value;
      }
    },
    value: {
      get: function() {
        let e = this.rule.query.value;
        if (this.operator.type === "array" && typeof e != "object")
          try {
            typeof e == "string" ? e = [...new Set(JSON.parse(e))] : e = [e];
          } catch {
            e = [];
          }
        return e;
      },
      set: function(e) {
        typeof e == "object" && (e = JSON.stringify(e)), this.rule.query.value = e;
      }
    }
  },
  data() {
    return {
      operators: [
        { value: "eq", text: "=", type: "string" },
        { value: "ne", text: "!=", type: "string" },
        { value: "gt", text: ">", type: "string" },
        { value: "lt", text: "<", type: "string" },
        { value: "gte", text: ">=", type: "string" },
        { value: "lte", text: "<=", type: "string" },
        { value: "regexp", text: "regexp", type: "string" },
        { value: "not regexp", text: "not regexp", type: "string" },
        { value: "like", text: "like", type: "string" },
        { value: "not like", text: "not like", type: "string" },
        { value: "exists", text: "exists", type: "none" },
        { value: "not exists", text: "not exists", type: "none" },
        { value: "is null", text: "is null", type: "none" },
        { value: "not null", text: "not null", type: "none" },
        { value: "in", text: "in", type: "array" },
        { value: "not in", text: "not in", type: "array" }
      ]
    };
  },
  methods: {
    removeRule() {
      this.$emit("remove-rule", this.id);
    },
    hideValue() {
      return this.operator.type === "none";
    },
    showTextField() {
      return this.operator.type === "string";
    },
    showCombobox() {
      return this.operator.type === "array";
    }
  }
}, Gl = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTksM1Y0SDRWNkg1VjE5QTIsMiAwIDAsMCA3LDIxSDE3QTIsMiAwIDAsMCAxOSwxOVY2SDIwVjRIMTVWM0g5TTksOEgxMVYxN0g5VjhNMTMsOEgxNVYxN0gxM1Y4WiIgLz48L3N2Zz4=";
const Wl = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [l, a] of t)
    n[l] = a;
  return n;
};
const be = typeof window < "u", Mn = be && "IntersectionObserver" in window;
function Ul(e, t, n) {
  const l = t.length - 1;
  if (l < 0)
    return e === void 0 ? n : e;
  for (let a = 0; a < l; a++) {
    if (e == null)
      return n;
    e = e[t[a]];
  }
  return e == null || e[t[l]] === void 0 ? n : e[t[l]];
}
function Vt(e, t) {
  if (e === t)
    return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t))
    return !1;
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every((l) => Vt(e[l], t[l]));
}
function Pi(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), Ul(e, t.split("."), n));
}
function Ee(e, t, n) {
  if (t === !0)
    return e === void 0 ? n : e;
  if (t == null || typeof t == "boolean")
    return n;
  if (e !== Object(e)) {
    if (typeof t != "function")
      return n;
    const a = t(e, n);
    return typeof a > "u" ? n : a;
  }
  if (typeof t == "string")
    return Pi(e, t, n);
  if (Array.isArray(t))
    return Ul(e, t, n);
  if (typeof t != "function")
    return n;
  const l = t(e, n);
  return typeof l > "u" ? n : l;
}
function Ai(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return Array.from({
    length: e
  }, (n, l) => t + l);
}
function j(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (!(e == null || e === ""))
    return isNaN(+e) ? String(e) : isFinite(+e) ? `${Number(e)}${t}` : void 0;
}
function xn(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function wn(e) {
  return e && "$el" in e ? e.$el : e;
}
const ll = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16
});
function mn(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function ot(e, t, n) {
  const l = /* @__PURE__ */ Object.create(null), a = /* @__PURE__ */ Object.create(null);
  for (const i in e)
    t.some((o) => o instanceof RegExp ? o.test(i) : o === i) && !(n != null && n.some((o) => o === i)) ? l[i] = e[i] : a[i] = e[i];
  return [l, a];
}
function kt(e, t) {
  const n = {
    ...e
  };
  return t.forEach((l) => delete n[l]), n;
}
const Kl = /^on[^a-z]/, Rn = (e) => Kl.test(e), Ei = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"], Bi = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "Enter", "Escape", "Tab", " "];
function Oi(e) {
  return e.isComposing && Bi.includes(e.key);
}
function Yl(e) {
  const [t, n] = ot(e, [Kl]), l = kt(t, Ei), [a, i] = ot(n, ["class", "style", "id", /^data-/]);
  return Object.assign(a, t), Object.assign(i, l), [a, i];
}
function Ae(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function Kt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function al(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function Li(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let l = 0;
  for (; l < e.length; )
    n.push(e.substr(l, t)), l += t;
  return n;
}
function nt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const l = {};
  for (const a in e)
    l[a] = e[a];
  for (const a in t) {
    const i = e[a], o = t[a];
    if (xn(i) && xn(o)) {
      l[a] = nt(i, o, n);
      continue;
    }
    if (Array.isArray(i) && Array.isArray(o) && n) {
      l[a] = n(i, o);
      continue;
    }
    l[a] = o;
  }
  return l;
}
function Xl(e) {
  return e.map((t) => t.type === J ? Xl(t.children) : t).flat();
}
function Ye() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (Ye.cache.has(e))
    return Ye.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return Ye.cache.set(e, t), t;
}
Ye.cache = /* @__PURE__ */ new Map();
function Ht(e, t) {
  if (!t || typeof t != "object")
    return [];
  if (Array.isArray(t))
    return t.map((n) => Ht(e, n)).flat(1);
  if (Array.isArray(t.children))
    return t.children.map((n) => Ht(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
      return [t.component];
    if (t.component.subTree)
      return Ht(e, t.component.subTree).flat(1);
  }
  return [];
}
function Dn(e) {
  const t = an({}), n = m(e);
  return De(() => {
    for (const l in n.value)
      t[l] = n.value[l];
  }, {
    flush: "sync"
  }), zl(t);
}
function Yt(e, t) {
  return e.includes(t);
}
function Zl(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const Be = () => [Function, Array];
function il(e, t) {
  return t = "on" + Hl(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function Ti(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), l = 1; l < t; l++)
    n[l - 1] = arguments[l];
  if (Array.isArray(e))
    for (const a of e)
      a(...n);
  else
    typeof e == "function" && e(...n);
}
function Vn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((l) => `${l}${t ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...e.querySelectorAll(n)];
}
function Ql(e, t, n) {
  let l, a = e.indexOf(document.activeElement);
  const i = t === "next" ? 1 : -1;
  do
    a += i, l = e[a];
  while ((!l || l.offsetParent == null || !((n == null ? void 0 : n(l)) ?? !0)) && a < e.length && a >= 0);
  return l;
}
function Xt(e, t) {
  var l, a, i, o;
  const n = Vn(e);
  if (!t)
    (e === document.activeElement || !e.contains(document.activeElement)) && ((l = n[0]) == null || l.focus());
  else if (t === "first")
    (a = n[0]) == null || a.focus();
  else if (t === "last")
    (i = n.at(-1)) == null || i.focus();
  else if (typeof t == "number")
    (o = n[t]) == null || o.focus();
  else {
    const r = Ql(n, t);
    r ? r.focus() : Xt(e, t === "next" ? "first" : "last");
  }
}
function $i() {
}
function Zt(e, t) {
  if (!(be && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`)))
    return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function Nn(e) {
  return e.some((t) => bi(t) ? t.type === Ci ? !1 : t.type !== J || Nn(t.children) : !0) ? e : null;
}
const Jl = ["top", "bottom"], Fi = ["start", "end", "left", "right"];
function kn(e, t) {
  let [n, l] = e.split(" ");
  return l || (l = Yt(Jl, n) ? "start" : Yt(Fi, n) ? "top" : "center"), {
    side: ol(n, t),
    align: ol(l, t)
  };
}
function ol(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
function gn(e) {
  return {
    side: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[e.side],
    align: e.align
  };
}
function yn(e) {
  return {
    side: e.side,
    align: {
      center: "center",
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    }[e.align]
  };
}
function rl(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function sl(e) {
  return Yt(Jl, e.side) ? "y" : "x";
}
class it {
  constructor(t) {
    let {
      x: n,
      y: l,
      width: a,
      height: i
    } = t;
    this.x = n, this.y = l, this.width = a, this.height = i;
  }
  get top() {
    return this.y;
  }
  get bottom() {
    return this.y + this.height;
  }
  get left() {
    return this.x;
  }
  get right() {
    return this.x + this.width;
  }
}
function ul(e, t) {
  return {
    x: {
      before: Math.max(0, t.left - e.left),
      after: Math.max(0, e.right - t.right)
    },
    y: {
      before: Math.max(0, t.top - e.top),
      after: Math.max(0, e.bottom - t.bottom)
    }
  };
}
function zn(e) {
  const t = e.getBoundingClientRect(), n = getComputedStyle(e), l = n.transform;
  if (l) {
    let a, i, o, r, s;
    if (l.startsWith("matrix3d("))
      a = l.slice(9, -1).split(/, /), i = +a[0], o = +a[5], r = +a[12], s = +a[13];
    else if (l.startsWith("matrix("))
      a = l.slice(7, -1).split(/, /), i = +a[0], o = +a[3], r = +a[4], s = +a[5];
    else
      return new it(t);
    const d = n.transformOrigin, g = t.x - r - (1 - i) * parseFloat(d), f = t.y - s - (1 - o) * parseFloat(d.slice(d.indexOf(" ") + 1)), c = i ? t.width / i : e.offsetWidth + 1, v = o ? t.height / o : e.offsetHeight + 1;
    return new it({
      x: g,
      y: f,
      width: c,
      height: v
    });
  } else
    return new it(t);
}
function lt(e, t, n) {
  if (typeof e.animate > "u")
    return {
      finished: Promise.resolve()
    };
  let l;
  try {
    l = e.animate(t, n);
  } catch {
    return {
      finished: Promise.resolve()
    };
  }
  return typeof l.finished > "u" && (l.finished = new Promise((a) => {
    l.onfinish = () => {
      a(l);
    };
  })), l;
}
const jt = /* @__PURE__ */ new WeakMap();
function Mi(e, t) {
  Object.keys(t).forEach((n) => {
    if (Rn(n)) {
      const l = Zl(n), a = jt.get(e);
      if (t[n] == null)
        a == null || a.forEach((i) => {
          const [o, r] = i;
          o === l && (e.removeEventListener(l, r), a.delete(i));
        });
      else if (!a || ![...a].some((i) => i[0] === l && i[1] === t[n])) {
        e.addEventListener(l, t[n]);
        const i = a || /* @__PURE__ */ new Set();
        i.add([l, t[n]]), jt.has(e) || jt.set(e, i);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function Ri(e, t) {
  Object.keys(t).forEach((n) => {
    if (Rn(n)) {
      const l = Zl(n), a = jt.get(e);
      a == null || a.forEach((i) => {
        const [o, r] = i;
        o === l && (e.removeEventListener(l, r), a.delete(i));
      });
    } else
      e.removeAttribute(n);
  });
}
const tt = 2.4, cl = 0.2126729, dl = 0.7151522, fl = 0.072175, Di = 0.55, Ni = 0.58, zi = 0.57, Hi = 0.62, Rt = 0.03, vl = 1.45, ji = 5e-4, qi = 1.25, Gi = 1.25, ml = 0.078, gl = 12.82051282051282, Dt = 0.06, yl = 1e-3;
function hl(e, t) {
  const n = (e.r / 255) ** tt, l = (e.g / 255) ** tt, a = (e.b / 255) ** tt, i = (t.r / 255) ** tt, o = (t.g / 255) ** tt, r = (t.b / 255) ** tt;
  let s = n * cl + l * dl + a * fl, d = i * cl + o * dl + r * fl;
  if (s <= Rt && (s += (Rt - s) ** vl), d <= Rt && (d += (Rt - d) ** vl), Math.abs(d - s) < ji)
    return 0;
  let g;
  if (d > s) {
    const f = (d ** Di - s ** Ni) * qi;
    g = f < yl ? 0 : f < ml ? f - f * gl * Dt : f - Dt;
  } else {
    const f = (d ** Hi - s ** zi) * Gi;
    g = f > -yl ? 0 : f > -ml ? f - f * gl * Dt : f + Dt;
  }
  return g * 100;
}
function ht(e) {
  on(`Vuetify: ${e}`);
}
function Wi(e) {
  on(`Vuetify error: ${e}`);
}
function Ui(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`, on(`[Vuetify UPGRADE] '${e}' is deprecated, use ${t} instead.`);
}
function _n(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function Ki(e) {
  return _n(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const bl = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, Yi = {
  rgb: (e, t, n, l) => ({
    r: e,
    g: t,
    b: n,
    a: l
  }),
  rgba: (e, t, n, l) => ({
    r: e,
    g: t,
    b: n,
    a: l
  }),
  hsl: (e, t, n, l) => Cl({
    h: e,
    s: t,
    l: n,
    a: l
  }),
  hsla: (e, t, n, l) => Cl({
    h: e,
    s: t,
    l: n,
    a: l
  }),
  hsv: (e, t, n, l) => bt({
    h: e,
    s: t,
    v: n,
    a: l
  }),
  hsva: (e, t, n, l) => bt({
    h: e,
    s: t,
    v: n,
    a: l
  })
};
function yt(e) {
  if (typeof e == "number")
    return (isNaN(e) || e < 0 || e > 16777215) && ht(`'${e}' is not a valid hex color`), {
      r: (e & 16711680) >> 16,
      g: (e & 65280) >> 8,
      b: e & 255
    };
  if (typeof e == "string" && bl.test(e)) {
    const {
      groups: t
    } = e.match(bl), {
      fn: n,
      values: l
    } = t, a = l.split(/,\s*/).map((i) => i.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(i) / 100 : parseFloat(i));
    return Yi[n](...a);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    [3, 4].includes(t.length) ? t = t.split("").map((l) => l + l).join("") : [6, 8].includes(t.length) || ht(`'${e}' is not a valid hex(a) color`);
    const n = parseInt(t, 16);
    return (isNaN(n) || n < 0 || n > 4294967295) && ht(`'${e}' is not a valid hex(a) color`), Xi(t);
  } else if (typeof e == "object") {
    if (mn(e, ["r", "g", "b"]))
      return e;
    if (mn(e, ["h", "s", "l"]))
      return bt(ea(e));
    if (mn(e, ["h", "s", "v"]))
      return bt(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function bt(e) {
  const {
    h: t,
    s: n,
    v: l,
    a
  } = e, i = (r) => {
    const s = (r + t / 60) % 6;
    return l - l * n * Math.max(Math.min(s, 4 - s, 1), 0);
  }, o = [i(5), i(3), i(1)].map((r) => Math.round(r * 255));
  return {
    r: o[0],
    g: o[1],
    b: o[2],
    a
  };
}
function Cl(e) {
  return bt(ea(e));
}
function ea(e) {
  const {
    h: t,
    s: n,
    l,
    a
  } = e, i = l + n * Math.min(l, 1 - l), o = i === 0 ? 0 : 2 - 2 * l / i;
  return {
    h: t,
    s: o,
    v: i,
    a
  };
}
function Xi(e) {
  e = Zi(e);
  let [t, n, l, a] = Li(e, 2).map((i) => parseInt(i, 16));
  return a = a === void 0 ? a : a / 255, {
    r: t,
    g: n,
    b: l,
    a
  };
}
function Zi(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = al(al(e, 6), 8, "F")), e;
}
function Qi(e) {
  const t = Math.abs(hl(yt(0), yt(e)));
  return Math.abs(hl(yt(16777215), yt(e))) > Math.min(t, 50) ? "#fff" : "#000";
}
function A(e, t) {
  return (n) => Object.keys(e).reduce((l, a) => {
    const o = typeof e[a] == "object" && e[a] != null && !Array.isArray(e[a]) ? e[a] : {
      type: e[a]
    };
    return n && a in n ? l[a] = {
      ...o,
      default: n[a]
    } : l[a] = o, t && !l[a].source && (l[a].source = t), l;
  }, {});
}
const Q = A({
  class: [String, Array],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component"), Qt = Symbol.for("vuetify:defaults");
function Hn() {
  const e = ce(Qt);
  if (!e)
    throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function _t(e, t) {
  const n = Hn(), l = N(e), a = m(() => {
    if (we(t == null ? void 0 : t.disabled))
      return n.value;
    const o = we(t == null ? void 0 : t.scoped), r = we(t == null ? void 0 : t.reset), s = we(t == null ? void 0 : t.root);
    if (l.value == null && !(o || r || s))
      return n.value;
    let d = nt(l.value, {
      prev: n.value
    });
    if (o)
      return d;
    if (r || s) {
      const g = Number(r || 1 / 0);
      for (let f = 0; f <= g && !(!d || !("prev" in d)); f++)
        d = d.prev;
      return d && typeof s == "string" && s in d && (d = nt(nt(d, {
        prev: d
      }), d[s])), d;
    }
    return d.prev ? nt(d.prev, d) : d;
  });
  return _e(Qt, a), a;
}
function Ji(e, t) {
  var n, l;
  return typeof ((n = e.props) == null ? void 0 : n[t]) < "u" || typeof ((l = e.props) == null ? void 0 : l[Ye(t)]) < "u";
}
function eo() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Hn();
  const l = fe("useDefaults");
  if (t = t ?? l.type.name ?? l.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const a = m(() => {
    var s;
    return (s = n.value) == null ? void 0 : s[e._as ?? t];
  }), i = new Proxy(e, {
    get(s, d) {
      var f, c, v, h;
      const g = Reflect.get(s, d);
      return d === "class" || d === "style" ? [(f = a.value) == null ? void 0 : f[d], g].filter((y) => y != null) : typeof d == "string" && !Ji(l.vnode, d) ? ((c = a.value) == null ? void 0 : c[d]) ?? ((h = (v = n.value) == null ? void 0 : v.global) == null ? void 0 : h[d]) ?? g : g;
    }
  }), o = W();
  De(() => {
    if (a.value) {
      const s = Object.entries(a.value).filter((d) => {
        let [g] = d;
        return g.startsWith(g[0].toUpperCase());
      });
      o.value = s.length ? Object.fromEntries(s) : void 0;
    } else
      o.value = void 0;
  });
  function r() {
    const s = ao(Qt, l);
    _e(Qt, m(() => o.value ? nt((s == null ? void 0 : s.value) ?? {}, o.value) : s == null ? void 0 : s.value));
  }
  return {
    props: i,
    provideSubDefaults: r
  };
}
function It(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return ht("The component is missing an explicit name, unable to generate default prop value"), e;
  if (e._setup) {
    e.props = A(e.props ?? {}, e.name)();
    const t = Object.keys(e.props);
    e.filterProps = function(l) {
      return ot(l, t, ["class", "style"]);
    }, e.props._as = String, e.setup = function(l, a) {
      const i = Hn();
      if (!i.value)
        return e._setup(l, a);
      const {
        props: o,
        provideSubDefaults: r
      } = eo(l, l._as ?? e.name, i), s = e._setup(o, a);
      return r(), s;
    };
  }
  return e;
}
function q() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? It : Tn)(t);
}
function ta(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return q()({
    name: n ?? Hl(jl(e.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: t
      },
      ...Q()
    },
    setup(l, a) {
      let {
        slots: i
      } = a;
      return () => {
        var o;
        return rn(l.tag, {
          class: [e, l.class],
          style: l.style
        }, (o = i.default) == null ? void 0 : o.call(i));
      };
    }
  });
}
function na(e) {
  if (typeof e.getRootNode != "function") {
    for (; e.parentNode; )
      e = e.parentNode;
    return e !== document ? null : document;
  }
  const t = e.getRootNode();
  return t !== document && t.getRootNode({
    composed: !0
  }) !== document ? null : t;
}
const Jt = "cubic-bezier(0.4, 0, 0.2, 1)", to = "cubic-bezier(0.0, 0, 0.2, 1)", no = "cubic-bezier(0.4, 0, 1, 1)";
function fe(e, t) {
  const n = Si();
  if (!n)
    throw new Error(`[Vuetify] ${e} ${t || "must be called from inside a setup function"}`);
  return n;
}
function $e() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = fe(e).type;
  return Ye((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
let la = 0, qt = /* @__PURE__ */ new WeakMap();
function Fe() {
  const e = fe("getUid");
  if (qt.has(e))
    return qt.get(e);
  {
    const t = la++;
    return qt.set(e, t), t;
  }
}
Fe.reset = () => {
  la = 0, qt = /* @__PURE__ */ new WeakMap();
};
function aa(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? lo(e) : jn(e))
      return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function en(e, t) {
  const n = [];
  if (t && e && !t.contains(e))
    return n;
  for (; e && (jn(e) && n.push(e), e !== t); )
    e = e.parentElement;
  return n;
}
function jn(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE)
    return !1;
  const t = window.getComputedStyle(e);
  return t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function lo(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE)
    return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function ao(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : fe("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
function io(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function X(e) {
  const t = fe("useRender");
  t.render = e;
}
const oo = A({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function Ce(e, t, n) {
  return q()({
    name: e,
    props: oo({
      mode: n,
      origin: t
    }),
    setup(l, a) {
      let {
        slots: i
      } = a;
      const o = {
        onBeforeEnter(r) {
          l.origin && (r.style.transformOrigin = l.origin);
        },
        onLeave(r) {
          if (l.leaveAbsolute) {
            const {
              offsetTop: s,
              offsetLeft: d,
              offsetWidth: g,
              offsetHeight: f
            } = r;
            r._transitionInitialStyles = {
              position: r.style.position,
              top: r.style.top,
              left: r.style.left,
              width: r.style.width,
              height: r.style.height
            }, r.style.position = "absolute", r.style.top = `${s}px`, r.style.left = `${d}px`, r.style.width = `${g}px`, r.style.height = `${f}px`;
          }
          l.hideOnLeave && r.style.setProperty("display", "none", "important");
        },
        onAfterLeave(r) {
          if (l.leaveAbsolute && (r != null && r._transitionInitialStyles)) {
            const {
              position: s,
              top: d,
              left: g,
              width: f,
              height: c
            } = r._transitionInitialStyles;
            delete r._transitionInitialStyles, r.style.position = s || "", r.style.top = d || "", r.style.left = g || "", r.style.width = f || "", r.style.height = c || "";
          }
        }
      };
      return () => {
        const r = l.group ? pi : Xe;
        return rn(r, {
          name: l.disabled ? "" : e,
          css: !l.disabled,
          ...l.group ? void 0 : {
            mode: l.mode
          },
          ...l.disabled ? {} : o
        }, i.default);
      };
    }
  });
}
function ia(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return q()({
    name: e,
    props: {
      mode: {
        type: String,
        default: n
      },
      disabled: Boolean
    },
    setup(l, a) {
      let {
        slots: i
      } = a;
      return () => rn(Xe, {
        name: l.disabled ? "" : e,
        css: !l.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...l.disabled ? {} : t
      }, i.default);
    }
  });
}
function oa() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height", l = jl(`offset-${n}`);
  return {
    onBeforeEnter(o) {
      o._parent = o.parentNode, o._initialStyle = {
        transition: o.style.transition,
        overflow: o.style.overflow,
        [n]: o.style[n]
      };
    },
    onEnter(o) {
      const r = o._initialStyle;
      o.style.setProperty("transition", "none", "important"), o.style.overflow = "hidden";
      const s = `${o[l]}px`;
      o.style[n] = "0", o.offsetHeight, o.style.transition = r.transition, e && o._parent && o._parent.classList.add(e), requestAnimationFrame(() => {
        o.style[n] = s;
      });
    },
    onAfterEnter: i,
    onEnterCancelled: i,
    onLeave(o) {
      o._initialStyle = {
        transition: "",
        overflow: o.style.overflow,
        [n]: o.style[n]
      }, o.style.overflow = "hidden", o.style[n] = `${o[l]}px`, o.offsetHeight, requestAnimationFrame(() => o.style[n] = "0");
    },
    onAfterLeave: a,
    onLeaveCancelled: a
  };
  function a(o) {
    e && o._parent && o._parent.classList.remove(e), i(o);
  }
  function i(o) {
    const r = o._initialStyle[n];
    o.style.overflow = o._initialStyle.overflow, r != null && (o.style[n] = r), delete o._initialStyle;
  }
}
const ro = A({
  target: Object
}, "v-dialog-transition"), ra = q()({
  name: "VDialogTransition",
  props: ro(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const l = {
      onBeforeEnter(a) {
        a.style.pointerEvents = "none", a.style.visibility = "hidden";
      },
      async onEnter(a, i) {
        var c;
        await new Promise((v) => requestAnimationFrame(v)), await new Promise((v) => requestAnimationFrame(v)), a.style.visibility = "";
        const {
          x: o,
          y: r,
          sx: s,
          sy: d,
          speed: g
        } = pl(e.target, a), f = lt(a, [{
          transform: `translate(${o}px, ${r}px) scale(${s}, ${d})`,
          opacity: 0
        }, {}], {
          duration: 225 * g,
          easing: to
        });
        (c = Sl(a)) == null || c.forEach((v) => {
          lt(v, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * g,
            easing: Jt
          });
        }), f.finished.then(() => i());
      },
      onAfterEnter(a) {
        a.style.removeProperty("pointer-events");
      },
      onBeforeLeave(a) {
        a.style.pointerEvents = "none";
      },
      async onLeave(a, i) {
        var c;
        await new Promise((v) => requestAnimationFrame(v));
        const {
          x: o,
          y: r,
          sx: s,
          sy: d,
          speed: g
        } = pl(e.target, a);
        lt(a, [{}, {
          transform: `translate(${o}px, ${r}px) scale(${s}, ${d})`,
          opacity: 0
        }], {
          duration: 125 * g,
          easing: no
        }).finished.then(() => i()), (c = Sl(a)) == null || c.forEach((v) => {
          lt(v, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * g,
            easing: Jt
          });
        });
      },
      onAfterLeave(a) {
        a.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? u(Xe, U({
      name: "dialog-transition"
    }, l, {
      css: !1
    }), n) : u(Xe, {
      name: "dialog-transition"
    }, n);
  }
});
function Sl(e) {
  var n;
  const t = (n = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : n.children;
  return t && [...t];
}
function pl(e, t) {
  const n = e.getBoundingClientRect(), l = zn(t), [a, i] = getComputedStyle(t).transformOrigin.split(" ").map((S) => parseFloat(S)), [o, r] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let s = n.left + n.width / 2;
  o === "left" || r === "left" ? s -= n.width / 2 : (o === "right" || r === "right") && (s += n.width / 2);
  let d = n.top + n.height / 2;
  o === "top" || r === "top" ? d -= n.height / 2 : (o === "bottom" || r === "bottom") && (d += n.height / 2);
  const g = n.width / l.width, f = n.height / l.height, c = Math.max(1, g, f), v = g / c || 0, h = f / c || 0, y = l.width * l.height / (window.innerWidth * window.innerHeight), C = y > 0.12 ? Math.min(1.5, (y - 0.12) * 10 + 1) : 1;
  return {
    x: s - (a + l.left),
    y: d - (i + l.top),
    sx: v,
    sy: h,
    speed: C
  };
}
Ce("fab-transition", "center center", "out-in");
Ce("dialog-bottom-transition");
Ce("dialog-top-transition");
Ce("fade-transition");
Ce("scale-transition");
Ce("scroll-x-transition");
Ce("scroll-x-reverse-transition");
Ce("scroll-y-transition");
Ce("scroll-y-reverse-transition");
Ce("slide-x-transition");
Ce("slide-x-reverse-transition");
const sa = Ce("slide-y-transition");
Ce("slide-y-reverse-transition");
const so = ia("expand-transition", oa()), ua = ia("expand-x-transition", oa("", !0));
function qn(e) {
  return Dn(() => {
    const t = [], n = {};
    if (e.value.background)
      if (_n(e.value.background)) {
        if (n.backgroundColor = e.value.background, !e.value.text && Ki(e.value.background)) {
          const l = yt(e.value.background);
          if (l.a == null || l.a === 1) {
            const a = Qi(l);
            n.color = a, n.caretColor = a;
          }
        }
      } else
        t.push(`bg-${e.value.background}`);
    return e.value.text && (_n(e.value.text) ? (n.color = e.value.text, n.caretColor = e.value.text) : t.push(`text-${e.value.text}`)), {
      colorClasses: t,
      colorStyles: n
    };
  });
}
function Oe(e, t) {
  const n = m(() => ({
    text: wt(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: l,
    colorStyles: a
  } = qn(n);
  return {
    textColorClasses: l,
    textColorStyles: a
  };
}
function rt(e, t) {
  const n = m(() => ({
    background: wt(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: l,
    colorStyles: a
  } = qn(n);
  return {
    backgroundColorClasses: l,
    backgroundColorStyles: a
  };
}
const ne = [String, Function, Object, Array], uo = Symbol.for("vuetify:icons"), sn = A({
  icon: {
    type: ne
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: !0
  }
}, "icon"), xl = q()({
  name: "VComponentIcon",
  props: sn(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return () => {
      const l = e.icon;
      return u(e.tag, null, {
        default: () => {
          var a;
          return [e.icon ? u(l, null, null) : (a = n.default) == null ? void 0 : a.call(n)];
        }
      });
    };
  }
}), co = It({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: sn(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    return () => u(e.tag, U(n, {
      style: null
    }), {
      default: () => [u("svg", {
        class: "v-icon__svg",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-hidden": "true"
      }, [Array.isArray(e.icon) ? e.icon.map((l) => Array.isArray(l) ? u("path", {
        d: l[0],
        "fill-opacity": l[1]
      }, null) : u("path", {
        d: l
      }, null)) : u("path", {
        d: e.icon
      }, null)])]
    });
  }
});
It({
  name: "VLigatureIcon",
  props: sn(),
  setup(e) {
    return () => u(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
It({
  name: "VClassIcon",
  props: sn(),
  setup(e) {
    return () => u(e.tag, {
      class: e.icon
    }, null);
  }
});
const fo = (e) => {
  const t = ce(uo);
  if (!t)
    throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: m(() => {
      var s;
      const l = we(e);
      if (!l)
        return {
          component: xl
        };
      let a = l;
      if (typeof a == "string" && (a = a.trim(), a.startsWith("$") && (a = (s = t.aliases) == null ? void 0 : s[a.slice(1)])), !a)
        throw new Error(`Could not find aliased icon "${l}"`);
      if (Array.isArray(a))
        return {
          component: co,
          icon: a
        };
      if (typeof a != "string")
        return {
          component: xl,
          icon: a
        };
      const i = Object.keys(t.sets).find((d) => typeof a == "string" && a.startsWith(`${d}:`)), o = i ? a.slice(i.length + 1) : a;
      return {
        component: t.sets[i ?? t.defaultSet].component,
        icon: o
      };
    })
  };
}, vo = ["x-small", "small", "default", "large", "x-large"], Pt = A({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function At(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : $e();
  return Dn(() => {
    let n, l;
    return Yt(vo, e.size) ? n = `${t}--size-${e.size}` : e.size && (l = {
      width: j(e.size),
      height: j(e.size)
    }), {
      sizeClasses: n,
      sizeStyles: l
    };
  });
}
const Ie = A({
  tag: {
    type: String,
    default: "div"
  }
}, "tag"), wl = Symbol.for("vuetify:theme"), ve = A({
  theme: String
}, "theme");
function Se(e) {
  fe("provideTheme");
  const t = ce(wl, null);
  if (!t)
    throw new Error("Could not find Vuetify theme injection");
  const n = m(() => e.theme ?? t.name.value), l = m(() => t.themes.value[n.value]), a = m(() => t.isDisabled ? void 0 : `v-theme--${n.value}`), i = {
    ...t,
    name: n,
    current: l,
    themeClasses: a
  };
  return _e(wl, i), i;
}
const mo = A({
  color: String,
  start: Boolean,
  end: Boolean,
  icon: ne,
  ...Q(),
  ...Pt(),
  ...Ie({
    tag: "i"
  }),
  ...ve()
}, "VIcon"), re = q()({
  name: "VIcon",
  props: mo(),
  setup(e, t) {
    let {
      attrs: n,
      slots: l
    } = t;
    const a = N(), {
      themeClasses: i
    } = Se(e), {
      iconData: o
    } = fo(m(() => a.value || e.icon)), {
      sizeClasses: r
    } = At(e), {
      textColorClasses: s,
      textColorStyles: d
    } = Oe(H(e, "color"));
    return X(() => {
      var f, c;
      const g = (f = l.default) == null ? void 0 : f.call(l);
      return g && (a.value = (c = Xl(g).filter((v) => v.type === xi && v.children && typeof v.children == "string")[0]) == null ? void 0 : c.children), u(o.value.component, {
        tag: e.tag,
        icon: o.value.icon,
        class: ["v-icon", "notranslate", i.value, r.value, s.value, {
          "v-icon--clickable": !!n.onClick,
          "v-icon--start": e.start,
          "v-icon--end": e.end
        }, e.class],
        style: [r.value ? void 0 : {
          fontSize: j(e.size),
          height: j(e.size),
          width: j(e.size)
        }, d.value, e.style],
        role: n.onClick ? "button" : void 0,
        "aria-hidden": !n.onClick
      }, {
        default: () => [g]
      });
    }), {};
  }
});
const dt = A({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function ft(e) {
  return {
    dimensionStyles: m(() => ({
      height: j(e.height),
      maxHeight: j(e.maxHeight),
      maxWidth: j(e.maxWidth),
      minHeight: j(e.minHeight),
      minWidth: j(e.minWidth),
      width: j(e.width)
    }))
  };
}
function go(e) {
  return {
    aspectStyles: m(() => {
      const t = Number(e.aspectRatio);
      return t ? {
        paddingBottom: String(1 / t * 100) + "%"
      } : void 0;
    })
  };
}
const ca = A({
  aspectRatio: [String, Number],
  contentClass: String,
  inline: Boolean,
  ...Q(),
  ...dt()
}, "VResponsive"), Vl = q()({
  name: "VResponsive",
  props: ca(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: l
    } = go(e), {
      dimensionStyles: a
    } = ft(e);
    return X(() => {
      var i;
      return u("div", {
        class: ["v-responsive", {
          "v-responsive--inline": e.inline
        }, e.class],
        style: [a.value, e.style]
      }, [u("div", {
        class: "v-responsive__sizer",
        style: l.value
      }, null), (i = n.additional) == null ? void 0 : i.call(n), n.default && u("div", {
        class: ["v-responsive__content", e.contentClass]
      }, [n.default()])]);
    }), {};
  }
}), vt = A({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), Re = (e, t) => {
  let {
    slots: n
  } = t;
  const {
    transition: l,
    disabled: a,
    ...i
  } = e, {
    component: o = Xe,
    ...r
  } = typeof l == "object" ? l : {};
  return rn(o, U(typeof l == "string" ? {
    name: a ? "" : l
  } : r, i, {
    disabled: a
  }), n);
};
function yo(e, t) {
  if (!Mn)
    return;
  const n = t.modifiers || {}, l = t.value, {
    handler: a,
    options: i
  } = typeof l == "object" ? l : {
    handler: l,
    options: {}
  }, o = new IntersectionObserver(function() {
    var f;
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], s = arguments.length > 1 ? arguments[1] : void 0;
    const d = (f = e._observe) == null ? void 0 : f[t.instance.$.uid];
    if (!d)
      return;
    const g = r.some((c) => c.isIntersecting);
    a && (!n.quiet || d.init) && (!n.once || g || d.init) && a(g, r, s), g && n.once ? da(e, t) : d.init = !0;
  }, i);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: o
  }, o.observe(e);
}
function da(e, t) {
  var l;
  const n = (l = e._observe) == null ? void 0 : l[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const ho = {
  mounted: yo,
  unmounted: da
}, fa = ho, bo = A({
  alt: String,
  cover: Boolean,
  eager: Boolean,
  gradient: String,
  lazySrc: String,
  options: {
    type: Object,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: void 0,
      rootMargin: void 0,
      threshold: void 0
    })
  },
  sizes: String,
  src: {
    type: [String, Object],
    default: ""
  },
  srcset: String,
  ...ca(),
  ...Q(),
  ...vt()
}, "VImg"), Co = q()({
  name: "VImg",
  directives: {
    intersect: fa
  },
  props: bo(),
  emits: {
    loadstart: (e) => !0,
    load: (e) => !0,
    error: (e) => !0
  },
  setup(e, t) {
    let {
      emit: n,
      slots: l
    } = t;
    const a = W(""), i = N(), o = W(e.eager ? "loading" : "idle"), r = W(), s = W(), d = m(() => e.src && typeof e.src == "object" ? {
      src: e.src.src,
      srcset: e.srcset || e.src.srcset,
      lazySrc: e.lazySrc || e.src.lazySrc,
      aspect: Number(e.aspectRatio || e.src.aspect || 0)
    } : {
      src: e.src,
      srcset: e.srcset,
      lazySrc: e.lazySrc,
      aspect: Number(e.aspectRatio || 0)
    }), g = m(() => d.value.aspect || r.value / s.value || 0);
    G(() => e.src, () => {
      f(o.value !== "idle");
    }), G(g, (p, x) => {
      !p && x && i.value && C(i.value);
    }), ql(() => f());
    function f(p) {
      if (!(e.eager && p) && !(Mn && !p && !e.eager)) {
        if (o.value = "loading", d.value.lazySrc) {
          const x = new Image();
          x.src = d.value.lazySrc, C(x, null);
        }
        d.value.src && me(() => {
          var x, L;
          if (n("loadstart", ((x = i.value) == null ? void 0 : x.currentSrc) || d.value.src), (L = i.value) != null && L.complete) {
            if (i.value.naturalWidth || v(), o.value === "error")
              return;
            g.value || C(i.value, null), c();
          } else
            g.value || C(i.value), h();
        });
      }
    }
    function c() {
      var p;
      h(), o.value = "loaded", n("load", ((p = i.value) == null ? void 0 : p.currentSrc) || d.value.src);
    }
    function v() {
      var p;
      o.value = "error", n("error", ((p = i.value) == null ? void 0 : p.currentSrc) || d.value.src);
    }
    function h() {
      const p = i.value;
      p && (a.value = p.currentSrc || p.src);
    }
    let y = -1;
    function C(p) {
      let x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const L = () => {
        clearTimeout(y);
        const {
          naturalHeight: M,
          naturalWidth: T
        } = p;
        M || T ? (r.value = T, s.value = M) : !p.complete && o.value === "loading" && x != null ? y = window.setTimeout(L, x) : (p.currentSrc.endsWith(".svg") || p.currentSrc.startsWith("data:image/svg+xml")) && (r.value = 1, s.value = 1);
      };
      L();
    }
    const S = m(() => ({
      "v-img__img--cover": e.cover,
      "v-img__img--contain": !e.cover
    })), w = () => {
      var L;
      if (!d.value.src || o.value === "idle")
        return null;
      const p = u("img", {
        class: ["v-img__img", S.value],
        src: d.value.src,
        srcset: d.value.srcset,
        alt: e.alt,
        sizes: e.sizes,
        ref: i,
        onLoad: c,
        onError: v
      }, null), x = (L = l.sources) == null ? void 0 : L.call(l);
      return u(Re, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [ke(x ? u("picture", {
          class: "v-img__picture"
        }, [x, p]) : p, [[ut, o.value === "loaded"]])]
      });
    }, b = () => u(Re, {
      transition: e.transition
    }, {
      default: () => [d.value.lazySrc && o.value !== "loaded" && u("img", {
        class: ["v-img__img", "v-img__img--preload", S.value],
        src: d.value.lazySrc,
        alt: e.alt
      }, null)]
    }), I = () => l.placeholder ? u(Re, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(o.value === "loading" || o.value === "error" && !l.error) && u("div", {
        class: "v-img__placeholder"
      }, [l.placeholder()])]
    }) : null, E = () => l.error ? u(Re, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [o.value === "error" && u("div", {
        class: "v-img__error"
      }, [l.error()])]
    }) : null, V = () => e.gradient ? u("div", {
      class: "v-img__gradient",
      style: {
        backgroundImage: `linear-gradient(${e.gradient})`
      }
    }, null) : null, k = W(!1);
    {
      const p = G(g, (x) => {
        x && (requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            k.value = !0;
          });
        }), p());
      });
    }
    return X(() => {
      const [p] = Vl.filterProps(e);
      return ke(u(Vl, U({
        class: ["v-img", {
          "v-img--booting": !k.value
        }, e.class],
        style: [{
          width: j(e.width === "auto" ? r.value : e.width)
        }, e.style]
      }, p, {
        aspectRatio: g.value,
        "aria-label": e.alt,
        role: e.alt ? "img" : void 0
      }), {
        additional: () => u(J, null, [u(w, null, null), u(b, null, null), u(V, null, null), u(I, null, null), u(E, null, null)]),
        default: l.default
      }), [[Qe("intersect"), {
        handler: f,
        options: e.options
      }, null, {
        once: !0
      }]]);
    }), {
      currentSrc: a,
      image: i,
      state: o,
      naturalWidth: r,
      naturalHeight: s
    };
  }
}), So = [null, "default", "comfortable", "compact"], ze = A({
  density: {
    type: String,
    default: "default",
    validator: (e) => So.includes(e)
  }
}, "density");
function He(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : $e();
  return {
    densityClasses: m(() => `${t}--density-${e.density}`)
  };
}
const je = A({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  }
}, "rounded");
function qe(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : $e();
  return {
    roundedClasses: m(() => {
      const l = wt(e) ? e.value : e.rounded, a = [];
      if (l === !0 || l === "")
        a.push(`${t}--rounded`);
      else if (typeof l == "string" || l === 0)
        for (const i of String(l).split(" "))
          a.push(`rounded-${i}`);
      return a;
    })
  };
}
const po = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function un(e, t) {
  return u(J, null, [e && u("span", {
    key: "overlay",
    class: `${t}__overlay`
  }, null), u("span", {
    key: "underlay",
    class: `${t}__underlay`
  }, null)]);
}
const et = A({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => po.includes(e)
  }
}, "variant");
function cn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : $e();
  const n = m(() => {
    const {
      variant: i
    } = we(e);
    return `${t}--variant-${i}`;
  }), {
    colorClasses: l,
    colorStyles: a
  } = qn(m(() => {
    const {
      variant: i,
      color: o
    } = we(e);
    return {
      [["elevated", "flat"].includes(i) ? "background" : "text"]: o
    };
  }));
  return {
    colorClasses: l,
    colorStyles: a,
    variantClasses: n
  };
}
const xo = A({
  start: Boolean,
  end: Boolean,
  icon: ne,
  image: String,
  ...Q(),
  ...ze(),
  ...je(),
  ...Pt(),
  ...Ie(),
  ...ve(),
  ...et({
    variant: "flat"
  })
}, "VAvatar"), tn = q()({
  name: "VAvatar",
  props: xo(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: l
    } = Se(e), {
      colorClasses: a,
      colorStyles: i,
      variantClasses: o
    } = cn(e), {
      densityClasses: r
    } = He(e), {
      roundedClasses: s
    } = qe(e), {
      sizeClasses: d,
      sizeStyles: g
    } = At(e);
    return X(() => u(e.tag, {
      class: ["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, l.value, a.value, r.value, s.value, d.value, o.value, e.class],
      style: [i.value, g.value, e.style]
    }, {
      default: () => {
        var f;
        return [e.image ? u(Co, {
          key: "image",
          src: e.image,
          alt: "",
          cover: !0
        }, null) : e.icon ? u(re, {
          key: "icon",
          icon: e.icon
        }, null) : (f = n.default) == null ? void 0 : f.call(n), un(!1, "v-avatar")];
      }
    })), {};
  }
});
function Ze(e, t) {
  let n;
  function l() {
    n = $n(), n.run(() => t.length ? t(() => {
      n == null || n.stop(), l();
    }) : t());
  }
  G(e, (a) => {
    a && !n ? l() : a || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), ge(() => {
    n == null || n.stop();
  });
}
function se(e, t, n) {
  let l = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (f) => f, a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (f) => f;
  const i = fe("useProxiedModel"), o = N(e[t] !== void 0 ? e[t] : n), r = Ye(t), d = r !== t ? m(() => {
    var f, c, v, h;
    return e[t], !!(((f = i.vnode.props) != null && f.hasOwnProperty(t) || (c = i.vnode.props) != null && c.hasOwnProperty(r)) && ((v = i.vnode.props) != null && v.hasOwnProperty(`onUpdate:${t}`) || (h = i.vnode.props) != null && h.hasOwnProperty(`onUpdate:${r}`)));
  }) : m(() => {
    var f, c;
    return e[t], !!((f = i.vnode.props) != null && f.hasOwnProperty(t) && ((c = i.vnode.props) != null && c.hasOwnProperty(`onUpdate:${t}`)));
  });
  Ze(() => !d.value, () => {
    G(() => e[t], (f) => {
      o.value = f;
    });
  });
  const g = m({
    get() {
      const f = e[t];
      return l(d.value ? f : o.value);
    },
    set(f) {
      const c = a(f), v = Ne(d.value ? e[t] : o.value);
      v === c || l(v) === f || (o.value = c, i == null || i.emit(`update:${t}`, c));
    }
  });
  return Object.defineProperty(g, "externalValue", {
    get: () => d.value ? e[t] : o.value
  }), g;
}
const va = A({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), ma = A({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function ga(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const l = fe("useGroupItem");
  if (!l)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const a = Fe();
  _e(Symbol.for(`${t.description}:id`), a);
  const i = ce(t, null);
  if (!i) {
    if (!n)
      return i;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const o = H(e, "value"), r = m(() => !!(i.disabled.value || e.disabled));
  i.register({
    id: a,
    value: o,
    disabled: r
  }, l), Je(() => {
    i.unregister(a);
  });
  const s = m(() => i.isSelected(a)), d = m(() => s.value && [i.selectedClass.value, e.selectedClass]);
  return G(s, (g) => {
    l.emit("group:selected", {
      value: g
    });
  }), {
    id: a,
    isSelected: s,
    toggle: () => i.select(a, !s.value),
    select: (g) => i.select(a, g),
    selectedClass: d,
    value: o,
    disabled: r,
    group: i
  };
}
function ya(e, t) {
  let n = !1;
  const l = an([]), a = se(e, "modelValue", [], (c) => c == null ? [] : ha(l, Ae(c)), (c) => {
    const v = Vo(l, c);
    return e.multiple ? v : v[0];
  }), i = fe("useGroup");
  function o(c, v) {
    const h = c, y = Symbol.for(`${t.description}:id`), S = Ht(y, i == null ? void 0 : i.vnode).indexOf(v);
    S > -1 ? l.splice(S, 0, h) : l.push(h);
  }
  function r(c) {
    if (n)
      return;
    s();
    const v = l.findIndex((h) => h.id === c);
    l.splice(v, 1);
  }
  function s() {
    const c = l.find((v) => !v.disabled);
    c && e.mandatory === "force" && !a.value.length && (a.value = [c.id]);
  }
  ct(() => {
    s();
  }), Je(() => {
    n = !0;
  });
  function d(c, v) {
    const h = l.find((y) => y.id === c);
    if (!(v && (h != null && h.disabled)))
      if (e.multiple) {
        const y = a.value.slice(), C = y.findIndex((w) => w === c), S = ~C;
        if (v = v ?? !S, S && e.mandatory && y.length <= 1 || !S && e.max != null && y.length + 1 > e.max)
          return;
        C < 0 && v ? y.push(c) : C >= 0 && !v && y.splice(C, 1), a.value = y;
      } else {
        const y = a.value.includes(c);
        if (e.mandatory && y)
          return;
        a.value = v ?? !y ? [c] : [];
      }
  }
  function g(c) {
    if (e.multiple && ht('This method is not supported when using "multiple" prop'), a.value.length) {
      const v = a.value[0], h = l.findIndex((S) => S.id === v);
      let y = (h + c) % l.length, C = l[y];
      for (; C.disabled && y !== h; )
        y = (y + c) % l.length, C = l[y];
      if (C.disabled)
        return;
      a.value = [l[y].id];
    } else {
      const v = l.find((h) => !h.disabled);
      v && (a.value = [v.id]);
    }
  }
  const f = {
    register: o,
    unregister: r,
    selected: a,
    select: d,
    disabled: H(e, "disabled"),
    prev: () => g(l.length - 1),
    next: () => g(1),
    isSelected: (c) => a.value.includes(c),
    selectedClass: m(() => e.selectedClass),
    items: m(() => l),
    getItemIndex: (c) => wo(l, c)
  };
  return _e(t, f), f;
}
function wo(e, t) {
  const n = ha(e, [t]);
  return n.length ? e.findIndex((l) => l.id === n[0]) : -1;
}
function ha(e, t) {
  const n = [];
  return t.forEach((l) => {
    const a = e.find((o) => Vt(l, o.value)), i = e[l];
    (a == null ? void 0 : a.value) != null ? n.push(a.id) : i != null && n.push(i.id);
  }), n;
}
function Vo(e, t) {
  const n = [];
  return t.forEach((l) => {
    const a = e.findIndex((i) => i.id === l);
    if (~a) {
      const i = e[a];
      n.push(i.value != null ? i.value : a);
    }
  }), n;
}
const ba = Symbol.for("vuetify:v-chip-group"), ko = A({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: Vt
  },
  ...Q(),
  ...va({
    selectedClass: "v-chip--selected"
  }),
  ...Ie(),
  ...ve(),
  ...et({
    variant: "tonal"
  })
}, "VChipGroup");
q()({
  name: "VChipGroup",
  props: ko(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: l
    } = Se(e), {
      isSelected: a,
      select: i,
      next: o,
      prev: r,
      selected: s
    } = ya(e, ba);
    return _t({
      VChip: {
        color: H(e, "color"),
        disabled: H(e, "disabled"),
        filter: H(e, "filter"),
        variant: H(e, "variant")
      }
    }), X(() => u(e.tag, {
      class: ["v-chip-group", {
        "v-chip-group--column": e.column
      }, l.value, e.class],
      style: e.style
    }, {
      default: () => {
        var d;
        return [(d = n.default) == null ? void 0 : d.call(n, {
          isSelected: a,
          select: i,
          next: o,
          prev: r,
          selected: s.value
        })];
      }
    })), {};
  }
});
const _o = A({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), he = q(!1)({
  name: "VDefaultsProvider",
  props: _o(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      defaults: l,
      disabled: a,
      reset: i,
      root: o,
      scoped: r
    } = zl(e);
    return _t(l, {
      reset: i,
      root: o,
      scoped: r,
      disabled: a
    }), () => {
      var s;
      return (s = n.default) == null ? void 0 : s.call(n);
    };
  }
}), Et = A({
  border: [Boolean, Number, String]
}, "border");
function Bt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : $e();
  return {
    borderClasses: m(() => {
      const l = wt(e) ? e.value : e.border, a = [];
      if (l === !0 || l === "")
        a.push(`${t}--border`);
      else if (typeof l == "string" || l === 0)
        for (const i of String(l).split(" "))
          a.push(`border-${i}`);
      return a;
    })
  };
}
const Ot = A({
  elevation: {
    type: [Number, String],
    validator(e) {
      const t = parseInt(e);
      return !isNaN(t) && t >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      t <= 24;
    }
  }
}, "elevation");
function Lt(e) {
  return {
    elevationClasses: m(() => {
      const n = wt(e) ? e.value : e.elevation, l = [];
      return n == null || l.push(`elevation-${n}`), l;
    })
  };
}
const Ca = Symbol.for("vuetify:locale");
function dn() {
  const e = ce(Ca);
  if (!e)
    throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function Tt() {
  const e = ce(Ca);
  if (!e)
    throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
function Io() {
  var e, t;
  return (t = (e = fe("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function Gn(e, t) {
  const n = wi("RouterLink"), l = m(() => !!(e.href || e.to)), a = m(() => (l == null ? void 0 : l.value) || il(t, "click") || il(e, "click"));
  if (typeof n == "string")
    return {
      isLink: l,
      isClickable: a,
      href: H(e, "href")
    };
  const i = e.to ? n.useLink(e) : void 0;
  return {
    isLink: l,
    isClickable: a,
    route: i == null ? void 0 : i.route,
    navigate: i == null ? void 0 : i.navigate,
    isActive: i && m(() => {
      var o, r;
      return e.exact ? (o = i.isExactActive) == null ? void 0 : o.value : (r = i.isActive) == null ? void 0 : r.value;
    }),
    href: m(() => e.to ? i == null ? void 0 : i.route.value.href : e.href)
  };
}
const Wn = A({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let hn = !1;
function Po(e, t) {
  let n = !1, l, a;
  be && (me(() => {
    window.addEventListener("popstate", i), l = e == null ? void 0 : e.beforeEach((o, r, s) => {
      hn ? n ? t(s) : s() : setTimeout(() => n ? t(s) : s()), hn = !0;
    }), a = e == null ? void 0 : e.afterEach(() => {
      hn = !1;
    });
  }), ge(() => {
    window.removeEventListener("popstate", i), l == null || l(), a == null || a();
  }));
  function i(o) {
    var r;
    (r = o.state) != null && r.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
const In = Symbol("rippleStop"), Ao = 80;
function kl(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function Pn(e) {
  return e.constructor.name === "TouchEvent";
}
function Sa(e) {
  return e.constructor.name === "KeyboardEvent";
}
const Eo = function(e, t) {
  var f;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, l = 0, a = 0;
  if (!Sa(e)) {
    const c = t.getBoundingClientRect(), v = Pn(e) ? e.touches[e.touches.length - 1] : e;
    l = v.clientX - c.left, a = v.clientY - c.top;
  }
  let i = 0, o = 0.3;
  (f = t._ripple) != null && f.circle ? (o = 0.15, i = t.clientWidth / 2, i = n.center ? i : i + Math.sqrt((l - i) ** 2 + (a - i) ** 2) / 4) : i = Math.sqrt(t.clientWidth ** 2 + t.clientHeight ** 2) / 2;
  const r = `${(t.clientWidth - i * 2) / 2}px`, s = `${(t.clientHeight - i * 2) / 2}px`, d = n.center ? r : `${l - i}px`, g = n.center ? s : `${a - i}px`;
  return {
    radius: i,
    scale: o,
    x: d,
    y: g,
    centerX: r,
    centerY: s
  };
}, nn = {
  /* eslint-disable max-statements */
  show(e, t) {
    var v;
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!((v = t == null ? void 0 : t._ripple) != null && v.enabled))
      return;
    const l = document.createElement("span"), a = document.createElement("span");
    l.appendChild(a), l.className = "v-ripple__container", n.class && (l.className += ` ${n.class}`);
    const {
      radius: i,
      scale: o,
      x: r,
      y: s,
      centerX: d,
      centerY: g
    } = Eo(e, t, n), f = `${i * 2}px`;
    a.className = "v-ripple__animation", a.style.width = f, a.style.height = f, t.appendChild(l);
    const c = window.getComputedStyle(t);
    c && c.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), a.classList.add("v-ripple__animation--enter"), a.classList.add("v-ripple__animation--visible"), kl(a, `translate(${r}, ${s}) scale3d(${o},${o},${o})`), a.dataset.activated = String(performance.now()), setTimeout(() => {
      a.classList.remove("v-ripple__animation--enter"), a.classList.add("v-ripple__animation--in"), kl(a, `translate(${d}, ${g}) scale3d(1,1,1)`);
    }, 0);
  },
  hide(e) {
    var i;
    if (!((i = e == null ? void 0 : e._ripple) != null && i.enabled))
      return;
    const t = e.getElementsByClassName("v-ripple__animation");
    if (t.length === 0)
      return;
    const n = t[t.length - 1];
    if (n.dataset.isHiding)
      return;
    n.dataset.isHiding = "true";
    const l = performance.now() - Number(n.dataset.activated), a = Math.max(250 - l, 0);
    setTimeout(() => {
      n.classList.remove("v-ripple__animation--in"), n.classList.add("v-ripple__animation--out"), setTimeout(() => {
        var r;
        e.getElementsByClassName("v-ripple__animation").length === 1 && e.dataset.previousPosition && (e.style.position = e.dataset.previousPosition, delete e.dataset.previousPosition), ((r = n.parentNode) == null ? void 0 : r.parentNode) === e && e.removeChild(n.parentNode);
      }, 300);
    }, a);
  }
};
function pa(e) {
  return typeof e > "u" || !!e;
}
function Ct(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[In])) {
    if (e[In] = !0, Pn(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch)
      return;
    if (t.center = n._ripple.centered || Sa(e), n._ripple.class && (t.class = n._ripple.class), Pn(e)) {
      if (n._ripple.showTimerCommit)
        return;
      n._ripple.showTimerCommit = () => {
        nn.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var l;
        (l = n == null ? void 0 : n._ripple) != null && l.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, Ao);
    } else
      nn.show(e, n, t);
  }
}
function _l(e) {
  e[In] = !0;
}
function ye(e) {
  const t = e.currentTarget;
  if (t != null && t._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        ye(e);
      });
      return;
    }
    window.setTimeout(() => {
      t._ripple && (t._ripple.touched = !1);
    }), nn.hide(t);
  }
}
function xa(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let St = !1;
function wa(e) {
  !St && (e.keyCode === ll.enter || e.keyCode === ll.space) && (St = !0, Ct(e));
}
function Va(e) {
  St = !1, ye(e);
}
function ka(e) {
  St && (St = !1, ye(e));
}
function _a(e, t, n) {
  const {
    value: l,
    modifiers: a
  } = t, i = pa(l);
  if (i || nn.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = i, e._ripple.centered = a.center, e._ripple.circle = a.circle, xn(l) && l.class && (e._ripple.class = l.class), i && !n) {
    if (a.stop) {
      e.addEventListener("touchstart", _l, {
        passive: !0
      }), e.addEventListener("mousedown", _l);
      return;
    }
    e.addEventListener("touchstart", Ct, {
      passive: !0
    }), e.addEventListener("touchend", ye, {
      passive: !0
    }), e.addEventListener("touchmove", xa, {
      passive: !0
    }), e.addEventListener("touchcancel", ye), e.addEventListener("mousedown", Ct), e.addEventListener("mouseup", ye), e.addEventListener("mouseleave", ye), e.addEventListener("keydown", wa), e.addEventListener("keyup", Va), e.addEventListener("blur", ka), e.addEventListener("dragstart", ye, {
      passive: !0
    });
  } else
    !i && n && Ia(e);
}
function Ia(e) {
  e.removeEventListener("mousedown", Ct), e.removeEventListener("touchstart", Ct), e.removeEventListener("touchend", ye), e.removeEventListener("touchmove", xa), e.removeEventListener("touchcancel", ye), e.removeEventListener("mouseup", ye), e.removeEventListener("mouseleave", ye), e.removeEventListener("keydown", wa), e.removeEventListener("keyup", Va), e.removeEventListener("dragstart", ye), e.removeEventListener("blur", ka);
}
function Bo(e, t) {
  _a(e, t, !1);
}
function Oo(e) {
  delete e._ripple, Ia(e);
}
function Lo(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = pa(t.oldValue);
  _a(e, t, n);
}
const fn = {
  mounted: Bo,
  unmounted: Oo,
  updated: Lo
}, To = A({
  activeClass: String,
  appendAvatar: String,
  appendIcon: ne,
  closable: Boolean,
  closeIcon: {
    type: ne,
    default: "$delete"
  },
  closeLabel: {
    type: String,
    default: "$vuetify.close"
  },
  draggable: Boolean,
  filter: Boolean,
  filterIcon: {
    type: String,
    default: "$complete"
  },
  label: Boolean,
  link: {
    type: Boolean,
    default: void 0
  },
  pill: Boolean,
  prependAvatar: String,
  prependIcon: ne,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  modelValue: {
    type: Boolean,
    default: !0
  },
  onClick: Be(),
  onClickOnce: Be(),
  ...Et(),
  ...Q(),
  ...ze(),
  ...Ot(),
  ...ma(),
  ...je(),
  ...Wn(),
  ...Pt(),
  ...Ie({
    tag: "span"
  }),
  ...ve(),
  ...et({
    variant: "tonal"
  })
}, "VChip"), Un = q()({
  name: "VChip",
  directives: {
    Ripple: fn
  },
  props: To(),
  emits: {
    "click:close": (e) => !0,
    "update:modelValue": (e) => !0,
    "group:selected": (e) => !0,
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: l,
      slots: a
    } = t;
    const {
      t: i
    } = dn(), {
      borderClasses: o
    } = Bt(e), {
      colorClasses: r,
      colorStyles: s,
      variantClasses: d
    } = cn(e), {
      densityClasses: g
    } = He(e), {
      elevationClasses: f
    } = Lt(e), {
      roundedClasses: c
    } = qe(e), {
      sizeClasses: v
    } = At(e), {
      themeClasses: h
    } = Se(e), y = se(e, "modelValue"), C = ga(e, ba, !1), S = Gn(e, n), w = m(() => e.link !== !1 && S.isLink.value), b = m(() => !e.disabled && e.link !== !1 && (!!C || e.link || S.isClickable.value)), I = m(() => ({
      "aria-label": i(e.closeLabel),
      onClick(k) {
        k.stopPropagation(), y.value = !1, l("click:close", k);
      }
    }));
    function E(k) {
      var p;
      l("click", k), b.value && ((p = S.navigate) == null || p.call(S, k), C == null || C.toggle());
    }
    function V(k) {
      (k.key === "Enter" || k.key === " ") && (k.preventDefault(), E(k));
    }
    return () => {
      const k = S.isLink.value ? "a" : e.tag, p = !!(e.appendIcon || e.appendAvatar), x = !!(p || a.append), L = !!(a.close || e.closable), M = !!(a.filter || e.filter) && C, T = !!(e.prependIcon || e.prependAvatar), O = !!(T || a.prepend), $ = !C || C.isSelected.value;
      return y.value && ke(u(k, {
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": b.value,
          "v-chip--filter": M,
          "v-chip--pill": e.pill
        }, h.value, o.value, $ ? r.value : void 0, g.value, f.value, c.value, v.value, d.value, C == null ? void 0 : C.selectedClass.value, e.class],
        style: [$ ? s.value : void 0, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        href: S.href.value,
        tabindex: b.value ? 0 : void 0,
        onClick: E,
        onKeydown: b.value && !w.value && V
      }, {
        default: () => {
          var z;
          return [un(b.value, "v-chip"), M && u(ua, {
            key: "filter"
          }, {
            default: () => [ke(u("div", {
              class: "v-chip__filter"
            }, [a.filter ? u(he, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, a.filter) : u(re, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[ut, C.isSelected.value]])]
          }), O && u("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [a.prepend ? u(he, {
            key: "prepend-defaults",
            disabled: !T,
            defaults: {
              VAvatar: {
                image: e.prependAvatar,
                start: !0
              },
              VIcon: {
                icon: e.prependIcon,
                start: !0
              }
            }
          }, a.prepend) : u(J, null, [e.prependIcon && u(re, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && u(tn, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), u("div", {
            class: "v-chip__content"
          }, [((z = a.default) == null ? void 0 : z.call(a, {
            isSelected: C == null ? void 0 : C.isSelected.value,
            selectedClass: C == null ? void 0 : C.selectedClass.value,
            select: C == null ? void 0 : C.select,
            toggle: C == null ? void 0 : C.toggle,
            value: C == null ? void 0 : C.value.value,
            disabled: e.disabled
          })) ?? e.text]), x && u("div", {
            key: "append",
            class: "v-chip__append"
          }, [a.append ? u(he, {
            key: "append-defaults",
            disabled: !p,
            defaults: {
              VAvatar: {
                end: !0,
                image: e.appendAvatar
              },
              VIcon: {
                end: !0,
                icon: e.appendIcon
              }
            }
          }, a.append) : u(J, null, [e.appendIcon && u(re, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && u(tn, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), L && u("div", U({
            key: "close",
            class: "v-chip__close"
          }, I.value), [a.close ? u(he, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, a.close) : u(re, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[Qe("ripple"), b.value && e.ripple, null]]);
    };
  }
});
const $o = A({
  text: String,
  clickable: Boolean,
  ...Q(),
  ...ve()
}, "VLabel"), Pa = q()({
  name: "VLabel",
  props: $o(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return X(() => {
      var l;
      return u("label", {
        class: ["v-label", {
          "v-label--clickable": e.clickable
        }, e.class],
        style: e.style
      }, [e.text, (l = n.default) == null ? void 0 : l.call(n)]);
    }), {};
  }
});
const Aa = Symbol.for("vuetify:selection-control-group"), Ea = A({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: ne,
  trueIcon: ne,
  ripple: {
    type: Boolean,
    default: !0
  },
  multiple: {
    type: Boolean,
    default: null
  },
  name: String,
  readonly: Boolean,
  modelValue: null,
  type: String,
  valueComparator: {
    type: Function,
    default: Vt
  },
  ...Q(),
  ...ze(),
  ...ve()
}, "SelectionControlGroup"), Fo = A({
  ...Ea({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
q()({
  name: "VSelectionControlGroup",
  props: Fo(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const l = se(e, "modelValue"), a = Fe(), i = m(() => e.id || `v-selection-control-group-${a}`), o = m(() => e.name || i.value), r = /* @__PURE__ */ new Set();
    return _e(Aa, {
      modelValue: l,
      forceUpdate: () => {
        r.forEach((s) => s());
      },
      onForceUpdate: (s) => {
        r.add(s), ge(() => {
          r.delete(s);
        });
      }
    }), _t({
      [e.defaultsTarget]: {
        color: H(e, "color"),
        disabled: H(e, "disabled"),
        density: H(e, "density"),
        error: H(e, "error"),
        inline: H(e, "inline"),
        modelValue: l,
        multiple: m(() => !!e.multiple || e.multiple == null && Array.isArray(l.value)),
        name: o,
        falseIcon: H(e, "falseIcon"),
        trueIcon: H(e, "trueIcon"),
        readonly: H(e, "readonly"),
        ripple: H(e, "ripple"),
        type: H(e, "type"),
        valueComparator: H(e, "valueComparator")
      }
    }), X(() => {
      var s;
      return u("div", {
        class: ["v-selection-control-group", {
          "v-selection-control-group--inline": e.inline
        }, e.class],
        style: e.style,
        role: e.type === "radio" ? "radiogroup" : void 0
      }, [(s = n.default) == null ? void 0 : s.call(n)]);
    }), {};
  }
});
const Ba = A({
  label: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...Q(),
  ...Ea()
}, "VSelectionControl");
function Mo(e) {
  const t = ce(Aa, void 0), {
    densityClasses: n
  } = He(e), l = se(e, "modelValue"), a = m(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), i = m(() => e.falseValue !== void 0 ? e.falseValue : !1), o = m(() => !!e.multiple || e.multiple == null && Array.isArray(l.value)), r = m({
    get() {
      const v = t ? t.modelValue.value : l.value;
      return o.value ? v.some((h) => e.valueComparator(h, a.value)) : e.valueComparator(v, a.value);
    },
    set(v) {
      if (e.readonly)
        return;
      const h = v ? a.value : i.value;
      let y = h;
      o.value && (y = v ? [...Ae(l.value), h] : Ae(l.value).filter((C) => !e.valueComparator(C, a.value))), t ? t.modelValue.value = y : l.value = y;
    }
  }), {
    textColorClasses: s,
    textColorStyles: d
  } = Oe(m(() => r.value && !e.error && !e.disabled ? e.color : void 0)), {
    backgroundColorClasses: g,
    backgroundColorStyles: f
  } = rt(m(() => r.value && !e.error && !e.disabled ? e.color : void 0)), c = m(() => r.value ? e.trueIcon : e.falseIcon);
  return {
    group: t,
    densityClasses: n,
    trueValue: a,
    falseValue: i,
    model: r,
    textColorClasses: s,
    textColorStyles: d,
    backgroundColorClasses: g,
    backgroundColorStyles: f,
    icon: c
  };
}
const Il = q()({
  name: "VSelectionControl",
  directives: {
    Ripple: fn
  },
  inheritAttrs: !1,
  props: Ba(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: l
    } = t;
    const {
      group: a,
      densityClasses: i,
      icon: o,
      model: r,
      textColorClasses: s,
      textColorStyles: d,
      backgroundColorClasses: g,
      backgroundColorStyles: f,
      trueValue: c
    } = Mo(e), v = Fe(), h = m(() => e.id || `input-${v}`), y = W(!1), C = W(!1), S = N();
    a == null || a.onForceUpdate(() => {
      S.value && (S.value.checked = r.value);
    });
    function w(E) {
      y.value = !0, Zt(E.target, ":focus-visible") !== !1 && (C.value = !0);
    }
    function b() {
      y.value = !1, C.value = !1;
    }
    function I(E) {
      e.readonly && a && me(() => a.forceUpdate()), r.value = E.target.checked;
    }
    return X(() => {
      var x, L;
      const E = l.label ? l.label({
        label: e.label,
        props: {
          for: h.value
        }
      }) : e.label, [V, k] = Yl(n), p = u("input", U({
        ref: S,
        checked: r.value,
        disabled: !!(e.readonly || e.disabled),
        id: h.value,
        onBlur: b,
        onFocus: w,
        onInput: I,
        "aria-disabled": !!(e.readonly || e.disabled),
        type: e.type,
        value: c.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? r.value : void 0
      }, k), null);
      return u("div", U({
        class: ["v-selection-control", {
          "v-selection-control--dirty": r.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": y.value,
          "v-selection-control--focus-visible": C.value,
          "v-selection-control--inline": e.inline
        }, i.value, e.class]
      }, V, {
        style: e.style
      }), [u("div", {
        class: ["v-selection-control__wrapper", s.value],
        style: d.value
      }, [(x = l.default) == null ? void 0 : x.call(l, {
        backgroundColorClasses: g,
        backgroundColorStyles: f
      }), ke(u("div", {
        class: ["v-selection-control__input"]
      }, [((L = l.input) == null ? void 0 : L.call(l, {
        model: r,
        textColorClasses: s,
        textColorStyles: d,
        backgroundColorClasses: g,
        backgroundColorStyles: f,
        inputNode: p,
        icon: o.value,
        props: {
          onFocus: w,
          onBlur: b,
          id: h.value
        }
      })) ?? u(J, null, [o.value && u(re, {
        key: "icon",
        icon: o.value
      }, null), p])]), [[Qe("ripple"), e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), E && u(Pa, {
        for: h.value,
        clickable: !0,
        onClick: (M) => M.stopPropagation()
      }, {
        default: () => [E]
      })]);
    }), {
      isFocused: y,
      input: S
    };
  }
}), Ro = A({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: ne,
    default: "$checkboxIndeterminate"
  },
  ...Ba({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), Oa = q()({
  name: "VCheckboxBtn",
  props: Ro(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:indeterminate": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const l = se(e, "indeterminate"), a = se(e, "modelValue");
    function i(s) {
      l.value && (l.value = !1);
    }
    const o = m(() => l.value ? e.indeterminateIcon : e.falseIcon), r = m(() => l.value ? e.indeterminateIcon : e.trueIcon);
    return X(() => {
      const s = kt(Il.filterProps(e)[0], ["modelValue"]);
      return u(Il, U(s, {
        modelValue: a.value,
        "onUpdate:modelValue": [(d) => a.value = d, i],
        class: ["v-checkbox-btn", e.class],
        style: e.style,
        type: "checkbox",
        falseIcon: o.value,
        trueIcon: r.value,
        "aria-checked": l.value ? "mixed" : void 0
      }), n);
    }), {};
  }
});
function La(e) {
  const {
    t
  } = dn();
  function n(l) {
    let {
      name: a
    } = l;
    const i = {
      prepend: "prependAction",
      prependInner: "prependAction",
      append: "appendAction",
      appendInner: "appendAction",
      clear: "clear"
    }[a], o = e[`onClick:${a}`], r = o && i ? t(`$vuetify.input.${i}`, e.label ?? "") : void 0;
    return u(re, {
      icon: e[`${a}Icon`],
      "aria-label": r,
      onClick: o
    }, null);
  }
  return {
    InputIcon: n
  };
}
const Do = A({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...Q(),
  ...vt({
    transition: {
      component: sa,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), No = q()({
  name: "VMessages",
  props: Do(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const l = m(() => Ae(e.messages)), {
      textColorClasses: a,
      textColorStyles: i
    } = Oe(m(() => e.color));
    return X(() => u(Re, {
      transition: e.transition,
      tag: "div",
      class: ["v-messages", a.value, e.class],
      style: [i.value, e.style],
      role: "alert",
      "aria-live": "polite"
    }, {
      default: () => [e.active && l.value.map((o, r) => u("div", {
        class: "v-messages__message",
        key: `${r}-${l.value}`
      }, [n.message ? n.message({
        message: o
      }) : o]))]
    })), {};
  }
}), Ta = A({
  focused: Boolean,
  "onUpdate:focused": Be()
}, "focus");
function $a(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : $e();
  const n = se(e, "focused"), l = m(() => ({
    [`${t}--focused`]: n.value
  }));
  function a() {
    n.value = !0;
  }
  function i() {
    n.value = !1;
  }
  return {
    focusClasses: l,
    isFocused: n,
    focus: a,
    blur: i
  };
}
const zo = Symbol.for("vuetify:form");
function Kn() {
  return ce(zo, null);
}
const Ho = A({
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  errorMessages: {
    type: [Array, String],
    default: () => []
  },
  maxErrors: {
    type: [Number, String],
    default: 1
  },
  name: String,
  label: String,
  readonly: {
    type: Boolean,
    default: null
  },
  rules: {
    type: Array,
    default: () => []
  },
  modelValue: null,
  validateOn: String,
  validationValue: null,
  ...Ta()
}, "validation");
function jo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : $e(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Fe();
  const l = se(e, "modelValue"), a = m(() => e.validationValue === void 0 ? l.value : e.validationValue), i = Kn(), o = N([]), r = W(!0), s = m(() => !!(Ae(l.value === "" ? null : l.value).length || Ae(a.value === "" ? null : a.value).length)), d = m(() => !!(e.disabled ?? (i == null ? void 0 : i.isDisabled.value))), g = m(() => !!(e.readonly ?? (i == null ? void 0 : i.isReadonly.value))), f = m(() => {
    var I;
    return (I = e.errorMessages) != null && I.length ? Ae(e.errorMessages).slice(0, Math.max(0, +e.maxErrors)) : o.value;
  }), c = m(() => {
    let I = (e.validateOn ?? (i == null ? void 0 : i.validateOn.value)) || "input";
    I === "lazy" && (I = "input lazy");
    const E = new Set((I == null ? void 0 : I.split(" ")) ?? []);
    return {
      blur: E.has("blur") || E.has("input"),
      input: E.has("input"),
      submit: E.has("submit"),
      lazy: E.has("lazy")
    };
  }), v = m(() => {
    var I;
    return e.error || (I = e.errorMessages) != null && I.length ? !1 : e.rules.length ? r.value ? o.value.length || c.value.lazy ? null : !0 : !o.value.length : !0;
  }), h = W(!1), y = m(() => ({
    [`${t}--error`]: v.value === !1,
    [`${t}--dirty`]: s.value,
    [`${t}--disabled`]: d.value,
    [`${t}--readonly`]: g.value
  })), C = m(() => e.name ?? we(n));
  ql(() => {
    i == null || i.register({
      id: C.value,
      validate: b,
      reset: S,
      resetValidation: w
    });
  }), Je(() => {
    i == null || i.unregister(C.value);
  }), ct(async () => {
    c.value.lazy || await b(!0), i == null || i.update(C.value, v.value, f.value);
  }), Ze(() => c.value.input, () => {
    G(a, () => {
      if (a.value != null)
        b();
      else if (e.focused) {
        const I = G(() => e.focused, (E) => {
          E || b(), I();
        });
      }
    });
  }), Ze(() => c.value.blur, () => {
    G(() => e.focused, (I) => {
      I || b();
    });
  }), G(v, () => {
    i == null || i.update(C.value, v.value, f.value);
  });
  function S() {
    l.value = null, me(w);
  }
  function w() {
    r.value = !0, c.value.lazy ? o.value = [] : b(!0);
  }
  async function b() {
    let I = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const E = [];
    h.value = !0;
    for (const V of e.rules) {
      if (E.length >= +(e.maxErrors ?? 1))
        break;
      const p = await (typeof V == "function" ? V : () => V)(a.value);
      if (p !== !0) {
        if (p !== !1 && typeof p != "string") {
          console.warn(`${p} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        E.push(p || "");
      }
    }
    return o.value = E, h.value = !1, r.value = I, o.value;
  }
  return {
    errorMessages: f,
    isDirty: s,
    isDisabled: d,
    isReadonly: g,
    isPristine: r,
    isValid: v,
    isValidating: h,
    reset: S,
    resetValidation: w,
    validate: b,
    validationClasses: y
  };
}
const Fa = A({
  id: String,
  appendIcon: ne,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  prependIcon: ne,
  hideDetails: [Boolean, String],
  hint: String,
  persistentHint: Boolean,
  messages: {
    type: [Array, String],
    default: () => []
  },
  direction: {
    type: String,
    default: "horizontal",
    validator: (e) => ["horizontal", "vertical"].includes(e)
  },
  "onClick:prepend": Be(),
  "onClick:append": Be(),
  ...Q(),
  ...ze(),
  ...Ho()
}, "VInput"), Pl = q()({
  name: "VInput",
  props: {
    ...Fa()
  },
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: l,
      emit: a
    } = t;
    const {
      densityClasses: i
    } = He(e), {
      rtlClasses: o
    } = Tt(), {
      InputIcon: r
    } = La(e), s = Fe(), d = m(() => e.id || `input-${s}`), g = m(() => `${d.value}-messages`), {
      errorMessages: f,
      isDirty: c,
      isDisabled: v,
      isReadonly: h,
      isPristine: y,
      isValid: C,
      isValidating: S,
      reset: w,
      resetValidation: b,
      validate: I,
      validationClasses: E
    } = jo(e, "v-input", d), V = m(() => ({
      id: d,
      messagesId: g,
      isDirty: c,
      isDisabled: v,
      isReadonly: h,
      isPristine: y,
      isValid: C,
      isValidating: S,
      reset: w,
      resetValidation: b,
      validate: I
    })), k = m(() => {
      var p;
      return (p = e.errorMessages) != null && p.length || !y.value && f.value.length ? f.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return X(() => {
      var T, O, $, z;
      const p = !!(l.prepend || e.prependIcon), x = !!(l.append || e.appendIcon), L = k.value.length > 0, M = !e.hideDetails || e.hideDetails === "auto" && (L || !!l.details);
      return u("div", {
        class: ["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix
        }, i.value, o.value, E.value, e.class],
        style: e.style
      }, [p && u("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(T = l.prepend) == null ? void 0 : T.call(l, V.value), e.prependIcon && u(r, {
        key: "prepend-icon",
        name: "prepend"
      }, null)]), l.default && u("div", {
        class: "v-input__control"
      }, [(O = l.default) == null ? void 0 : O.call(l, V.value)]), x && u("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && u(r, {
        key: "append-icon",
        name: "append"
      }, null), ($ = l.append) == null ? void 0 : $.call(l, V.value)]), M && u("div", {
        class: "v-input__details"
      }, [u(No, {
        id: g.value,
        active: L,
        messages: k.value
      }, {
        message: l.message
      }), (z = l.details) == null ? void 0 : z.call(l, V.value)])]);
    }), {
      reset: w,
      resetValidation: b,
      validate: I
    };
  }
});
const An = Symbol.for("vuetify:list");
function Ma() {
  const e = ce(An, {
    hasPrepend: W(!1),
    updateHasPrepend: () => null
  }), t = {
    hasPrepend: W(!1),
    updateHasPrepend: (n) => {
      n && (t.hasPrepend.value = n);
    }
  };
  return _e(An, t), e;
}
function Ra() {
  return ce(An, null);
}
const qo = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: l,
      parents: a
    } = e;
    if (n) {
      const i = /* @__PURE__ */ new Set();
      i.add(t);
      let o = a.get(t);
      for (; o != null; )
        i.add(o), o = a.get(o);
      return i;
    } else
      return l.delete(t), l;
  },
  select: () => null
}, Da = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: l,
      parents: a
    } = e;
    if (n) {
      let i = a.get(t);
      for (l.add(t); i != null && i !== t; )
        l.add(i), i = a.get(i);
      return l;
    } else
      l.delete(t);
    return l;
  },
  select: () => null
}, Go = {
  open: Da.open,
  select: (e) => {
    let {
      id: t,
      value: n,
      opened: l,
      parents: a
    } = e;
    if (!n)
      return l;
    const i = [];
    let o = a.get(t);
    for (; o != null; )
      i.push(o), o = a.get(o);
    return new Set(i);
  }
}, Yn = (e) => {
  const t = {
    select: (n) => {
      let {
        id: l,
        value: a,
        selected: i
      } = n;
      if (l = Ne(l), e && !a) {
        const o = Array.from(i.entries()).reduce((r, s) => {
          let [d, g] = s;
          return g === "on" ? [...r, d] : r;
        }, []);
        if (o.length === 1 && o[0] === l)
          return i;
      }
      return i.set(l, a ? "on" : "off"), i;
    },
    in: (n, l, a) => {
      let i = /* @__PURE__ */ new Map();
      for (const o of n || [])
        i = t.select({
          id: o,
          value: !0,
          selected: new Map(i),
          children: l,
          parents: a
        });
      return i;
    },
    out: (n) => {
      const l = [];
      for (const [a, i] of n.entries())
        i === "on" && l.push(a);
      return l;
    }
  };
  return t;
}, Na = (e) => {
  const t = Yn(e);
  return {
    select: (l) => {
      let {
        selected: a,
        id: i,
        ...o
      } = l;
      i = Ne(i);
      const r = a.has(i) ? /* @__PURE__ */ new Map([[i, a.get(i)]]) : /* @__PURE__ */ new Map();
      return t.select({
        ...o,
        id: i,
        selected: r
      });
    },
    in: (l, a, i) => {
      let o = /* @__PURE__ */ new Map();
      return l != null && l.length && (o = t.in(l.slice(0, 1), a, i)), o;
    },
    out: (l, a, i) => t.out(l, a, i)
  };
}, Wo = (e) => {
  const t = Yn(e);
  return {
    select: (l) => {
      let {
        id: a,
        selected: i,
        children: o,
        ...r
      } = l;
      return a = Ne(a), o.has(a) ? i : t.select({
        id: a,
        selected: i,
        children: o,
        ...r
      });
    },
    in: t.in,
    out: t.out
  };
}, Uo = (e) => {
  const t = Na(e);
  return {
    select: (l) => {
      let {
        id: a,
        selected: i,
        children: o,
        ...r
      } = l;
      return a = Ne(a), o.has(a) ? i : t.select({
        id: a,
        selected: i,
        children: o,
        ...r
      });
    },
    in: t.in,
    out: t.out
  };
}, Ko = (e) => {
  const t = {
    select: (n) => {
      let {
        id: l,
        value: a,
        selected: i,
        children: o,
        parents: r
      } = n;
      l = Ne(l);
      const s = new Map(i), d = [l];
      for (; d.length; ) {
        const f = d.shift();
        i.set(f, a ? "on" : "off"), o.has(f) && d.push(...o.get(f));
      }
      let g = r.get(l);
      for (; g; ) {
        const f = o.get(g), c = f.every((h) => i.get(h) === "on"), v = f.every((h) => !i.has(h) || i.get(h) === "off");
        i.set(g, c ? "on" : v ? "off" : "indeterminate"), g = r.get(g);
      }
      return e && !a && Array.from(i.entries()).reduce((c, v) => {
        let [h, y] = v;
        return y === "on" ? [...c, h] : c;
      }, []).length === 0 ? s : i;
    },
    in: (n, l, a) => {
      let i = /* @__PURE__ */ new Map();
      for (const o of n || [])
        i = t.select({
          id: o,
          value: !0,
          selected: new Map(i),
          children: l,
          parents: a
        });
      return i;
    },
    out: (n, l) => {
      const a = [];
      for (const [i, o] of n.entries())
        o === "on" && !l.has(i) && a.push(i);
      return a;
    }
  };
  return t;
}, pt = Symbol.for("vuetify:nested"), za = {
  id: W(),
  root: {
    register: () => null,
    unregister: () => null,
    parents: N(/* @__PURE__ */ new Map()),
    children: N(/* @__PURE__ */ new Map()),
    open: () => null,
    openOnSelect: () => null,
    select: () => null,
    opened: N(/* @__PURE__ */ new Set()),
    selected: N(/* @__PURE__ */ new Map()),
    selectedValues: N([])
  }
}, Yo = A({
  selectStrategy: [String, Function],
  openStrategy: [String, Object],
  opened: Array,
  selected: Array,
  mandatory: Boolean
}, "nested"), Xo = (e) => {
  let t = !1;
  const n = N(/* @__PURE__ */ new Map()), l = N(/* @__PURE__ */ new Map()), a = se(e, "opened", e.opened, (f) => new Set(f), (f) => [...f.values()]), i = m(() => {
    if (typeof e.selectStrategy == "object")
      return e.selectStrategy;
    switch (e.selectStrategy) {
      case "single-leaf":
        return Uo(e.mandatory);
      case "leaf":
        return Wo(e.mandatory);
      case "independent":
        return Yn(e.mandatory);
      case "single-independent":
        return Na(e.mandatory);
      case "classic":
      default:
        return Ko(e.mandatory);
    }
  }), o = m(() => {
    if (typeof e.openStrategy == "object")
      return e.openStrategy;
    switch (e.openStrategy) {
      case "list":
        return Go;
      case "single":
        return qo;
      case "multiple":
      default:
        return Da;
    }
  }), r = se(e, "selected", e.selected, (f) => i.value.in(f, n.value, l.value), (f) => i.value.out(f, n.value, l.value));
  Je(() => {
    t = !0;
  });
  function s(f) {
    const c = [];
    let v = f;
    for (; v != null; )
      c.unshift(v), v = l.value.get(v);
    return c;
  }
  const d = fe("nested"), g = {
    id: W(),
    root: {
      opened: a,
      selected: r,
      selectedValues: m(() => {
        const f = [];
        for (const [c, v] of r.value.entries())
          v === "on" && f.push(c);
        return f;
      }),
      register: (f, c, v) => {
        c && f !== c && l.value.set(f, c), v && n.value.set(f, []), c != null && n.value.set(c, [...n.value.get(c) || [], f]);
      },
      unregister: (f) => {
        if (t)
          return;
        n.value.delete(f);
        const c = l.value.get(f);
        if (c) {
          const v = n.value.get(c) ?? [];
          n.value.set(c, v.filter((h) => h !== f));
        }
        l.value.delete(f), a.value.delete(f);
      },
      open: (f, c, v) => {
        d.emit("click:open", {
          id: f,
          value: c,
          path: s(f),
          event: v
        });
        const h = o.value.open({
          id: f,
          value: c,
          opened: new Set(a.value),
          children: n.value,
          parents: l.value,
          event: v
        });
        h && (a.value = h);
      },
      openOnSelect: (f, c, v) => {
        const h = o.value.select({
          id: f,
          value: c,
          selected: new Map(r.value),
          opened: new Set(a.value),
          children: n.value,
          parents: l.value,
          event: v
        });
        h && (a.value = h);
      },
      select: (f, c, v) => {
        d.emit("click:select", {
          id: f,
          value: c,
          path: s(f),
          event: v
        });
        const h = i.value.select({
          id: f,
          value: c,
          selected: new Map(r.value),
          children: n.value,
          parents: l.value,
          event: v
        });
        h && (r.value = h), g.root.openOnSelect(f, c, v);
      },
      children: n,
      parents: l
    }
  };
  return _e(pt, g), g.root;
}, Ha = (e, t) => {
  const n = ce(pt, za), l = Symbol(Fe()), a = m(() => e.value !== void 0 ? e.value : l), i = {
    ...n,
    id: a,
    open: (o, r) => n.root.open(a.value, o, r),
    openOnSelect: (o, r) => n.root.openOnSelect(a.value, o, r),
    isOpen: m(() => n.root.opened.value.has(a.value)),
    parent: m(() => n.root.parents.value.get(a.value)),
    select: (o, r) => n.root.select(a.value, o, r),
    isSelected: m(() => n.root.selected.value.get(Ne(a.value)) === "on"),
    isIndeterminate: m(() => n.root.selected.value.get(a.value) === "indeterminate"),
    isLeaf: m(() => !n.root.children.value.get(a.value)),
    isGroupActivator: n.isGroupActivator
  };
  return !n.isGroupActivator && n.root.register(a.value, n.id.value, t), Je(() => {
    !n.isGroupActivator && n.root.unregister(a.value);
  }), t && _e(pt, i), i;
}, Zo = () => {
  const e = ce(pt, za);
  _e(pt, {
    ...e,
    isGroupActivator: !0
  });
};
function Qo() {
  const e = W(!1);
  return ct(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: m(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: Fn(e)
  };
}
const Jo = It({
  name: "VListGroupActivator",
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Zo(), () => {
      var l;
      return (l = n.default) == null ? void 0 : l.call(n);
    };
  }
}), er = A({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: ne,
    default: "$collapse"
  },
  expandIcon: {
    type: ne,
    default: "$expand"
  },
  prependIcon: ne,
  appendIcon: ne,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ...Q(),
  ...Ie()
}, "VListGroup"), Al = q()({
  name: "VListGroup",
  props: er(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isOpen: l,
      open: a,
      id: i
    } = Ha(H(e, "value"), !0), o = m(() => `v-list-group--id-${String(i.value)}`), r = Ra(), {
      isBooted: s
    } = Qo();
    function d(v) {
      a(!l.value, v);
    }
    const g = m(() => ({
      onClick: d,
      class: "v-list-group__header",
      id: o.value
    })), f = m(() => l.value ? e.collapseIcon : e.expandIcon), c = m(() => ({
      VListItem: {
        active: l.value,
        activeColor: e.activeColor,
        baseColor: e.baseColor,
        color: e.color,
        prependIcon: e.prependIcon || e.subgroup && f.value,
        appendIcon: e.appendIcon || !e.subgroup && f.value,
        title: e.title,
        value: e.value
      }
    }));
    return X(() => u(e.tag, {
      class: ["v-list-group", {
        "v-list-group--prepend": r == null ? void 0 : r.hasPrepend.value,
        "v-list-group--fluid": e.fluid,
        "v-list-group--subgroup": e.subgroup,
        "v-list-group--open": l.value
      }, e.class],
      style: e.style
    }, {
      default: () => [n.activator && u(he, {
        defaults: c.value
      }, {
        default: () => [u(Jo, null, {
          default: () => [n.activator({
            props: g.value,
            isOpen: l.value
          })]
        })]
      }), u(Re, {
        transition: {
          component: so
        },
        disabled: !s.value
      }, {
        default: () => {
          var v;
          return [ke(u("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": o.value
          }, [(v = n.default) == null ? void 0 : v.call(n)]), [[ut, l.value]])];
        }
      })]
    })), {};
  }
});
const tr = ta("v-list-item-subtitle"), nr = ta("v-list-item-title"), lr = A({
  active: {
    type: Boolean,
    default: void 0
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: ne,
  baseColor: String,
  disabled: Boolean,
  lines: String,
  link: {
    type: Boolean,
    default: void 0
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: ne,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  subtitle: [String, Number, Boolean],
  title: [String, Number, Boolean],
  value: null,
  onClick: Be(),
  onClickOnce: Be(),
  ...Et(),
  ...Q(),
  ...ze(),
  ...dt(),
  ...Ot(),
  ...je(),
  ...Wn(),
  ...Ie(),
  ...ve(),
  ...et({
    variant: "text"
  })
}, "VListItem"), st = q()({
  name: "VListItem",
  directives: {
    Ripple: fn
  },
  props: lr(),
  emits: {
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: l,
      emit: a
    } = t;
    const i = Gn(e, n), o = m(() => e.value === void 0 ? i.href.value : e.value), {
      select: r,
      isSelected: s,
      isIndeterminate: d,
      isGroupActivator: g,
      root: f,
      parent: c,
      openOnSelect: v
    } = Ha(o, !1), h = Ra(), y = m(() => {
      var B;
      return e.active !== !1 && (e.active || ((B = i.isActive) == null ? void 0 : B.value) || s.value);
    }), C = m(() => e.link !== !1 && i.isLink.value), S = m(() => !e.disabled && e.link !== !1 && (e.link || i.isClickable.value || e.value != null && !!h)), w = m(() => e.rounded || e.nav), b = m(() => e.color ?? e.activeColor), I = m(() => ({
      color: y.value ? b.value ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    G(() => {
      var B;
      return (B = i.isActive) == null ? void 0 : B.value;
    }, (B) => {
      B && c.value != null && f.open(c.value, !0), B && v(B);
    }, {
      immediate: !0
    });
    const {
      themeClasses: E
    } = Se(e), {
      borderClasses: V
    } = Bt(e), {
      colorClasses: k,
      colorStyles: p,
      variantClasses: x
    } = cn(I), {
      densityClasses: L
    } = He(e), {
      dimensionStyles: M
    } = ft(e), {
      elevationClasses: T
    } = Lt(e), {
      roundedClasses: O
    } = qe(w), $ = m(() => e.lines ? `v-list-item--${e.lines}-line` : void 0), z = m(() => ({
      isActive: y.value,
      select: r,
      isSelected: s.value,
      isIndeterminate: d.value
    }));
    function _(B) {
      var D;
      a("click", B), !(g || !S.value) && ((D = i.navigate) == null || D.call(i, B), e.value != null && r(!s.value, B));
    }
    function F(B) {
      (B.key === "Enter" || B.key === " ") && (B.preventDefault(), _(B));
    }
    return X(() => {
      const B = C.value ? "a" : e.tag, D = l.title || e.title, Z = l.subtitle || e.subtitle, R = !!(e.appendAvatar || e.appendIcon), ae = !!(R || l.append), ee = !!(e.prependAvatar || e.prependIcon), te = !!(ee || l.prepend);
      return h == null || h.updateHasPrepend(te), e.activeColor && Ui("active-color", ["color", "base-color"]), ke(u(B, {
        class: ["v-list-item", {
          "v-list-item--active": y.value,
          "v-list-item--disabled": e.disabled,
          "v-list-item--link": S.value,
          "v-list-item--nav": e.nav,
          "v-list-item--prepend": !te && (h == null ? void 0 : h.hasPrepend.value),
          [`${e.activeClass}`]: e.activeClass && y.value
        }, E.value, V.value, k.value, L.value, T.value, $.value, O.value, x.value, e.class],
        style: [p.value, M.value, e.style],
        href: i.href.value,
        tabindex: S.value ? h ? -2 : 0 : void 0,
        onClick: _,
        onKeydown: S.value && !C.value && F
      }, {
        default: () => {
          var oe;
          return [un(S.value || y.value, "v-list-item"), te && u("div", {
            key: "prepend",
            class: "v-list-item__prepend"
          }, [l.prepend ? u(he, {
            key: "prepend-defaults",
            disabled: !ee,
            defaults: {
              VAvatar: {
                density: e.density,
                image: e.prependAvatar
              },
              VIcon: {
                density: e.density,
                icon: e.prependIcon
              },
              VListItemAction: {
                start: !0
              }
            }
          }, {
            default: () => {
              var le;
              return [(le = l.prepend) == null ? void 0 : le.call(l, z.value)];
            }
          }) : u(J, null, [e.prependAvatar && u(tn, {
            key: "prepend-avatar",
            density: e.density,
            image: e.prependAvatar
          }, null), e.prependIcon && u(re, {
            key: "prepend-icon",
            density: e.density,
            icon: e.prependIcon
          }, null)]), u("div", {
            class: "v-list-item__spacer"
          }, null)]), u("div", {
            class: "v-list-item__content",
            "data-no-activator": ""
          }, [D && u(nr, {
            key: "title"
          }, {
            default: () => {
              var le;
              return [((le = l.title) == null ? void 0 : le.call(l, {
                title: e.title
              })) ?? e.title];
            }
          }), Z && u(tr, {
            key: "subtitle"
          }, {
            default: () => {
              var le;
              return [((le = l.subtitle) == null ? void 0 : le.call(l, {
                subtitle: e.subtitle
              })) ?? e.subtitle];
            }
          }), (oe = l.default) == null ? void 0 : oe.call(l, z.value)]), ae && u("div", {
            key: "append",
            class: "v-list-item__append"
          }, [l.append ? u(he, {
            key: "append-defaults",
            disabled: !R,
            defaults: {
              VAvatar: {
                density: e.density,
                image: e.appendAvatar
              },
              VIcon: {
                density: e.density,
                icon: e.appendIcon
              },
              VListItemAction: {
                end: !0
              }
            }
          }, {
            default: () => {
              var le;
              return [(le = l.append) == null ? void 0 : le.call(l, z.value)];
            }
          }) : u(J, null, [e.appendIcon && u(re, {
            key: "append-icon",
            density: e.density,
            icon: e.appendIcon
          }, null), e.appendAvatar && u(tn, {
            key: "append-avatar",
            density: e.density,
            image: e.appendAvatar
          }, null)]), u("div", {
            class: "v-list-item__spacer"
          }, null)])];
        }
      }), [[Qe("ripple"), S.value && e.ripple]]);
    }), {};
  }
}), ar = A({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...Q(),
  ...Ie()
}, "VListSubheader"), ir = q()({
  name: "VListSubheader",
  props: ar(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      textColorClasses: l,
      textColorStyles: a
    } = Oe(H(e, "color"));
    return X(() => {
      const i = !!(n.default || e.title);
      return u(e.tag, {
        class: ["v-list-subheader", {
          "v-list-subheader--inset": e.inset,
          "v-list-subheader--sticky": e.sticky
        }, l.value, e.class],
        style: [{
          textColorStyles: a
        }, e.style]
      }, {
        default: () => {
          var o;
          return [i && u("div", {
            class: "v-list-subheader__text"
          }, [((o = n.default) == null ? void 0 : o.call(n)) ?? e.title])];
        }
      });
    }), {};
  }
});
const or = A({
  color: String,
  inset: Boolean,
  length: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...Q(),
  ...ve()
}, "VDivider"), rr = q()({
  name: "VDivider",
  props: or(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    const {
      themeClasses: l
    } = Se(e), {
      textColorClasses: a,
      textColorStyles: i
    } = Oe(H(e, "color")), o = m(() => {
      const r = {};
      return e.length && (r[e.vertical ? "maxHeight" : "maxWidth"] = j(e.length)), e.thickness && (r[e.vertical ? "borderRightWidth" : "borderTopWidth"] = j(e.thickness)), r;
    });
    return X(() => u("hr", {
      class: [{
        "v-divider": !0,
        "v-divider--inset": e.inset,
        "v-divider--vertical": e.vertical
      }, l.value, a.value, e.class],
      style: [o.value, i.value, e.style],
      "aria-orientation": !n.role || n.role === "separator" ? e.vertical ? "vertical" : "horizontal" : void 0,
      role: `${n.role || "separator"}`
    }, null)), {};
  }
}), sr = A({
  items: Array,
  returnObject: Boolean
}, "VListChildren"), ja = q()({
  name: "VListChildren",
  props: sr(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Ma(), () => {
      var l, a;
      return ((l = n.default) == null ? void 0 : l.call(n)) ?? ((a = e.items) == null ? void 0 : a.map((i) => {
        var v, h;
        let {
          children: o,
          props: r,
          type: s,
          raw: d
        } = i;
        if (s === "divider")
          return ((v = n.divider) == null ? void 0 : v.call(n, {
            props: r
          })) ?? u(rr, r, null);
        if (s === "subheader")
          return ((h = n.subheader) == null ? void 0 : h.call(n, {
            props: r
          })) ?? u(ir, r, null);
        const g = {
          subtitle: n.subtitle ? (y) => {
            var C;
            return (C = n.subtitle) == null ? void 0 : C.call(n, {
              ...y,
              item: d
            });
          } : void 0,
          prepend: n.prepend ? (y) => {
            var C;
            return (C = n.prepend) == null ? void 0 : C.call(n, {
              ...y,
              item: d
            });
          } : void 0,
          append: n.append ? (y) => {
            var C;
            return (C = n.append) == null ? void 0 : C.call(n, {
              ...y,
              item: d
            });
          } : void 0,
          title: n.title ? (y) => {
            var C;
            return (C = n.title) == null ? void 0 : C.call(n, {
              ...y,
              item: d
            });
          } : void 0
        }, [f, c] = Al.filterProps(r);
        return o ? u(Al, U({
          value: r == null ? void 0 : r.value
        }, f), {
          activator: (y) => {
            let {
              props: C
            } = y;
            const S = {
              ...r,
              ...C,
              value: e.returnObject ? d : r.value
            };
            return n.header ? n.header({
              props: S
            }) : u(st, S, g);
          },
          default: () => u(ja, {
            items: o
          }, n)
        }) : n.item ? n.item({
          props: r
        }) : u(st, U(r, {
          value: e.returnObject ? d : r.value
        }), g);
      }));
    };
  }
}), qa = A({
  items: {
    type: Array,
    default: () => []
  },
  itemTitle: {
    type: [String, Array, Function],
    default: "title"
  },
  itemValue: {
    type: [String, Array, Function],
    default: "value"
  },
  itemChildren: {
    type: [Boolean, String, Array, Function],
    default: "children"
  },
  itemProps: {
    type: [Boolean, String, Array, Function],
    default: "props"
  },
  returnObject: Boolean,
  valueComparator: {
    type: Function,
    default: Vt
  }
}, "list-items");
function Ke(e, t) {
  const n = Ee(t, e.itemTitle, t), l = Ee(t, e.itemValue, n), a = Ee(t, e.itemChildren), i = e.itemProps === !0 ? typeof t == "object" && t != null && !Array.isArray(t) ? "children" in t ? ot(t, ["children"])[1] : t : void 0 : Ee(t, e.itemProps), o = {
    title: n,
    value: l,
    ...i
  };
  return {
    title: String(o.title ?? ""),
    value: o.value,
    props: o,
    children: Array.isArray(a) ? Ga(e, a) : void 0,
    raw: t
  };
}
function Ga(e, t) {
  const n = [];
  for (const l of t)
    n.push(Ke(e, l));
  return n;
}
function Wa(e) {
  const t = m(() => Ga(e, e.items)), n = m(() => t.value.some((i) => i.value === null));
  function l(i) {
    return n.value || (i = i.filter((o) => o !== null)), i.map((o) => e.returnObject && typeof o == "string" ? Ke(e, o) : t.value.find((r) => e.valueComparator(o, r.value)) || Ke(e, o));
  }
  function a(i) {
    return e.returnObject ? i.map((o) => {
      let {
        raw: r
      } = o;
      return r;
    }) : i.map((o) => {
      let {
        value: r
      } = o;
      return r;
    });
  }
  return {
    items: t,
    transformIn: l,
    transformOut: a
  };
}
function ur(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
function cr(e, t) {
  const n = Ee(t, e.itemType, "item"), l = ur(t) ? t : Ee(t, e.itemTitle), a = Ee(t, e.itemValue, void 0), i = Ee(t, e.itemChildren), o = e.itemProps === !0 ? ot(t, ["children"])[1] : Ee(t, e.itemProps), r = {
    title: l,
    value: a,
    ...o
  };
  return {
    type: n,
    title: r.title,
    value: r.value,
    props: r,
    children: n === "item" && i ? Ua(e, i) : void 0,
    raw: t
  };
}
function Ua(e, t) {
  const n = [];
  for (const l of t)
    n.push(cr(e, l));
  return n;
}
function dr(e) {
  return {
    items: m(() => Ua(e, e.items))
  };
}
const fr = A({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  lines: {
    type: [Boolean, String],
    default: "one"
  },
  nav: Boolean,
  ...Yo({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...Et(),
  ...Q(),
  ...ze(),
  ...dt(),
  ...Ot(),
  itemType: {
    type: String,
    default: "type"
  },
  ...qa(),
  ...je(),
  ...Ie(),
  ...ve(),
  ...et({
    variant: "text"
  })
}, "VList"), Ka = q()({
  name: "VList",
  props: fr(),
  emits: {
    "update:selected": (e) => !0,
    "update:opened": (e) => !0,
    "click:open": (e) => !0,
    "click:select": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      items: l
    } = dr(e), {
      themeClasses: a
    } = Se(e), {
      backgroundColorClasses: i,
      backgroundColorStyles: o
    } = rt(H(e, "bgColor")), {
      borderClasses: r
    } = Bt(e), {
      densityClasses: s
    } = He(e), {
      dimensionStyles: d
    } = ft(e), {
      elevationClasses: g
    } = Lt(e), {
      roundedClasses: f
    } = qe(e), {
      open: c,
      select: v
    } = Xo(e), h = m(() => e.lines ? `v-list--${e.lines}-line` : void 0), y = H(e, "activeColor"), C = H(e, "baseColor"), S = H(e, "color");
    Ma(), _t({
      VListGroup: {
        activeColor: y,
        baseColor: C,
        color: S
      },
      VListItem: {
        activeClass: H(e, "activeClass"),
        activeColor: y,
        baseColor: C,
        color: S,
        density: H(e, "density"),
        disabled: H(e, "disabled"),
        lines: H(e, "lines"),
        nav: H(e, "nav"),
        variant: H(e, "variant")
      }
    });
    const w = W(!1), b = N();
    function I(x) {
      w.value = !0;
    }
    function E(x) {
      w.value = !1;
    }
    function V(x) {
      var L;
      !w.value && !(x.relatedTarget && ((L = b.value) != null && L.contains(x.relatedTarget))) && p();
    }
    function k(x) {
      if (b.value) {
        if (x.key === "ArrowDown")
          p("next");
        else if (x.key === "ArrowUp")
          p("prev");
        else if (x.key === "Home")
          p("first");
        else if (x.key === "End")
          p("last");
        else
          return;
        x.preventDefault();
      }
    }
    function p(x) {
      if (b.value)
        return Xt(b.value, x);
    }
    return X(() => u(e.tag, {
      ref: b,
      class: ["v-list", {
        "v-list--disabled": e.disabled,
        "v-list--nav": e.nav
      }, a.value, i.value, r.value, s.value, g.value, h.value, f.value, e.class],
      style: [o.value, d.value, e.style],
      tabindex: e.disabled || w.value ? -1 : 0,
      role: "listbox",
      "aria-activedescendant": void 0,
      onFocusin: I,
      onFocusout: E,
      onFocus: V,
      onKeydown: k
    }, {
      default: () => [u(ja, {
        items: l.value,
        returnObject: e.returnObject
      }, n)]
    })), {
      open: c,
      select: v,
      focus: p
    };
  }
});
function bn(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function vr(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function El(e, t) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: n,
      align: l
    } = e, a = l === "left" ? 0 : l === "center" ? t.width / 2 : l === "right" ? t.width : l, i = n === "top" ? 0 : n === "bottom" ? t.height : n;
    return bn({
      x: a,
      y: i
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: n,
      align: l
    } = e, a = n === "left" ? 0 : n === "right" ? t.width : n, i = l === "top" ? 0 : l === "center" ? t.height / 2 : l === "bottom" ? t.height : l;
    return bn({
      x: a,
      y: i
    }, t);
  }
  return bn({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const Ya = {
  static: yr,
  // specific viewport position, usually centered
  connected: br
  // connected to a certain element
}, mr = A({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in Ya
  },
  location: {
    type: String,
    default: "bottom"
  },
  origin: {
    type: String,
    default: "auto"
  },
  offset: [Number, String, Array]
}, "VOverlay-location-strategies");
function gr(e, t) {
  const n = N({}), l = N();
  be && (Ze(() => !!(t.isActive.value && e.locationStrategy), (i) => {
    var o, r;
    G(() => e.locationStrategy, i), ge(() => {
      l.value = void 0;
    }), typeof e.locationStrategy == "function" ? l.value = (o = e.locationStrategy(t, e, n)) == null ? void 0 : o.updateLocation : l.value = (r = Ya[e.locationStrategy](t, e, n)) == null ? void 0 : r.updateLocation;
  }), window.addEventListener("resize", a, {
    passive: !0
  }), ge(() => {
    window.removeEventListener("resize", a), l.value = void 0;
  }));
  function a(i) {
    var o;
    (o = l.value) == null || o.call(l, i);
  }
  return {
    contentStyles: n,
    updateLocation: l
  };
}
function yr() {
}
function hr(e, t) {
  t ? e.style.removeProperty("left") : e.style.removeProperty("right");
  const n = zn(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function br(e, t, n) {
  io(e.activatorEl.value) && Object.assign(n.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: a,
    preferredOrigin: i
  } = Dn(() => {
    const h = kn(t.location, e.isRtl.value), y = t.origin === "overlap" ? h : t.origin === "auto" ? gn(h) : kn(t.origin, e.isRtl.value);
    return h.side === y.side && h.align === yn(y).align ? {
      preferredAnchor: rl(h),
      preferredOrigin: rl(y)
    } : {
      preferredAnchor: h,
      preferredOrigin: y
    };
  }), [o, r, s, d] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((h) => m(() => {
    const y = parseFloat(t[h]);
    return isNaN(y) ? 1 / 0 : y;
  })), g = m(() => {
    if (Array.isArray(t.offset))
      return t.offset;
    if (typeof t.offset == "string") {
      const h = t.offset.split(" ").map(parseFloat);
      return h.length < 2 && h.push(0), h;
    }
    return typeof t.offset == "number" ? [t.offset, 0] : [0, 0];
  });
  let f = !1;
  const c = new ResizeObserver(() => {
    f && v();
  });
  G([e.activatorEl, e.contentEl], (h, y) => {
    let [C, S] = h, [w, b] = y;
    w && c.unobserve(w), C && c.observe(C), b && c.unobserve(b), S && c.observe(S);
  }, {
    immediate: !0
  }), ge(() => {
    c.disconnect();
  });
  function v() {
    if (f = !1, requestAnimationFrame(() => {
      requestAnimationFrame(() => f = !0);
    }), !e.activatorEl.value || !e.contentEl.value)
      return;
    const h = e.activatorEl.value.getBoundingClientRect(), y = hr(e.contentEl.value, e.isRtl.value), C = en(e.contentEl.value), S = 12;
    C.length || (C.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (y.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), y.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const w = C.reduce((M, T) => {
      const O = T.getBoundingClientRect(), $ = new it({
        x: T === document.documentElement ? 0 : O.x,
        y: T === document.documentElement ? 0 : O.y,
        width: T.clientWidth,
        height: T.clientHeight
      });
      return M ? new it({
        x: Math.max(M.left, $.left),
        y: Math.max(M.top, $.top),
        width: Math.min(M.right, $.right) - Math.max(M.left, $.left),
        height: Math.min(M.bottom, $.bottom) - Math.max(M.top, $.top)
      }) : $;
    }, void 0);
    w.x += S, w.y += S, w.width -= S * 2, w.height -= S * 2;
    let b = {
      anchor: a.value,
      origin: i.value
    };
    function I(M) {
      const T = new it(y), O = El(M.anchor, h), $ = El(M.origin, T);
      let {
        x: z,
        y: _
      } = vr(O, $);
      switch (M.anchor.side) {
        case "top":
          _ -= g.value[0];
          break;
        case "bottom":
          _ += g.value[0];
          break;
        case "left":
          z -= g.value[0];
          break;
        case "right":
          z += g.value[0];
          break;
      }
      switch (M.anchor.align) {
        case "top":
          _ -= g.value[1];
          break;
        case "bottom":
          _ += g.value[1];
          break;
        case "left":
          z -= g.value[1];
          break;
        case "right":
          z += g.value[1];
          break;
      }
      return T.x += z, T.y += _, T.width = Math.min(T.width, s.value), T.height = Math.min(T.height, d.value), {
        overflows: ul(T, w),
        x: z,
        y: _
      };
    }
    let E = 0, V = 0;
    const k = {
      x: 0,
      y: 0
    }, p = {
      x: !1,
      y: !1
    };
    let x = -1;
    for (; ; ) {
      if (x++ > 10) {
        Wi("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: M,
        y: T,
        overflows: O
      } = I(b);
      E += M, V += T, y.x += M, y.y += T;
      {
        const $ = sl(b.anchor), z = O.x.before || O.x.after, _ = O.y.before || O.y.after;
        let F = !1;
        if (["x", "y"].forEach((B) => {
          if (B === "x" && z && !p.x || B === "y" && _ && !p.y) {
            const D = {
              anchor: {
                ...b.anchor
              },
              origin: {
                ...b.origin
              }
            }, Z = B === "x" ? $ === "y" ? yn : gn : $ === "y" ? gn : yn;
            D.anchor = Z(D.anchor), D.origin = Z(D.origin);
            const {
              overflows: R
            } = I(D);
            (R[B].before <= O[B].before && R[B].after <= O[B].after || R[B].before + R[B].after < (O[B].before + O[B].after) / 2) && (b = D, F = p[B] = !0);
          }
        }), F)
          continue;
      }
      O.x.before && (E += O.x.before, y.x += O.x.before), O.x.after && (E -= O.x.after, y.x -= O.x.after), O.y.before && (V += O.y.before, y.y += O.y.before), O.y.after && (V -= O.y.after, y.y -= O.y.after);
      {
        const $ = ul(y, w);
        k.x = w.width - $.x.before - $.x.after, k.y = w.height - $.y.before - $.y.after, E += $.x.before, y.x += $.x.before, V += $.y.before, y.y += $.y.before;
      }
      break;
    }
    const L = sl(b.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${b.anchor.side} ${b.anchor.align}`,
      transformOrigin: `${b.origin.side} ${b.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: j(Cn(V)),
      left: e.isRtl.value ? void 0 : j(Cn(E)),
      right: e.isRtl.value ? j(Cn(-E)) : void 0,
      minWidth: j(L === "y" ? Math.min(o.value, h.width) : o.value),
      maxWidth: j(Bl(Kt(k.x, o.value === 1 / 0 ? 0 : o.value, s.value))),
      maxHeight: j(Bl(Kt(k.y, r.value === 1 / 0 ? 0 : r.value, d.value)))
    }), {
      available: k,
      contentBox: y
    };
  }
  return G(() => [a.value, i.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => v()), me(() => {
    const h = v();
    if (!h)
      return;
    const {
      available: y,
      contentBox: C
    } = h;
    C.height > y.y && requestAnimationFrame(() => {
      v(), requestAnimationFrame(() => {
        v();
      });
    });
  }), {
    updateLocation: v
  };
}
function Cn(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function Bl(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let En = !0;
const ln = [];
function Cr(e) {
  !En || ln.length ? (ln.push(e), Bn()) : (En = !1, e(), Bn());
}
let Ol = -1;
function Bn() {
  cancelAnimationFrame(Ol), Ol = requestAnimationFrame(() => {
    const e = ln.shift();
    e && e(), ln.length ? Bn() : En = !0;
  });
}
const Gt = {
  none: null,
  close: xr,
  block: wr,
  reposition: Vr
}, Sr = A({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in Gt
  }
}, "VOverlay-scroll-strategies");
function pr(e, t) {
  if (!be)
    return;
  let n;
  De(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = $n(), await me(), n.active && n.run(() => {
      var l;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (l = Gt[e.scrollStrategy]) == null || l.call(Gt, t, e, n);
    }));
  }), ge(() => {
    n == null || n.stop();
  });
}
function xr(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  Xa(e.activatorEl.value ?? e.contentEl.value, t);
}
function wr(e, t) {
  var o;
  const n = (o = e.root.value) == null ? void 0 : o.offsetParent, l = [.../* @__PURE__ */ new Set([...en(e.activatorEl.value, t.contained ? n : void 0), ...en(e.contentEl.value, t.contained ? n : void 0)])].filter((r) => !r.classList.contains("v-overlay-scroll-blocked")), a = window.innerWidth - document.documentElement.offsetWidth, i = ((r) => jn(r) && r)(n || document.documentElement);
  i && e.root.value.classList.add("v-overlay--scroll-blocked"), l.forEach((r, s) => {
    r.style.setProperty("--v-body-scroll-x", j(-r.scrollLeft)), r.style.setProperty("--v-body-scroll-y", j(-r.scrollTop)), r !== document.documentElement && r.style.setProperty("--v-scrollbar-offset", j(a)), r.classList.add("v-overlay-scroll-blocked");
  }), ge(() => {
    l.forEach((r, s) => {
      const d = parseFloat(r.style.getPropertyValue("--v-body-scroll-x")), g = parseFloat(r.style.getPropertyValue("--v-body-scroll-y"));
      r.style.removeProperty("--v-body-scroll-x"), r.style.removeProperty("--v-body-scroll-y"), r.style.removeProperty("--v-scrollbar-offset"), r.classList.remove("v-overlay-scroll-blocked"), r.scrollLeft = -d, r.scrollTop = -g;
    }), i && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function Vr(e, t, n) {
  let l = !1, a = -1, i = -1;
  function o(r) {
    Cr(() => {
      var g, f;
      const s = performance.now();
      (f = (g = e.updateLocation).value) == null || f.call(g, r), l = (performance.now() - s) / (1e3 / 60) > 2;
    });
  }
  i = (typeof requestIdleCallback > "u" ? (r) => r() : requestIdleCallback)(() => {
    n.run(() => {
      Xa(e.activatorEl.value ?? e.contentEl.value, (r) => {
        l ? (cancelAnimationFrame(a), a = requestAnimationFrame(() => {
          a = requestAnimationFrame(() => {
            o(r);
          });
        })) : o(r);
      });
    });
  }), ge(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(i), cancelAnimationFrame(a);
  });
}
function Xa(e, t) {
  const n = [document, ...en(e)];
  n.forEach((l) => {
    l.addEventListener("scroll", t, {
      passive: !0
    });
  }), ge(() => {
    n.forEach((l) => {
      l.removeEventListener("scroll", t);
    });
  });
}
const On = Symbol.for("vuetify:v-menu"), kr = A({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function _r(e, t) {
  const n = {}, l = (a) => () => {
    if (!be)
      return Promise.resolve(!0);
    const i = a === "openDelay";
    return n.closeDelay && window.clearTimeout(n.closeDelay), delete n.closeDelay, n.openDelay && window.clearTimeout(n.openDelay), delete n.openDelay, new Promise((o) => {
      const r = parseInt(e[a] ?? 0, 10);
      n[a] = window.setTimeout(() => {
        t == null || t(i), o(i);
      }, r);
    });
  };
  return {
    runCloseDelay: l("closeDelay"),
    runOpenDelay: l("openDelay")
  };
}
const Ir = A({
  activator: [String, Object],
  activatorProps: {
    type: Object,
    default: () => ({})
  },
  openOnClick: {
    type: Boolean,
    default: void 0
  },
  openOnHover: Boolean,
  openOnFocus: {
    type: Boolean,
    default: void 0
  },
  closeOnContentClick: Boolean,
  ...kr()
}, "VOverlay-activator");
function Pr(e, t) {
  let {
    isActive: n,
    isTop: l
  } = t;
  const a = N();
  let i = !1, o = !1, r = !0;
  const s = m(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), d = m(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !s.value), {
    runOpenDelay: g,
    runCloseDelay: f
  } = _r(e, (b) => {
    b === (e.openOnHover && i || s.value && o) && !(e.openOnHover && n.value && !l.value) && (n.value !== b && (r = !0), n.value = b);
  }), c = {
    onClick: (b) => {
      b.stopPropagation(), a.value = b.currentTarget || b.target, n.value = !n.value;
    },
    onMouseenter: (b) => {
      var I;
      (I = b.sourceCapabilities) != null && I.firesTouchEvents || (i = !0, a.value = b.currentTarget || b.target, g());
    },
    onMouseleave: (b) => {
      i = !1, f();
    },
    onFocus: (b) => {
      Zt(b.target, ":focus-visible") !== !1 && (o = !0, b.stopPropagation(), a.value = b.currentTarget || b.target, g());
    },
    onBlur: (b) => {
      o = !1, b.stopPropagation(), f();
    }
  }, v = m(() => {
    const b = {};
    return d.value && (b.onClick = c.onClick), e.openOnHover && (b.onMouseenter = c.onMouseenter, b.onMouseleave = c.onMouseleave), s.value && (b.onFocus = c.onFocus, b.onBlur = c.onBlur), b;
  }), h = m(() => {
    const b = {};
    if (e.openOnHover && (b.onMouseenter = () => {
      i = !0, g();
    }, b.onMouseleave = () => {
      i = !1, f();
    }), s.value && (b.onFocusin = () => {
      o = !0, g();
    }, b.onFocusout = () => {
      o = !1, f();
    }), e.closeOnContentClick) {
      const I = ce(On, null);
      b.onClick = () => {
        n.value = !1, I == null || I.closeParents();
      };
    }
    return b;
  }), y = m(() => {
    const b = {};
    return e.openOnHover && (b.onMouseenter = () => {
      r && (i = !0, r = !1, g());
    }, b.onMouseleave = () => {
      i = !1, f();
    }), b;
  });
  G(l, (b) => {
    b && (e.openOnHover && !i && (!s.value || !o) || s.value && !o && (!e.openOnHover || !i)) && (n.value = !1);
  });
  const C = N();
  De(() => {
    C.value && me(() => {
      a.value = wn(C.value);
    });
  });
  const S = fe("useActivator");
  let w;
  return G(() => !!e.activator, (b) => {
    b && be ? (w = $n(), w.run(() => {
      Ar(e, S, {
        activatorEl: a,
        activatorEvents: v
      });
    })) : w && w.stop();
  }, {
    flush: "post",
    immediate: !0
  }), ge(() => {
    w == null || w.stop();
  }), {
    activatorEl: a,
    activatorRef: C,
    activatorEvents: v,
    contentEvents: h,
    scrimEvents: y
  };
}
function Ar(e, t, n) {
  let {
    activatorEl: l,
    activatorEvents: a
  } = n;
  G(() => e.activator, (s, d) => {
    if (d && s !== d) {
      const g = r(d);
      g && o(g);
    }
    s && me(() => i());
  }, {
    immediate: !0
  }), G(() => e.activatorProps, () => {
    i();
  }), ge(() => {
    o();
  });
  function i() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : r(), d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    s && Mi(s, U(a.value, d));
  }
  function o() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : r(), d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    s && Ri(s, U(a.value, d));
  }
  function r() {
    var g, f;
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator, d;
    if (s)
      if (s === "parent") {
        let c = (f = (g = t == null ? void 0 : t.proxy) == null ? void 0 : g.$el) == null ? void 0 : f.parentNode;
        for (; c != null && c.hasAttribute("data-no-activator"); )
          c = c.parentNode;
        d = c;
      } else
        typeof s == "string" ? d = document.querySelector(s) : "$el" in s ? d = s.$el : d = s;
    return l.value = (d == null ? void 0 : d.nodeType) === Node.ELEMENT_NODE ? d : null, l.value;
  }
}
const Er = Symbol.for("vuetify:display");
function Za() {
  const e = ce(Er);
  if (!e)
    throw new Error("Could not find Vuetify display injection");
  return e;
}
function Br() {
  if (!be)
    return W(!1);
  const {
    ssr: e
  } = Za();
  if (e) {
    const t = W(!1);
    return ct(() => {
      t.value = !0;
    }), t;
  } else
    return W(!0);
}
const Or = A({
  eager: Boolean
}, "lazy");
function Lr(e, t) {
  const n = W(!1), l = m(() => n.value || e.eager || t.value);
  G(t, () => n.value = !0);
  function a() {
    e.eager || (n.value = !1);
  }
  return {
    isBooted: n,
    hasContent: l,
    onAfterLeave: a
  };
}
function Qa() {
  const t = fe("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
const Ll = Symbol.for("vuetify:stack"), gt = an([]);
function Tr(e, t, n) {
  const l = fe("useStack"), a = !n, i = ce(Ll, void 0), o = an({
    activeChildren: /* @__PURE__ */ new Set()
  });
  _e(Ll, o);
  const r = W(+t.value);
  Ze(e, () => {
    var f;
    const g = (f = gt.at(-1)) == null ? void 0 : f[1];
    r.value = g ? g + 10 : +t.value, a && gt.push([l.uid, r.value]), i == null || i.activeChildren.add(l.uid), ge(() => {
      if (a) {
        const c = Ne(gt).findIndex((v) => v[0] === l.uid);
        gt.splice(c, 1);
      }
      i == null || i.activeChildren.delete(l.uid);
    });
  });
  const s = W(!0);
  a && De(() => {
    var f;
    const g = ((f = gt.at(-1)) == null ? void 0 : f[0]) === l.uid;
    setTimeout(() => s.value = g);
  });
  const d = m(() => !o.activeChildren.size);
  return {
    globalTop: Fn(s),
    localTop: d,
    stackStyles: m(() => ({
      zIndex: r.value
    }))
  };
}
function $r(e) {
  return {
    teleportTarget: m(() => {
      const n = e.value;
      if (n === !0 || !be)
        return;
      const l = n === !1 ? document.body : typeof n == "string" ? document.querySelector(n) : n;
      if (l == null) {
        on(`Unable to locate target ${n}`);
        return;
      }
      let a = l.querySelector(":scope > .v-overlay-container");
      return a || (a = document.createElement("div"), a.className = "v-overlay-container", l.appendChild(a)), a;
    })
  };
}
function Fr() {
  return !0;
}
function Ja(e, t, n) {
  if (!e || ei(e, n) === !1)
    return !1;
  const l = na(t);
  if (typeof ShadowRoot < "u" && l instanceof ShadowRoot && l.host === e.target)
    return !1;
  const a = (typeof n.value == "object" && n.value.include || (() => []))();
  return a.push(t), !a.some((i) => i == null ? void 0 : i.contains(e.target));
}
function ei(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || Fr)(e);
}
function Mr(e, t, n) {
  const l = typeof n.value == "function" ? n.value : n.value.handler;
  t._clickOutside.lastMousedownWasOutside && Ja(e, t, n) && setTimeout(() => {
    ei(e, n) && l && l(e);
  }, 0);
}
function Tl(e, t) {
  const n = na(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const Rr = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (a) => Mr(a, e, t), l = (a) => {
      e._clickOutside.lastMousedownWasOutside = Ja(a, e, t);
    };
    Tl(e, (a) => {
      a.addEventListener("click", n, !0), a.addEventListener("mousedown", l, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: n,
      onMousedown: l
    };
  },
  unmounted(e, t) {
    e._clickOutside && (Tl(e, (n) => {
      var i;
      if (!n || !((i = e._clickOutside) != null && i[t.instance.$.uid]))
        return;
      const {
        onClick: l,
        onMousedown: a
      } = e._clickOutside[t.instance.$.uid];
      n.removeEventListener("click", l, !0), n.removeEventListener("mousedown", a, !0);
    }), delete e._clickOutside[t.instance.$.uid]);
  }
};
function Dr(e) {
  const {
    modelValue: t,
    color: n,
    ...l
  } = e;
  return u(Xe, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && u("div", U({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, l), null)]
  });
}
const ti = A({
  absolute: Boolean,
  attach: [Boolean, String, Object],
  closeOnBack: {
    type: Boolean,
    default: !0
  },
  contained: Boolean,
  contentClass: null,
  contentProps: null,
  disabled: Boolean,
  noClickAnimation: Boolean,
  modelValue: Boolean,
  persistent: Boolean,
  scrim: {
    type: [Boolean, String],
    default: !0
  },
  zIndex: {
    type: [Number, String],
    default: 2e3
  },
  ...Ir(),
  ...Q(),
  ...dt(),
  ...Or(),
  ...mr(),
  ...Sr(),
  ...ve(),
  ...vt()
}, "VOverlay"), $l = q()({
  name: "VOverlay",
  directives: {
    ClickOutside: Rr
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...ti()
  },
  emits: {
    "click:outside": (e) => !0,
    "update:modelValue": (e) => !0,
    afterLeave: () => !0
  },
  setup(e, t) {
    let {
      slots: n,
      attrs: l,
      emit: a
    } = t;
    const i = se(e, "modelValue"), o = m({
      get: () => i.value,
      set: (D) => {
        D && e.disabled || (i.value = D);
      }
    }), {
      teleportTarget: r
    } = $r(m(() => e.attach || e.contained)), {
      themeClasses: s
    } = Se(e), {
      rtlClasses: d,
      isRtl: g
    } = Tt(), {
      hasContent: f,
      onAfterLeave: c
    } = Lr(e, o), v = rt(m(() => typeof e.scrim == "string" ? e.scrim : null)), {
      globalTop: h,
      localTop: y,
      stackStyles: C
    } = Tr(o, H(e, "zIndex"), e._disableGlobalStack), {
      activatorEl: S,
      activatorRef: w,
      activatorEvents: b,
      contentEvents: I,
      scrimEvents: E
    } = Pr(e, {
      isActive: o,
      isTop: y
    }), {
      dimensionStyles: V
    } = ft(e), k = Br(), {
      scopeId: p
    } = Qa();
    G(() => e.disabled, (D) => {
      D && (o.value = !1);
    });
    const x = N(), L = N(), {
      contentStyles: M,
      updateLocation: T
    } = gr(e, {
      isRtl: g,
      contentEl: L,
      activatorEl: S,
      isActive: o
    });
    pr(e, {
      root: x,
      contentEl: L,
      activatorEl: S,
      isActive: o,
      updateLocation: T
    });
    function O(D) {
      a("click:outside", D), e.persistent ? B() : o.value = !1;
    }
    function $() {
      return o.value && h.value;
    }
    be && G(o, (D) => {
      D ? window.addEventListener("keydown", z) : window.removeEventListener("keydown", z);
    }, {
      immediate: !0
    });
    function z(D) {
      var Z, R;
      D.key === "Escape" && h.value && (e.persistent ? B() : (o.value = !1, (Z = L.value) != null && Z.contains(document.activeElement) && ((R = S.value) == null || R.focus())));
    }
    const _ = Io();
    Ze(() => e.closeOnBack, () => {
      Po(_, (D) => {
        h.value && o.value ? (D(!1), e.persistent ? B() : o.value = !1) : D();
      });
    });
    const F = N();
    G(() => o.value && (e.absolute || e.contained) && r.value == null, (D) => {
      if (D) {
        const Z = aa(x.value);
        Z && Z !== document.scrollingElement && (F.value = Z.scrollTop);
      }
    });
    function B() {
      e.noClickAnimation || L.value && lt(L.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: Jt
      });
    }
    return X(() => {
      var D;
      return u(J, null, [(D = n.activator) == null ? void 0 : D.call(n, {
        isActive: o.value,
        props: U({
          ref: w
        }, b.value, e.activatorProps)
      }), k.value && f.value && u(Vi, {
        disabled: !r.value,
        to: r.value
      }, {
        default: () => [u("div", U({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": o.value,
            "v-overlay--contained": e.contained
          }, s.value, d.value, e.class],
          style: [C.value, {
            top: j(F.value)
          }, e.style],
          ref: x
        }, p, l), [u(Dr, U({
          color: v,
          modelValue: o.value && !!e.scrim
        }, E.value), null), u(Re, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: S.value,
          onAfterLeave: () => {
            c(), a("afterLeave");
          }
        }, {
          default: () => {
            var Z;
            return [ke(u("div", U({
              ref: L,
              class: ["v-overlay__content", e.contentClass],
              style: [V.value, M.value]
            }, I.value, e.contentProps), [(Z = n.default) == null ? void 0 : Z.call(n, {
              isActive: o
            })]), [[ut, o.value], [Qe("click-outside"), {
              handler: O,
              closeConditional: $,
              include: () => [S.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: S,
      animateClick: B,
      contentEl: L,
      globalTop: h,
      localTop: y,
      updateLocation: T
    };
  }
}), Sn = Symbol("Forwarded refs");
function pn(e, t) {
  let n = e;
  for (; n; ) {
    const l = Reflect.getOwnPropertyDescriptor(n, t);
    if (l)
      return l;
    n = Object.getPrototypeOf(n);
  }
}
function vn(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), l = 1; l < t; l++)
    n[l - 1] = arguments[l];
  return e[Sn] = n, new Proxy(e, {
    get(a, i) {
      if (Reflect.has(a, i))
        return Reflect.get(a, i);
      if (!(typeof i == "symbol" || i.startsWith("$") || i.startsWith("__"))) {
        for (const o of n)
          if (o.value && Reflect.has(o.value, i)) {
            const r = Reflect.get(o.value, i);
            return typeof r == "function" ? r.bind(o.value) : r;
          }
      }
    },
    has(a, i) {
      if (Reflect.has(a, i))
        return !0;
      if (typeof i == "symbol" || i.startsWith("$") || i.startsWith("__"))
        return !1;
      for (const o of n)
        if (o.value && Reflect.has(o.value, i))
          return !0;
      return !1;
    },
    set(a, i, o) {
      if (Reflect.has(a, i))
        return Reflect.set(a, i, o);
      if (typeof i == "symbol" || i.startsWith("$") || i.startsWith("__"))
        return !1;
      for (const r of n)
        if (r.value && Reflect.has(r.value, i))
          return Reflect.set(r.value, i, o);
      return !1;
    },
    getOwnPropertyDescriptor(a, i) {
      var r;
      const o = Reflect.getOwnPropertyDescriptor(a, i);
      if (o)
        return o;
      if (!(typeof i == "symbol" || i.startsWith("$") || i.startsWith("__"))) {
        for (const s of n) {
          if (!s.value)
            continue;
          const d = pn(s.value, i) ?? ("_" in s.value ? pn((r = s.value._) == null ? void 0 : r.setupState, i) : void 0);
          if (d)
            return d;
        }
        for (const s of n) {
          const d = s.value && s.value[Sn];
          if (!d)
            continue;
          const g = d.slice();
          for (; g.length; ) {
            const f = g.shift(), c = pn(f.value, i);
            if (c)
              return c;
            const v = f.value && f.value[Sn];
            v && g.push(...v);
          }
        }
      }
    }
  });
}
const Nr = A({
  // TODO
  // disableKeys: Boolean,
  id: String,
  ...kt(ti({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: ra
    }
  }), ["absolute"])
}, "VMenu"), ni = q()({
  name: "VMenu",
  props: Nr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const l = se(e, "modelValue"), {
      scopeId: a
    } = Qa(), i = Fe(), o = m(() => e.id || `v-menu-${i}`), r = N(), s = ce(On, null), d = W(0);
    _e(On, {
      register() {
        ++d.value;
      },
      unregister() {
        --d.value;
      },
      closeParents() {
        setTimeout(() => {
          d.value || (l.value = !1, s == null || s.closeParents());
        }, 40);
      }
    });
    async function g(y) {
      var w, b, I;
      const C = y.relatedTarget, S = y.target;
      await me(), l.value && C !== S && ((w = r.value) != null && w.contentEl) && // We're the topmost menu
      ((b = r.value) != null && b.globalTop) && // It isn't the document or the menu body
      ![document, r.value.contentEl].includes(S) && // It isn't inside the menu body
      !r.value.contentEl.contains(S) && ((I = Vn(r.value.contentEl)[0]) == null || I.focus());
    }
    G(l, (y) => {
      y ? (s == null || s.register(), document.addEventListener("focusin", g, {
        once: !0
      })) : (s == null || s.unregister(), document.removeEventListener("focusin", g));
    });
    function f() {
      s == null || s.closeParents();
    }
    function c(y) {
      var C, S, w;
      e.disabled || y.key === "Tab" && (Ql(Vn((C = r.value) == null ? void 0 : C.contentEl, !1), y.shiftKey ? "prev" : "next", (I) => I.tabIndex >= 0) || (l.value = !1, (w = (S = r.value) == null ? void 0 : S.activatorEl) == null || w.focus()));
    }
    function v(y) {
      var S;
      if (e.disabled)
        return;
      const C = (S = r.value) == null ? void 0 : S.contentEl;
      C && l.value ? y.key === "ArrowDown" ? (y.preventDefault(), Xt(C, "next")) : y.key === "ArrowUp" && (y.preventDefault(), Xt(C, "prev")) : ["ArrowDown", "ArrowUp"].includes(y.key) && (l.value = !0, y.preventDefault(), setTimeout(() => setTimeout(() => v(y))));
    }
    const h = m(() => U({
      "aria-haspopup": "menu",
      "aria-expanded": String(l.value),
      "aria-owns": o.value,
      onKeydown: v
    }, e.activatorProps));
    return X(() => {
      const [y] = $l.filterProps(e);
      return u($l, U({
        ref: r,
        class: ["v-menu", e.class],
        style: e.style
      }, y, {
        modelValue: l.value,
        "onUpdate:modelValue": (C) => l.value = C,
        absolute: !0,
        activatorProps: h.value,
        "onClick:outside": f,
        onKeydown: c
      }, a), {
        activator: n.activator,
        default: function() {
          for (var C = arguments.length, S = new Array(C), w = 0; w < C; w++)
            S[w] = arguments[w];
          return u(he, {
            root: "VMenu"
          }, {
            default: () => {
              var b;
              return [(b = n.default) == null ? void 0 : b.call(n, ...S)];
            }
          });
        }
      });
    }), vn({
      id: o,
      ΨopenChildren: d
    }, r);
  }
});
const zr = A({
  active: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...Q(),
  ...vt({
    transition: {
      component: sa
    }
  })
}, "VCounter"), Hr = q()({
  name: "VCounter",
  functional: !0,
  props: zr(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const l = m(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return X(() => u(Re, {
      transition: e.transition
    }, {
      default: () => [ke(u("div", {
        class: ["v-counter", e.class],
        style: e.style
      }, [n.default ? n.default({
        counter: l.value,
        max: e.max,
        value: e.value
      }) : l.value]), [[ut, e.active]])]
    })), {};
  }
});
const jr = A({
  floating: Boolean,
  ...Q()
}, "VFieldLabel"), Nt = q()({
  name: "VFieldLabel",
  props: jr(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return X(() => u(Pa, {
      class: ["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class],
      style: e.style,
      "aria-hidden": e.floating || void 0
    }, n)), {};
  }
});
function li(e, t) {
  const n = N(), l = W(!1);
  if (Mn) {
    const a = new IntersectionObserver((i) => {
      e == null || e(i, a), l.value = !!i.find((o) => o.isIntersecting);
    }, t);
    Je(() => {
      a.disconnect();
    }), G(n, (i, o) => {
      o && (a.unobserve(o), l.value = !1), i && a.observe(i);
    }, {
      flush: "post"
    });
  }
  return {
    intersectionRef: n,
    isIntersecting: l
  };
}
const Fl = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, ai = A({
  location: String
}, "location");
function ii(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: l
  } = Tt();
  return {
    locationStyles: m(() => {
      if (!e.location)
        return {};
      const {
        side: i,
        align: o
      } = kn(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, l.value);
      function r(d) {
        return n ? n(d) : 0;
      }
      const s = {};
      return i !== "center" && (t ? s[Fl[i]] = `calc(100% - ${r(i)}px)` : s[i] = 0), o !== "center" ? t ? s[Fl[o]] = `calc(100% - ${r(o)}px)` : s[o] = 0 : (i === "center" ? s.top = s.left = "50%" : s[{
        top: "left",
        bottom: "left",
        left: "top",
        right: "top"
      }[i]] = "50%", s.transform = {
        top: "translateX(-50%)",
        bottom: "translateX(-50%)",
        left: "translateY(-50%)",
        right: "translateY(-50%)",
        center: "translate(-50%, -50%)"
      }[i]), s;
    })
  };
}
const qr = A({
  absolute: Boolean,
  active: {
    type: Boolean,
    default: !0
  },
  bgColor: String,
  bgOpacity: [Number, String],
  bufferValue: {
    type: [Number, String],
    default: 0
  },
  clickable: Boolean,
  color: String,
  height: {
    type: [Number, String],
    default: 4
  },
  indeterminate: Boolean,
  max: {
    type: [Number, String],
    default: 100
  },
  modelValue: {
    type: [Number, String],
    default: 0
  },
  reverse: Boolean,
  stream: Boolean,
  striped: Boolean,
  roundedBar: Boolean,
  ...Q(),
  ...ai({
    location: "top"
  }),
  ...je(),
  ...Ie(),
  ...ve()
}, "VProgressLinear"), Gr = q()({
  name: "VProgressLinear",
  props: qr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const l = se(e, "modelValue"), {
      isRtl: a,
      rtlClasses: i
    } = Tt(), {
      themeClasses: o
    } = Se(e), {
      locationStyles: r
    } = ii(e), {
      textColorClasses: s,
      textColorStyles: d
    } = Oe(e, "color"), {
      backgroundColorClasses: g,
      backgroundColorStyles: f
    } = rt(m(() => e.bgColor || e.color)), {
      backgroundColorClasses: c,
      backgroundColorStyles: v
    } = rt(e, "color"), {
      roundedClasses: h
    } = qe(e), {
      intersectionRef: y,
      isIntersecting: C
    } = li(), S = m(() => parseInt(e.max, 10)), w = m(() => parseInt(e.height, 10)), b = m(() => parseFloat(e.bufferValue) / S.value * 100), I = m(() => parseFloat(l.value) / S.value * 100), E = m(() => a.value !== e.reverse), V = m(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), k = m(() => e.bgOpacity == null ? e.bgOpacity : parseFloat(e.bgOpacity));
    function p(x) {
      if (!y.value)
        return;
      const {
        left: L,
        right: M,
        width: T
      } = y.value.getBoundingClientRect(), O = E.value ? T - x.clientX + (M - T) : x.clientX - L;
      l.value = Math.round(O / T * S.value);
    }
    return X(() => u(e.tag, {
      ref: y,
      class: ["v-progress-linear", {
        "v-progress-linear--absolute": e.absolute,
        "v-progress-linear--active": e.active && C.value,
        "v-progress-linear--reverse": E.value,
        "v-progress-linear--rounded": e.rounded,
        "v-progress-linear--rounded-bar": e.roundedBar,
        "v-progress-linear--striped": e.striped
      }, h.value, o.value, i.value, e.class],
      style: [{
        bottom: e.location === "bottom" ? 0 : void 0,
        top: e.location === "top" ? 0 : void 0,
        height: e.active ? j(w.value) : 0,
        "--v-progress-linear-height": j(w.value),
        ...r.value
      }, e.style],
      role: "progressbar",
      "aria-hidden": e.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": e.max,
      "aria-valuenow": e.indeterminate ? void 0 : I.value,
      onClick: e.clickable && p
    }, {
      default: () => [e.stream && u("div", {
        key: "stream",
        class: ["v-progress-linear__stream", s.value],
        style: {
          ...d.value,
          [E.value ? "left" : "right"]: j(-w.value),
          borderTop: `${j(w.value / 2)} dotted`,
          opacity: k.value,
          top: `calc(50% - ${j(w.value / 4)})`,
          width: j(100 - b.value, "%"),
          "--v-progress-linear-stream-to": j(w.value * (E.value ? 1 : -1))
        }
      }, null), u("div", {
        class: ["v-progress-linear__background", g.value],
        style: [f.value, {
          opacity: k.value,
          width: j(e.stream ? b.value : 100, "%")
        }]
      }, null), u(Xe, {
        name: V.value
      }, {
        default: () => [e.indeterminate ? u("div", {
          class: "v-progress-linear__indeterminate"
        }, [["long", "short"].map((x) => u("div", {
          key: x,
          class: ["v-progress-linear__indeterminate", x, c.value],
          style: v.value
        }, null))]) : u("div", {
          class: ["v-progress-linear__determinate", c.value],
          style: [v.value, {
            width: j(I.value, "%")
          }]
        }, null)]
      }), n.default && u("div", {
        class: "v-progress-linear__content"
      }, [n.default({
        value: I.value,
        buffer: b.value
      })])]
    })), {};
  }
}), oi = A({
  loading: [Boolean, String]
}, "loader");
function ri(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : $e();
  return {
    loaderClasses: m(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function Wr(e, t) {
  var l;
  let {
    slots: n
  } = t;
  return u("div", {
    class: `${e.name}__loader`
  }, [((l = n.default) == null ? void 0 : l.call(n, {
    color: e.color,
    isActive: e.active
  })) || u(Gr, {
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const Ur = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], si = A({
  appendInnerIcon: ne,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: ne,
    default: "$clear"
  },
  active: Boolean,
  centerAffix: {
    type: Boolean,
    default: void 0
  },
  color: String,
  baseColor: String,
  dirty: Boolean,
  disabled: {
    type: Boolean,
    default: null
  },
  error: Boolean,
  flat: Boolean,
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: ne,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => Ur.includes(e)
  },
  "onClick:clear": Be(),
  "onClick:appendInner": Be(),
  "onClick:prependInner": Be(),
  ...Q(),
  ...oi(),
  ...je(),
  ...ve()
}, "VField"), ui = q()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...Ta(),
    ...si()
  },
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: l,
      slots: a
    } = t;
    const {
      themeClasses: i
    } = Se(e), {
      loaderClasses: o
    } = ri(e), {
      focusClasses: r,
      isFocused: s,
      focus: d,
      blur: g
    } = $a(e), {
      InputIcon: f
    } = La(e), {
      roundedClasses: c
    } = qe(e), {
      rtlClasses: v
    } = Tt(), h = m(() => e.dirty || e.active), y = m(() => !e.singleLine && !!(e.label || a.label)), C = Fe(), S = m(() => e.id || `input-${C}`), w = m(() => `${S.value}-messages`), b = N(), I = N(), E = N(), V = m(() => ["plain", "underlined"].includes(e.variant)), {
      backgroundColorClasses: k,
      backgroundColorStyles: p
    } = rt(H(e, "bgColor")), {
      textColorClasses: x,
      textColorStyles: L
    } = Oe(m(() => e.error || e.disabled ? void 0 : h.value && s.value ? e.color : e.baseColor));
    G(h, (O) => {
      if (y.value) {
        const $ = b.value.$el, z = I.value.$el;
        requestAnimationFrame(() => {
          const _ = zn($), F = z.getBoundingClientRect(), B = F.x - _.x, D = F.y - _.y - (_.height / 2 - F.height / 2), Z = F.width / 0.75, R = Math.abs(Z - _.width) > 1 ? {
            maxWidth: j(Z)
          } : void 0, ae = getComputedStyle($), ee = getComputedStyle(z), te = parseFloat(ae.transitionDuration) * 1e3 || 150, oe = parseFloat(ee.getPropertyValue("--v-field-label-scale")), le = ee.getPropertyValue("color");
          $.style.visibility = "visible", z.style.visibility = "hidden", lt($, {
            transform: `translate(${B}px, ${D}px) scale(${oe})`,
            color: le,
            ...R
          }, {
            duration: te,
            easing: Jt,
            direction: O ? "normal" : "reverse"
          }).finished.then(() => {
            $.style.removeProperty("visibility"), z.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const M = m(() => ({
      isActive: h,
      isFocused: s,
      controlRef: E,
      blur: g,
      focus: d
    }));
    function T(O) {
      O.target !== document.activeElement && O.preventDefault();
    }
    return X(() => {
      var B, D, Z;
      const O = e.variant === "outlined", $ = a["prepend-inner"] || e.prependInnerIcon, z = !!(e.clearable || a.clear), _ = !!(a["append-inner"] || e.appendInnerIcon || z), F = a.label ? a.label({
        ...M.value,
        label: e.label,
        props: {
          for: S.value
        }
      }) : e.label;
      return u("div", U({
        class: ["v-field", {
          "v-field--active": h.value,
          "v-field--appended": _,
          "v-field--center-affix": e.centerAffix ?? !V.value,
          "v-field--disabled": e.disabled,
          "v-field--dirty": e.dirty,
          "v-field--error": e.error,
          "v-field--flat": e.flat,
          "v-field--has-background": !!e.bgColor,
          "v-field--persistent-clear": e.persistentClear,
          "v-field--prepended": $,
          "v-field--reverse": e.reverse,
          "v-field--single-line": e.singleLine,
          "v-field--no-label": !F,
          [`v-field--variant-${e.variant}`]: !0
        }, i.value, k.value, r.value, o.value, c.value, v.value, e.class],
        style: [p.value, e.style],
        onClick: T
      }, n), [u("div", {
        class: "v-field__overlay"
      }, null), u(Wr, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: a.loader
      }), $ && u("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && u(f, {
        key: "prepend-icon",
        name: "prependInner"
      }, null), (B = a["prepend-inner"]) == null ? void 0 : B.call(a, M.value)]), u("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && y.value && u(Nt, {
        key: "floating-label",
        ref: I,
        class: [x.value],
        floating: !0,
        for: S.value,
        style: L.value
      }, {
        default: () => [F]
      }), u(Nt, {
        ref: b,
        for: S.value
      }, {
        default: () => [F]
      }), (D = a.default) == null ? void 0 : D.call(a, {
        ...M.value,
        props: {
          id: S.value,
          class: "v-field__input",
          "aria-describedby": w.value
        },
        focus: d,
        blur: g
      })]), z && u(ua, {
        key: "clear"
      }, {
        default: () => [ke(u("div", {
          class: "v-field__clearable",
          onMousedown: (R) => {
            R.preventDefault(), R.stopPropagation();
          }
        }, [a.clear ? a.clear() : u(f, {
          name: "clear"
        }, null)]), [[ut, e.dirty]])]
      }), _ && u("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(Z = a["append-inner"]) == null ? void 0 : Z.call(a, M.value), e.appendInnerIcon && u(f, {
        key: "append-icon",
        name: "appendInner"
      }, null)]), u("div", {
        class: ["v-field__outline", x.value],
        style: L.value
      }, [O && u(J, null, [u("div", {
        class: "v-field__outline__start"
      }, null), y.value && u("div", {
        class: "v-field__outline__notch"
      }, [u(Nt, {
        ref: I,
        floating: !0,
        for: S.value
      }, {
        default: () => [F]
      })]), u("div", {
        class: "v-field__outline__end"
      }, null)]), V.value && y.value && u(Nt, {
        ref: I,
        floating: !0,
        for: S.value
      }, {
        default: () => [F]
      })])]);
    }), {
      controlRef: E
    };
  }
});
function Kr(e) {
  const t = Object.keys(ui.props).filter((n) => !Rn(n) && n !== "class" && n !== "style");
  return ot(e, t);
}
const Yr = ["color", "file", "time", "date", "datetime-local", "week", "month"], Xn = A({
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: [Number, Function],
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  suffix: String,
  role: String,
  type: {
    type: String,
    default: "text"
  },
  modelModifiers: Object,
  ...Fa(),
  ...si()
}, "VTextField"), xt = q()({
  name: "VTextField",
  directives: {
    Intersect: fa
  },
  inheritAttrs: !1,
  props: Xn(),
  emits: {
    "click:control": (e) => !0,
    "mousedown:control": (e) => !0,
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: l,
      slots: a
    } = t;
    const i = se(e, "modelValue"), {
      isFocused: o,
      focus: r,
      blur: s
    } = $a(e), d = m(() => typeof e.counterValue == "function" ? e.counterValue(i.value) : typeof e.counterValue == "number" ? e.counterValue : (i.value ?? "").toString().length), g = m(() => {
      if (n.maxlength)
        return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), f = m(() => ["plain", "underlined"].includes(e.variant));
    function c(V, k) {
      var p, x;
      !e.autofocus || !V || (x = (p = k[0].target) == null ? void 0 : p.focus) == null || x.call(p);
    }
    const v = N(), h = N(), y = N(), C = m(() => Yr.includes(e.type) || e.persistentPlaceholder || o.value || e.active);
    function S() {
      var V;
      y.value !== document.activeElement && ((V = y.value) == null || V.focus()), o.value || r();
    }
    function w(V) {
      l("mousedown:control", V), V.target !== y.value && (S(), V.preventDefault());
    }
    function b(V) {
      S(), l("click:control", V);
    }
    function I(V) {
      V.stopPropagation(), S(), me(() => {
        i.value = null, Ti(e["onClick:clear"], V);
      });
    }
    function E(V) {
      var p;
      const k = V.target;
      if (i.value = k.value, (p = e.modelModifiers) != null && p.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const x = [k.selectionStart, k.selectionEnd];
        me(() => {
          k.selectionStart = x[0], k.selectionEnd = x[1];
        });
      }
    }
    return X(() => {
      const V = !!(a.counter || e.counter !== !1 && e.counter != null), k = !!(V || a.details), [p, x] = Yl(n), [{
        modelValue: L,
        ...M
      }] = Pl.filterProps(e), [T] = Kr(e);
      return u(Pl, U({
        ref: v,
        modelValue: i.value,
        "onUpdate:modelValue": (O) => i.value = O,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-text-field--plain-underlined": ["plain", "underlined"].includes(e.variant)
        }, e.class],
        style: e.style
      }, p, M, {
        centerAffix: !f.value,
        focused: o.value
      }), {
        ...a,
        default: (O) => {
          let {
            id: $,
            isDisabled: z,
            isDirty: _,
            isReadonly: F,
            isValid: B
          } = O;
          return u(ui, U({
            ref: h,
            onMousedown: w,
            onClick: b,
            "onClick:clear": I,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, T, {
            id: $.value,
            active: C.value || _.value,
            dirty: _.value || e.dirty,
            disabled: z.value,
            focused: o.value,
            error: B.value === !1
          }), {
            ...a,
            default: (D) => {
              let {
                props: {
                  class: Z,
                  ...R
                }
              } = D;
              const ae = ke(u("input", U({
                ref: y,
                value: i.value,
                onInput: E,
                autofocus: e.autofocus,
                readonly: F.value,
                disabled: z.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: S,
                onBlur: s
              }, R, x), null), [[Qe("intersect"), {
                handler: c
              }, null, {
                once: !0
              }]]);
              return u(J, null, [e.prefix && u("span", {
                class: "v-text-field__prefix"
              }, [u("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), a.default ? u("div", {
                class: Z,
                "data-no-activator": ""
              }, [a.default(), ae]) : ki(ae, {
                class: Z
              }), e.suffix && u("span", {
                class: "v-text-field__suffix"
              }, [u("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: k ? (O) => {
          var $;
          return u(J, null, [($ = a.details) == null ? void 0 : $.call(a, O), V && u(J, null, [u("span", null, null), u(Hr, {
            active: e.persistentCounter || o.value,
            value: d.value,
            max: g.value
          }, a.counter)])]);
        } : void 0
      });
    }), vn({}, v, h, y);
  }
});
function Zn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = N(), l = N();
  if (be) {
    const a = new ResizeObserver((i) => {
      e == null || e(i, a), i.length && (t === "content" ? l.value = i[0].contentRect : l.value = i[0].target.getBoundingClientRect());
    });
    Je(() => {
      a.disconnect();
    }), G(n, (i, o) => {
      o && (a.unobserve(wn(o)), l.value = void 0), i && a.observe(wn(i));
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: Fn(l)
  };
}
const Xr = A({
  renderless: Boolean,
  ...Q()
}, "VVirtualScrollItem"), Zr = q()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: Xr(),
  emits: {
    "update:height": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      emit: l,
      slots: a
    } = t;
    const {
      resizeRef: i,
      contentRect: o
    } = Zn(void 0, "border");
    G(() => {
      var r;
      return (r = o.value) == null ? void 0 : r.height;
    }, (r) => {
      r != null && l("update:height", r);
    }), X(() => {
      var r, s;
      return e.renderless ? u(J, null, [(r = a.default) == null ? void 0 : r.call(a, {
        itemRef: i
      })]) : u("div", U({
        ref: i,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, n), [(s = a.default) == null ? void 0 : s.call(a)]);
    });
  }
}), Ml = -1, Rl = 1, Qr = A({
  itemHeight: {
    type: [Number, String],
    default: 48
  }
}, "virtual");
function Jr(e, t, n) {
  const l = W(0), a = W(e.itemHeight), i = m({
    get: () => parseInt(a.value ?? 0, 10),
    set(k) {
      a.value = k;
    }
  }), o = N(), {
    resizeRef: r,
    contentRect: s
  } = Zn();
  De(() => {
    r.value = o.value;
  });
  const d = Za(), g = /* @__PURE__ */ new Map();
  let f = Array.from({
    length: t.value.length
  });
  const c = m(() => {
    const k = (!s.value || o.value === document.documentElement ? d.height.value : s.value.height) - ((n == null ? void 0 : n.value) ?? 0);
    return Math.ceil(k / i.value * 1.7 + 1);
  });
  function v(k, p) {
    i.value = Math.max(i.value, p), f[k] = p, g.set(t.value[k], p);
  }
  function h(k) {
    return f.slice(0, k).reduce((p, x) => p + (x || i.value), 0);
  }
  function y(k) {
    const p = t.value.length;
    let x = 0, L = 0;
    for (; L < k && x < p; )
      L += f[x++] || i.value;
    return x - 1;
  }
  let C = 0;
  function S() {
    if (!o.value || !s.value)
      return;
    const k = s.value.height - 56, p = o.value.scrollTop, x = p < C ? Ml : Rl, L = y(p + k / 2), M = Math.round(c.value / 3), T = L - M, O = l.value + M * 2 - 1;
    x === Ml && L <= O ? l.value = Kt(T, 0, t.value.length) : x === Rl && L >= O && (l.value = Kt(T, 0, t.value.length - c.value)), C = p;
  }
  function w(k) {
    if (!o.value)
      return;
    const p = h(k);
    o.value.scrollTop = p;
  }
  const b = m(() => Math.min(t.value.length, l.value + c.value)), I = m(() => t.value.slice(l.value, b.value).map((k, p) => ({
    raw: k,
    index: p + l.value
  }))), E = m(() => h(l.value)), V = m(() => h(t.value.length) - h(b.value));
  return G(() => t.value.length, () => {
    f = Ai(t.value.length).map(() => i.value), g.forEach((k, p) => {
      const x = t.value.indexOf(p);
      x === -1 ? g.delete(p) : f[x] = k;
    });
  }), {
    containerRef: o,
    computedItems: I,
    itemHeight: i,
    paddingTop: E,
    paddingBottom: V,
    scrollToIndex: w,
    handleScroll: S,
    handleItemResize: v
  };
}
const es = A({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...Qr(),
  ...Q(),
  ...dt()
}, "VVirtualScroll"), ci = q()({
  name: "VVirtualScroll",
  props: es(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const l = fe("VVirtualScroll"), {
      dimensionStyles: a
    } = ft(e), {
      containerRef: i,
      handleScroll: o,
      handleItemResize: r,
      scrollToIndex: s,
      paddingTop: d,
      paddingBottom: g,
      computedItems: f
    } = Jr(e, H(e, "items"));
    return Ze(() => e.renderless, () => {
      ct(() => {
        var c;
        i.value = aa(l.vnode.el, !0), (c = i.value) == null || c.addEventListener("scroll", o);
      }), ge(() => {
        var c;
        (c = i.value) == null || c.removeEventListener("scroll", o);
      });
    }), X(() => {
      const c = f.value.map((v) => u(Zr, {
        key: v.index,
        renderless: e.renderless,
        "onUpdate:height": (h) => r(v.index, h)
      }, {
        default: (h) => {
          var y;
          return (y = n.default) == null ? void 0 : y.call(n, {
            item: v.raw,
            index: v.index,
            ...h
          });
        }
      }));
      return e.renderless ? u(J, null, [u("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: j(d.value)
        }
      }, null), c, u("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: j(g.value)
        }
      }, null)]) : u("div", {
        ref: i,
        class: ["v-virtual-scroll", e.class],
        onScroll: o,
        style: [a.value, e.style]
      }, [u("div", {
        class: "v-virtual-scroll__container",
        style: {
          paddingTop: j(d.value),
          paddingBottom: j(g.value)
        }
      }, [c])]);
    }), {
      scrollToIndex: s
    };
  }
});
function di(e, t) {
  const n = W(!1);
  let l;
  function a(r) {
    cancelAnimationFrame(l), n.value = !0, l = requestAnimationFrame(() => {
      l = requestAnimationFrame(() => {
        n.value = !1;
      });
    });
  }
  async function i() {
    await new Promise((r) => requestAnimationFrame(r)), await new Promise((r) => requestAnimationFrame(r)), await new Promise((r) => requestAnimationFrame(r)), await new Promise((r) => {
      if (n.value) {
        const s = G(n, () => {
          s(), r();
        });
      } else
        r();
    });
  }
  async function o(r) {
    var g, f;
    if (r.key === "Tab" && ((g = t.value) == null || g.focus()), !["PageDown", "PageUp", "Home", "End"].includes(r.key))
      return;
    const s = (f = e.value) == null ? void 0 : f.$el;
    if (!s)
      return;
    (r.key === "Home" || r.key === "End") && s.scrollTo({
      top: r.key === "Home" ? 0 : s.scrollHeight,
      behavior: "smooth"
    }), await i();
    const d = s.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (r.key === "PageDown" || r.key === "Home") {
      const c = s.getBoundingClientRect().top;
      for (const v of d)
        if (v.getBoundingClientRect().top >= c) {
          v.focus();
          break;
        }
    } else {
      const c = s.getBoundingClientRect().bottom;
      for (const v of [...d].reverse())
        if (v.getBoundingClientRect().bottom <= c) {
          v.focus();
          break;
        }
    }
  }
  return {
    onListScroll: a,
    onListKeydown: o
  };
}
const fi = A({
  chips: Boolean,
  closableChips: Boolean,
  closeText: {
    type: String,
    default: "$vuetify.close"
  },
  openText: {
    type: String,
    default: "$vuetify.open"
  },
  eager: Boolean,
  hideNoData: Boolean,
  hideSelected: Boolean,
  menu: Boolean,
  menuIcon: {
    type: ne,
    default: "$dropdown"
  },
  menuProps: {
    type: Object
  },
  multiple: Boolean,
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  openOnClear: Boolean,
  itemColor: String,
  ...qa({
    itemChildren: !1
  })
}, "Select"), ts = A({
  ...fi(),
  ...kt(Xn({
    modelValue: null,
    role: "button"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...vt({
    transition: {
      component: ra
    }
  })
}, "VSelect"), Ln = q()({
  name: "VSelect",
  props: ts(),
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:menu": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      t: l
    } = dn(), a = N(), i = N(), o = N(), r = se(e, "menu"), s = m({
      get: () => r.value,
      set: (_) => {
        var F;
        r.value && !_ && ((F = i.value) != null && F.ΨopenChildren) || (r.value = _);
      }
    }), {
      items: d,
      transformIn: g,
      transformOut: f
    } = Wa(e), c = se(e, "modelValue", [], (_) => g(_ === null ? [null] : Ae(_)), (_) => {
      const F = f(_);
      return e.multiple ? F : F[0] ?? null;
    }), v = Kn(), h = m(() => c.value.map((_) => _.value)), y = W(!1), C = m(() => s.value ? e.closeText : e.openText);
    let S = "", w;
    const b = m(() => e.hideSelected ? d.value.filter((_) => !c.value.some((F) => F === _)) : d.value), I = m(() => e.hideNoData && !d.value.length || e.readonly || (v == null ? void 0 : v.isReadonly.value)), E = N(), {
      onListScroll: V,
      onListKeydown: k
    } = di(E, a);
    function p(_) {
      e.openOnClear && (s.value = !0);
    }
    function x() {
      I.value || (s.value = !s.value);
    }
    function L(_) {
      var R, ae;
      if (!_.key || e.readonly || v != null && v.isReadonly.value)
        return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(_.key) && _.preventDefault(), ["Enter", "ArrowDown", " "].includes(_.key) && (s.value = !0), ["Escape", "Tab"].includes(_.key) && (s.value = !1), _.key === "Home" ? (R = E.value) == null || R.focus("first") : _.key === "End" && ((ae = E.value) == null || ae.focus("last"));
      const F = 1e3;
      function B(ee) {
        const te = ee.key.length === 1, oe = !ee.ctrlKey && !ee.metaKey && !ee.altKey;
        return te && oe;
      }
      if (e.multiple || !B(_))
        return;
      const D = performance.now();
      D - w > F && (S = ""), S += _.key.toLowerCase(), w = D;
      const Z = d.value.find((ee) => ee.title.toLowerCase().startsWith(S));
      Z !== void 0 && (c.value = [Z]);
    }
    function M(_) {
      if (e.multiple) {
        const F = c.value.findIndex((B) => e.valueComparator(B.value, _.value));
        if (F === -1)
          c.value = [...c.value, _];
        else {
          const B = [...c.value];
          B.splice(F, 1), c.value = B;
        }
      } else
        c.value = [_], s.value = !1;
    }
    function T(_) {
      var F;
      (F = E.value) != null && F.$el.contains(_.relatedTarget) || (s.value = !1);
    }
    function O() {
      var _;
      y.value && ((_ = a.value) == null || _.focus());
    }
    function $(_) {
      y.value = !0;
    }
    function z(_) {
      if (_ == null)
        c.value = [];
      else if (Zt(a.value, ":autofill") || Zt(a.value, ":-webkit-autofill")) {
        const F = d.value.find((B) => B.title === _);
        F && M(F);
      } else
        a.value && (a.value.value = "");
    }
    return G(s, () => {
      if (!e.hideSelected && s.value && c.value.length) {
        const _ = b.value.findIndex((F) => c.value.some((B) => e.valueComparator(B.value, F.value)));
        be && window.requestAnimationFrame(() => {
          var F;
          _ >= 0 && ((F = o.value) == null || F.scrollToIndex(_));
        });
      }
    }), X(() => {
      const _ = !!(e.chips || n.chip), F = !!(!e.hideNoData || b.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), B = c.value.length > 0, [D] = xt.filterProps(e), Z = B || !y.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return u(xt, U({
        ref: a
      }, D, {
        modelValue: c.value.map((R) => R.props.value).join(", "),
        "onUpdate:modelValue": z,
        focused: y.value,
        "onUpdate:focused": (R) => y.value = R,
        validationValue: c.externalValue,
        counterValue: c.value.length,
        dirty: B,
        class: ["v-select", {
          "v-select--active-menu": s.value,
          "v-select--chips": !!e.chips,
          [`v-select--${e.multiple ? "multiple" : "single"}`]: !0,
          "v-select--selected": c.value.length,
          "v-select--selection-slot": !!n.selection
        }, e.class],
        style: e.style,
        inputmode: "none",
        placeholder: Z,
        "onClick:clear": p,
        "onMousedown:control": x,
        onBlur: T,
        onKeydown: L,
        "aria-label": l(C.value),
        title: l(C.value)
      }), {
        ...n,
        default: () => u(J, null, [u(ni, U({
          ref: i,
          modelValue: s.value,
          "onUpdate:modelValue": (R) => s.value = R,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: I.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterLeave: O
        }, e.menuProps), {
          default: () => [F && u(Ka, {
            ref: E,
            selected: h.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (R) => R.preventDefault(),
            onKeydown: k,
            onFocusin: $,
            onScrollPassive: V,
            tabindex: "-1",
            color: e.itemColor ?? e.color
          }, {
            default: () => {
              var R, ae, ee;
              return [(R = n["prepend-item"]) == null ? void 0 : R.call(n), !b.value.length && !e.hideNoData && (((ae = n["no-data"]) == null ? void 0 : ae.call(n)) ?? u(st, {
                title: l(e.noDataText)
              }, null)), u(ci, {
                ref: o,
                renderless: !0,
                items: b.value
              }, {
                default: (te) => {
                  var P;
                  let {
                    item: oe,
                    index: le,
                    itemRef: Le
                  } = te;
                  const mt = U(oe.props, {
                    ref: Le,
                    key: le,
                    onClick: () => M(oe)
                  });
                  return ((P = n.item) == null ? void 0 : P.call(n, {
                    item: oe,
                    index: le,
                    props: mt
                  })) ?? u(st, mt, {
                    prepend: (K) => {
                      let {
                        isSelected: ie
                      } = K;
                      return u(J, null, [e.multiple && !e.hideSelected ? u(Oa, {
                        key: oe.value,
                        modelValue: ie,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, oe.props.prependIcon && u(re, {
                        icon: oe.props.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (ee = n["append-item"]) == null ? void 0 : ee.call(n)];
            }
          })]
        }), c.value.map((R, ae) => {
          function ee(Le) {
            Le.stopPropagation(), Le.preventDefault(), M(R);
          }
          const te = {
            "onClick:close": ee,
            onMousedown(Le) {
              Le.preventDefault(), Le.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, oe = _ ? !!n.chip : !!n.selection, le = oe ? Nn(_ ? n.chip({
            item: R,
            index: ae,
            props: te
          }) : n.selection({
            item: R,
            index: ae
          })) : void 0;
          if (!(oe && !le))
            return u("div", {
              key: R.value,
              class: "v-select__selection"
            }, [_ ? n.chip ? u(he, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: R.title
                }
              }
            }, {
              default: () => [le]
            }) : u(Un, U({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: R.title,
              disabled: R.props.disabled
            }, te), null) : le ?? u("span", {
              class: "v-select__selection-text"
            }, [R.title, e.multiple && ae < c.value.length - 1 && u("span", {
              class: "v-select__selection-comma"
            }, [Ut(",")])])]);
        })]),
        "append-inner": function() {
          var te;
          for (var R = arguments.length, ae = new Array(R), ee = 0; ee < R; ee++)
            ae[ee] = arguments[ee];
          return u(J, null, [(te = n["append-inner"]) == null ? void 0 : te.call(n, ...ae), e.menuIcon ? u(re, {
            class: "v-select__menu-icon",
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), vn({
      isFocused: y,
      menu: s,
      select: M
    }, a);
  }
}), ns = (e, t, n) => e == null || t == null ? -1 : e.toString().toLocaleLowerCase().indexOf(t.toString().toLocaleLowerCase()), ls = A({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function as(e, t, n) {
  var r;
  const l = [], a = (n == null ? void 0 : n.default) ?? ns, i = n != null && n.filterKeys ? Ae(n.filterKeys) : !1, o = Object.keys((n == null ? void 0 : n.customKeyFilter) ?? {}).length;
  if (!(e != null && e.length))
    return l;
  e:
    for (let s = 0; s < e.length; s++) {
      const [d, g = d] = Ae(e[s]), f = {}, c = {};
      let v = -1;
      if (t && !(n != null && n.noFilter)) {
        if (typeof d == "object") {
          const C = i || Object.keys(g);
          for (const S of C) {
            const w = Ee(g, S, g), b = (r = n == null ? void 0 : n.customKeyFilter) == null ? void 0 : r[S];
            if (v = b ? b(w, t, d) : a(w, t, d), v !== -1 && v !== !1)
              b ? f[S] = v : c[S] = v;
            else if ((n == null ? void 0 : n.filterMode) === "every")
              continue e;
          }
        } else
          v = a(d, t, d), v !== -1 && v !== !1 && (c.title = v);
        const h = Object.keys(c).length, y = Object.keys(f).length;
        if (!h && !y || (n == null ? void 0 : n.filterMode) === "union" && y !== o && !h || (n == null ? void 0 : n.filterMode) === "intersection" && (y !== o || !h))
          continue;
      }
      l.push({
        index: s,
        matches: {
          ...c,
          ...f
        }
      });
    }
  return l;
}
function is(e, t, n, l) {
  const a = N([]), i = N(/* @__PURE__ */ new Map()), o = m(() => l != null && l.transform ? we(t).map((s) => [s, l.transform(s)]) : we(t));
  De(() => {
    const s = typeof n == "function" ? n() : we(n), d = typeof s != "string" && typeof s != "number" ? "" : String(s), g = as(o.value, d, {
      customKeyFilter: e.customKeyFilter,
      default: e.customFilter,
      filterKeys: e.filterKeys,
      filterMode: e.filterMode,
      noFilter: e.noFilter
    }), f = we(t), c = [], v = /* @__PURE__ */ new Map();
    g.forEach((h) => {
      let {
        index: y,
        matches: C
      } = h;
      const S = f[y];
      c.push(S), v.set(S.value, C);
    }), a.value = c, i.value = v;
  });
  function r(s) {
    return i.value.get(s.value);
  }
  return {
    filteredItems: a,
    filteredMatches: i,
    getMatches: r
  };
}
function os(e, t, n) {
  if (t == null)
    return e;
  if (Array.isArray(t))
    throw new Error("Multiple matches is not implemented");
  return typeof t == "number" && ~t ? u(J, null, [u("span", {
    class: "v-combobox__unmask"
  }, [e.substr(0, t)]), u("span", {
    class: "v-combobox__mask"
  }, [e.substr(t, n)]), u("span", {
    class: "v-combobox__unmask"
  }, [e.substr(t + n)])]) : e;
}
const rs = A({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  delimiters: Array,
  ...ls({
    filterKeys: ["title"]
  }),
  ...fi({
    hideNoData: !0,
    returnObject: !0
  }),
  ...kt(Xn({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...vt({
    transition: !1
  })
}, "VCombobox"), ss = q()({
  name: "VCombobox",
  props: rs(),
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:search": (e) => !0,
    "update:menu": (e) => !0
  },
  setup(e, t) {
    var mt;
    let {
      emit: n,
      slots: l
    } = t;
    const {
      t: a
    } = dn(), i = N(), o = W(!1), r = W(!0), s = W(!1), d = N(), g = N(), f = se(e, "menu"), c = m({
      get: () => f.value,
      set: (P) => {
        var K;
        f.value && !P && ((K = d.value) != null && K.ΨopenChildren) || (f.value = P);
      }
    }), v = W(-1);
    let h = !1;
    const y = m(() => {
      var P;
      return (P = i.value) == null ? void 0 : P.color;
    }), C = m(() => c.value ? e.closeText : e.openText), {
      items: S,
      transformIn: w,
      transformOut: b
    } = Wa(e), {
      textColorClasses: I,
      textColorStyles: E
    } = Oe(y), V = se(e, "modelValue", [], (P) => w(Ae(P)), (P) => {
      const K = b(P);
      return e.multiple ? K : K[0] ?? null;
    }), k = Kn(), p = W(e.multiple ? "" : ((mt = V.value[0]) == null ? void 0 : mt.title) ?? ""), x = m({
      get: () => p.value,
      set: (P) => {
        var K;
        if (p.value = P ?? "", e.multiple || (V.value = [Ke(e, P)]), P && e.multiple && ((K = e.delimiters) != null && K.length)) {
          const ie = P.split(new RegExp(`(?:${e.delimiters.join("|")})+`));
          ie.length > 1 && (ie.forEach((Pe) => {
            Pe = Pe.trim(), Pe && te(Ke(e, Pe));
          }), p.value = "");
        }
        P || (v.value = -1), r.value = !P;
      }
    });
    G(p, (P) => {
      h ? me(() => h = !1) : o.value && !c.value && (c.value = !0), n("update:search", P);
    }), G(V, (P) => {
      var K;
      e.multiple || (p.value = ((K = P[0]) == null ? void 0 : K.title) ?? "");
    });
    const {
      filteredItems: L,
      getMatches: M
    } = is(e, S, () => r.value ? "" : x.value), T = m(() => e.hideSelected ? L.value.filter((P) => !V.value.some((K) => K.value === P.value)) : L.value), O = m(() => V.value.map((P) => P.value)), $ = m(() => {
      var K;
      return (e.autoSelectFirst === !0 || e.autoSelectFirst === "exact" && x.value === ((K = T.value[0]) == null ? void 0 : K.title)) && T.value.length > 0 && !r.value && !s.value;
    }), z = m(() => e.hideNoData && !S.value.length || e.readonly || (k == null ? void 0 : k.isReadonly.value)), _ = N(), {
      onListScroll: F,
      onListKeydown: B
    } = di(_, i);
    function D(P) {
      h = !0, e.openOnClear && (c.value = !0);
    }
    function Z() {
      z.value || (c.value = !0);
    }
    function R(P) {
      z.value || (o.value && (P.preventDefault(), P.stopPropagation()), c.value = !c.value);
    }
    function ae(P) {
      var Pe;
      if (Oi(P) || e.readonly || k != null && k.isReadonly.value)
        return;
      const K = i.value.selectionStart, ie = V.value.length;
      if ((v.value > -1 || ["Enter", "ArrowDown", "ArrowUp"].includes(P.key)) && P.preventDefault(), ["Enter", "ArrowDown"].includes(P.key) && (c.value = !0), ["Escape"].includes(P.key) && (c.value = !1), ["Enter", "Escape", "Tab"].includes(P.key) && ($.value && ["Enter", "Tab"].includes(P.key) && te(L.value[0]), r.value = !0), P.key === "ArrowDown" && $.value && ((Pe = _.value) == null || Pe.focus("next")), !!e.multiple) {
        if (["Backspace", "Delete"].includes(P.key)) {
          if (v.value < 0) {
            P.key === "Backspace" && !x.value && (v.value = ie - 1);
            return;
          }
          const Y = v.value, de = V.value[v.value];
          de && !de.props.disabled && te(de), v.value = Y >= ie - 1 ? ie - 2 : Y;
        }
        if (P.key === "ArrowLeft") {
          if (v.value < 0 && K > 0)
            return;
          const Y = v.value > -1 ? v.value - 1 : ie - 1;
          V.value[Y] ? v.value = Y : (v.value = -1, i.value.setSelectionRange(x.value.length, x.value.length));
        }
        if (P.key === "ArrowRight") {
          if (v.value < 0)
            return;
          const Y = v.value + 1;
          V.value[Y] ? v.value = Y : (v.value = -1, i.value.setSelectionRange(0, 0));
        }
        P.key === "Enter" && x.value && (te(Ke(e, x.value)), x.value = "");
      }
    }
    function ee() {
      var P;
      o.value && (r.value = !0, (P = i.value) == null || P.focus());
    }
    function te(P) {
      if (e.multiple) {
        const K = V.value.findIndex((ie) => e.valueComparator(ie.value, P.value));
        if (K === -1)
          V.value = [...V.value, P];
        else {
          const ie = [...V.value];
          ie.splice(K, 1), V.value = ie;
        }
        x.value = "";
      } else
        V.value = [P], p.value = P.title, me(() => {
          c.value = !1, r.value = !0;
        });
    }
    function oe(P) {
      o.value = !0, setTimeout(() => {
        s.value = !0;
      });
    }
    function le(P) {
      s.value = !1;
    }
    function Le(P) {
      (P == null || P === "" && !e.multiple) && (V.value = []);
    }
    return G(L, (P) => {
      !P.length && e.hideNoData && (c.value = !1);
    }), G(o, (P, K) => {
      P || P === K || (v.value = -1, c.value = !1, $.value && !s.value && !V.value.some((ie) => {
        let {
          value: Pe
        } = ie;
        return Pe === T.value[0].value;
      }) ? te(T.value[0]) : e.multiple && x.value && (V.value = [...V.value, Ke(e, x.value)], x.value = ""));
    }), G(c, () => {
      if (!e.hideSelected && c.value && V.value.length) {
        const P = T.value.findIndex((K) => V.value.some((ie) => e.valueComparator(ie.value, K.value)));
        be && window.requestAnimationFrame(() => {
          var K;
          P >= 0 && ((K = g.value) == null || K.scrollToIndex(P));
        });
      }
    }), X(() => {
      const P = !!(e.chips || l.chip), K = !!(!e.hideNoData || T.value.length || l["prepend-item"] || l["append-item"] || l["no-data"]), ie = V.value.length > 0, [Pe] = xt.filterProps(e);
      return u(xt, U({
        ref: i
      }, Pe, {
        modelValue: x.value,
        "onUpdate:modelValue": [(Y) => x.value = Y, Le],
        focused: o.value,
        "onUpdate:focused": (Y) => o.value = Y,
        validationValue: V.externalValue,
        counterValue: e.multiple ? V.value.length : x.value.length,
        dirty: ie,
        class: ["v-combobox", {
          "v-combobox--active-menu": c.value,
          "v-combobox--chips": !!e.chips,
          "v-combobox--selection-slot": !!l.selection,
          "v-combobox--selecting-index": v.value > -1,
          [`v-combobox--${e.multiple ? "multiple" : "single"}`]: !0
        }, e.class],
        style: e.style,
        readonly: e.readonly,
        placeholder: ie ? void 0 : e.placeholder,
        "onClick:clear": D,
        "onMousedown:control": Z,
        onKeydown: ae
      }), {
        ...l,
        default: () => u(J, null, [u(ni, U({
          ref: d,
          modelValue: c.value,
          "onUpdate:modelValue": (Y) => c.value = Y,
          activator: "parent",
          contentClass: "v-combobox__content",
          disabled: z.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterLeave: ee
        }, e.menuProps), {
          default: () => [K && u(Ka, {
            ref: _,
            selected: O.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (Y) => Y.preventDefault(),
            onKeydown: B,
            onFocusin: oe,
            onFocusout: le,
            onScrollPassive: F,
            tabindex: "-1",
            color: e.itemColor ?? e.color
          }, {
            default: () => {
              var Y, de, Te;
              return [(Y = l["prepend-item"]) == null ? void 0 : Y.call(l), !T.value.length && !e.hideNoData && (((de = l["no-data"]) == null ? void 0 : de.call(l)) ?? u(st, {
                title: a(e.noDataText)
              }, null)), u(ci, {
                ref: g,
                renderless: !0,
                items: T.value
              }, {
                default: (Ge) => {
                  var Jn;
                  let {
                    item: pe,
                    index: We,
                    itemRef: Ue
                  } = Ge;
                  const Qn = U(pe.props, {
                    ref: Ue,
                    key: We,
                    active: $.value && We === 0 ? !0 : void 0,
                    onClick: () => te(pe)
                  });
                  return ((Jn = l.item) == null ? void 0 : Jn.call(l, {
                    item: pe,
                    index: We,
                    props: Qn
                  })) ?? u(st, Qn, {
                    prepend: ($t) => {
                      let {
                        isSelected: Ft
                      } = $t;
                      return u(J, null, [e.multiple && !e.hideSelected ? u(Oa, {
                        key: pe.value,
                        modelValue: Ft,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, pe.props.prependIcon && u(re, {
                        icon: pe.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var $t, Ft;
                      return r.value ? pe.title : os(pe.title, ($t = M(pe)) == null ? void 0 : $t.title, ((Ft = x.value) == null ? void 0 : Ft.length) ?? 0);
                    }
                  });
                }
              }), (Te = l["append-item"]) == null ? void 0 : Te.call(l)];
            }
          })]
        }), V.value.map((Y, de) => {
          function Te(Ue) {
            Ue.stopPropagation(), Ue.preventDefault(), te(Y);
          }
          const Ge = {
            "onClick:close": Te,
            onMousedown(Ue) {
              Ue.preventDefault(), Ue.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, pe = P ? !!l.chip : !!l.selection, We = pe ? Nn(P ? l.chip({
            item: Y,
            index: de,
            props: Ge
          }) : l.selection({
            item: Y,
            index: de
          })) : void 0;
          if (!(pe && !We))
            return u("div", {
              key: Y.value,
              class: ["v-combobox__selection", de === v.value && ["v-combobox__selection--selected", I.value]],
              style: de === v.value ? E.value : {}
            }, [P ? l.chip ? u(he, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: Y.title
                }
              }
            }, {
              default: () => [We]
            }) : u(Un, U({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: Y.title,
              disabled: Y.props.disabled
            }, Ge), null) : We ?? u("span", {
              class: "v-combobox__selection-text"
            }, [Y.title, e.multiple && de < V.value.length - 1 && u("span", {
              class: "v-combobox__selection-comma"
            }, [Ut(",")])])]);
        })]),
        "append-inner": function() {
          var Ge;
          for (var Y = arguments.length, de = new Array(Y), Te = 0; Te < Y; Te++)
            de[Te] = arguments[Te];
          return u(J, null, [(Ge = l["append-inner"]) == null ? void 0 : Ge.call(l, ...de), (!e.hideNoData || e.items.length) && e.menuIcon ? u(re, {
            class: "v-combobox__menu-icon",
            icon: e.menuIcon,
            onMousedown: R,
            onClick: $i,
            "aria-label": a(C.value),
            title: a(C.value)
          }, null) : void 0]);
        }
      });
    }), vn({
      isFocused: o,
      isPristine: r,
      menu: c,
      search: x,
      selectionIndex: v,
      filteredItems: L,
      select: te
    }, i);
  }
}), us = { key: 0 }, cs = {
  key: 1,
  style: { color: "grey", "font-size": "small" }
}, ds = /* @__PURE__ */ Ve("img", {
  src: Gl,
  alt: "delete",
  height: "20"
}, null, -1);
function fs(e, t, n, l, a, i) {
  return ue(), xe("div", {
    class: "rule-hover",
    style: _i(n.id === 0 ? "margin-top: 20px" : "margin-top: 0px")
  }, [
    Ve("div", null, [
      u(Ln, {
        style: { width: "300px" },
        label: "field",
        variant: "outlined",
        density: "compact",
        "item-value": "id",
        "item-text": "id",
        "hide-details": "",
        items: n.fields,
        modelValue: n.rule.query.operand,
        "onUpdate:modelValue": t[0] || (t[0] = (o) => n.rule.query.operand = o)
      }, null, 8, ["items", "modelValue"])
    ]),
    Ve("div", null, [
      u(Ln, {
        style: { width: "200px" },
        label: "operator",
        variant: "outlined",
        density: "compact",
        "hide-details": "",
        "item-title": "text",
        "return-object": "",
        items: a.operators,
        modelValue: i.operator,
        "onUpdate:modelValue": t[1] || (t[1] = (o) => i.operator = o)
      }, null, 8, ["items", "modelValue"])
    ]),
    i.hideValue() ? Me("", !0) : (ue(), xe("div", us, [
      i.showTextField() ? (ue(), zt(xt, {
        key: 0,
        label: "value",
        variant: "outlined",
        density: "compact",
        "hide-details": "",
        modelValue: i.value,
        "onUpdate:modelValue": t[2] || (t[2] = (o) => i.value = o),
        clearable: "",
        style: { "min-width": "200px" }
      }, null, 8, ["modelValue"])) : i.showCombobox() ? (ue(), zt(ss, {
        key: 1,
        items: i.value,
        modelValue: i.value,
        "onUpdate:modelValue": t[3] || (t[3] = (o) => i.value = o),
        label: "value",
        multiple: "",
        clearable: "",
        variant: "outlined",
        density: "compact",
        "hide-details": "",
        style: { "max-height": "100px", "min-width": "250px" }
      }, {
        selection: at(({ item: o, index: r }) => [
          r < 2 ? (ue(), zt(Un, {
            key: 0,
            small: ""
          }, {
            default: at(() => [
              Ve("span", null, el(o.title), 1)
            ]),
            _: 2
          }, 1024)) : Me("", !0),
          r === 2 ? (ue(), xe("span", cs, "(+" + el(i.value.length - 2) + " others)", 1)) : Me("", !0)
        ]),
        _: 1
      }, 8, ["items", "modelValue"])) : Me("", !0)
    ])),
    Ve("div", null, [
      u(re, {
        onClick: t[4] || (t[4] = (o) => i.removeRule())
      }, {
        default: at(() => [
          ds
        ]),
        _: 1
      })
    ])
  ], 4);
}
const vs = /* @__PURE__ */ Wl(Ii, [["render", fs]]);
class Wt {
  constructor(t, n = "query-builder-group", l = 1) {
    Mt(this, "query");
    Mt(this, "type");
    Mt(this, "originalIndex");
    this.query = t, this.type = n, this.originalIndex = l;
  }
}
const ms = Tn({
  name: "QueryBuilderGroup",
  components: {
    QueryBuilderRule: vs
  },
  props: {
    group: {
      type: Wt,
      required: !0
    },
    id: {
      type: Number,
      required: !0
    },
    fields: {
      type: Array,
      required: !0
    },
    removable: {
      type: Boolean,
      default: !0
    },
    color: {
      type: String
    }
  },
  computed: {
    sortedRules() {
      var e;
      return (e = this.group.query.children) == null ? void 0 : e.filter((t, n) => (t.originalIndex = n, t.type === "query-builder-rule")).map((t) => new Wt(
        t.query,
        t.type,
        t.originalIndex
      ));
    },
    sortedGroups() {
      var e;
      return (e = this.group.query.children) == null ? void 0 : e.filter((t) => t.type === "query-builder-group").map((t) => new Wt(t.query, t.type, t.originalIndex));
    }
  },
  methods: {
    addGroup() {
      const e = {
        type: "query-builder-group",
        query: {
          logicalOperator: "AND",
          children: []
        }
      };
      this.group.query.children.push(e);
    },
    addRule() {
      const e = {
        type: "query-builder-rule",
        query: {
          rule: "",
          operator: "eq",
          operand: "",
          value: ""
        }
      };
      this.group.query.children.push(e);
    },
    removeGroup() {
      this.$emit("remove-group", this.id);
    },
    removeNestedGroup(e) {
      this.group.query.children.splice(e, 1);
    },
    removeNestedRule(e) {
      this.group.query.children.splice(e, 1);
    }
  },
  mounted() {
    this.color !== null && this.color !== void 0 && document.documentElement.style.setProperty("--group-color", this.color);
  }
}), vi = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE5LDEzSDEzVjE5SDExVjEzSDVWMTFIMTFWNUgxM1YxMUgxOVYxM1oiIC8+PC9zdmc+";
const mi = A({
  divided: Boolean,
  ...Et(),
  ...Q(),
  ...ze(),
  ...Ot(),
  ...je(),
  ...Ie(),
  ...ve(),
  ...et()
}, "VBtnGroup"), Dl = q()({
  name: "VBtnGroup",
  props: mi(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: l
    } = Se(e), {
      densityClasses: a
    } = He(e), {
      borderClasses: i
    } = Bt(e), {
      elevationClasses: o
    } = Lt(e), {
      roundedClasses: r
    } = qe(e);
    _t({
      VBtn: {
        height: "auto",
        color: H(e, "color"),
        density: H(e, "density"),
        flat: !0,
        variant: H(e, "variant")
      }
    }), X(() => u(e.tag, {
      class: ["v-btn-group", {
        "v-btn-group--divided": e.divided
      }, l.value, i.value, a.value, o.value, r.value, e.class],
      style: e.style
    }, n));
  }
}), gi = Symbol.for("vuetify:v-btn-toggle"), gs = A({
  ...mi(),
  ...va()
}, "VBtnToggle");
q()({
  name: "VBtnToggle",
  props: gs(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isSelected: l,
      next: a,
      prev: i,
      select: o,
      selected: r
    } = ya(e, gi);
    return X(() => {
      const [s] = Dl.filterProps(e);
      return u(Dl, U({
        class: ["v-btn-toggle", e.class]
      }, s, {
        style: e.style
      }), {
        default: () => {
          var d;
          return [(d = n.default) == null ? void 0 : d.call(n, {
            isSelected: l,
            next: a,
            prev: i,
            select: o,
            selected: r
          })];
        }
      });
    }), {
      next: a,
      prev: i,
      select: o
    };
  }
});
const ys = A({
  bgColor: String,
  color: String,
  indeterminate: [Boolean, String],
  modelValue: {
    type: [Number, String],
    default: 0
  },
  rotate: {
    type: [Number, String],
    default: 0
  },
  width: {
    type: [Number, String],
    default: 4
  },
  ...Q(),
  ...Pt(),
  ...Ie({
    tag: "div"
  }),
  ...ve()
}, "VProgressCircular"), hs = q()({
  name: "VProgressCircular",
  props: ys(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const l = 20, a = 2 * Math.PI * l, i = N(), {
      themeClasses: o
    } = Se(e), {
      sizeClasses: r,
      sizeStyles: s
    } = At(e), {
      textColorClasses: d,
      textColorStyles: g
    } = Oe(H(e, "color")), {
      textColorClasses: f,
      textColorStyles: c
    } = Oe(H(e, "bgColor")), {
      intersectionRef: v,
      isIntersecting: h
    } = li(), {
      resizeRef: y,
      contentRect: C
    } = Zn(), S = m(() => Math.max(0, Math.min(100, parseFloat(e.modelValue)))), w = m(() => Number(e.width)), b = m(() => s.value ? Number(e.size) : C.value ? C.value.width : Math.max(w.value, 32)), I = m(() => l / (1 - w.value / b.value) * 2), E = m(() => w.value / b.value * I.value), V = m(() => j((100 - S.value) / 100 * a));
    return De(() => {
      v.value = i.value, y.value = i.value;
    }), X(() => u(e.tag, {
      ref: i,
      class: ["v-progress-circular", {
        "v-progress-circular--indeterminate": !!e.indeterminate,
        "v-progress-circular--visible": h.value,
        "v-progress-circular--disable-shrink": e.indeterminate === "disable-shrink"
      }, o.value, r.value, d.value, e.class],
      style: [s.value, g.value, e.style],
      role: "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": e.indeterminate ? void 0 : S.value
    }, {
      default: () => [u("svg", {
        style: {
          transform: `rotate(calc(-90deg + ${Number(e.rotate)}deg))`
        },
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: `0 0 ${I.value} ${I.value}`
      }, [u("circle", {
        class: ["v-progress-circular__underlay", f.value],
        style: c.value,
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: l,
        "stroke-width": E.value,
        "stroke-dasharray": a,
        "stroke-dashoffset": 0
      }, null), u("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: l,
        "stroke-width": E.value,
        "stroke-dasharray": a,
        "stroke-dashoffset": V.value
      }, null)]), n.default && u("div", {
        class: "v-progress-circular__content"
      }, [n.default({
        value: S.value
      })])]
    })), {};
  }
}), bs = ["static", "relative", "fixed", "absolute", "sticky"], Cs = A({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => bs.includes(e)
    )
  }
}, "position");
function Ss(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : $e();
  return {
    positionClasses: m(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function ps(e, t) {
  G(() => {
    var n;
    return (n = e.isActive) == null ? void 0 : n.value;
  }, (n) => {
    e.isLink.value && n && t && me(() => {
      t(!0);
    });
  }, {
    immediate: !0
  });
}
const xs = A({
  active: {
    type: Boolean,
    default: void 0
  },
  symbol: {
    type: null,
    default: gi
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: ne,
  appendIcon: ne,
  block: Boolean,
  stacked: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  ...Et(),
  ...Q(),
  ...ze(),
  ...dt(),
  ...Ot(),
  ...ma(),
  ...oi(),
  ...ai(),
  ...Cs(),
  ...je(),
  ...Wn(),
  ...Pt(),
  ...Ie({
    tag: "button"
  }),
  ...ve(),
  ...et({
    variant: "elevated"
  })
}, "VBtn"), Nl = q()({
  name: "VBtn",
  directives: {
    Ripple: fn
  },
  props: xs(),
  emits: {
    "group:selected": (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: l
    } = t;
    const {
      themeClasses: a
    } = Se(e), {
      borderClasses: i
    } = Bt(e), {
      colorClasses: o,
      colorStyles: r,
      variantClasses: s
    } = cn(e), {
      densityClasses: d
    } = He(e), {
      dimensionStyles: g
    } = ft(e), {
      elevationClasses: f
    } = Lt(e), {
      loaderClasses: c
    } = ri(e), {
      locationStyles: v
    } = ii(e), {
      positionClasses: h
    } = Ss(e), {
      roundedClasses: y
    } = qe(e), {
      sizeClasses: C,
      sizeStyles: S
    } = At(e), w = ga(e, e.symbol, !1), b = Gn(e, n), I = m(() => {
      var x;
      return e.active !== void 0 ? e.active : b.isLink.value ? (x = b.isActive) == null ? void 0 : x.value : w == null ? void 0 : w.isSelected.value;
    }), E = m(() => (w == null ? void 0 : w.disabled.value) || e.disabled), V = m(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), k = m(() => {
      if (e.value !== void 0)
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function p(x) {
      var L;
      E.value || b.isLink.value && (x.metaKey || x.ctrlKey || x.shiftKey || x.button !== 0 || n.target === "_blank") || ((L = b.navigate) == null || L.call(b, x), w == null || w.toggle());
    }
    return ps(b, w == null ? void 0 : w.select), X(() => {
      var $, z;
      const x = b.isLink.value ? "a" : e.tag, L = !!(e.prependIcon || l.prepend), M = !!(e.appendIcon || l.append), T = !!(e.icon && e.icon !== !0), O = (w == null ? void 0 : w.isSelected.value) && (!b.isLink.value || (($ = b.isActive) == null ? void 0 : $.value)) || !w || ((z = b.isActive) == null ? void 0 : z.value);
      return ke(u(x, {
        type: x === "a" ? void 0 : "button",
        class: ["v-btn", w == null ? void 0 : w.selectedClass.value, {
          "v-btn--active": I.value,
          "v-btn--block": e.block,
          "v-btn--disabled": E.value,
          "v-btn--elevated": V.value,
          "v-btn--flat": e.flat,
          "v-btn--icon": !!e.icon,
          "v-btn--loading": e.loading,
          "v-btn--stacked": e.stacked
        }, a.value, i.value, O ? o.value : void 0, d.value, f.value, c.value, h.value, y.value, C.value, s.value, e.class],
        style: [O ? r.value : void 0, g.value, v.value, S.value, e.style],
        disabled: E.value || void 0,
        href: b.href.value,
        onClick: p,
        value: k.value
      }, {
        default: () => {
          var _;
          return [un(!0, "v-btn"), !e.icon && L && u("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [l.prepend ? u(he, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, l.prepend) : u(re, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), u("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!l.default && T ? u(re, {
            key: "content-icon",
            icon: e.icon
          }, null) : u(he, {
            key: "content-defaults",
            disabled: !T,
            defaults: {
              VIcon: {
                icon: e.icon
              }
            }
          }, {
            default: () => {
              var F;
              return [((F = l.default) == null ? void 0 : F.call(l)) ?? e.text];
            }
          })]), !e.icon && M && u("span", {
            key: "append",
            class: "v-btn__append"
          }, [l.append ? u(he, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, l.append) : u(re, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && u("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((_ = l.loader) == null ? void 0 : _.call(l)) ?? u(hs, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            size: "23",
            width: "2"
          }, null)])];
        }
      }), [[Qe("ripple"), !E.value && e.ripple, null]]);
    }), {};
  }
}), ws = { class: "group-wrap" }, Vs = {
  key: 0,
  class: "group-header"
}, ks = /* @__PURE__ */ Ve("img", {
  src: vi,
  alt: "add",
  height: "20"
}, null, -1), _s = /* @__PURE__ */ Ve("img", {
  src: vi,
  alt: "add",
  height: "20"
}, null, -1), Is = {
  key: 0,
  style: { "margin-left": "auto" }
}, Ps = /* @__PURE__ */ Ve("img", {
  src: Gl,
  alt: "delete",
  height: "20"
}, null, -1), As = { class: "child-wrap" }, Es = { class: "child-wrap" };
function Bs(e, t, n, l, a, i) {
  const o = tl("query-builder-rule"), r = tl("query-builder-group", !0);
  return ue(), xe("div", ws, [
    e.group.query ? (ue(), xe("div", Vs, [
      Ve("div", null, [
        u(Nl, {
          class: "mr-2",
          onClick: e.addGroup
        }, {
          default: at(() => [
            ks,
            Ut("group ")
          ]),
          _: 1
        }, 8, ["onClick"])
      ]),
      Ve("div", null, [
        u(Nl, {
          class: "mr-2",
          onClick: e.addRule
        }, {
          default: at(() => [
            _s,
            Ut(" rule ")
          ]),
          _: 1
        }, 8, ["onClick"])
      ]),
      Ve("div", null, [
        e.group.query.children.length > 1 ? (ue(), zt(Ln, {
          key: 0,
          style: { "max-width": "200px" },
          class: "mr-2",
          label: "logicalOperator",
          variant: "outlined",
          density: "compact",
          "hide-details": "",
          modelValue: e.group.query.logicalOperator,
          "onUpdate:modelValue": t[0] || (t[0] = (s) => e.group.query.logicalOperator = s),
          items: ["AND", "OR"]
        }, null, 8, ["modelValue"])) : Me("", !0)
      ]),
      e.removable ? (ue(), xe("div", Is, [
        u(re, { onClick: e.removeGroup }, {
          default: at(() => [
            Ps
          ]),
          _: 1
        }, 8, ["onClick"])
      ])) : Me("", !0)
    ])) : Me("", !0),
    Ve("div", null, [
      (ue(!0), xe(J, null, nl(e.sortedRules, (s) => (ue(), xe("div", As, [
        u(o, {
          rule: s,
          id: s.originalIndex ?? 0,
          fields: e.fields,
          onRemoveRule: e.removeNestedRule
        }, null, 8, ["rule", "id", "fields", "onRemoveRule"])
      ]))), 256)),
      (ue(!0), xe(J, null, nl(e.sortedGroups, (s) => (ue(), xe("div", Es, [
        u(r, {
          group: s,
          id: s.originalIndex ?? 0,
          fields: e.fields,
          onRemoveGroup: e.removeNestedGroup
        }, null, 8, ["group", "id", "fields", "onRemoveGroup"])
      ]))), 256))
    ])
  ]);
}
const Os = /* @__PURE__ */ Wl(ms, [["render", Bs]]), Ls = { key: 0 }, Fs = /* @__PURE__ */ Tn({
  __name: "QueryBuilder",
  props: {
    filterFields: {
      type: Array,
      required: !0
    },
    modelValue: { type: Object, required: !0 },
    color: {
      type: String
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, l = t;
    function a(o) {
      n.modelValue.children.splice(o, 1);
    }
    const i = m(function() {
      return new Wt(n.modelValue);
    });
    return ct(() => {
      var o;
      ((o = n.modelValue) == null ? void 0 : o.children) === void 0 && l("update:modelValue", { children: [], logicalOperator: "AND" });
    }), (o, r) => (ue(), xe("div", null, [
      e.modelValue.children ? (ue(), xe("div", Ls, [
        u(Os, {
          group: i.value,
          id: i.value.originalIndex ?? 0,
          fields: e.filterFields,
          removable: !1,
          onRemoveGroup: a,
          color: e.color
        }, null, 8, ["group", "id", "fields", "color"])
      ])) : Me("", !0)
    ]));
  }
});
export {
  Fs as default
};
