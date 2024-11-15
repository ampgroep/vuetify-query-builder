var Fi = Object.defineProperty;
var Ri = (e, t, n) => t in e ? Fi(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Gt = (e, t, n) => (Ri(e, typeof t != "symbol" ? t + "" : t, n), n);
import { Fragment as se, reactive as cn, computed as h, watchEffect as He, toRefs as na, capitalize as la, isVNode as Mi, Comment as $i, shallowRef as G, unref as xe, warn as dn, getCurrentInstance as Di, ref as H, provide as Re, inject as be, defineComponent as zn, camelize as aa, h as fn, TransitionGroup as Hn, Transition as ot, createVNode as u, mergeProps as Q, isRef as yt, toRef as z, Text as Ni, watch as U, onBeforeMount as ia, nextTick as pe, onBeforeUnmount as De, withDirectives as Fe, resolveDirective as St, vShow as Ct, onScopeDispose as Ie, effectScope as jn, toRaw as ue, onMounted as pt, onUpdated as zi, readonly as qn, resolveDynamicComponent as Hi, Teleport as ji, onDeactivated as qi, cloneVNode as Wi, createTextVNode as en, openBlock as he, createElementBlock as Te, normalizeStyle as Gi, createElementVNode as Le, createBlock as vt, withCtx as gt, toDisplayString as fl, createCommentVNode as Ue, resolveComponent as vl, renderList as ml } from "vue";
const Ui = {
  name: "QueryBuilderRule",
  data() {
    return {
      operator: this.getOperator()
    };
  },
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
    },
    operators: {
      type: Object,
      required: !0
    }
  },
  computed: {
    value: {
      get: function() {
        let e = this.rule.query.value;
        if (this.operator.type === "array" && typeof e != "object")
          try {
            typeof e == "string" ? e = [...new Set(JSON.parse(e))] : e = [e];
          } catch {
            e = [];
          }
        else if (this.operator.type === "regexp")
          return e ? e.toString().replace(/^\/|\/g$/g, "") : "";
        return e;
      },
      set: function(e) {
        if (typeof e == "object")
          e = JSON.stringify(e);
        else if (this.operator.type === "regexp") {
          if (!this.validRegexp(e.toString()))
            return;
          e = "/" + e + "/g";
        }
        this.rule.query.value = e;
      }
    },
    hideValue() {
      return this.operator.type === "none";
    },
    showTextField() {
      return this.operator.type === "string";
    },
    showCombobox() {
      return this.operator.type === "array";
    },
    showRegexpField() {
      return this.operator.type === "regexp";
    },
    showPlaceHolder() {
      return this.operator.type === "placeholder";
    }
  },
  watch: {
    operator(e, t) {
      e.type !== t.type && (this.value = ""), this.rule.query.operator = e.value;
    }
  },
  methods: {
    removeRule() {
      this.$emit("remove-rule", this.id);
    },
    validRegexp(e) {
      try {
        return new RegExp(e), !0;
      } catch {
        return !1;
      }
    },
    validRegexpInput(e) {
      return this.validRegexp(e) || "Invalid regexp format";
    },
    getOperator() {
      let e = this.rule.query.value;
      if (typeof this.rule.query.value == "string")
        try {
          e = JSON.parse((e == null ? void 0 : e.toString()) ?? "");
        } catch {
          e = this.rule.query.value;
        }
      const t = this.rule.query.operator.toLowerCase(), n = typeof e != "object", l = t === "in" || t === "not in";
      return this.operators.find(
        (a) => a.value === t && (n && l ? a.type === "placeholder" : !0)
      ) ?? this.operators[0];
    }
  }
}, oa = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M9,3V4H4V6H5V19A2,2%200%200,0%207,21H17A2,2%200%200,0%2019,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z'%20/%3e%3c/svg%3e", ra = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [l, a] of t)
    n[l] = a;
  return n;
}, me = typeof window < "u", Wn = me && "IntersectionObserver" in window;
function sa(e, t, n) {
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
function wt(e, t) {
  if (e === t)
    return !0;
  if (e instanceof Date && t instanceof Date && e.getTime() !== t.getTime() || e !== Object(e) || t !== Object(t))
    return !1;
  const n = Object.keys(e);
  return n.length !== Object.keys(t).length ? !1 : n.every((l) => wt(e[l], t[l]));
}
function Ki(e, t, n) {
  return e == null || !t || typeof t != "string" ? n : e[t] !== void 0 ? e[t] : (t = t.replace(/\[(\w+)\]/g, ".$1"), t = t.replace(/^\./, ""), sa(e, t.split("."), n));
}
function Me(e, t, n) {
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
    return Ki(e, t, n);
  if (Array.isArray(t))
    return sa(e, t, n);
  if (typeof t != "function")
    return n;
  const l = t(e, n);
  return typeof l > "u" ? n : l;
}
function X(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "px";
  if (!(e == null || e === ""))
    return isNaN(+e) ? String(e) : isFinite(+e) ? `${Number(e)}${t}` : void 0;
}
function Pn(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function ua(e) {
  if (e && "$el" in e) {
    const t = e.$el;
    return (t == null ? void 0 : t.nodeType) === Node.TEXT_NODE ? t.nextElementSibling : t;
  }
  return e;
}
const gl = Object.freeze({
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
function Sn(e, t) {
  return t.every((n) => e.hasOwnProperty(n));
}
function ca(e, t) {
  const n = {}, l = new Set(Object.keys(e));
  for (const a of t)
    l.has(a) && (n[a] = e[a]);
  return n;
}
function yl(e, t, n) {
  const l = /* @__PURE__ */ Object.create(null), a = /* @__PURE__ */ Object.create(null);
  for (const i in e)
    t.some((o) => o instanceof RegExp ? o.test(i) : o === i) && !(n != null && n.some((o) => o === i)) ? l[i] = e[i] : a[i] = e[i];
  return [l, a];
}
function st(e, t) {
  const n = {
    ...e
  };
  return t.forEach((l) => delete n[l]), n;
}
function Yi(e, t) {
  const n = {};
  return t.forEach((l) => n[l] = e[l]), n;
}
const da = /^on[^a-z]/, Gn = (e) => da.test(e), Xi = ["onAfterscriptexecute", "onAnimationcancel", "onAnimationend", "onAnimationiteration", "onAnimationstart", "onAuxclick", "onBeforeinput", "onBeforescriptexecute", "onChange", "onClick", "onCompositionend", "onCompositionstart", "onCompositionupdate", "onContextmenu", "onCopy", "onCut", "onDblclick", "onFocusin", "onFocusout", "onFullscreenchange", "onFullscreenerror", "onGesturechange", "onGestureend", "onGesturestart", "onGotpointercapture", "onInput", "onKeydown", "onKeypress", "onKeyup", "onLostpointercapture", "onMousedown", "onMousemove", "onMouseout", "onMouseover", "onMouseup", "onMousewheel", "onPaste", "onPointercancel", "onPointerdown", "onPointerenter", "onPointerleave", "onPointermove", "onPointerout", "onPointerover", "onPointerup", "onReset", "onSelect", "onSubmit", "onTouchcancel", "onTouchend", "onTouchmove", "onTouchstart", "onTransitioncancel", "onTransitionend", "onTransitionrun", "onTransitionstart", "onWheel"], Qi = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "Enter", "Escape", "Tab", " "];
function Ji(e) {
  return e.isComposing && Qi.includes(e.key);
}
function fa(e) {
  const [t, n] = yl(e, [da]), l = st(t, Xi), [a, i] = yl(n, ["class", "style", "id", /^data-/]);
  return Object.assign(a, t), Object.assign(i, l), [a, i];
}
function ke(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function Zi(e, t) {
  let n = 0;
  const l = function() {
    for (var a = arguments.length, i = new Array(a), o = 0; o < a; o++)
      i[o] = arguments[o];
    clearTimeout(n), n = setTimeout(() => e(...i), xe(t));
  };
  return l.clear = () => {
    clearTimeout(n);
  }, l.immediate = e, l;
}
function Ye(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.max(t, Math.min(n, e));
}
function hl(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
  return e + n.repeat(Math.max(0, t - e.length));
}
function eo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  const n = [];
  let l = 0;
  for (; l < e.length; )
    n.push(e.substr(l, t)), l += t;
  return n;
}
function ze() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = arguments.length > 2 ? arguments[2] : void 0;
  const l = {};
  for (const a in e)
    l[a] = e[a];
  for (const a in t) {
    const i = e[a], o = t[a];
    if (Pn(i) && Pn(o)) {
      l[a] = ze(i, o, n);
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
function va(e) {
  return e.map((t) => t.type === se ? va(t.children) : t).flat();
}
function nt() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  if (nt.cache.has(e))
    return nt.cache.get(e);
  const t = e.replace(/[^a-z]/gi, "-").replace(/\B([A-Z])/g, "-$1").toLowerCase();
  return nt.cache.set(e, t), t;
}
nt.cache = /* @__PURE__ */ new Map();
function At(e, t) {
  if (!t || typeof t != "object")
    return [];
  if (Array.isArray(t))
    return t.map((n) => At(e, n)).flat(1);
  if (t.suspense)
    return At(e, t.ssContent);
  if (Array.isArray(t.children))
    return t.children.map((n) => At(e, n)).flat(1);
  if (t.component) {
    if (Object.getOwnPropertySymbols(t.component.provides).includes(e))
      return [t.component];
    if (t.component.subTree)
      return At(e, t.component.subTree).flat(1);
  }
  return [];
}
function Un(e) {
  const t = cn({}), n = h(e);
  return He(() => {
    for (const l in n.value)
      t[l] = n.value[l];
  }, {
    flush: "sync"
  }), na(t);
}
function tn(e, t) {
  return e.includes(t);
}
function ma(e) {
  return e[2].toLowerCase() + e.slice(3);
}
const Ve = () => [Function, Array];
function bl(e, t) {
  return t = "on" + la(t), !!(e[t] || e[`${t}Once`] || e[`${t}Capture`] || e[`${t}OnceCapture`] || e[`${t}CaptureOnce`]);
}
function to(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), l = 1; l < t; l++)
    n[l - 1] = arguments[l];
  if (Array.isArray(e))
    for (const a of e)
      a(...n);
  else
    typeof e == "function" && e(...n);
}
function nn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  const n = ["button", "[href]", 'input:not([type="hidden"])', "select", "textarea", "[tabindex]"].map((l) => `${l}${t ? ':not([tabindex="-1"])' : ""}:not([disabled])`).join(", ");
  return [...e.querySelectorAll(n)];
}
function ga(e, t, n) {
  let l, a = e.indexOf(document.activeElement);
  const i = t === "next" ? 1 : -1;
  do
    a += i, l = e[a];
  while ((!l || l.offsetParent == null || !((n == null ? void 0 : n(l)) ?? !0)) && a < e.length && a >= 0);
  return l;
}
function Et(e, t) {
  var l, a, i, o;
  const n = nn(e);
  if (!t)
    (e === document.activeElement || !e.contains(document.activeElement)) && ((l = n[0]) == null || l.focus());
  else if (t === "first")
    (a = n[0]) == null || a.focus();
  else if (t === "last")
    (i = n.at(-1)) == null || i.focus();
  else if (typeof t == "number")
    (o = n[t]) == null || o.focus();
  else {
    const r = ga(n, t);
    r ? r.focus() : Et(e, t === "next" ? "first" : "last");
  }
}
function no() {
}
function ln(e, t) {
  if (!(me && typeof CSS < "u" && typeof CSS.supports < "u" && CSS.supports(`selector(${t})`)))
    return null;
  try {
    return !!e && e.matches(t);
  } catch {
    return null;
  }
}
function Kn(e) {
  return e.some((t) => Mi(t) ? t.type === $i ? !1 : t.type !== se || Kn(t.children) : !0) ? e : null;
}
function lo(e, t) {
  if (!me || e === 0)
    return t(), () => {
    };
  const n = window.setTimeout(t, e);
  return () => window.clearTimeout(n);
}
function ao(e, t) {
  const n = e.clientX, l = e.clientY, a = t.getBoundingClientRect(), i = a.left, o = a.top, r = a.right, s = a.bottom;
  return n >= i && n <= r && l >= o && l <= s;
}
function En() {
  const e = G(), t = (n) => {
    e.value = n;
  };
  return Object.defineProperty(t, "value", {
    enumerable: !0,
    get: () => e.value,
    set: (n) => e.value = n
  }), Object.defineProperty(t, "el", {
    enumerable: !0,
    get: () => ua(e.value)
  }), t;
}
function On(e) {
  const t = e.key.length === 1, n = !e.ctrlKey && !e.metaKey && !e.altKey;
  return t && n;
}
const ya = ["top", "bottom"], io = ["start", "end", "left", "right"];
function Bn(e, t) {
  let [n, l] = e.split(" ");
  return l || (l = tn(ya, n) ? "start" : tn(io, n) ? "top" : "center"), {
    side: Sl(n, t),
    align: Sl(l, t)
  };
}
function Sl(e, t) {
  return e === "start" ? t ? "right" : "left" : e === "end" ? t ? "left" : "right" : e;
}
function Cn(e) {
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
function pn(e) {
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
function Cl(e) {
  return {
    side: e.align,
    align: e.side
  };
}
function pl(e) {
  return tn(ya, e.side) ? "y" : "x";
}
class lt {
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
function wl(e, t) {
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
function ha(e) {
  return Array.isArray(e) ? new lt({
    x: e[0],
    y: e[1],
    width: 0,
    height: 0
  }) : e.getBoundingClientRect();
}
function Yn(e) {
  const t = e.getBoundingClientRect(), n = getComputedStyle(e), l = n.transform;
  if (l) {
    let a, i, o, r, s;
    if (l.startsWith("matrix3d("))
      a = l.slice(9, -1).split(/, /), i = +a[0], o = +a[5], r = +a[12], s = +a[13];
    else if (l.startsWith("matrix("))
      a = l.slice(7, -1).split(/, /), i = +a[0], o = +a[3], r = +a[4], s = +a[5];
    else
      return new lt(t);
    const c = n.transformOrigin, v = t.x - r - (1 - i) * parseFloat(c), m = t.y - s - (1 - o) * parseFloat(c.slice(c.indexOf(" ") + 1)), f = i ? t.width / i : e.offsetWidth + 1, d = o ? t.height / o : e.offsetHeight + 1;
    return new lt({
      x: v,
      y: m,
      width: f,
      height: d
    });
  } else
    return new lt(t);
}
function mt(e, t, n) {
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
const Xt = /* @__PURE__ */ new WeakMap();
function oo(e, t) {
  Object.keys(t).forEach((n) => {
    if (Gn(n)) {
      const l = ma(n), a = Xt.get(e);
      if (t[n] == null)
        a == null || a.forEach((i) => {
          const [o, r] = i;
          o === l && (e.removeEventListener(l, r), a.delete(i));
        });
      else if (!a || ![...a].some((i) => i[0] === l && i[1] === t[n])) {
        e.addEventListener(l, t[n]);
        const i = a || /* @__PURE__ */ new Set();
        i.add([l, t[n]]), Xt.has(e) || Xt.set(e, i);
      }
    } else
      t[n] == null ? e.removeAttribute(n) : e.setAttribute(n, t[n]);
  });
}
function ro(e, t) {
  Object.keys(t).forEach((n) => {
    if (Gn(n)) {
      const l = ma(n), a = Xt.get(e);
      a == null || a.forEach((i) => {
        const [o, r] = i;
        o === l && (e.removeEventListener(l, r), a.delete(i));
      });
    } else
      e.removeAttribute(n);
  });
}
const ft = 2.4, xl = 0.2126729, kl = 0.7151522, Vl = 0.072175, so = 0.55, uo = 0.58, co = 0.57, fo = 0.62, Ut = 0.03, Il = 1.45, vo = 5e-4, mo = 1.25, go = 1.25, _l = 0.078, Al = 12.82051282051282, Kt = 0.06, Pl = 1e-3;
function El(e, t) {
  const n = (e.r / 255) ** ft, l = (e.g / 255) ** ft, a = (e.b / 255) ** ft, i = (t.r / 255) ** ft, o = (t.g / 255) ** ft, r = (t.b / 255) ** ft;
  let s = n * xl + l * kl + a * Vl, c = i * xl + o * kl + r * Vl;
  if (s <= Ut && (s += (Ut - s) ** Il), c <= Ut && (c += (Ut - c) ** Il), Math.abs(c - s) < vo)
    return 0;
  let v;
  if (c > s) {
    const m = (c ** so - s ** uo) * mo;
    v = m < Pl ? 0 : m < _l ? m - m * Al * Kt : m - Kt;
  } else {
    const m = (c ** fo - s ** co) * go;
    v = m > -Pl ? 0 : m > -_l ? m - m * Al * Kt : m + Kt;
  }
  return v * 100;
}
function at(e) {
  dn(`Vuetify: ${e}`);
}
function yo(e) {
  dn(`Vuetify error: ${e}`);
}
function ho(e, t) {
  t = Array.isArray(t) ? t.slice(0, -1).map((n) => `'${n}'`).join(", ") + ` or '${t.at(-1)}'` : `'${t}'`, dn(`[Vuetify UPGRADE] '${e}' is deprecated, use ${t} instead.`);
}
function Tn(e) {
  return !!e && /^(#|var\(--|(rgb|hsl)a?\()/.test(e);
}
function bo(e) {
  return Tn(e) && !/^((rgb|hsl)a?\()?var\(--/.test(e);
}
const Ol = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/, So = {
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
  hsl: (e, t, n, l) => Bl({
    h: e,
    s: t,
    l: n,
    a: l
  }),
  hsla: (e, t, n, l) => Bl({
    h: e,
    s: t,
    l: n,
    a: l
  }),
  hsv: (e, t, n, l) => Ot({
    h: e,
    s: t,
    v: n,
    a: l
  }),
  hsva: (e, t, n, l) => Ot({
    h: e,
    s: t,
    v: n,
    a: l
  })
};
function Pt(e) {
  if (typeof e == "number")
    return (isNaN(e) || e < 0 || e > 16777215) && at(`'${e}' is not a valid hex color`), {
      r: (e & 16711680) >> 16,
      g: (e & 65280) >> 8,
      b: e & 255
    };
  if (typeof e == "string" && Ol.test(e)) {
    const {
      groups: t
    } = e.match(Ol), {
      fn: n,
      values: l
    } = t, a = l.split(/,\s*/).map((i) => i.endsWith("%") && ["hsl", "hsla", "hsv", "hsva"].includes(n) ? parseFloat(i) / 100 : parseFloat(i));
    return So[n](...a);
  } else if (typeof e == "string") {
    let t = e.startsWith("#") ? e.slice(1) : e;
    [3, 4].includes(t.length) ? t = t.split("").map((l) => l + l).join("") : [6, 8].includes(t.length) || at(`'${e}' is not a valid hex(a) color`);
    const n = parseInt(t, 16);
    return (isNaN(n) || n < 0 || n > 4294967295) && at(`'${e}' is not a valid hex(a) color`), Co(t);
  } else if (typeof e == "object") {
    if (Sn(e, ["r", "g", "b"]))
      return e;
    if (Sn(e, ["h", "s", "l"]))
      return Ot(ba(e));
    if (Sn(e, ["h", "s", "v"]))
      return Ot(e);
  }
  throw new TypeError(`Invalid color: ${e == null ? e : String(e) || e.constructor.name}
Expected #hex, #hexa, rgb(), rgba(), hsl(), hsla(), object or number`);
}
function Ot(e) {
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
function Bl(e) {
  return Ot(ba(e));
}
function ba(e) {
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
function Co(e) {
  e = po(e);
  let [t, n, l, a] = eo(e, 2).map((i) => parseInt(i, 16));
  return a = a === void 0 ? a : a / 255, {
    r: t,
    g: n,
    b: l,
    a
  };
}
function po(e) {
  return e.startsWith("#") && (e = e.slice(1)), e = e.replace(/([^0-9a-f])/gi, "F"), (e.length === 3 || e.length === 4) && (e = e.split("").map((t) => t + t).join("")), e.length !== 6 && (e = hl(hl(e, 6), 8, "F")), e;
}
function wo(e) {
  const t = Math.abs(El(Pt(0), Pt(e)));
  return Math.abs(El(Pt(16777215), Pt(e))) > Math.min(t, 50) ? "#fff" : "#000";
}
function F(e, t) {
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
const ae = F({
  class: [String, Array, Object],
  style: {
    type: [String, Array, Object],
    default: null
  }
}, "component");
function ge(e, t) {
  const n = Di();
  if (!n)
    throw new Error(`[Vuetify] ${e} must be called from inside a setup function`);
  return n;
}
function Ne() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "composables";
  const t = ge(e).type;
  return nt((t == null ? void 0 : t.aliasName) || (t == null ? void 0 : t.name));
}
let Sa = 0, Qt = /* @__PURE__ */ new WeakMap();
function je() {
  const e = ge("getUid");
  if (Qt.has(e))
    return Qt.get(e);
  {
    const t = Sa++;
    return Qt.set(e, t), t;
  }
}
je.reset = () => {
  Sa = 0, Qt = /* @__PURE__ */ new WeakMap();
};
function xo(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ge("injectSelf");
  const {
    provides: n
  } = t;
  if (n && e in n)
    return n[e];
}
const an = Symbol.for("vuetify:defaults");
function Xn() {
  const e = be(an);
  if (!e)
    throw new Error("[Vuetify] Could not find defaults instance");
  return e;
}
function Mt(e, t) {
  const n = Xn(), l = H(e), a = h(() => {
    if (xe(t == null ? void 0 : t.disabled))
      return n.value;
    const o = xe(t == null ? void 0 : t.scoped), r = xe(t == null ? void 0 : t.reset), s = xe(t == null ? void 0 : t.root);
    if (l.value == null && !(o || r || s))
      return n.value;
    let c = ze(l.value, {
      prev: n.value
    });
    if (o)
      return c;
    if (r || s) {
      const v = Number(r || 1 / 0);
      for (let m = 0; m <= v && !(!c || !("prev" in c)); m++)
        c = c.prev;
      return c && typeof s == "string" && s in c && (c = ze(ze(c, {
        prev: c
      }), c[s])), c;
    }
    return c.prev ? ze(c.prev, c) : c;
  });
  return Re(an, a), a;
}
function ko(e, t) {
  var n, l;
  return typeof ((n = e.props) == null ? void 0 : n[t]) < "u" || typeof ((l = e.props) == null ? void 0 : l[nt(t)]) < "u";
}
function Vo() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Xn();
  const l = ge("useDefaults");
  if (t = t ?? l.type.name ?? l.type.__name, !t)
    throw new Error("[Vuetify] Could not determine component name");
  const a = h(() => {
    var s;
    return (s = n.value) == null ? void 0 : s[e._as ?? t];
  }), i = new Proxy(e, {
    get(s, c) {
      var m, f, d, g, y, b, S;
      const v = Reflect.get(s, c);
      return c === "class" || c === "style" ? [(m = a.value) == null ? void 0 : m[c], v].filter((A) => A != null) : typeof c == "string" && !ko(l.vnode, c) ? ((f = a.value) == null ? void 0 : f[c]) !== void 0 ? (d = a.value) == null ? void 0 : d[c] : ((y = (g = n.value) == null ? void 0 : g.global) == null ? void 0 : y[c]) !== void 0 ? (S = (b = n.value) == null ? void 0 : b.global) == null ? void 0 : S[c] : v : v;
    }
  }), o = G();
  He(() => {
    if (a.value) {
      const s = Object.entries(a.value).filter((c) => {
        let [v] = c;
        return v.startsWith(v[0].toUpperCase());
      });
      o.value = s.length ? Object.fromEntries(s) : void 0;
    } else
      o.value = void 0;
  });
  function r() {
    const s = xo(an, l);
    Re(an, h(() => o.value ? ze((s == null ? void 0 : s.value) ?? {}, o.value) : s == null ? void 0 : s.value));
  }
  return {
    props: i,
    provideSubDefaults: r
  };
}
function $t(e) {
  if (e._setup = e._setup ?? e.setup, !e.name)
    return at("The component is missing an explicit name, unable to generate default prop value"), e;
  if (e._setup) {
    e.props = F(e.props ?? {}, e.name)();
    const t = Object.keys(e.props).filter((n) => n !== "class" && n !== "style");
    e.filterProps = function(l) {
      return ca(l, t);
    }, e.props._as = String, e.setup = function(l, a) {
      const i = Xn();
      if (!i.value)
        return e._setup(l, a);
      const {
        props: o,
        provideSubDefaults: r
      } = Vo(l, l._as ?? e.name, i), s = e._setup(o, a);
      return r(), s;
    };
  }
  return e;
}
function K() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
  return (t) => (e ? $t : zn)(t);
}
function Io(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "div", n = arguments.length > 2 ? arguments[2] : void 0;
  return K()({
    name: n ?? la(aa(e.replace(/__/g, "-"))),
    props: {
      tag: {
        type: String,
        default: t
      },
      ...ae()
    },
    setup(l, a) {
      let {
        slots: i
      } = a;
      return () => {
        var o;
        return fn(l.tag, {
          class: [e, l.class],
          style: l.style
        }, (o = i.default) == null ? void 0 : o.call(i));
      };
    }
  });
}
function Ca(e) {
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
const on = "cubic-bezier(0.4, 0, 0.2, 1)", _o = "cubic-bezier(0.0, 0, 0.2, 1)", Ao = "cubic-bezier(0.4, 0, 1, 1)";
function pa(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
  for (; e; ) {
    if (t ? Po(e) : Qn(e))
      return e;
    e = e.parentElement;
  }
  return document.scrollingElement;
}
function rn(e, t) {
  const n = [];
  if (t && e && !t.contains(e))
    return n;
  for (; e && (Qn(e) && n.push(e), e !== t); )
    e = e.parentElement;
  return n;
}
function Qn(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE)
    return !1;
  const t = window.getComputedStyle(e);
  return t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight;
}
function Po(e) {
  if (!e || e.nodeType !== Node.ELEMENT_NODE)
    return !1;
  const t = window.getComputedStyle(e);
  return ["scroll", "auto"].includes(t.overflowY);
}
function Eo(e) {
  for (; e; ) {
    if (window.getComputedStyle(e).position === "fixed")
      return !0;
    e = e.offsetParent;
  }
  return !1;
}
function ee(e) {
  const t = ge("useRender");
  t.render = e;
}
const Oo = F({
  disabled: Boolean,
  group: Boolean,
  hideOnLeave: Boolean,
  leaveAbsolute: Boolean,
  mode: String,
  origin: String
}, "transition");
function Oe(e, t, n) {
  return K()({
    name: e,
    props: Oo({
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
              offsetLeft: c,
              offsetWidth: v,
              offsetHeight: m
            } = r;
            r._transitionInitialStyles = {
              position: r.style.position,
              top: r.style.top,
              left: r.style.left,
              width: r.style.width,
              height: r.style.height
            }, r.style.position = "absolute", r.style.top = `${s}px`, r.style.left = `${c}px`, r.style.width = `${v}px`, r.style.height = `${m}px`;
          }
          l.hideOnLeave && r.style.setProperty("display", "none", "important");
        },
        onAfterLeave(r) {
          if (l.leaveAbsolute && (r != null && r._transitionInitialStyles)) {
            const {
              position: s,
              top: c,
              left: v,
              width: m,
              height: f
            } = r._transitionInitialStyles;
            delete r._transitionInitialStyles, r.style.position = s || "", r.style.top = c || "", r.style.left = v || "", r.style.width = m || "", r.style.height = f || "";
          }
        }
      };
      return () => {
        const r = l.group ? Hn : ot;
        return fn(r, {
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
function wa(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "in-out";
  return K()({
    name: e,
    props: {
      mode: {
        type: String,
        default: n
      },
      disabled: Boolean,
      group: Boolean
    },
    setup(l, a) {
      let {
        slots: i
      } = a;
      const o = l.group ? Hn : ot;
      return () => fn(o, {
        name: l.disabled ? "" : e,
        css: !l.disabled,
        // mode: props.mode, // TODO: vuejs/vue-next#3104
        ...l.disabled ? {} : t
      }, i.default);
    }
  });
}
function xa() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1) ? "width" : "height", l = aa(`offset-${n}`);
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
const Bo = F({
  target: [Object, Array]
}, "v-dialog-transition"), ka = K()({
  name: "VDialogTransition",
  props: Bo(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const l = {
      onBeforeEnter(a) {
        a.style.pointerEvents = "none", a.style.visibility = "hidden";
      },
      async onEnter(a, i) {
        var f;
        await new Promise((d) => requestAnimationFrame(d)), await new Promise((d) => requestAnimationFrame(d)), a.style.visibility = "";
        const {
          x: o,
          y: r,
          sx: s,
          sy: c,
          speed: v
        } = Ll(e.target, a), m = mt(a, [{
          transform: `translate(${o}px, ${r}px) scale(${s}, ${c})`,
          opacity: 0
        }, {}], {
          duration: 225 * v,
          easing: _o
        });
        (f = Tl(a)) == null || f.forEach((d) => {
          mt(d, [{
            opacity: 0
          }, {
            opacity: 0,
            offset: 0.33
          }, {}], {
            duration: 225 * 2 * v,
            easing: on
          });
        }), m.finished.then(() => i());
      },
      onAfterEnter(a) {
        a.style.removeProperty("pointer-events");
      },
      onBeforeLeave(a) {
        a.style.pointerEvents = "none";
      },
      async onLeave(a, i) {
        var f;
        await new Promise((d) => requestAnimationFrame(d));
        const {
          x: o,
          y: r,
          sx: s,
          sy: c,
          speed: v
        } = Ll(e.target, a);
        mt(a, [{}, {
          transform: `translate(${o}px, ${r}px) scale(${s}, ${c})`,
          opacity: 0
        }], {
          duration: 125 * v,
          easing: Ao
        }).finished.then(() => i()), (f = Tl(a)) == null || f.forEach((d) => {
          mt(d, [{}, {
            opacity: 0,
            offset: 0.2
          }, {
            opacity: 0
          }], {
            duration: 125 * 2 * v,
            easing: on
          });
        });
      },
      onAfterLeave(a) {
        a.style.removeProperty("pointer-events");
      }
    };
    return () => e.target ? u(ot, Q({
      name: "dialog-transition"
    }, l, {
      css: !1
    }), n) : u(ot, {
      name: "dialog-transition"
    }, n);
  }
});
function Tl(e) {
  var n;
  const t = (n = e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list")) == null ? void 0 : n.children;
  return t && [...t];
}
function Ll(e, t) {
  const n = ha(e), l = Yn(t), [a, i] = getComputedStyle(t).transformOrigin.split(" ").map((S) => parseFloat(S)), [o, r] = getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");
  let s = n.left + n.width / 2;
  o === "left" || r === "left" ? s -= n.width / 2 : (o === "right" || r === "right") && (s += n.width / 2);
  let c = n.top + n.height / 2;
  o === "top" || r === "top" ? c -= n.height / 2 : (o === "bottom" || r === "bottom") && (c += n.height / 2);
  const v = n.width / l.width, m = n.height / l.height, f = Math.max(1, v, m), d = v / f || 0, g = m / f || 0, y = l.width * l.height / (window.innerWidth * window.innerHeight), b = y > 0.12 ? Math.min(1.5, (y - 0.12) * 10 + 1) : 1;
  return {
    x: s - (a + l.left),
    y: c - (i + l.top),
    sx: d,
    sy: g,
    speed: b
  };
}
Oe("fab-transition", "center center", "out-in");
Oe("dialog-bottom-transition");
Oe("dialog-top-transition");
const Fl = Oe("fade-transition");
Oe("scale-transition");
Oe("scroll-x-transition");
Oe("scroll-x-reverse-transition");
Oe("scroll-y-transition");
Oe("scroll-y-reverse-transition");
Oe("slide-x-transition");
Oe("slide-x-reverse-transition");
const Va = Oe("slide-y-transition");
Oe("slide-y-reverse-transition");
const To = wa("expand-transition", xa()), Ia = wa("expand-x-transition", xa("", !0)), Lo = F({
  defaults: Object,
  disabled: Boolean,
  reset: [Number, String],
  root: [Boolean, String],
  scoped: Boolean
}, "VDefaultsProvider"), Ce = K(!1)({
  name: "VDefaultsProvider",
  props: Lo(),
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
    } = na(e);
    return Mt(l, {
      reset: i,
      root: o,
      scoped: r,
      disabled: a
    }), () => {
      var s;
      return (s = n.default) == null ? void 0 : s.call(n);
    };
  }
});
function Jn(e) {
  return Un(() => {
    const t = [], n = {};
    if (e.value.background)
      if (Tn(e.value.background)) {
        if (n.backgroundColor = e.value.background, !e.value.text && bo(e.value.background)) {
          const l = Pt(e.value.background);
          if (l.a == null || l.a === 1) {
            const a = wo(l);
            n.color = a, n.caretColor = a;
          }
        }
      } else
        t.push(`bg-${e.value.background}`);
    return e.value.text && (Tn(e.value.text) ? (n.color = e.value.text, n.caretColor = e.value.text) : t.push(`text-${e.value.text}`)), {
      colorClasses: t,
      colorStyles: n
    };
  });
}
function $e(e, t) {
  const n = h(() => ({
    text: yt(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: l,
    colorStyles: a
  } = Jn(n);
  return {
    textColorClasses: l,
    textColorStyles: a
  };
}
function Xe(e, t) {
  const n = h(() => ({
    background: yt(e) ? e.value : t ? e[t] : null
  })), {
    colorClasses: l,
    colorStyles: a
  } = Jn(n);
  return {
    backgroundColorClasses: l,
    backgroundColorStyles: a
  };
}
const re = [String, Function, Object, Array], Fo = Symbol.for("vuetify:icons"), vn = F({
  icon: {
    type: re
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: !0
  }
}, "icon"), Rl = K()({
  name: "VComponentIcon",
  props: vn(),
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
}), Ro = $t({
  name: "VSvgIcon",
  inheritAttrs: !1,
  props: vn(),
  setup(e, t) {
    let {
      attrs: n
    } = t;
    return () => u(e.tag, Q(n, {
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
$t({
  name: "VLigatureIcon",
  props: vn(),
  setup(e) {
    return () => u(e.tag, null, {
      default: () => [e.icon]
    });
  }
});
$t({
  name: "VClassIcon",
  props: vn(),
  setup(e) {
    return () => u(e.tag, {
      class: e.icon
    }, null);
  }
});
const Mo = (e) => {
  const t = be(Fo);
  if (!t)
    throw new Error("Missing Vuetify Icons provide!");
  return {
    iconData: h(() => {
      var s;
      const l = xe(e);
      if (!l)
        return {
          component: Rl
        };
      let a = l;
      if (typeof a == "string" && (a = a.trim(), a.startsWith("$") && (a = (s = t.aliases) == null ? void 0 : s[a.slice(1)])), a || at(`Could not find aliased icon "${l}"`), Array.isArray(a))
        return {
          component: Ro,
          icon: a
        };
      if (typeof a != "string")
        return {
          component: Rl,
          icon: a
        };
      const i = Object.keys(t.sets).find((c) => typeof a == "string" && a.startsWith(`${c}:`)), o = i ? a.slice(i.length + 1) : a;
      return {
        component: t.sets[i ?? t.defaultSet].component,
        icon: o
      };
    })
  };
}, $o = ["x-small", "small", "default", "large", "x-large"], Dt = F({
  size: {
    type: [String, Number],
    default: "default"
  }
}, "size");
function Nt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ne();
  return Un(() => {
    let n, l;
    return tn($o, e.size) ? n = `${t}--size-${e.size}` : e.size && (l = {
      width: X(e.size),
      height: X(e.size)
    }), {
      sizeClasses: n,
      sizeStyles: l
    };
  });
}
const _e = F({
  tag: {
    type: String,
    default: "div"
  }
}, "tag"), Ml = Symbol.for("vuetify:theme"), Se = F({
  theme: String
}, "theme");
function Ae(e) {
  ge("provideTheme");
  const t = be(Ml, null);
  if (!t)
    throw new Error("Could not find Vuetify theme injection");
  const n = h(() => e.theme ?? t.name.value), l = h(() => t.themes.value[n.value]), a = h(() => t.isDisabled ? void 0 : `v-theme--${n.value}`), i = {
    ...t,
    name: n,
    current: l,
    themeClasses: a
  };
  return Re(Ml, i), i;
}
const Do = F({
  color: String,
  disabled: Boolean,
  start: Boolean,
  end: Boolean,
  icon: re,
  ...ae(),
  ...Dt(),
  ..._e({
    tag: "i"
  }),
  ...Se()
}, "VIcon"), fe = K()({
  name: "VIcon",
  props: Do(),
  setup(e, t) {
    let {
      attrs: n,
      slots: l
    } = t;
    const a = H(), {
      themeClasses: i
    } = Ae(e), {
      iconData: o
    } = Mo(h(() => a.value || e.icon)), {
      sizeClasses: r
    } = Nt(e), {
      textColorClasses: s,
      textColorStyles: c
    } = $e(z(e, "color"));
    return ee(() => {
      var f, d;
      const v = (f = l.default) == null ? void 0 : f.call(l);
      v && (a.value = (d = va(v).filter((g) => g.type === Ni && g.children && typeof g.children == "string")[0]) == null ? void 0 : d.children);
      const m = !!(n.onClick || n.onClickOnce);
      return u(o.value.component, {
        tag: e.tag,
        icon: o.value.icon,
        class: ["v-icon", "notranslate", i.value, r.value, s.value, {
          "v-icon--clickable": m,
          "v-icon--disabled": e.disabled,
          "v-icon--start": e.start,
          "v-icon--end": e.end
        }, e.class],
        style: [r.value ? void 0 : {
          fontSize: X(e.size),
          height: X(e.size),
          width: X(e.size)
        }, c.value, e.style],
        role: m ? "button" : void 0,
        "aria-hidden": !m,
        tabindex: m ? e.disabled ? -1 : 0 : void 0
      }, {
        default: () => [v]
      });
    }), {};
  }
}), ut = F({
  height: [Number, String],
  maxHeight: [Number, String],
  maxWidth: [Number, String],
  minHeight: [Number, String],
  minWidth: [Number, String],
  width: [Number, String]
}, "dimension");
function ct(e) {
  return {
    dimensionStyles: h(() => {
      const n = {}, l = X(e.height), a = X(e.maxHeight), i = X(e.maxWidth), o = X(e.minHeight), r = X(e.minWidth), s = X(e.width);
      return l != null && (n.height = l), a != null && (n.maxHeight = a), i != null && (n.maxWidth = i), o != null && (n.minHeight = o), r != null && (n.minWidth = r), s != null && (n.width = s), n;
    })
  };
}
function No(e) {
  return {
    aspectStyles: h(() => {
      const t = Number(e.aspectRatio);
      return t ? {
        paddingBottom: String(1 / t * 100) + "%"
      } : void 0;
    })
  };
}
const _a = F({
  aspectRatio: [String, Number],
  contentClass: null,
  inline: Boolean,
  ...ae(),
  ...ut()
}, "VResponsive"), $l = K()({
  name: "VResponsive",
  props: _a(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      aspectStyles: l
    } = No(e), {
      dimensionStyles: a
    } = ct(e);
    return ee(() => {
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
}), qe = F({
  rounded: {
    type: [Boolean, Number, String],
    default: void 0
  },
  tile: Boolean
}, "rounded");
function We(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ne();
  return {
    roundedClasses: h(() => {
      const l = yt(e) ? e.value : e.rounded, a = yt(e) ? e.value : e.tile, i = [];
      if (l === !0 || l === "")
        i.push(`${t}--rounded`);
      else if (typeof l == "string" || l === 0)
        for (const o of String(l).split(" "))
          i.push(`rounded-${o}`);
      else
        (a || l === !1) && i.push("rounded-0");
      return i;
    })
  };
}
const xt = F({
  transition: {
    type: [Boolean, String, Object],
    default: "fade-transition",
    validator: (e) => e !== !0
  }
}, "transition"), Ke = (e, t) => {
  let {
    slots: n
  } = t;
  const {
    transition: l,
    disabled: a,
    group: i,
    ...o
  } = e, {
    component: r = i ? Hn : ot,
    ...s
  } = typeof l == "object" ? l : {};
  return fn(r, Q(typeof l == "string" ? {
    name: a ? "" : l
  } : s, typeof l == "string" ? {} : Object.fromEntries(Object.entries({
    disabled: a,
    group: i
  }).filter((c) => {
    let [v, m] = c;
    return m !== void 0;
  })), o), n);
};
function zo(e, t) {
  if (!Wn)
    return;
  const n = t.modifiers || {}, l = t.value, {
    handler: a,
    options: i
  } = typeof l == "object" ? l : {
    handler: l,
    options: {}
  }, o = new IntersectionObserver(function() {
    var m;
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], s = arguments.length > 1 ? arguments[1] : void 0;
    const c = (m = e._observe) == null ? void 0 : m[t.instance.$.uid];
    if (!c)
      return;
    const v = r.some((f) => f.isIntersecting);
    a && (!n.quiet || c.init) && (!n.once || v || c.init) && a(v, r, s), v && n.once ? Aa(e, t) : c.init = !0;
  }, i);
  e._observe = Object(e._observe), e._observe[t.instance.$.uid] = {
    init: !1,
    observer: o
  }, o.observe(e);
}
function Aa(e, t) {
  var l;
  const n = (l = e._observe) == null ? void 0 : l[t.instance.$.uid];
  n && (n.observer.unobserve(e), delete e._observe[t.instance.$.uid]);
}
const Pa = {
  mounted: zo,
  unmounted: Aa
}, Ho = F({
  absolute: Boolean,
  alt: String,
  cover: Boolean,
  color: String,
  draggable: {
    type: [Boolean, String],
    default: void 0
  },
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
  crossorigin: String,
  referrerpolicy: String,
  srcset: String,
  position: String,
  ..._a(),
  ...ae(),
  ...qe(),
  ...xt()
}, "VImg"), jo = K()({
  name: "VImg",
  directives: {
    intersect: Pa
  },
  props: Ho(),
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
    const {
      backgroundColorClasses: a,
      backgroundColorStyles: i
    } = Xe(z(e, "color")), {
      roundedClasses: o
    } = We(e), r = ge("VImg"), s = G(""), c = H(), v = G(e.eager ? "loading" : "idle"), m = G(), f = G(), d = h(() => e.src && typeof e.src == "object" ? {
      src: e.src.src,
      srcset: e.srcset || e.src.srcset,
      lazySrc: e.lazySrc || e.src.lazySrc,
      aspect: Number(e.aspectRatio || e.src.aspect || 0)
    } : {
      src: e.src,
      srcset: e.srcset,
      lazySrc: e.lazySrc,
      aspect: Number(e.aspectRatio || 0)
    }), g = h(() => d.value.aspect || m.value / f.value || 0);
    U(() => e.src, () => {
      y(v.value !== "idle");
    }), U(g, (k, O) => {
      !k && O && c.value && _(c.value);
    }), ia(() => y());
    function y(k) {
      if (!(e.eager && k) && !(Wn && !k && !e.eager)) {
        if (v.value = "loading", d.value.lazySrc) {
          const O = new Image();
          O.src = d.value.lazySrc, _(O, null);
        }
        d.value.src && pe(() => {
          var O;
          n("loadstart", ((O = c.value) == null ? void 0 : O.currentSrc) || d.value.src), setTimeout(() => {
            var L;
            if (!r.isUnmounted)
              if ((L = c.value) != null && L.complete) {
                if (c.value.naturalWidth || S(), v.value === "error")
                  return;
                g.value || _(c.value, null), v.value === "loading" && b();
              } else
                g.value || _(c.value), A();
          });
        });
      }
    }
    function b() {
      var k;
      r.isUnmounted || (A(), _(c.value), v.value = "loaded", n("load", ((k = c.value) == null ? void 0 : k.currentSrc) || d.value.src));
    }
    function S() {
      var k;
      r.isUnmounted || (v.value = "error", n("error", ((k = c.value) == null ? void 0 : k.currentSrc) || d.value.src));
    }
    function A() {
      const k = c.value;
      k && (s.value = k.currentSrc || k.src);
    }
    let E = -1;
    De(() => {
      clearTimeout(E);
    });
    function _(k) {
      let O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 100;
      const L = () => {
        if (clearTimeout(E), r.isUnmounted)
          return;
        const {
          naturalHeight: M,
          naturalWidth: q
        } = k;
        M || q ? (m.value = q, f.value = M) : !k.complete && v.value === "loading" && O != null ? E = window.setTimeout(L, O) : (k.currentSrc.endsWith(".svg") || k.currentSrc.startsWith("data:image/svg+xml")) && (m.value = 1, f.value = 1);
      };
      L();
    }
    const B = h(() => ({
      "v-img__img--cover": e.cover,
      "v-img__img--contain": !e.cover
    })), x = () => {
      var L;
      if (!d.value.src || v.value === "idle")
        return null;
      const k = u("img", {
        class: ["v-img__img", B.value],
        style: {
          objectPosition: e.position
        },
        src: d.value.src,
        srcset: d.value.srcset,
        alt: e.alt,
        crossorigin: e.crossorigin,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable,
        sizes: e.sizes,
        ref: c,
        onLoad: b,
        onError: S
      }, null), O = (L = l.sources) == null ? void 0 : L.call(l);
      return u(Ke, {
        transition: e.transition,
        appear: !0
      }, {
        default: () => [Fe(O ? u("picture", {
          class: "v-img__picture"
        }, [O, k]) : k, [[Ct, v.value === "loaded"]])]
      });
    }, I = () => u(Ke, {
      transition: e.transition
    }, {
      default: () => [d.value.lazySrc && v.value !== "loaded" && u("img", {
        class: ["v-img__img", "v-img__img--preload", B.value],
        style: {
          objectPosition: e.position
        },
        src: d.value.lazySrc,
        alt: e.alt,
        crossorigin: e.crossorigin,
        referrerpolicy: e.referrerpolicy,
        draggable: e.draggable
      }, null)]
    }), V = () => l.placeholder ? u(Ke, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [(v.value === "loading" || v.value === "error" && !l.error) && u("div", {
        class: "v-img__placeholder"
      }, [l.placeholder()])]
    }) : null, R = () => l.error ? u(Ke, {
      transition: e.transition,
      appear: !0
    }, {
      default: () => [v.value === "error" && u("div", {
        class: "v-img__error"
      }, [l.error()])]
    }) : null, D = () => e.gradient ? u("div", {
      class: "v-img__gradient",
      style: {
        backgroundImage: `linear-gradient(${e.gradient})`
      }
    }, null) : null, P = G(!1);
    {
      const k = U(g, (O) => {
        O && (requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            P.value = !0;
          });
        }), k());
      });
    }
    return ee(() => {
      const k = $l.filterProps(e);
      return Fe(u($l, Q({
        class: ["v-img", {
          "v-img--absolute": e.absolute,
          "v-img--booting": !P.value
        }, a.value, o.value, e.class],
        style: [{
          width: X(e.width === "auto" ? m.value : e.width)
        }, i.value, e.style]
      }, k, {
        aspectRatio: g.value,
        "aria-label": e.alt,
        role: e.alt ? "img" : void 0
      }), {
        additional: () => u(se, null, [u(x, null, null), u(I, null, null), u(D, null, null), u(V, null, null), u(R, null, null)]),
        default: l.default
      }), [[St("intersect"), {
        handler: y,
        options: e.options
      }, null, {
        once: !0
      }]]);
    }), {
      currentSrc: s,
      image: c,
      state: v,
      naturalWidth: m,
      naturalHeight: f
    };
  }
}), kt = F({
  border: [Boolean, Number, String]
}, "border");
function Vt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ne();
  return {
    borderClasses: h(() => {
      const l = yt(e) ? e.value : e.border, a = [];
      if (l === !0 || l === "")
        a.push(`${t}--border`);
      else if (typeof l == "string" || l === 0)
        for (const i of String(l).split(" "))
          a.push(`border-${i}`);
      return a;
    })
  };
}
const qo = [null, "default", "comfortable", "compact"], Qe = F({
  density: {
    type: String,
    default: "default",
    validator: (e) => qo.includes(e)
  }
}, "density");
function Je(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ne();
  return {
    densityClasses: h(() => `${t}--density-${e.density}`)
  };
}
const Wo = ["elevated", "flat", "tonal", "outlined", "text", "plain"];
function mn(e, t) {
  return u(se, null, [e && u("span", {
    key: "overlay",
    class: `${t}__overlay`
  }, null), u("span", {
    key: "underlay",
    class: `${t}__underlay`
  }, null)]);
}
const dt = F({
  color: String,
  variant: {
    type: String,
    default: "elevated",
    validator: (e) => Wo.includes(e)
  }
}, "variant");
function gn(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ne();
  const n = h(() => {
    const {
      variant: i
    } = xe(e);
    return `${t}--variant-${i}`;
  }), {
    colorClasses: l,
    colorStyles: a
  } = Jn(h(() => {
    const {
      variant: i,
      color: o
    } = xe(e);
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
const Go = F({
  start: Boolean,
  end: Boolean,
  icon: re,
  image: String,
  text: String,
  ...kt(),
  ...ae(),
  ...Qe(),
  ...qe(),
  ...Dt(),
  ..._e(),
  ...Se(),
  ...dt({
    variant: "flat"
  })
}, "VAvatar"), ht = K()({
  name: "VAvatar",
  props: Go(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: l
    } = Ae(e), {
      borderClasses: a
    } = Vt(e), {
      colorClasses: i,
      colorStyles: o,
      variantClasses: r
    } = gn(e), {
      densityClasses: s
    } = Je(e), {
      roundedClasses: c
    } = We(e), {
      sizeClasses: v,
      sizeStyles: m
    } = Nt(e);
    return ee(() => u(e.tag, {
      class: ["v-avatar", {
        "v-avatar--start": e.start,
        "v-avatar--end": e.end
      }, l.value, a.value, i.value, s.value, c.value, v.value, r.value, e.class],
      style: [o.value, m.value, e.style]
    }, {
      default: () => [n.default ? u(Ce, {
        key: "content-defaults",
        defaults: {
          VImg: {
            cover: !0,
            src: e.image
          },
          VIcon: {
            icon: e.icon
          }
        }
      }, {
        default: () => [n.default()]
      }) : e.image ? u(jo, {
        key: "image",
        src: e.image,
        alt: "",
        cover: !0
      }, null) : e.icon ? u(fe, {
        key: "icon",
        icon: e.icon
      }, null) : e.text, mn(!1, "v-avatar")]
    })), {};
  }
}), Uo = Symbol.for("vuetify:display"), Ko = F({
  mobile: {
    type: Boolean,
    default: !1
  },
  mobileBreakpoint: [Number, String]
}, "display");
function Zn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ne();
  const n = be(Uo);
  if (!n)
    throw new Error("Could not find Vuetify display injection");
  const l = h(() => {
    if (e.mobile != null)
      return e.mobile;
    if (!e.mobileBreakpoint)
      return n.mobile.value;
    const i = typeof e.mobileBreakpoint == "number" ? e.mobileBreakpoint : n.thresholds.value[e.mobileBreakpoint];
    return n.width.value < i;
  }), a = h(() => t ? {
    [`${t}--mobile`]: l.value
  } : {});
  return {
    ...n,
    displayClasses: a,
    mobile: l
  };
}
function rt(e, t) {
  let n;
  function l() {
    n = jn(), n.run(() => t.length ? t(() => {
      n == null || n.stop(), l();
    }) : t());
  }
  U(e, (a) => {
    a && !n ? l() : a || (n == null || n.stop(), n = void 0);
  }, {
    immediate: !0
  }), Ie(() => {
    n == null || n.stop();
  });
}
function ve(e, t, n) {
  let l = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : (m) => m, a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : (m) => m;
  const i = ge("useProxiedModel"), o = H(e[t] !== void 0 ? e[t] : n), r = nt(t), c = r !== t ? h(() => {
    var m, f, d, g;
    return e[t], !!(((m = i.vnode.props) != null && m.hasOwnProperty(t) || (f = i.vnode.props) != null && f.hasOwnProperty(r)) && ((d = i.vnode.props) != null && d.hasOwnProperty(`onUpdate:${t}`) || (g = i.vnode.props) != null && g.hasOwnProperty(`onUpdate:${r}`)));
  }) : h(() => {
    var m, f;
    return e[t], !!((m = i.vnode.props) != null && m.hasOwnProperty(t) && ((f = i.vnode.props) != null && f.hasOwnProperty(`onUpdate:${t}`)));
  });
  rt(() => !c.value, () => {
    U(() => e[t], (m) => {
      o.value = m;
    });
  });
  const v = h({
    get() {
      const m = e[t];
      return l(c.value ? m : o.value);
    },
    set(m) {
      const f = a(m), d = ue(c.value ? e[t] : o.value);
      d === f || l(d) === m || (o.value = f, i == null || i.emit(`update:${t}`, f));
    }
  });
  return Object.defineProperty(v, "externalValue", {
    get: () => c.value ? e[t] : o.value
  }), v;
}
const Ea = Symbol.for("vuetify:locale");
function yn() {
  const e = be(Ea);
  if (!e)
    throw new Error("[Vuetify] Could not find injected locale instance");
  return e;
}
function Ze() {
  const e = be(Ea);
  if (!e)
    throw new Error("[Vuetify] Could not find injected rtl instance");
  return {
    isRtl: e.isRtl,
    rtlClasses: e.rtlClasses
  };
}
const Yo = Symbol.for("vuetify:goto");
function Xo() {
  return {
    container: void 0,
    duration: 300,
    layout: !1,
    offset: 0,
    easing: "easeInOutCubic",
    patterns: {
      linear: (e) => e,
      easeInQuad: (e) => e ** 2,
      easeOutQuad: (e) => e * (2 - e),
      easeInOutQuad: (e) => e < 0.5 ? 2 * e ** 2 : -1 + (4 - 2 * e) * e,
      easeInCubic: (e) => e ** 3,
      easeOutCubic: (e) => --e ** 3 + 1,
      easeInOutCubic: (e) => e < 0.5 ? 4 * e ** 3 : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1,
      easeInQuart: (e) => e ** 4,
      easeOutQuart: (e) => 1 - --e ** 4,
      easeInOutQuart: (e) => e < 0.5 ? 8 * e ** 4 : 1 - 8 * --e ** 4,
      easeInQuint: (e) => e ** 5,
      easeOutQuint: (e) => 1 + --e ** 5,
      easeInOutQuint: (e) => e < 0.5 ? 16 * e ** 5 : 1 + 16 * --e ** 5
    }
  };
}
function Qo(e) {
  return el(e) ?? (document.scrollingElement || document.body);
}
function el(e) {
  return typeof e == "string" ? document.querySelector(e) : ua(e);
}
function wn(e, t, n) {
  if (typeof e == "number")
    return t && n ? -e : e;
  let l = el(e), a = 0;
  for (; l; )
    a += t ? l.offsetLeft : l.offsetTop, l = l.offsetParent;
  return a;
}
async function Dl(e, t, n, l) {
  const a = n ? "scrollLeft" : "scrollTop", i = ze((l == null ? void 0 : l.options) ?? Xo(), t), o = l == null ? void 0 : l.rtl.value, r = (typeof e == "number" ? e : el(e)) ?? 0, s = i.container === "parent" && r instanceof HTMLElement ? r.parentElement : Qo(i.container), c = typeof i.easing == "function" ? i.easing : i.patterns[i.easing];
  if (!c)
    throw new TypeError(`Easing function "${i.easing}" not found.`);
  let v;
  if (typeof r == "number")
    v = wn(r, n, o);
  else if (v = wn(r, n, o) - wn(s, n, o), i.layout) {
    const g = window.getComputedStyle(r).getPropertyValue("--v-layout-top");
    g && (v -= parseInt(g, 10));
  }
  v += i.offset, v = Zo(s, v, !!o, !!n);
  const m = s[a] ?? 0;
  if (v === m)
    return Promise.resolve(v);
  const f = performance.now();
  return new Promise((d) => requestAnimationFrame(function g(y) {
    const S = (y - f) / i.duration, A = Math.floor(m + (v - m) * c(Ye(S, 0, 1)));
    if (s[a] = A, S >= 1 && Math.abs(A - s[a]) < 10)
      return d(v);
    if (S > 2)
      return at("Scroll target is not reachable"), d(s[a]);
    requestAnimationFrame(g);
  }));
}
function Jo() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const t = be(Yo), {
    isRtl: n
  } = Ze();
  if (!t)
    throw new Error("[Vuetify] Could not find injected goto instance");
  const l = {
    ...t,
    // can be set via VLocaleProvider
    rtl: h(() => t.rtl.value || n.value)
  };
  async function a(i, o) {
    return Dl(i, ze(e, o), !1, l);
  }
  return a.horizontal = async (i, o) => Dl(i, ze(e, o), !0, l), a;
}
function Zo(e, t, n, l) {
  const {
    scrollWidth: a,
    scrollHeight: i
  } = e, [o, r] = e === document.scrollingElement ? [window.innerWidth, window.innerHeight] : [e.offsetWidth, e.offsetHeight];
  let s, c;
  return l ? n ? (s = -(a - o), c = 0) : (s = 0, c = a - o) : (s = 0, c = i + -r), Math.max(Math.min(t, c), s);
}
const tl = F({
  modelValue: {
    type: null,
    default: void 0
  },
  multiple: Boolean,
  mandatory: [Boolean, String],
  max: Number,
  selectedClass: String,
  disabled: Boolean
}, "group"), Oa = F({
  value: null,
  disabled: Boolean,
  selectedClass: String
}, "group-item");
function Ba(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  const l = ge("useGroupItem");
  if (!l)
    throw new Error("[Vuetify] useGroupItem composable must be used inside a component setup function");
  const a = je();
  Re(Symbol.for(`${t.description}:id`), a);
  const i = be(t, null);
  if (!i) {
    if (!n)
      return i;
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${t.description}`);
  }
  const o = z(e, "value"), r = h(() => !!(i.disabled.value || e.disabled));
  i.register({
    id: a,
    value: o,
    disabled: r
  }, l), De(() => {
    i.unregister(a);
  });
  const s = h(() => i.isSelected(a)), c = h(() => i.items.value[0].id === a), v = h(() => i.items.value[i.items.value.length - 1].id === a), m = h(() => s.value && [i.selectedClass.value, e.selectedClass]);
  return U(s, (f) => {
    l.emit("group:selected", {
      value: f
    });
  }, {
    flush: "sync"
  }), {
    id: a,
    isSelected: s,
    isFirst: c,
    isLast: v,
    toggle: () => i.select(a, !s.value),
    select: (f) => i.select(a, f),
    selectedClass: m,
    value: o,
    disabled: r,
    group: i
  };
}
function nl(e, t) {
  let n = !1;
  const l = cn([]), a = ve(e, "modelValue", [], (f) => f == null ? [] : Ta(l, ke(f)), (f) => {
    const d = tr(l, f);
    return e.multiple ? d : d[0];
  }), i = ge("useGroup");
  function o(f, d) {
    const g = f, y = Symbol.for(`${t.description}:id`), S = At(y, i == null ? void 0 : i.vnode).indexOf(d);
    xe(g.value) == null && (g.value = S, g.useIndexAsValue = !0), S > -1 ? l.splice(S, 0, g) : l.push(g);
  }
  function r(f) {
    if (n)
      return;
    s();
    const d = l.findIndex((g) => g.id === f);
    l.splice(d, 1);
  }
  function s() {
    const f = l.find((d) => !d.disabled);
    f && e.mandatory === "force" && !a.value.length && (a.value = [f.id]);
  }
  pt(() => {
    s();
  }), De(() => {
    n = !0;
  }), zi(() => {
    for (let f = 0; f < l.length; f++)
      l[f].useIndexAsValue && (l[f].value = f);
  });
  function c(f, d) {
    const g = l.find((y) => y.id === f);
    if (!(d && (g != null && g.disabled)))
      if (e.multiple) {
        const y = a.value.slice(), b = y.findIndex((A) => A === f), S = ~b;
        if (d = d ?? !S, S && e.mandatory && y.length <= 1 || !S && e.max != null && y.length + 1 > e.max)
          return;
        b < 0 && d ? y.push(f) : b >= 0 && !d && y.splice(b, 1), a.value = y;
      } else {
        const y = a.value.includes(f);
        if (e.mandatory && y)
          return;
        a.value = d ?? !y ? [f] : [];
      }
  }
  function v(f) {
    if (e.multiple && at('This method is not supported when using "multiple" prop'), a.value.length) {
      const d = a.value[0], g = l.findIndex((S) => S.id === d);
      let y = (g + f) % l.length, b = l[y];
      for (; b.disabled && y !== g; )
        y = (y + f) % l.length, b = l[y];
      if (b.disabled)
        return;
      a.value = [l[y].id];
    } else {
      const d = l.find((g) => !g.disabled);
      d && (a.value = [d.id]);
    }
  }
  const m = {
    register: o,
    unregister: r,
    selected: a,
    select: c,
    disabled: z(e, "disabled"),
    prev: () => v(l.length - 1),
    next: () => v(1),
    isSelected: (f) => a.value.includes(f),
    selectedClass: h(() => e.selectedClass),
    items: h(() => l),
    getItemIndex: (f) => er(l, f)
  };
  return Re(t, m), m;
}
function er(e, t) {
  const n = Ta(e, [t]);
  return n.length ? e.findIndex((l) => l.id === n[0]) : -1;
}
function Ta(e, t) {
  const n = [];
  return t.forEach((l) => {
    const a = e.find((o) => wt(l, o.value)), i = e[l];
    (a == null ? void 0 : a.value) != null ? n.push(a.id) : i != null && n.push(i.id);
  }), n;
}
function tr(e, t) {
  const n = [];
  return t.forEach((l) => {
    const a = e.findIndex((i) => i.id === l);
    if (~a) {
      const i = e[a];
      n.push(i.value != null ? i.value : a);
    }
  }), n;
}
function Bt(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "content";
  const n = En(), l = H();
  if (me) {
    const a = new ResizeObserver((i) => {
      i.length && (t === "content" ? l.value = i[0].contentRect : l.value = i[0].target.getBoundingClientRect());
    });
    De(() => {
      a.disconnect();
    }), U(() => n.el, (i, o) => {
      o && (a.unobserve(o), l.value = void 0), i && a.observe(i);
    }, {
      flush: "post"
    });
  }
  return {
    resizeRef: n,
    contentRect: qn(l)
  };
}
function nr(e) {
  let {
    selectedElement: t,
    containerElement: n,
    isRtl: l,
    isHorizontal: a
  } = e;
  const i = Tt(a, n), o = La(a, l, n), r = Tt(a, t), s = Fa(a, t), c = r * 0.4;
  return o > s ? s - c : o + i < s + r ? s - i + r + c : o;
}
function lr(e) {
  let {
    selectedElement: t,
    containerElement: n,
    isHorizontal: l
  } = e;
  const a = Tt(l, n), i = Fa(l, t), o = Tt(l, t);
  return i - a / 2 + o / 2;
}
function Nl(e, t) {
  const n = e ? "scrollWidth" : "scrollHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function ar(e, t) {
  const n = e ? "clientWidth" : "clientHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function La(e, t, n) {
  if (!n)
    return 0;
  const {
    scrollLeft: l,
    offsetWidth: a,
    scrollWidth: i
  } = n;
  return e ? t ? i - a + l : l : n.scrollTop;
}
function Tt(e, t) {
  const n = e ? "offsetWidth" : "offsetHeight";
  return (t == null ? void 0 : t[n]) || 0;
}
function Fa(e, t) {
  const n = e ? "offsetLeft" : "offsetTop";
  return (t == null ? void 0 : t[n]) || 0;
}
const ir = Symbol.for("vuetify:v-slide-group"), Ra = F({
  centerActive: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  symbol: {
    type: null,
    default: ir
  },
  nextIcon: {
    type: re,
    default: "$next"
  },
  prevIcon: {
    type: re,
    default: "$prev"
  },
  showArrows: {
    type: [Boolean, String],
    validator: (e) => typeof e == "boolean" || ["always", "desktop", "mobile"].includes(e)
  },
  ...ae(),
  ...Ko({
    mobile: null
  }),
  ..._e(),
  ...tl({
    selectedClass: "v-slide-group-item--active"
  })
}, "VSlideGroup"), zl = K()({
  name: "VSlideGroup",
  props: Ra(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isRtl: l
    } = Ze(), {
      displayClasses: a,
      mobile: i
    } = Zn(e), o = nl(e, e.symbol), r = G(!1), s = G(0), c = G(0), v = G(0), m = h(() => e.direction === "horizontal"), {
      resizeRef: f,
      contentRect: d
    } = Bt(), {
      resizeRef: g,
      contentRect: y
    } = Bt(), b = Jo(), S = h(() => ({
      container: f.el,
      duration: 200,
      easing: "easeOutQuart"
    })), A = h(() => o.selected.value.length ? o.items.value.findIndex((p) => p.id === o.selected.value[0]) : -1), E = h(() => o.selected.value.length ? o.items.value.findIndex((p) => p.id === o.selected.value[o.selected.value.length - 1]) : -1);
    if (me) {
      let p = -1;
      U(() => [o.selected.value, d.value, y.value, m.value], () => {
        cancelAnimationFrame(p), p = requestAnimationFrame(() => {
          if (d.value && y.value) {
            const w = m.value ? "width" : "height";
            c.value = d.value[w], v.value = y.value[w], r.value = c.value + 1 < v.value;
          }
          if (A.value >= 0 && g.el) {
            const w = g.el.children[E.value];
            B(w, e.centerActive);
          }
        });
      });
    }
    const _ = G(!1);
    function B(p, w) {
      let $ = 0;
      w ? $ = lr({
        containerElement: f.el,
        isHorizontal: m.value,
        selectedElement: p
      }) : $ = nr({
        containerElement: f.el,
        isHorizontal: m.value,
        isRtl: l.value,
        selectedElement: p
      }), x($);
    }
    function x(p) {
      if (!me || !f.el)
        return;
      const w = Tt(m.value, f.el), $ = La(m.value, l.value, f.el);
      if (!(Nl(m.value, f.el) <= w || // Prevent scrolling by only a couple of pixels, which doesn't look smooth
      Math.abs(p - $) < 16)) {
        if (m.value && l.value && f.el) {
          const {
            scrollWidth: j,
            offsetWidth: ie
          } = f.el;
          p = j - ie - p;
        }
        m.value ? b.horizontal(p, S.value) : b(p, S.value);
      }
    }
    function I(p) {
      const {
        scrollTop: w,
        scrollLeft: $
      } = p.target;
      s.value = m.value ? $ : w;
    }
    function V(p) {
      if (_.value = !0, !(!r.value || !g.el)) {
        for (const w of p.composedPath())
          for (const $ of g.el.children)
            if ($ === w) {
              B($);
              return;
            }
      }
    }
    function R(p) {
      _.value = !1;
    }
    let D = !1;
    function P(p) {
      var w;
      !D && !_.value && !(p.relatedTarget && ((w = g.el) != null && w.contains(p.relatedTarget))) && L(), D = !1;
    }
    function k() {
      D = !0;
    }
    function O(p) {
      if (!g.el)
        return;
      function w($) {
        p.preventDefault(), L($);
      }
      m.value ? p.key === "ArrowRight" ? w(l.value ? "prev" : "next") : p.key === "ArrowLeft" && w(l.value ? "next" : "prev") : p.key === "ArrowDown" ? w("next") : p.key === "ArrowUp" && w("prev"), p.key === "Home" ? w("first") : p.key === "End" && w("last");
    }
    function L(p) {
      var $, ne;
      if (!g.el)
        return;
      let w;
      if (!p)
        w = nn(g.el)[0];
      else if (p === "next") {
        if (w = ($ = g.el.querySelector(":focus")) == null ? void 0 : $.nextElementSibling, !w)
          return L("first");
      } else if (p === "prev") {
        if (w = (ne = g.el.querySelector(":focus")) == null ? void 0 : ne.previousElementSibling, !w)
          return L("last");
      } else
        p === "first" ? w = g.el.firstElementChild : p === "last" && (w = g.el.lastElementChild);
      w && w.focus({
        preventScroll: !0
      });
    }
    function M(p) {
      const w = m.value && l.value ? -1 : 1, $ = (p === "prev" ? -w : w) * c.value;
      let ne = s.value + $;
      if (m.value && l.value && f.el) {
        const {
          scrollWidth: j,
          offsetWidth: ie
        } = f.el;
        ne += j - ie;
      }
      x(ne);
    }
    const q = h(() => ({
      next: o.next,
      prev: o.prev,
      select: o.select,
      isSelected: o.isSelected
    })), Z = h(() => {
      switch (e.showArrows) {
        case "always":
          return !0;
        case "desktop":
          return !i.value;
        case !0:
          return r.value || Math.abs(s.value) > 0;
        case "mobile":
          return i.value || r.value || Math.abs(s.value) > 0;
        default:
          return !i.value && (r.value || Math.abs(s.value) > 0);
      }
    }), W = h(() => Math.abs(s.value) > 1), C = h(() => {
      if (!f.value)
        return !1;
      const p = Nl(m.value, f.el), w = ar(m.value, f.el);
      return p - w - Math.abs(s.value) > 1;
    });
    return ee(() => u(e.tag, {
      class: ["v-slide-group", {
        "v-slide-group--vertical": !m.value,
        "v-slide-group--has-affixes": Z.value,
        "v-slide-group--is-overflowing": r.value
      }, a.value, e.class],
      style: e.style,
      tabindex: _.value || o.selected.value.length ? -1 : 0,
      onFocus: P
    }, {
      default: () => {
        var p, w, $;
        return [Z.value && u("div", {
          key: "prev",
          class: ["v-slide-group__prev", {
            "v-slide-group__prev--disabled": !W.value
          }],
          onMousedown: k,
          onClick: () => W.value && M("prev")
        }, [((p = n.prev) == null ? void 0 : p.call(n, q.value)) ?? u(Fl, null, {
          default: () => [u(fe, {
            icon: l.value ? e.nextIcon : e.prevIcon
          }, null)]
        })]), u("div", {
          key: "container",
          ref: f,
          class: "v-slide-group__container",
          onScroll: I
        }, [u("div", {
          ref: g,
          class: "v-slide-group__content",
          onFocusin: V,
          onFocusout: R,
          onKeydown: O
        }, [(w = n.default) == null ? void 0 : w.call(n, q.value)])]), Z.value && u("div", {
          key: "next",
          class: ["v-slide-group__next", {
            "v-slide-group__next--disabled": !C.value
          }],
          onMousedown: k,
          onClick: () => C.value && M("next")
        }, [(($ = n.next) == null ? void 0 : $.call(n, q.value)) ?? u(Fl, null, {
          default: () => [u(fe, {
            icon: l.value ? e.prevIcon : e.nextIcon
          }, null)]
        })])];
      }
    })), {
      selected: o.selected,
      scrollTo: M,
      scrollOffset: s,
      focus: L,
      hasPrev: W,
      hasNext: C
    };
  }
}), Ma = Symbol.for("vuetify:v-chip-group"), or = F({
  column: Boolean,
  filter: Boolean,
  valueComparator: {
    type: Function,
    default: wt
  },
  ...Ra(),
  ...ae(),
  ...tl({
    selectedClass: "v-chip--selected"
  }),
  ..._e(),
  ...Se(),
  ...dt({
    variant: "tonal"
  })
}, "VChipGroup");
K()({
  name: "VChipGroup",
  props: or(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: l
    } = Ae(e), {
      isSelected: a,
      select: i,
      next: o,
      prev: r,
      selected: s
    } = nl(e, Ma);
    return Mt({
      VChip: {
        color: z(e, "color"),
        disabled: z(e, "disabled"),
        filter: z(e, "filter"),
        variant: z(e, "variant")
      }
    }), ee(() => {
      const c = zl.filterProps(e);
      return u(zl, Q(c, {
        class: ["v-chip-group", {
          "v-chip-group--column": e.column
        }, l.value, e.class],
        style: e.style
      }), {
        default: () => {
          var v;
          return [(v = n.default) == null ? void 0 : v.call(n, {
            isSelected: a,
            select: i,
            next: o,
            prev: r,
            selected: s.value
          })];
        }
      });
    }), {};
  }
});
const zt = F({
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
function Ht(e) {
  return {
    elevationClasses: h(() => {
      const n = yt(e) ? e.value : e.elevation, l = [];
      return n == null || l.push(`elevation-${n}`), l;
    })
  };
}
function rr() {
  const e = ge("useRoute");
  return h(() => {
    var t;
    return (t = e == null ? void 0 : e.proxy) == null ? void 0 : t.$route;
  });
}
function sr() {
  var e, t;
  return (t = (e = ge("useRouter")) == null ? void 0 : e.proxy) == null ? void 0 : t.$router;
}
function ll(e, t) {
  var c, v;
  const n = Hi("RouterLink"), l = h(() => !!(e.href || e.to)), a = h(() => (l == null ? void 0 : l.value) || bl(t, "click") || bl(e, "click"));
  if (typeof n == "string" || !("useLink" in n))
    return {
      isLink: l,
      isClickable: a,
      href: z(e, "href")
    };
  const i = h(() => ({
    ...e,
    to: z(() => e.to || "")
  })), o = n.useLink(i.value), r = h(() => e.to ? o : void 0), s = rr();
  return {
    isLink: l,
    isClickable: a,
    route: (c = r.value) == null ? void 0 : c.route,
    navigate: (v = r.value) == null ? void 0 : v.navigate,
    isActive: h(() => {
      var m, f, d;
      return r.value ? e.exact ? s.value ? ((d = r.value.isExactActive) == null ? void 0 : d.value) && wt(r.value.route.value.query, s.value.query) : ((f = r.value.isExactActive) == null ? void 0 : f.value) ?? !1 : ((m = r.value.isActive) == null ? void 0 : m.value) ?? !1 : !1;
    }),
    href: h(() => {
      var m;
      return e.to ? (m = r.value) == null ? void 0 : m.route.value.href : e.href;
    })
  };
}
const al = F({
  href: String,
  replace: Boolean,
  to: [String, Object],
  exact: Boolean
}, "router");
let xn = !1;
function ur(e, t) {
  let n = !1, l, a;
  me && (pe(() => {
    window.addEventListener("popstate", i), l = e == null ? void 0 : e.beforeEach((o, r, s) => {
      xn ? n ? t(s) : s() : setTimeout(() => n ? t(s) : s()), xn = !0;
    }), a = e == null ? void 0 : e.afterEach(() => {
      xn = !1;
    });
  }), Ie(() => {
    window.removeEventListener("popstate", i), l == null || l(), a == null || a();
  }));
  function i(o) {
    var r;
    (r = o.state) != null && r.replaced || (n = !0, setTimeout(() => n = !1));
  }
}
const Ln = Symbol("rippleStop"), cr = 80;
function Hl(e, t) {
  e.style.transform = t, e.style.webkitTransform = t;
}
function Fn(e) {
  return e.constructor.name === "TouchEvent";
}
function $a(e) {
  return e.constructor.name === "KeyboardEvent";
}
const dr = function(e, t) {
  var m;
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, l = 0, a = 0;
  if (!$a(e)) {
    const f = t.getBoundingClientRect(), d = Fn(e) ? e.touches[e.touches.length - 1] : e;
    l = d.clientX - f.left, a = d.clientY - f.top;
  }
  let i = 0, o = 0.3;
  (m = t._ripple) != null && m.circle ? (o = 0.15, i = t.clientWidth / 2, i = n.center ? i : i + Math.sqrt((l - i) ** 2 + (a - i) ** 2) / 4) : i = Math.sqrt(t.clientWidth ** 2 + t.clientHeight ** 2) / 2;
  const r = `${(t.clientWidth - i * 2) / 2}px`, s = `${(t.clientHeight - i * 2) / 2}px`, c = n.center ? r : `${l - i}px`, v = n.center ? s : `${a - i}px`;
  return {
    radius: i,
    scale: o,
    x: c,
    y: v,
    centerX: r,
    centerY: s
  };
}, sn = {
  /* eslint-disable max-statements */
  show(e, t) {
    var d;
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    if (!((d = t == null ? void 0 : t._ripple) != null && d.enabled))
      return;
    const l = document.createElement("span"), a = document.createElement("span");
    l.appendChild(a), l.className = "v-ripple__container", n.class && (l.className += ` ${n.class}`);
    const {
      radius: i,
      scale: o,
      x: r,
      y: s,
      centerX: c,
      centerY: v
    } = dr(e, t, n), m = `${i * 2}px`;
    a.className = "v-ripple__animation", a.style.width = m, a.style.height = m, t.appendChild(l);
    const f = window.getComputedStyle(t);
    f && f.position === "static" && (t.style.position = "relative", t.dataset.previousPosition = "static"), a.classList.add("v-ripple__animation--enter"), a.classList.add("v-ripple__animation--visible"), Hl(a, `translate(${r}, ${s}) scale3d(${o},${o},${o})`), a.dataset.activated = String(performance.now()), setTimeout(() => {
      a.classList.remove("v-ripple__animation--enter"), a.classList.add("v-ripple__animation--in"), Hl(a, `translate(${c}, ${v}) scale3d(1,1,1)`);
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
function Da(e) {
  return typeof e > "u" || !!e;
}
function Lt(e) {
  const t = {}, n = e.currentTarget;
  if (!(!(n != null && n._ripple) || n._ripple.touched || e[Ln])) {
    if (e[Ln] = !0, Fn(e))
      n._ripple.touched = !0, n._ripple.isTouch = !0;
    else if (n._ripple.isTouch)
      return;
    if (t.center = n._ripple.centered || $a(e), n._ripple.class && (t.class = n._ripple.class), Fn(e)) {
      if (n._ripple.showTimerCommit)
        return;
      n._ripple.showTimerCommit = () => {
        sn.show(e, n, t);
      }, n._ripple.showTimer = window.setTimeout(() => {
        var l;
        (l = n == null ? void 0 : n._ripple) != null && l.showTimerCommit && (n._ripple.showTimerCommit(), n._ripple.showTimerCommit = null);
      }, cr);
    } else
      sn.show(e, n, t);
  }
}
function jl(e) {
  e[Ln] = !0;
}
function Ee(e) {
  const t = e.currentTarget;
  if (t != null && t._ripple) {
    if (window.clearTimeout(t._ripple.showTimer), e.type === "touchend" && t._ripple.showTimerCommit) {
      t._ripple.showTimerCommit(), t._ripple.showTimerCommit = null, t._ripple.showTimer = window.setTimeout(() => {
        Ee(e);
      });
      return;
    }
    window.setTimeout(() => {
      t._ripple && (t._ripple.touched = !1);
    }), sn.hide(t);
  }
}
function Na(e) {
  const t = e.currentTarget;
  t != null && t._ripple && (t._ripple.showTimerCommit && (t._ripple.showTimerCommit = null), window.clearTimeout(t._ripple.showTimer));
}
let Ft = !1;
function za(e) {
  !Ft && (e.keyCode === gl.enter || e.keyCode === gl.space) && (Ft = !0, Lt(e));
}
function Ha(e) {
  Ft = !1, Ee(e);
}
function ja(e) {
  Ft && (Ft = !1, Ee(e));
}
function qa(e, t, n) {
  const {
    value: l,
    modifiers: a
  } = t, i = Da(l);
  if (i || sn.hide(e), e._ripple = e._ripple ?? {}, e._ripple.enabled = i, e._ripple.centered = a.center, e._ripple.circle = a.circle, Pn(l) && l.class && (e._ripple.class = l.class), i && !n) {
    if (a.stop) {
      e.addEventListener("touchstart", jl, {
        passive: !0
      }), e.addEventListener("mousedown", jl);
      return;
    }
    e.addEventListener("touchstart", Lt, {
      passive: !0
    }), e.addEventListener("touchend", Ee, {
      passive: !0
    }), e.addEventListener("touchmove", Na, {
      passive: !0
    }), e.addEventListener("touchcancel", Ee), e.addEventListener("mousedown", Lt), e.addEventListener("mouseup", Ee), e.addEventListener("mouseleave", Ee), e.addEventListener("keydown", za), e.addEventListener("keyup", Ha), e.addEventListener("blur", ja), e.addEventListener("dragstart", Ee, {
      passive: !0
    });
  } else
    !i && n && Wa(e);
}
function Wa(e) {
  e.removeEventListener("mousedown", Lt), e.removeEventListener("touchstart", Lt), e.removeEventListener("touchend", Ee), e.removeEventListener("touchmove", Na), e.removeEventListener("touchcancel", Ee), e.removeEventListener("mouseup", Ee), e.removeEventListener("mouseleave", Ee), e.removeEventListener("keydown", za), e.removeEventListener("keyup", Ha), e.removeEventListener("dragstart", Ee), e.removeEventListener("blur", ja);
}
function fr(e, t) {
  qa(e, t, !1);
}
function vr(e) {
  delete e._ripple, Wa(e);
}
function mr(e, t) {
  if (t.value === t.oldValue)
    return;
  const n = Da(t.oldValue);
  qa(e, t, n);
}
const hn = {
  mounted: fr,
  unmounted: vr,
  updated: mr
}, gr = F({
  activeClass: String,
  appendAvatar: String,
  appendIcon: re,
  closable: Boolean,
  closeIcon: {
    type: re,
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
  prependIcon: re,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  modelValue: {
    type: Boolean,
    default: !0
  },
  onClick: Ve(),
  onClickOnce: Ve(),
  ...kt(),
  ...ae(),
  ...Qe(),
  ...zt(),
  ...Oa(),
  ...qe(),
  ...al(),
  ...Dt(),
  ..._e({
    tag: "span"
  }),
  ...Se(),
  ...dt({
    variant: "tonal"
  })
}, "VChip"), il = K()({
  name: "VChip",
  directives: {
    Ripple: hn
  },
  props: gr(),
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
    } = yn(), {
      borderClasses: o
    } = Vt(e), {
      colorClasses: r,
      colorStyles: s,
      variantClasses: c
    } = gn(e), {
      densityClasses: v
    } = Je(e), {
      elevationClasses: m
    } = Ht(e), {
      roundedClasses: f
    } = We(e), {
      sizeClasses: d
    } = Nt(e), {
      themeClasses: g
    } = Ae(e), y = ve(e, "modelValue"), b = Ba(e, Ma, !1), S = ll(e, n), A = h(() => e.link !== !1 && S.isLink.value), E = h(() => !e.disabled && e.link !== !1 && (!!b || e.link || S.isClickable.value)), _ = h(() => ({
      "aria-label": i(e.closeLabel),
      onClick(I) {
        I.preventDefault(), I.stopPropagation(), y.value = !1, l("click:close", I);
      }
    }));
    function B(I) {
      var V;
      l("click", I), E.value && ((V = S.navigate) == null || V.call(S, I), b == null || b.toggle());
    }
    function x(I) {
      (I.key === "Enter" || I.key === " ") && (I.preventDefault(), B(I));
    }
    return () => {
      const I = S.isLink.value ? "a" : e.tag, V = !!(e.appendIcon || e.appendAvatar), R = !!(V || a.append), D = !!(a.close || e.closable), P = !!(a.filter || e.filter) && b, k = !!(e.prependIcon || e.prependAvatar), O = !!(k || a.prepend), L = !b || b.isSelected.value;
      return y.value && Fe(u(I, {
        class: ["v-chip", {
          "v-chip--disabled": e.disabled,
          "v-chip--label": e.label,
          "v-chip--link": E.value,
          "v-chip--filter": P,
          "v-chip--pill": e.pill
        }, g.value, o.value, L ? r.value : void 0, v.value, m.value, f.value, d.value, c.value, b == null ? void 0 : b.selectedClass.value, e.class],
        style: [L ? s.value : void 0, e.style],
        disabled: e.disabled || void 0,
        draggable: e.draggable,
        href: S.href.value,
        tabindex: E.value ? 0 : void 0,
        onClick: B,
        onKeydown: E.value && !A.value && x
      }, {
        default: () => {
          var M;
          return [mn(E.value, "v-chip"), P && u(Ia, {
            key: "filter"
          }, {
            default: () => [Fe(u("div", {
              class: "v-chip__filter"
            }, [a.filter ? u(Ce, {
              key: "filter-defaults",
              disabled: !e.filterIcon,
              defaults: {
                VIcon: {
                  icon: e.filterIcon
                }
              }
            }, a.filter) : u(fe, {
              key: "filter-icon",
              icon: e.filterIcon
            }, null)]), [[Ct, b.isSelected.value]])]
          }), O && u("div", {
            key: "prepend",
            class: "v-chip__prepend"
          }, [a.prepend ? u(Ce, {
            key: "prepend-defaults",
            disabled: !k,
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
          }, a.prepend) : u(se, null, [e.prependIcon && u(fe, {
            key: "prepend-icon",
            icon: e.prependIcon,
            start: !0
          }, null), e.prependAvatar && u(ht, {
            key: "prepend-avatar",
            image: e.prependAvatar,
            start: !0
          }, null)])]), u("div", {
            class: "v-chip__content",
            "data-no-activator": ""
          }, [((M = a.default) == null ? void 0 : M.call(a, {
            isSelected: b == null ? void 0 : b.isSelected.value,
            selectedClass: b == null ? void 0 : b.selectedClass.value,
            select: b == null ? void 0 : b.select,
            toggle: b == null ? void 0 : b.toggle,
            value: b == null ? void 0 : b.value.value,
            disabled: e.disabled
          })) ?? e.text]), R && u("div", {
            key: "append",
            class: "v-chip__append"
          }, [a.append ? u(Ce, {
            key: "append-defaults",
            disabled: !V,
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
          }, a.append) : u(se, null, [e.appendIcon && u(fe, {
            key: "append-icon",
            end: !0,
            icon: e.appendIcon
          }, null), e.appendAvatar && u(ht, {
            key: "append-avatar",
            end: !0,
            image: e.appendAvatar
          }, null)])]), D && u("button", Q({
            key: "close",
            class: "v-chip__close",
            type: "button"
          }, _.value), [a.close ? u(Ce, {
            key: "close-defaults",
            defaults: {
              VIcon: {
                icon: e.closeIcon,
                size: "x-small"
              }
            }
          }, a.close) : u(fe, {
            key: "close-icon",
            icon: e.closeIcon,
            size: "x-small"
          }, null)])];
        }
      }), [[St("ripple"), E.value && e.ripple, null]]);
    };
  }
}), yr = F({
  text: String,
  onClick: Ve(),
  ...ae(),
  ...Se()
}, "VLabel"), Ga = K()({
  name: "VLabel",
  props: yr(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ee(() => {
      var l;
      return u("label", {
        class: ["v-label", {
          "v-label--clickable": !!e.onClick
        }, e.class],
        style: e.style,
        onClick: e.onClick
      }, [e.text, (l = n.default) == null ? void 0 : l.call(n)]);
    }), {};
  }
}), Ua = Symbol.for("vuetify:selection-control-group"), Ka = F({
  color: String,
  disabled: {
    type: Boolean,
    default: null
  },
  defaultsTarget: String,
  error: Boolean,
  id: String,
  inline: Boolean,
  falseIcon: re,
  trueIcon: re,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  multiple: {
    type: Boolean,
    default: null
  },
  name: String,
  readonly: {
    type: Boolean,
    default: null
  },
  modelValue: null,
  type: String,
  valueComparator: {
    type: Function,
    default: wt
  },
  ...ae(),
  ...Qe(),
  ...Se()
}, "SelectionControlGroup"), hr = F({
  ...Ka({
    defaultsTarget: "VSelectionControl"
  })
}, "VSelectionControlGroup");
K()({
  name: "VSelectionControlGroup",
  props: hr(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const l = ve(e, "modelValue"), a = je(), i = h(() => e.id || `v-selection-control-group-${a}`), o = h(() => e.name || i.value), r = /* @__PURE__ */ new Set();
    return Re(Ua, {
      modelValue: l,
      forceUpdate: () => {
        r.forEach((s) => s());
      },
      onForceUpdate: (s) => {
        r.add(s), Ie(() => {
          r.delete(s);
        });
      }
    }), Mt({
      [e.defaultsTarget]: {
        color: z(e, "color"),
        disabled: z(e, "disabled"),
        density: z(e, "density"),
        error: z(e, "error"),
        inline: z(e, "inline"),
        modelValue: l,
        multiple: h(() => !!e.multiple || e.multiple == null && Array.isArray(l.value)),
        name: o,
        falseIcon: z(e, "falseIcon"),
        trueIcon: z(e, "trueIcon"),
        readonly: z(e, "readonly"),
        ripple: z(e, "ripple"),
        type: z(e, "type"),
        valueComparator: z(e, "valueComparator")
      }
    }), ee(() => {
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
const Ya = F({
  label: String,
  baseColor: String,
  trueValue: null,
  falseValue: null,
  value: null,
  ...ae(),
  ...Ka()
}, "VSelectionControl");
function br(e) {
  const t = be(Ua, void 0), {
    densityClasses: n
  } = Je(e), l = ve(e, "modelValue"), a = h(() => e.trueValue !== void 0 ? e.trueValue : e.value !== void 0 ? e.value : !0), i = h(() => e.falseValue !== void 0 ? e.falseValue : !1), o = h(() => !!e.multiple || e.multiple == null && Array.isArray(l.value)), r = h({
    get() {
      const d = t ? t.modelValue.value : l.value;
      return o.value ? ke(d).some((g) => e.valueComparator(g, a.value)) : e.valueComparator(d, a.value);
    },
    set(d) {
      if (e.readonly)
        return;
      const g = d ? a.value : i.value;
      let y = g;
      o.value && (y = d ? [...ke(l.value), g] : ke(l.value).filter((b) => !e.valueComparator(b, a.value))), t ? t.modelValue.value = y : l.value = y;
    }
  }), {
    textColorClasses: s,
    textColorStyles: c
  } = $e(h(() => {
    if (!(e.error || e.disabled))
      return r.value ? e.color : e.baseColor;
  })), {
    backgroundColorClasses: v,
    backgroundColorStyles: m
  } = Xe(h(() => r.value && !e.error && !e.disabled ? e.color : e.baseColor)), f = h(() => r.value ? e.trueIcon : e.falseIcon);
  return {
    group: t,
    densityClasses: n,
    trueValue: a,
    falseValue: i,
    model: r,
    textColorClasses: s,
    textColorStyles: c,
    backgroundColorClasses: v,
    backgroundColorStyles: m,
    icon: f
  };
}
const ql = K()({
  name: "VSelectionControl",
  directives: {
    Ripple: hn
  },
  inheritAttrs: !1,
  props: Ya(),
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
      textColorStyles: c,
      backgroundColorClasses: v,
      backgroundColorStyles: m,
      trueValue: f
    } = br(e), d = je(), g = G(!1), y = G(!1), b = H(), S = h(() => e.id || `input-${d}`), A = h(() => !e.disabled && !e.readonly);
    a == null || a.onForceUpdate(() => {
      b.value && (b.value.checked = r.value);
    });
    function E(I) {
      A.value && (g.value = !0, ln(I.target, ":focus-visible") !== !1 && (y.value = !0));
    }
    function _() {
      g.value = !1, y.value = !1;
    }
    function B(I) {
      I.stopPropagation();
    }
    function x(I) {
      if (!A.value) {
        b.value && (b.value.checked = r.value);
        return;
      }
      e.readonly && a && pe(() => a.forceUpdate()), r.value = I.target.checked;
    }
    return ee(() => {
      var P, k;
      const I = l.label ? l.label({
        label: e.label,
        props: {
          for: S.value
        }
      }) : e.label, [V, R] = fa(n), D = u("input", Q({
        ref: b,
        checked: r.value,
        disabled: !!e.disabled,
        id: S.value,
        onBlur: _,
        onFocus: E,
        onInput: x,
        "aria-disabled": !!e.disabled,
        "aria-label": e.label,
        type: e.type,
        value: f.value,
        name: e.name,
        "aria-checked": e.type === "checkbox" ? r.value : void 0
      }, R), null);
      return u("div", Q({
        class: ["v-selection-control", {
          "v-selection-control--dirty": r.value,
          "v-selection-control--disabled": e.disabled,
          "v-selection-control--error": e.error,
          "v-selection-control--focused": g.value,
          "v-selection-control--focus-visible": y.value,
          "v-selection-control--inline": e.inline
        }, i.value, e.class]
      }, V, {
        style: e.style
      }), [u("div", {
        class: ["v-selection-control__wrapper", s.value],
        style: c.value
      }, [(P = l.default) == null ? void 0 : P.call(l, {
        backgroundColorClasses: v,
        backgroundColorStyles: m
      }), Fe(u("div", {
        class: ["v-selection-control__input"]
      }, [((k = l.input) == null ? void 0 : k.call(l, {
        model: r,
        textColorClasses: s,
        textColorStyles: c,
        backgroundColorClasses: v,
        backgroundColorStyles: m,
        inputNode: D,
        icon: o.value,
        props: {
          onFocus: E,
          onBlur: _,
          id: S.value
        }
      })) ?? u(se, null, [o.value && u(fe, {
        key: "icon",
        icon: o.value
      }, null), D])]), [[St("ripple"), e.ripple && [!e.disabled && !e.readonly, null, ["center", "circle"]]]])]), I && u(Ga, {
        for: S.value,
        onClick: B
      }, {
        default: () => [I]
      })]);
    }), {
      isFocused: g,
      input: b
    };
  }
}), Sr = F({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: re,
    default: "$checkboxIndeterminate"
  },
  ...Ya({
    falseIcon: "$checkboxOff",
    trueIcon: "$checkboxOn"
  })
}, "VCheckboxBtn"), Xa = K()({
  name: "VCheckboxBtn",
  props: Sr(),
  emits: {
    "update:modelValue": (e) => !0,
    "update:indeterminate": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const l = ve(e, "indeterminate"), a = ve(e, "modelValue");
    function i(s) {
      l.value && (l.value = !1);
    }
    const o = h(() => l.value ? e.indeterminateIcon : e.falseIcon), r = h(() => l.value ? e.indeterminateIcon : e.trueIcon);
    return ee(() => {
      const s = st(ql.filterProps(e), ["modelValue"]);
      return u(ql, Q(s, {
        modelValue: a.value,
        "onUpdate:modelValue": [(c) => a.value = c, i],
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
function Qa(e) {
  const {
    t
  } = yn();
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
    return u(fe, {
      icon: e[`${a}Icon`],
      "aria-label": r,
      onClick: o
    }, null);
  }
  return {
    InputIcon: n
  };
}
const Cr = F({
  active: Boolean,
  color: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  ...ae(),
  ...xt({
    transition: {
      component: Va,
      leaveAbsolute: !0,
      group: !0
    }
  })
}, "VMessages"), pr = K()({
  name: "VMessages",
  props: Cr(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const l = h(() => ke(e.messages)), {
      textColorClasses: a,
      textColorStyles: i
    } = $e(h(() => e.color));
    return ee(() => u(Ke, {
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
}), Ja = F({
  focused: Boolean,
  "onUpdate:focused": Ve()
}, "focus");
function Za(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ne();
  const n = ve(e, "focused"), l = h(() => ({
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
const wr = Symbol.for("vuetify:form");
function ol() {
  return be(wr, null);
}
const xr = F({
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
  ...Ja()
}, "validation");
function kr(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ne(), n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : je();
  const l = ve(e, "modelValue"), a = h(() => e.validationValue === void 0 ? l.value : e.validationValue), i = ol(), o = H([]), r = G(!0), s = h(() => !!(ke(l.value === "" ? null : l.value).length || ke(a.value === "" ? null : a.value).length)), c = h(() => !!(e.disabled ?? (i == null ? void 0 : i.isDisabled.value))), v = h(() => !!(e.readonly ?? (i == null ? void 0 : i.isReadonly.value))), m = h(() => {
    var B;
    return (B = e.errorMessages) != null && B.length ? ke(e.errorMessages).concat(o.value).slice(0, Math.max(0, +e.maxErrors)) : o.value;
  }), f = h(() => {
    let B = (e.validateOn ?? (i == null ? void 0 : i.validateOn.value)) || "input";
    B === "lazy" && (B = "input lazy"), B === "eager" && (B = "input eager");
    const x = new Set((B == null ? void 0 : B.split(" ")) ?? []);
    return {
      input: x.has("input"),
      blur: x.has("blur") || x.has("input") || x.has("invalid-input"),
      invalidInput: x.has("invalid-input"),
      lazy: x.has("lazy"),
      eager: x.has("eager")
    };
  }), d = h(() => {
    var B;
    return e.error || (B = e.errorMessages) != null && B.length ? !1 : e.rules.length ? r.value ? o.value.length || f.value.lazy ? null : !0 : !o.value.length : !0;
  }), g = G(!1), y = h(() => ({
    [`${t}--error`]: d.value === !1,
    [`${t}--dirty`]: s.value,
    [`${t}--disabled`]: c.value,
    [`${t}--readonly`]: v.value
  })), b = ge("validation"), S = h(() => e.name ?? xe(n));
  ia(() => {
    i == null || i.register({
      id: S.value,
      vm: b,
      validate: _,
      reset: A,
      resetValidation: E
    });
  }), De(() => {
    i == null || i.unregister(S.value);
  }), pt(async () => {
    f.value.lazy || await _(!f.value.eager), i == null || i.update(S.value, d.value, m.value);
  }), rt(() => f.value.input || f.value.invalidInput && d.value === !1, () => {
    U(a, () => {
      if (a.value != null)
        _();
      else if (e.focused) {
        const B = U(() => e.focused, (x) => {
          x || _(), B();
        });
      }
    });
  }), rt(() => f.value.blur, () => {
    U(() => e.focused, (B) => {
      B || _();
    });
  }), U([d, m], () => {
    i == null || i.update(S.value, d.value, m.value);
  });
  async function A() {
    l.value = null, await pe(), await E();
  }
  async function E() {
    r.value = !0, f.value.lazy ? o.value = [] : await _(!f.value.eager);
  }
  async function _() {
    let B = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
    const x = [];
    g.value = !0;
    for (const I of e.rules) {
      if (x.length >= +(e.maxErrors ?? 1))
        break;
      const R = await (typeof I == "function" ? I : () => I)(a.value);
      if (R !== !0) {
        if (R !== !1 && typeof R != "string") {
          console.warn(`${R} is not a valid value. Rule functions must return boolean true or a string.`);
          continue;
        }
        x.push(R || "");
      }
    }
    return o.value = x, g.value = !1, r.value = B, o.value;
  }
  return {
    errorMessages: m,
    isDirty: s,
    isDisabled: c,
    isReadonly: v,
    isPristine: r,
    isValid: d,
    isValidating: g,
    reset: A,
    resetValidation: E,
    validate: _,
    validationClasses: y
  };
}
const ei = F({
  id: String,
  appendIcon: re,
  centerAffix: {
    type: Boolean,
    default: !0
  },
  prependIcon: re,
  hideDetails: [Boolean, String],
  hideSpinButtons: Boolean,
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
  "onClick:prepend": Ve(),
  "onClick:append": Ve(),
  ...ae(),
  ...Qe(),
  ...Yi(ut(), ["maxWidth", "minWidth", "width"]),
  ...Se(),
  ...xr()
}, "VInput"), Wl = K()({
  name: "VInput",
  props: {
    ...ei()
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
    } = Je(e), {
      dimensionStyles: o
    } = ct(e), {
      themeClasses: r
    } = Ae(e), {
      rtlClasses: s
    } = Ze(), {
      InputIcon: c
    } = Qa(e), v = je(), m = h(() => e.id || `input-${v}`), f = h(() => `${m.value}-messages`), {
      errorMessages: d,
      isDirty: g,
      isDisabled: y,
      isReadonly: b,
      isPristine: S,
      isValid: A,
      isValidating: E,
      reset: _,
      resetValidation: B,
      validate: x,
      validationClasses: I
    } = kr(e, "v-input", m), V = h(() => ({
      id: m,
      messagesId: f,
      isDirty: g,
      isDisabled: y,
      isReadonly: b,
      isPristine: S,
      isValid: A,
      isValidating: E,
      reset: _,
      resetValidation: B,
      validate: x
    })), R = h(() => {
      var D;
      return (D = e.errorMessages) != null && D.length || !S.value && d.value.length ? d.value : e.hint && (e.persistentHint || e.focused) ? e.hint : e.messages;
    });
    return ee(() => {
      var L, M, q, Z;
      const D = !!(l.prepend || e.prependIcon), P = !!(l.append || e.appendIcon), k = R.value.length > 0, O = !e.hideDetails || e.hideDetails === "auto" && (k || !!l.details);
      return u("div", {
        class: ["v-input", `v-input--${e.direction}`, {
          "v-input--center-affix": e.centerAffix,
          "v-input--hide-spin-buttons": e.hideSpinButtons
        }, i.value, r.value, s.value, I.value, e.class],
        style: [o.value, e.style]
      }, [D && u("div", {
        key: "prepend",
        class: "v-input__prepend"
      }, [(L = l.prepend) == null ? void 0 : L.call(l, V.value), e.prependIcon && u(c, {
        key: "prepend-icon",
        name: "prepend"
      }, null)]), l.default && u("div", {
        class: "v-input__control"
      }, [(M = l.default) == null ? void 0 : M.call(l, V.value)]), P && u("div", {
        key: "append",
        class: "v-input__append"
      }, [e.appendIcon && u(c, {
        key: "append-icon",
        name: "append"
      }, null), (q = l.append) == null ? void 0 : q.call(l, V.value)]), O && u("div", {
        class: "v-input__details"
      }, [u(pr, {
        id: f.value,
        active: k,
        messages: R.value
      }, {
        message: l.message
      }), (Z = l.details) == null ? void 0 : Z.call(l, V.value)])]);
    }), {
      reset: _,
      resetValidation: B,
      validate: x,
      isValid: A,
      errorMessages: d
    };
  }
}), Rn = Symbol.for("vuetify:list");
function ti() {
  const e = be(Rn, {
    hasPrepend: G(!1),
    updateHasPrepend: () => null
  }), t = {
    hasPrepend: G(!1),
    updateHasPrepend: (n) => {
      n && (t.hasPrepend.value = n);
    }
  };
  return Re(Rn, t), e;
}
function ni() {
  return be(Rn, null);
}
const rl = (e) => {
  const t = {
    activate: (n) => {
      let {
        id: l,
        value: a,
        activated: i
      } = n;
      return l = ue(l), e && !a && i.size === 1 && i.has(l) || (a ? i.add(l) : i.delete(l)), i;
    },
    in: (n, l, a) => {
      let i = /* @__PURE__ */ new Set();
      if (n != null)
        for (const o of ke(n))
          i = t.activate({
            id: o,
            value: !0,
            activated: new Set(i),
            children: l,
            parents: a
          });
      return i;
    },
    out: (n) => Array.from(n)
  };
  return t;
}, li = (e) => {
  const t = rl(e);
  return {
    activate: (l) => {
      let {
        activated: a,
        id: i,
        ...o
      } = l;
      i = ue(i);
      const r = a.has(i) ? /* @__PURE__ */ new Set([i]) : /* @__PURE__ */ new Set();
      return t.activate({
        ...o,
        id: i,
        activated: r
      });
    },
    in: (l, a, i) => {
      let o = /* @__PURE__ */ new Set();
      if (l != null) {
        const r = ke(l);
        r.length && (o = t.in(r.slice(0, 1), a, i));
      }
      return o;
    },
    out: (l, a, i) => t.out(l, a, i)
  };
}, Vr = (e) => {
  const t = rl(e);
  return {
    activate: (l) => {
      let {
        id: a,
        activated: i,
        children: o,
        ...r
      } = l;
      return a = ue(a), o.has(a) ? i : t.activate({
        id: a,
        activated: i,
        children: o,
        ...r
      });
    },
    in: t.in,
    out: t.out
  };
}, Ir = (e) => {
  const t = li(e);
  return {
    activate: (l) => {
      let {
        id: a,
        activated: i,
        children: o,
        ...r
      } = l;
      return a = ue(a), o.has(a) ? i : t.activate({
        id: a,
        activated: i,
        children: o,
        ...r
      });
    },
    in: t.in,
    out: t.out
  };
}, _r = {
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
}, ai = {
  open: (e) => {
    let {
      id: t,
      value: n,
      opened: l,
      parents: a
    } = e;
    if (n) {
      let i = ue(a.get(t));
      for (l.add(t); i != null && i !== t; )
        l.add(i), i = ue(a.get(i));
      return l;
    } else
      l.delete(t);
    return l;
  },
  select: () => null
}, Ar = {
  open: ai.open,
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
}, sl = (e) => {
  const t = {
    select: (n) => {
      let {
        id: l,
        value: a,
        selected: i
      } = n;
      if (l = ue(l), e && !a) {
        const o = Array.from(i.entries()).reduce((r, s) => {
          let [c, v] = s;
          return v === "on" && r.push(c), r;
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
}, ii = (e) => {
  const t = sl(e);
  return {
    select: (l) => {
      let {
        selected: a,
        id: i,
        ...o
      } = l;
      i = ue(i);
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
}, Pr = (e) => {
  const t = sl(e);
  return {
    select: (l) => {
      let {
        id: a,
        selected: i,
        children: o,
        ...r
      } = l;
      return a = ue(a), o.has(a) ? i : t.select({
        id: a,
        selected: i,
        children: o,
        ...r
      });
    },
    in: t.in,
    out: t.out
  };
}, Er = (e) => {
  const t = ii(e);
  return {
    select: (l) => {
      let {
        id: a,
        selected: i,
        children: o,
        ...r
      } = l;
      return a = ue(a), o.has(a) ? i : t.select({
        id: a,
        selected: i,
        children: o,
        ...r
      });
    },
    in: t.in,
    out: t.out
  };
}, Or = (e) => {
  const t = {
    select: (n) => {
      let {
        id: l,
        value: a,
        selected: i,
        children: o,
        parents: r
      } = n;
      l = ue(l);
      const s = new Map(i), c = [l];
      for (; c.length; ) {
        const m = c.shift();
        i.set(ue(m), a ? "on" : "off"), o.has(m) && c.push(...o.get(m));
      }
      let v = ue(r.get(l));
      for (; v; ) {
        const m = o.get(v), f = m.every((g) => i.get(ue(g)) === "on"), d = m.every((g) => !i.has(ue(g)) || i.get(ue(g)) === "off");
        i.set(v, f ? "on" : d ? "off" : "indeterminate"), v = ue(r.get(v));
      }
      return e && !a && Array.from(i.entries()).reduce((f, d) => {
        let [g, y] = d;
        return y === "on" && f.push(g), f;
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
}, Rt = Symbol.for("vuetify:nested"), oi = {
  id: G(),
  root: {
    register: () => null,
    unregister: () => null,
    parents: H(/* @__PURE__ */ new Map()),
    children: H(/* @__PURE__ */ new Map()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: H(!1),
    selectable: H(!1),
    opened: H(/* @__PURE__ */ new Set()),
    activated: H(/* @__PURE__ */ new Set()),
    selected: H(/* @__PURE__ */ new Map()),
    selectedValues: H([])
  }
}, Br = F({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function, Object],
  selectStrategy: [String, Function, Object],
  openStrategy: [String, Object],
  opened: null,
  activated: null,
  selected: null,
  mandatory: Boolean
}, "nested"), Tr = (e) => {
  let t = !1;
  const n = H(/* @__PURE__ */ new Map()), l = H(/* @__PURE__ */ new Map()), a = ve(e, "opened", e.opened, (d) => new Set(ue(d)), (d) => [...d.values()]), i = h(() => {
    if (typeof e.activeStrategy == "object")
      return e.activeStrategy;
    if (typeof e.activeStrategy == "function")
      return e.activeStrategy(e.mandatory);
    switch (e.activeStrategy) {
      case "leaf":
        return Vr(e.mandatory);
      case "single-leaf":
        return Ir(e.mandatory);
      case "independent":
        return rl(e.mandatory);
      case "single-independent":
      default:
        return li(e.mandatory);
    }
  }), o = h(() => {
    if (typeof e.selectStrategy == "object")
      return e.selectStrategy;
    if (typeof e.selectStrategy == "function")
      return e.selectStrategy(e.mandatory);
    switch (e.selectStrategy) {
      case "single-leaf":
        return Er(e.mandatory);
      case "leaf":
        return Pr(e.mandatory);
      case "independent":
        return sl(e.mandatory);
      case "single-independent":
        return ii(e.mandatory);
      case "classic":
      default:
        return Or(e.mandatory);
    }
  }), r = h(() => {
    if (typeof e.openStrategy == "object")
      return e.openStrategy;
    switch (e.openStrategy) {
      case "list":
        return Ar;
      case "single":
        return _r;
      case "multiple":
      default:
        return ai;
    }
  }), s = ve(e, "activated", e.activated, (d) => i.value.in(d, n.value, l.value), (d) => i.value.out(d, n.value, l.value)), c = ve(e, "selected", e.selected, (d) => o.value.in(d, n.value, l.value), (d) => o.value.out(d, n.value, l.value));
  De(() => {
    t = !0;
  });
  function v(d) {
    const g = [];
    let y = d;
    for (; y != null; )
      g.unshift(y), y = l.value.get(y);
    return g;
  }
  const m = ge("nested"), f = {
    id: G(),
    root: {
      opened: a,
      activatable: z(e, "activatable"),
      selectable: z(e, "selectable"),
      activated: s,
      selected: c,
      selectedValues: h(() => {
        const d = [];
        for (const [g, y] of c.value.entries())
          y === "on" && d.push(g);
        return d;
      }),
      register: (d, g, y) => {
        g && d !== g && l.value.set(d, g), y && n.value.set(d, []), g != null && n.value.set(g, [...n.value.get(g) || [], d]);
      },
      unregister: (d) => {
        if (t)
          return;
        n.value.delete(d);
        const g = l.value.get(d);
        if (g) {
          const y = n.value.get(g) ?? [];
          n.value.set(g, y.filter((b) => b !== d));
        }
        l.value.delete(d);
      },
      open: (d, g, y) => {
        m.emit("click:open", {
          id: d,
          value: g,
          path: v(d),
          event: y
        });
        const b = r.value.open({
          id: d,
          value: g,
          opened: new Set(a.value),
          children: n.value,
          parents: l.value,
          event: y
        });
        b && (a.value = b);
      },
      openOnSelect: (d, g, y) => {
        const b = r.value.select({
          id: d,
          value: g,
          selected: new Map(c.value),
          opened: new Set(a.value),
          children: n.value,
          parents: l.value,
          event: y
        });
        b && (a.value = b);
      },
      select: (d, g, y) => {
        m.emit("click:select", {
          id: d,
          value: g,
          path: v(d),
          event: y
        });
        const b = o.value.select({
          id: d,
          value: g,
          selected: new Map(c.value),
          children: n.value,
          parents: l.value,
          event: y
        });
        b && (c.value = b), f.root.openOnSelect(d, g, y);
      },
      activate: (d, g, y) => {
        if (!e.activatable)
          return f.root.select(d, !0, y);
        m.emit("click:activate", {
          id: d,
          value: g,
          path: v(d),
          event: y
        });
        const b = i.value.activate({
          id: d,
          value: g,
          activated: new Set(s.value),
          children: n.value,
          parents: l.value,
          event: y
        });
        b && (s.value = b);
      },
      children: n,
      parents: l
    }
  };
  return Re(Rt, f), f.root;
}, ri = (e, t) => {
  const n = be(Rt, oi), l = Symbol(je()), a = h(() => e.value !== void 0 ? e.value : l), i = {
    ...n,
    id: a,
    open: (o, r) => n.root.open(ue(a.value), o, r),
    openOnSelect: (o, r) => n.root.openOnSelect(a.value, o, r),
    isOpen: h(() => n.root.opened.value.has(ue(a.value))),
    parent: h(() => n.root.parents.value.get(a.value)),
    activate: (o, r) => n.root.activate(a.value, o, r),
    isActivated: h(() => n.root.activated.value.has(ue(a.value))),
    select: (o, r) => n.root.select(a.value, o, r),
    isSelected: h(() => n.root.selected.value.get(ue(a.value)) === "on"),
    isIndeterminate: h(() => n.root.selected.value.get(a.value) === "indeterminate"),
    isLeaf: h(() => !n.root.children.value.get(a.value)),
    isGroupActivator: n.isGroupActivator
  };
  return !n.isGroupActivator && n.root.register(a.value, n.id.value, t), De(() => {
    !n.isGroupActivator && n.root.unregister(a.value);
  }), t && Re(Rt, i), i;
}, Lr = () => {
  const e = be(Rt, oi);
  Re(Rt, {
    ...e,
    isGroupActivator: !0
  });
};
function Fr() {
  const e = G(!1);
  return pt(() => {
    window.requestAnimationFrame(() => {
      e.value = !0;
    });
  }), {
    ssrBootStyles: h(() => e.value ? void 0 : {
      transition: "none !important"
    }),
    isBooted: qn(e)
  };
}
const Rr = $t({
  name: "VListGroupActivator",
  setup(e, t) {
    let {
      slots: n
    } = t;
    return Lr(), () => {
      var l;
      return (l = n.default) == null ? void 0 : l.call(n);
    };
  }
}), Mr = F({
  /* @deprecated */
  activeColor: String,
  baseColor: String,
  color: String,
  collapseIcon: {
    type: re,
    default: "$collapse"
  },
  expandIcon: {
    type: re,
    default: "$expand"
  },
  prependIcon: re,
  appendIcon: re,
  fluid: Boolean,
  subgroup: Boolean,
  title: String,
  value: null,
  ...ae(),
  ..._e()
}, "VListGroup"), Gl = K()({
  name: "VListGroup",
  props: Mr(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      isOpen: l,
      open: a,
      id: i
    } = ri(z(e, "value"), !0), o = h(() => `v-list-group--id-${String(i.value)}`), r = ni(), {
      isBooted: s
    } = Fr();
    function c(d) {
      d.stopPropagation(), a(!l.value, d);
    }
    const v = h(() => ({
      onClick: c,
      class: "v-list-group__header",
      id: o.value
    })), m = h(() => l.value ? e.collapseIcon : e.expandIcon), f = h(() => ({
      VListItem: {
        active: l.value,
        activeColor: e.activeColor,
        baseColor: e.baseColor,
        color: e.color,
        prependIcon: e.prependIcon || e.subgroup && m.value,
        appendIcon: e.appendIcon || !e.subgroup && m.value,
        title: e.title,
        value: e.value
      }
    }));
    return ee(() => u(e.tag, {
      class: ["v-list-group", {
        "v-list-group--prepend": r == null ? void 0 : r.hasPrepend.value,
        "v-list-group--fluid": e.fluid,
        "v-list-group--subgroup": e.subgroup,
        "v-list-group--open": l.value
      }, e.class],
      style: e.style
    }, {
      default: () => [n.activator && u(Ce, {
        defaults: f.value
      }, {
        default: () => [u(Rr, null, {
          default: () => [n.activator({
            props: v.value,
            isOpen: l.value
          })]
        })]
      }), u(Ke, {
        transition: {
          component: To
        },
        disabled: !s.value
      }, {
        default: () => {
          var d;
          return [Fe(u("div", {
            class: "v-list-group__items",
            role: "group",
            "aria-labelledby": o.value
          }, [(d = n.default) == null ? void 0 : d.call(n)]), [[Ct, l.value]])];
        }
      })]
    })), {
      isOpen: l
    };
  }
}), $r = F({
  opacity: [Number, String],
  ...ae(),
  ..._e()
}, "VListItemSubtitle"), Dr = K()({
  name: "VListItemSubtitle",
  props: $r(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ee(() => u(e.tag, {
      class: ["v-list-item-subtitle", e.class],
      style: [{
        "--v-list-item-subtitle-opacity": e.opacity
      }, e.style]
    }, n)), {};
  }
}), Nr = Io("v-list-item-title"), zr = F({
  active: {
    type: Boolean,
    default: void 0
  },
  activeClass: String,
  /* @deprecated */
  activeColor: String,
  appendAvatar: String,
  appendIcon: re,
  baseColor: String,
  disabled: Boolean,
  lines: [Boolean, String],
  link: {
    type: Boolean,
    default: void 0
  },
  nav: Boolean,
  prependAvatar: String,
  prependIcon: re,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  slim: Boolean,
  subtitle: [String, Number],
  title: [String, Number],
  value: null,
  onClick: Ve(),
  onClickOnce: Ve(),
  ...kt(),
  ...ae(),
  ...Qe(),
  ...ut(),
  ...zt(),
  ...qe(),
  ...al(),
  ..._e(),
  ...Se(),
  ...dt({
    variant: "text"
  })
}, "VListItem"), bt = K()({
  name: "VListItem",
  directives: {
    Ripple: hn
  },
  props: zr(),
  emits: {
    click: (e) => !0
  },
  setup(e, t) {
    let {
      attrs: n,
      slots: l,
      emit: a
    } = t;
    const i = ll(e, n), o = h(() => e.value === void 0 ? i.href.value : e.value), {
      activate: r,
      isActivated: s,
      select: c,
      isOpen: v,
      isSelected: m,
      isIndeterminate: f,
      isGroupActivator: d,
      root: g,
      parent: y,
      openOnSelect: b
    } = ri(o, !1), S = ni(), A = h(() => {
      var w;
      return e.active !== !1 && (e.active || ((w = i.isActive) == null ? void 0 : w.value) || (g.activatable.value ? s.value : m.value));
    }), E = h(() => e.link !== !1 && i.isLink.value), _ = h(() => !e.disabled && e.link !== !1 && (e.link || i.isClickable.value || !!S && (g.selectable.value || g.activatable.value || e.value != null))), B = h(() => e.rounded || e.nav), x = h(() => e.color ?? e.activeColor), I = h(() => ({
      color: A.value ? x.value ?? e.baseColor : e.baseColor,
      variant: e.variant
    }));
    U(() => {
      var w;
      return (w = i.isActive) == null ? void 0 : w.value;
    }, (w) => {
      w && y.value != null && g.open(y.value, !0), w && b(w);
    }, {
      immediate: !0
    });
    const {
      themeClasses: V
    } = Ae(e), {
      borderClasses: R
    } = Vt(e), {
      colorClasses: D,
      colorStyles: P,
      variantClasses: k
    } = gn(I), {
      densityClasses: O
    } = Je(e), {
      dimensionStyles: L
    } = ct(e), {
      elevationClasses: M
    } = Ht(e), {
      roundedClasses: q
    } = We(B), Z = h(() => e.lines ? `v-list-item--${e.lines}-line` : void 0), W = h(() => ({
      isActive: A.value,
      select: c,
      isOpen: v.value,
      isSelected: m.value,
      isIndeterminate: f.value
    }));
    function C(w) {
      var $;
      a("click", w), _.value && (($ = i.navigate) == null || $.call(i, w), !d && (g.activatable.value ? r(!s.value, w) : (g.selectable.value || e.value != null) && c(!m.value, w)));
    }
    function p(w) {
      (w.key === "Enter" || w.key === " ") && (w.preventDefault(), w.target.dispatchEvent(new MouseEvent("click", w)));
    }
    return ee(() => {
      const w = E.value ? "a" : e.tag, $ = l.title || e.title != null, ne = l.subtitle || e.subtitle != null, j = !!(e.appendAvatar || e.appendIcon), ie = !!(j || l.append), N = !!(e.prependAvatar || e.prependIcon), le = !!(N || l.prepend);
      return S == null || S.updateHasPrepend(le), e.activeColor && ho("active-color", ["color", "base-color"]), Fe(u(w, {
        class: ["v-list-item", {
          "v-list-item--active": A.value,
          "v-list-item--disabled": e.disabled,
          "v-list-item--link": _.value,
          "v-list-item--nav": e.nav,
          "v-list-item--prepend": !le && (S == null ? void 0 : S.hasPrepend.value),
          "v-list-item--slim": e.slim,
          [`${e.activeClass}`]: e.activeClass && A.value
        }, V.value, R.value, D.value, O.value, M.value, Z.value, q.value, k.value, e.class],
        style: [P.value, L.value, e.style],
        href: i.href.value,
        tabindex: _.value ? S ? -2 : 0 : void 0,
        onClick: C,
        onKeydown: _.value && !E.value && p
      }, {
        default: () => {
          var te;
          return [mn(_.value || A.value, "v-list-item"), le && u("div", {
            key: "prepend",
            class: "v-list-item__prepend"
          }, [l.prepend ? u(Ce, {
            key: "prepend-defaults",
            disabled: !N,
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
              var ce;
              return [(ce = l.prepend) == null ? void 0 : ce.call(l, W.value)];
            }
          }) : u(se, null, [e.prependAvatar && u(ht, {
            key: "prepend-avatar",
            density: e.density,
            image: e.prependAvatar
          }, null), e.prependIcon && u(fe, {
            key: "prepend-icon",
            density: e.density,
            icon: e.prependIcon
          }, null)]), u("div", {
            class: "v-list-item__spacer"
          }, null)]), u("div", {
            class: "v-list-item__content",
            "data-no-activator": ""
          }, [$ && u(Nr, {
            key: "title"
          }, {
            default: () => {
              var ce;
              return [((ce = l.title) == null ? void 0 : ce.call(l, {
                title: e.title
              })) ?? e.title];
            }
          }), ne && u(Dr, {
            key: "subtitle"
          }, {
            default: () => {
              var ce;
              return [((ce = l.subtitle) == null ? void 0 : ce.call(l, {
                subtitle: e.subtitle
              })) ?? e.subtitle];
            }
          }), (te = l.default) == null ? void 0 : te.call(l, W.value)]), ie && u("div", {
            key: "append",
            class: "v-list-item__append"
          }, [l.append ? u(Ce, {
            key: "append-defaults",
            disabled: !j,
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
              var ce;
              return [(ce = l.append) == null ? void 0 : ce.call(l, W.value)];
            }
          }) : u(se, null, [e.appendIcon && u(fe, {
            key: "append-icon",
            density: e.density,
            icon: e.appendIcon
          }, null), e.appendAvatar && u(ht, {
            key: "append-avatar",
            density: e.density,
            image: e.appendAvatar
          }, null)]), u("div", {
            class: "v-list-item__spacer"
          }, null)])];
        }
      }), [[St("ripple"), _.value && e.ripple]]);
    }), {
      activate: r,
      isActivated: s,
      isGroupActivator: d,
      isSelected: m,
      list: S,
      select: c
    };
  }
}), Hr = F({
  color: String,
  inset: Boolean,
  sticky: Boolean,
  title: String,
  ...ae(),
  ..._e()
}, "VListSubheader"), jr = K()({
  name: "VListSubheader",
  props: Hr(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      textColorClasses: l,
      textColorStyles: a
    } = $e(z(e, "color"));
    return ee(() => {
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
}), qr = F({
  color: String,
  inset: Boolean,
  length: [Number, String],
  opacity: [Number, String],
  thickness: [Number, String],
  vertical: Boolean,
  ...ae(),
  ...Se()
}, "VDivider"), Wr = K()({
  name: "VDivider",
  props: qr(),
  setup(e, t) {
    let {
      attrs: n,
      slots: l
    } = t;
    const {
      themeClasses: a
    } = Ae(e), {
      textColorClasses: i,
      textColorStyles: o
    } = $e(z(e, "color")), r = h(() => {
      const s = {};
      return e.length && (s[e.vertical ? "height" : "width"] = X(e.length)), e.thickness && (s[e.vertical ? "borderRightWidth" : "borderTopWidth"] = X(e.thickness)), s;
    });
    return ee(() => {
      const s = u("hr", {
        class: [{
          "v-divider": !0,
          "v-divider--inset": e.inset,
          "v-divider--vertical": e.vertical
        }, a.value, i.value, e.class],
        style: [r.value, o.value, {
          "--v-border-opacity": e.opacity
        }, e.style],
        "aria-orientation": !n.role || n.role === "separator" ? e.vertical ? "vertical" : "horizontal" : void 0,
        role: `${n.role || "separator"}`
      }, null);
      return l.default ? u("div", {
        class: ["v-divider__wrapper", {
          "v-divider__wrapper--vertical": e.vertical,
          "v-divider__wrapper--inset": e.inset
        }]
      }, [s, u("div", {
        class: "v-divider__content"
      }, [l.default()]), s]) : s;
    }), {};
  }
}), Gr = F({
  items: Array,
  returnObject: Boolean
}, "VListChildren"), si = K()({
  name: "VListChildren",
  props: Gr(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ti(), () => {
      var l, a;
      return ((l = n.default) == null ? void 0 : l.call(n)) ?? ((a = e.items) == null ? void 0 : a.map((i) => {
        var f, d;
        let {
          children: o,
          props: r,
          type: s,
          raw: c
        } = i;
        if (s === "divider")
          return ((f = n.divider) == null ? void 0 : f.call(n, {
            props: r
          })) ?? u(Wr, r, null);
        if (s === "subheader")
          return ((d = n.subheader) == null ? void 0 : d.call(n, {
            props: r
          })) ?? u(jr, r, null);
        const v = {
          subtitle: n.subtitle ? (g) => {
            var y;
            return (y = n.subtitle) == null ? void 0 : y.call(n, {
              ...g,
              item: c
            });
          } : void 0,
          prepend: n.prepend ? (g) => {
            var y;
            return (y = n.prepend) == null ? void 0 : y.call(n, {
              ...g,
              item: c
            });
          } : void 0,
          append: n.append ? (g) => {
            var y;
            return (y = n.append) == null ? void 0 : y.call(n, {
              ...g,
              item: c
            });
          } : void 0,
          title: n.title ? (g) => {
            var y;
            return (y = n.title) == null ? void 0 : y.call(n, {
              ...g,
              item: c
            });
          } : void 0
        }, m = Gl.filterProps(r);
        return o ? u(Gl, Q({
          value: r == null ? void 0 : r.value
        }, m), {
          activator: (g) => {
            let {
              props: y
            } = g;
            const b = {
              ...r,
              ...y,
              value: e.returnObject ? c : r.value
            };
            return n.header ? n.header({
              props: b
            }) : u(bt, b, v);
          },
          default: () => u(si, {
            items: o,
            returnObject: e.returnObject
          }, n)
        }) : n.item ? n.item({
          props: r
        }) : u(bt, Q(r, {
          value: e.returnObject ? c : r.value
        }), v);
      }));
    };
  }
}), ui = F({
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
    default: wt
  }
}, "list-items");
function Ge(e, t) {
  const n = Me(t, e.itemTitle, t), l = Me(t, e.itemValue, n), a = Me(t, e.itemChildren), i = e.itemProps === !0 ? typeof t == "object" && t != null && !Array.isArray(t) ? "children" in t ? st(t, ["children"]) : t : void 0 : Me(t, e.itemProps), o = {
    title: n,
    value: l,
    ...i
  };
  return {
    title: String(o.title ?? ""),
    value: o.value,
    props: o,
    children: Array.isArray(a) ? ci(e, a) : void 0,
    raw: t
  };
}
function ci(e, t) {
  const n = [];
  for (const l of t)
    n.push(Ge(e, l));
  return n;
}
function di(e) {
  const t = h(() => ci(e, e.items)), n = h(() => t.value.some((i) => i.value === null));
  function l(i) {
    return n.value || (i = i.filter((o) => o !== null)), i.map((o) => e.returnObject && typeof o == "string" ? Ge(e, o) : t.value.find((r) => e.valueComparator(o, r.value)) || Ge(e, o));
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
function Ur(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
function Kr(e, t) {
  const n = Me(t, e.itemType, "item"), l = Ur(t) ? t : Me(t, e.itemTitle), a = Me(t, e.itemValue, void 0), i = Me(t, e.itemChildren), o = e.itemProps === !0 ? st(t, ["children"]) : Me(t, e.itemProps), r = {
    title: l,
    value: a,
    ...o
  };
  return {
    type: n,
    title: r.title,
    value: r.value,
    props: r,
    children: n === "item" && i ? fi(e, i) : void 0,
    raw: t
  };
}
function fi(e, t) {
  const n = [];
  for (const l of t)
    n.push(Kr(e, l));
  return n;
}
function Yr(e) {
  return {
    items: h(() => fi(e, e.items))
  };
}
const Xr = F({
  baseColor: String,
  /* @deprecated */
  activeColor: String,
  activeClass: String,
  bgColor: String,
  disabled: Boolean,
  expandIcon: String,
  collapseIcon: String,
  lines: {
    type: [Boolean, String],
    default: "one"
  },
  slim: Boolean,
  nav: Boolean,
  "onClick:open": Ve(),
  "onClick:select": Ve(),
  "onUpdate:opened": Ve(),
  ...Br({
    selectStrategy: "single-leaf",
    openStrategy: "list"
  }),
  ...kt(),
  ...ae(),
  ...Qe(),
  ...ut(),
  ...zt(),
  itemType: {
    type: String,
    default: "type"
  },
  ...ui(),
  ...qe(),
  ..._e(),
  ...Se(),
  ...dt({
    variant: "text"
  })
}, "VList"), vi = K()({
  name: "VList",
  props: Xr(),
  emits: {
    "update:selected": (e) => !0,
    "update:activated": (e) => !0,
    "update:opened": (e) => !0,
    "click:open": (e) => !0,
    "click:activate": (e) => !0,
    "click:select": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      items: l
    } = Yr(e), {
      themeClasses: a
    } = Ae(e), {
      backgroundColorClasses: i,
      backgroundColorStyles: o
    } = Xe(z(e, "bgColor")), {
      borderClasses: r
    } = Vt(e), {
      densityClasses: s
    } = Je(e), {
      dimensionStyles: c
    } = ct(e), {
      elevationClasses: v
    } = Ht(e), {
      roundedClasses: m
    } = We(e), {
      children: f,
      open: d,
      parents: g,
      select: y
    } = Tr(e), b = h(() => e.lines ? `v-list--${e.lines}-line` : void 0), S = z(e, "activeColor"), A = z(e, "baseColor"), E = z(e, "color");
    ti(), Mt({
      VListGroup: {
        activeColor: S,
        baseColor: A,
        color: E,
        expandIcon: z(e, "expandIcon"),
        collapseIcon: z(e, "collapseIcon")
      },
      VListItem: {
        activeClass: z(e, "activeClass"),
        activeColor: S,
        baseColor: A,
        color: E,
        density: z(e, "density"),
        disabled: z(e, "disabled"),
        lines: z(e, "lines"),
        nav: z(e, "nav"),
        slim: z(e, "slim"),
        variant: z(e, "variant")
      }
    });
    const _ = G(!1), B = H();
    function x(k) {
      _.value = !0;
    }
    function I(k) {
      _.value = !1;
    }
    function V(k) {
      var O;
      !_.value && !(k.relatedTarget && ((O = B.value) != null && O.contains(k.relatedTarget))) && P();
    }
    function R(k) {
      const O = k.target;
      if (!(!B.value || ["INPUT", "TEXTAREA"].includes(O.tagName))) {
        if (k.key === "ArrowDown")
          P("next");
        else if (k.key === "ArrowUp")
          P("prev");
        else if (k.key === "Home")
          P("first");
        else if (k.key === "End")
          P("last");
        else
          return;
        k.preventDefault();
      }
    }
    function D(k) {
      _.value = !0;
    }
    function P(k) {
      if (B.value)
        return Et(B.value, k);
    }
    return ee(() => u(e.tag, {
      ref: B,
      class: ["v-list", {
        "v-list--disabled": e.disabled,
        "v-list--nav": e.nav,
        "v-list--slim": e.slim
      }, a.value, i.value, r.value, s.value, v.value, b.value, m.value, e.class],
      style: [o.value, c.value, e.style],
      tabindex: e.disabled || _.value ? -1 : 0,
      role: "listbox",
      "aria-activedescendant": void 0,
      onFocusin: x,
      onFocusout: I,
      onFocus: V,
      onKeydown: R,
      onMousedown: D
    }, {
      default: () => [u(si, {
        items: l.value,
        returnObject: e.returnObject
      }, n)]
    })), {
      open: d,
      select: y,
      focus: P,
      children: f,
      parents: g
    };
  }
});
function kn(e, t) {
  return {
    x: e.x + t.x,
    y: e.y + t.y
  };
}
function Qr(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y
  };
}
function Ul(e, t) {
  if (e.side === "top" || e.side === "bottom") {
    const {
      side: n,
      align: l
    } = e, a = l === "left" ? 0 : l === "center" ? t.width / 2 : l === "right" ? t.width : l, i = n === "top" ? 0 : n === "bottom" ? t.height : n;
    return kn({
      x: a,
      y: i
    }, t);
  } else if (e.side === "left" || e.side === "right") {
    const {
      side: n,
      align: l
    } = e, a = n === "left" ? 0 : n === "right" ? t.width : n, i = l === "top" ? 0 : l === "center" ? t.height / 2 : l === "bottom" ? t.height : l;
    return kn({
      x: a,
      y: i
    }, t);
  }
  return kn({
    x: t.width / 2,
    y: t.height / 2
  }, t);
}
const mi = {
  static: es,
  // specific viewport position, usually centered
  connected: ns
  // connected to a certain element
}, Jr = F({
  locationStrategy: {
    type: [String, Function],
    default: "static",
    validator: (e) => typeof e == "function" || e in mi
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
function Zr(e, t) {
  const n = H({}), l = H();
  me && rt(() => !!(t.isActive.value && e.locationStrategy), (i) => {
    var o, r;
    U(() => e.locationStrategy, i), Ie(() => {
      window.removeEventListener("resize", a), l.value = void 0;
    }), window.addEventListener("resize", a, {
      passive: !0
    }), typeof e.locationStrategy == "function" ? l.value = (o = e.locationStrategy(t, e, n)) == null ? void 0 : o.updateLocation : l.value = (r = mi[e.locationStrategy](t, e, n)) == null ? void 0 : r.updateLocation;
  });
  function a(i) {
    var o;
    (o = l.value) == null || o.call(l, i);
  }
  return {
    contentStyles: n,
    updateLocation: l
  };
}
function es() {
}
function ts(e, t) {
  const n = Yn(e);
  return t ? n.x += parseFloat(e.style.right || 0) : n.x -= parseFloat(e.style.left || 0), n.y -= parseFloat(e.style.top || 0), n;
}
function ns(e, t, n) {
  (Array.isArray(e.target.value) || Eo(e.target.value)) && Object.assign(n.value, {
    position: "fixed",
    top: 0,
    [e.isRtl.value ? "right" : "left"]: 0
  });
  const {
    preferredAnchor: a,
    preferredOrigin: i
  } = Un(() => {
    const g = Bn(t.location, e.isRtl.value), y = t.origin === "overlap" ? g : t.origin === "auto" ? Cn(g) : Bn(t.origin, e.isRtl.value);
    return g.side === y.side && g.align === pn(y).align ? {
      preferredAnchor: Cl(g),
      preferredOrigin: Cl(y)
    } : {
      preferredAnchor: g,
      preferredOrigin: y
    };
  }), [o, r, s, c] = ["minWidth", "minHeight", "maxWidth", "maxHeight"].map((g) => h(() => {
    const y = parseFloat(t[g]);
    return isNaN(y) ? 1 / 0 : y;
  })), v = h(() => {
    if (Array.isArray(t.offset))
      return t.offset;
    if (typeof t.offset == "string") {
      const g = t.offset.split(" ").map(parseFloat);
      return g.length < 2 && g.push(0), g;
    }
    return typeof t.offset == "number" ? [t.offset, 0] : [0, 0];
  });
  let m = !1;
  const f = new ResizeObserver(() => {
    m && d();
  });
  U([e.target, e.contentEl], (g, y) => {
    let [b, S] = g, [A, E] = y;
    A && !Array.isArray(A) && f.unobserve(A), b && !Array.isArray(b) && f.observe(b), E && f.unobserve(E), S && f.observe(S);
  }, {
    immediate: !0
  }), Ie(() => {
    f.disconnect();
  });
  function d() {
    if (m = !1, requestAnimationFrame(() => m = !0), !e.target.value || !e.contentEl.value)
      return;
    const g = ha(e.target.value), y = ts(e.contentEl.value, e.isRtl.value), b = rn(e.contentEl.value), S = 12;
    b.length || (b.push(document.documentElement), e.contentEl.value.style.top && e.contentEl.value.style.left || (y.x -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x") || 0), y.y -= parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y") || 0)));
    const A = b.reduce((P, k) => {
      const O = k.getBoundingClientRect(), L = new lt({
        x: k === document.documentElement ? 0 : O.x,
        y: k === document.documentElement ? 0 : O.y,
        width: k.clientWidth,
        height: k.clientHeight
      });
      return P ? new lt({
        x: Math.max(P.left, L.left),
        y: Math.max(P.top, L.top),
        width: Math.min(P.right, L.right) - Math.max(P.left, L.left),
        height: Math.min(P.bottom, L.bottom) - Math.max(P.top, L.top)
      }) : L;
    }, void 0);
    A.x += S, A.y += S, A.width -= S * 2, A.height -= S * 2;
    let E = {
      anchor: a.value,
      origin: i.value
    };
    function _(P) {
      const k = new lt(y), O = Ul(P.anchor, g), L = Ul(P.origin, k);
      let {
        x: M,
        y: q
      } = Qr(O, L);
      switch (P.anchor.side) {
        case "top":
          q -= v.value[0];
          break;
        case "bottom":
          q += v.value[0];
          break;
        case "left":
          M -= v.value[0];
          break;
        case "right":
          M += v.value[0];
          break;
      }
      switch (P.anchor.align) {
        case "top":
          q -= v.value[1];
          break;
        case "bottom":
          q += v.value[1];
          break;
        case "left":
          M -= v.value[1];
          break;
        case "right":
          M += v.value[1];
          break;
      }
      return k.x += M, k.y += q, k.width = Math.min(k.width, s.value), k.height = Math.min(k.height, c.value), {
        overflows: wl(k, A),
        x: M,
        y: q
      };
    }
    let B = 0, x = 0;
    const I = {
      x: 0,
      y: 0
    }, V = {
      x: !1,
      y: !1
    };
    let R = -1;
    for (; ; ) {
      if (R++ > 10) {
        yo("Infinite loop detected in connectedLocationStrategy");
        break;
      }
      const {
        x: P,
        y: k,
        overflows: O
      } = _(E);
      B += P, x += k, y.x += P, y.y += k;
      {
        const L = pl(E.anchor), M = O.x.before || O.x.after, q = O.y.before || O.y.after;
        let Z = !1;
        if (["x", "y"].forEach((W) => {
          if (W === "x" && M && !V.x || W === "y" && q && !V.y) {
            const C = {
              anchor: {
                ...E.anchor
              },
              origin: {
                ...E.origin
              }
            }, p = W === "x" ? L === "y" ? pn : Cn : L === "y" ? Cn : pn;
            C.anchor = p(C.anchor), C.origin = p(C.origin);
            const {
              overflows: w
            } = _(C);
            (w[W].before <= O[W].before && w[W].after <= O[W].after || w[W].before + w[W].after < (O[W].before + O[W].after) / 2) && (E = C, Z = V[W] = !0);
          }
        }), Z)
          continue;
      }
      O.x.before && (B += O.x.before, y.x += O.x.before), O.x.after && (B -= O.x.after, y.x -= O.x.after), O.y.before && (x += O.y.before, y.y += O.y.before), O.y.after && (x -= O.y.after, y.y -= O.y.after);
      {
        const L = wl(y, A);
        I.x = A.width - L.x.before - L.x.after, I.y = A.height - L.y.before - L.y.after, B += L.x.before, y.x += L.x.before, x += L.y.before, y.y += L.y.before;
      }
      break;
    }
    const D = pl(E.anchor);
    return Object.assign(n.value, {
      "--v-overlay-anchor-origin": `${E.anchor.side} ${E.anchor.align}`,
      transformOrigin: `${E.origin.side} ${E.origin.align}`,
      // transform: `translate(${pixelRound(x)}px, ${pixelRound(y)}px)`,
      top: X(Vn(x)),
      left: e.isRtl.value ? void 0 : X(Vn(B)),
      right: e.isRtl.value ? X(Vn(-B)) : void 0,
      minWidth: X(D === "y" ? Math.min(o.value, g.width) : o.value),
      maxWidth: X(Kl(Ye(I.x, o.value === 1 / 0 ? 0 : o.value, s.value))),
      maxHeight: X(Kl(Ye(I.y, r.value === 1 / 0 ? 0 : r.value, c.value)))
    }), {
      available: I,
      contentBox: y
    };
  }
  return U(() => [a.value, i.value, t.offset, t.minWidth, t.minHeight, t.maxWidth, t.maxHeight], () => d()), pe(() => {
    const g = d();
    if (!g)
      return;
    const {
      available: y,
      contentBox: b
    } = g;
    b.height > y.y && requestAnimationFrame(() => {
      d(), requestAnimationFrame(() => {
        d();
      });
    });
  }), {
    updateLocation: d
  };
}
function Vn(e) {
  return Math.round(e * devicePixelRatio) / devicePixelRatio;
}
function Kl(e) {
  return Math.ceil(e * devicePixelRatio) / devicePixelRatio;
}
let Mn = !0;
const un = [];
function ls(e) {
  !Mn || un.length ? (un.push(e), $n()) : (Mn = !1, e(), $n());
}
let Yl = -1;
function $n() {
  cancelAnimationFrame(Yl), Yl = requestAnimationFrame(() => {
    const e = un.shift();
    e && e(), un.length ? $n() : Mn = !0;
  });
}
const Jt = {
  none: null,
  close: os,
  block: rs,
  reposition: ss
}, as = F({
  scrollStrategy: {
    type: [String, Function],
    default: "block",
    validator: (e) => typeof e == "function" || e in Jt
  }
}, "VOverlay-scroll-strategies");
function is(e, t) {
  if (!me)
    return;
  let n;
  He(async () => {
    n == null || n.stop(), t.isActive.value && e.scrollStrategy && (n = jn(), await new Promise((l) => setTimeout(l)), n.active && n.run(() => {
      var l;
      typeof e.scrollStrategy == "function" ? e.scrollStrategy(t, e, n) : (l = Jt[e.scrollStrategy]) == null || l.call(Jt, t, e, n);
    }));
  }), Ie(() => {
    n == null || n.stop();
  });
}
function os(e) {
  function t(n) {
    e.isActive.value = !1;
  }
  gi(e.targetEl.value ?? e.contentEl.value, t);
}
function rs(e, t) {
  var o;
  const n = (o = e.root.value) == null ? void 0 : o.offsetParent, l = [.../* @__PURE__ */ new Set([...rn(e.targetEl.value, t.contained ? n : void 0), ...rn(e.contentEl.value, t.contained ? n : void 0)])].filter((r) => !r.classList.contains("v-overlay-scroll-blocked")), a = window.innerWidth - document.documentElement.offsetWidth, i = ((r) => Qn(r) && r)(n || document.documentElement);
  i && e.root.value.classList.add("v-overlay--scroll-blocked"), l.forEach((r, s) => {
    r.style.setProperty("--v-body-scroll-x", X(-r.scrollLeft)), r.style.setProperty("--v-body-scroll-y", X(-r.scrollTop)), r !== document.documentElement && r.style.setProperty("--v-scrollbar-offset", X(a)), r.classList.add("v-overlay-scroll-blocked");
  }), Ie(() => {
    l.forEach((r, s) => {
      const c = parseFloat(r.style.getPropertyValue("--v-body-scroll-x")), v = parseFloat(r.style.getPropertyValue("--v-body-scroll-y")), m = r.style.scrollBehavior;
      r.style.scrollBehavior = "auto", r.style.removeProperty("--v-body-scroll-x"), r.style.removeProperty("--v-body-scroll-y"), r.style.removeProperty("--v-scrollbar-offset"), r.classList.remove("v-overlay-scroll-blocked"), r.scrollLeft = -c, r.scrollTop = -v, r.style.scrollBehavior = m;
    }), i && e.root.value.classList.remove("v-overlay--scroll-blocked");
  });
}
function ss(e, t, n) {
  let l = !1, a = -1, i = -1;
  function o(r) {
    ls(() => {
      var v, m;
      const s = performance.now();
      (m = (v = e.updateLocation).value) == null || m.call(v, r), l = (performance.now() - s) / (1e3 / 60) > 2;
    });
  }
  i = (typeof requestIdleCallback > "u" ? (r) => r() : requestIdleCallback)(() => {
    n.run(() => {
      gi(e.targetEl.value ?? e.contentEl.value, (r) => {
        l ? (cancelAnimationFrame(a), a = requestAnimationFrame(() => {
          a = requestAnimationFrame(() => {
            o(r);
          });
        })) : o(r);
      });
    });
  }), Ie(() => {
    typeof cancelIdleCallback < "u" && cancelIdleCallback(i), cancelAnimationFrame(a);
  });
}
function gi(e, t) {
  const n = [document, ...rn(e)];
  n.forEach((l) => {
    l.addEventListener("scroll", t, {
      passive: !0
    });
  }), Ie(() => {
    n.forEach((l) => {
      l.removeEventListener("scroll", t);
    });
  });
}
const Dn = Symbol.for("vuetify:v-menu"), us = F({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function cs(e, t) {
  let n = () => {
  };
  function l(o) {
    n == null || n();
    const r = Number(o ? e.openDelay : e.closeDelay);
    return new Promise((s) => {
      n = lo(r, () => {
        t == null || t(o), s(o);
      });
    });
  }
  function a() {
    return l(!0);
  }
  function i() {
    return l(!1);
  }
  return {
    clearDelay: n,
    runOpenDelay: a,
    runCloseDelay: i
  };
}
const ds = F({
  target: [String, Object],
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
  ...us()
}, "VOverlay-activator");
function fs(e, t) {
  let {
    isActive: n,
    isTop: l,
    contentEl: a
  } = t;
  const i = ge("useActivator"), o = H();
  let r = !1, s = !1, c = !0;
  const v = h(() => e.openOnFocus || e.openOnFocus == null && e.openOnHover), m = h(() => e.openOnClick || e.openOnClick == null && !e.openOnHover && !v.value), {
    runOpenDelay: f,
    runCloseDelay: d
  } = cs(e, (V) => {
    V === (e.openOnHover && r || v.value && s) && !(e.openOnHover && n.value && !l.value) && (n.value !== V && (c = !0), n.value = V);
  }), g = H(), y = {
    onClick: (V) => {
      V.stopPropagation(), o.value = V.currentTarget || V.target, n.value || (g.value = [V.clientX, V.clientY]), n.value = !n.value;
    },
    onMouseenter: (V) => {
      var R;
      (R = V.sourceCapabilities) != null && R.firesTouchEvents || (r = !0, o.value = V.currentTarget || V.target, f());
    },
    onMouseleave: (V) => {
      r = !1, d();
    },
    onFocus: (V) => {
      ln(V.target, ":focus-visible") !== !1 && (s = !0, V.stopPropagation(), o.value = V.currentTarget || V.target, f());
    },
    onBlur: (V) => {
      s = !1, V.stopPropagation(), d();
    }
  }, b = h(() => {
    const V = {};
    return m.value && (V.onClick = y.onClick), e.openOnHover && (V.onMouseenter = y.onMouseenter, V.onMouseleave = y.onMouseleave), v.value && (V.onFocus = y.onFocus, V.onBlur = y.onBlur), V;
  }), S = h(() => {
    const V = {};
    if (e.openOnHover && (V.onMouseenter = () => {
      r = !0, f();
    }, V.onMouseleave = () => {
      r = !1, d();
    }), v.value && (V.onFocusin = () => {
      s = !0, f();
    }, V.onFocusout = () => {
      s = !1, d();
    }), e.closeOnContentClick) {
      const R = be(Dn, null);
      V.onClick = () => {
        n.value = !1, R == null || R.closeParents();
      };
    }
    return V;
  }), A = h(() => {
    const V = {};
    return e.openOnHover && (V.onMouseenter = () => {
      c && (r = !0, c = !1, f());
    }, V.onMouseleave = () => {
      r = !1, d();
    }), V;
  });
  U(l, (V) => {
    var R;
    V && (e.openOnHover && !r && (!v.value || !s) || v.value && !s && (!e.openOnHover || !r)) && !((R = a.value) != null && R.contains(document.activeElement)) && (n.value = !1);
  }), U(n, (V) => {
    V || setTimeout(() => {
      g.value = void 0;
    });
  }, {
    flush: "post"
  });
  const E = En();
  He(() => {
    E.value && pe(() => {
      o.value = E.el;
    });
  });
  const _ = En(), B = h(() => e.target === "cursor" && g.value ? g.value : _.value ? _.el : yi(e.target, i) || o.value), x = h(() => Array.isArray(B.value) ? void 0 : B.value);
  let I;
  return U(() => !!e.activator, (V) => {
    V && me ? (I = jn(), I.run(() => {
      vs(e, i, {
        activatorEl: o,
        activatorEvents: b
      });
    })) : I && I.stop();
  }, {
    flush: "post",
    immediate: !0
  }), Ie(() => {
    I == null || I.stop();
  }), {
    activatorEl: o,
    activatorRef: E,
    target: B,
    targetEl: x,
    targetRef: _,
    activatorEvents: b,
    contentEvents: S,
    scrimEvents: A
  };
}
function vs(e, t, n) {
  let {
    activatorEl: l,
    activatorEvents: a
  } = n;
  U(() => e.activator, (s, c) => {
    if (c && s !== c) {
      const v = r(c);
      v && o(v);
    }
    s && pe(() => i());
  }, {
    immediate: !0
  }), U(() => e.activatorProps, () => {
    i();
  }), Ie(() => {
    o();
  });
  function i() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : r(), c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    s && oo(s, Q(a.value, c));
  }
  function o() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : r(), c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e.activatorProps;
    s && ro(s, Q(a.value, c));
  }
  function r() {
    let s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : e.activator;
    const c = yi(s, t);
    return l.value = (c == null ? void 0 : c.nodeType) === Node.ELEMENT_NODE ? c : void 0, l.value;
  }
}
function yi(e, t) {
  var l, a;
  if (!e)
    return;
  let n;
  if (e === "parent") {
    let i = (a = (l = t == null ? void 0 : t.proxy) == null ? void 0 : l.$el) == null ? void 0 : a.parentNode;
    for (; i != null && i.hasAttribute("data-no-activator"); )
      i = i.parentNode;
    n = i;
  } else
    typeof e == "string" ? n = document.querySelector(e) : "$el" in e ? n = e.$el : n = e;
  return n;
}
function ms() {
  if (!me)
    return G(!1);
  const {
    ssr: e
  } = Zn();
  if (e) {
    const t = G(!1);
    return pt(() => {
      t.value = !0;
    }), t;
  } else
    return G(!0);
}
const gs = F({
  eager: Boolean
}, "lazy");
function ys(e, t) {
  const n = G(!1), l = h(() => n.value || e.eager || t.value);
  U(t, () => n.value = !0);
  function a() {
    e.eager || (n.value = !1);
  }
  return {
    isBooted: n,
    hasContent: l,
    onAfterLeave: a
  };
}
function hi() {
  const t = ge("useScopeId").vnode.scopeId;
  return {
    scopeId: t ? {
      [t]: ""
    } : void 0
  };
}
const Xl = Symbol.for("vuetify:stack"), _t = cn([]);
function hs(e, t, n) {
  const l = ge("useStack"), a = !n, i = be(Xl, void 0), o = cn({
    activeChildren: /* @__PURE__ */ new Set()
  });
  Re(Xl, o);
  const r = G(+t.value);
  rt(e, () => {
    var m;
    const v = (m = _t.at(-1)) == null ? void 0 : m[1];
    r.value = v ? v + 10 : +t.value, a && _t.push([l.uid, r.value]), i == null || i.activeChildren.add(l.uid), Ie(() => {
      if (a) {
        const f = ue(_t).findIndex((d) => d[0] === l.uid);
        _t.splice(f, 1);
      }
      i == null || i.activeChildren.delete(l.uid);
    });
  });
  const s = G(!0);
  a && He(() => {
    var m;
    const v = ((m = _t.at(-1)) == null ? void 0 : m[0]) === l.uid;
    setTimeout(() => s.value = v);
  });
  const c = h(() => !o.activeChildren.size);
  return {
    globalTop: qn(s),
    localTop: c,
    stackStyles: h(() => ({
      zIndex: r.value
    }))
  };
}
function bs(e) {
  return {
    teleportTarget: h(() => {
      const n = e();
      if (n === !0 || !me)
        return;
      const l = n === !1 ? document.body : typeof n == "string" ? document.querySelector(n) : n;
      if (l == null) {
        dn(`Unable to locate target ${n}`);
        return;
      }
      let a = [...l.children].find((i) => i.matches(".v-overlay-container"));
      return a || (a = document.createElement("div"), a.className = "v-overlay-container", l.appendChild(a)), a;
    })
  };
}
function Ss() {
  return !0;
}
function bi(e, t, n) {
  if (!e || Si(e, n) === !1)
    return !1;
  const l = Ca(t);
  if (typeof ShadowRoot < "u" && l instanceof ShadowRoot && l.host === e.target)
    return !1;
  const a = (typeof n.value == "object" && n.value.include || (() => []))();
  return a.push(t), !a.some((i) => i == null ? void 0 : i.contains(e.target));
}
function Si(e, t) {
  return (typeof t.value == "object" && t.value.closeConditional || Ss)(e);
}
function Cs(e, t, n) {
  const l = typeof n.value == "function" ? n.value : n.value.handler;
  e.shadowTarget = e.target, t._clickOutside.lastMousedownWasOutside && bi(e, t, n) && setTimeout(() => {
    Si(e, n) && l && l(e);
  }, 0);
}
function Ql(e, t) {
  const n = Ca(e);
  t(document), typeof ShadowRoot < "u" && n instanceof ShadowRoot && t(n);
}
const ps = {
  // [data-app] may not be found
  // if using bind, inserted makes
  // sure that the root element is
  // available, iOS does not support
  // clicks on body
  mounted(e, t) {
    const n = (a) => Cs(a, e, t), l = (a) => {
      e._clickOutside.lastMousedownWasOutside = bi(a, e, t);
    };
    Ql(e, (a) => {
      a.addEventListener("click", n, !0), a.addEventListener("mousedown", l, !0);
    }), e._clickOutside || (e._clickOutside = {
      lastMousedownWasOutside: !1
    }), e._clickOutside[t.instance.$.uid] = {
      onClick: n,
      onMousedown: l
    };
  },
  beforeUnmount(e, t) {
    e._clickOutside && (Ql(e, (n) => {
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
function ws(e) {
  const {
    modelValue: t,
    color: n,
    ...l
  } = e;
  return u(ot, {
    name: "fade-transition",
    appear: !0
  }, {
    default: () => [e.modelValue && u("div", Q({
      class: ["v-overlay__scrim", e.color.backgroundColorClasses.value],
      style: e.color.backgroundColorStyles.value
    }, l), null)]
  });
}
const Ci = F({
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
  opacity: [Number, String],
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
  ...ds(),
  ...ae(),
  ...ut(),
  ...gs(),
  ...Jr(),
  ...as(),
  ...Se(),
  ...xt()
}, "VOverlay"), Jl = K()({
  name: "VOverlay",
  directives: {
    ClickOutside: ps
  },
  inheritAttrs: !1,
  props: {
    _disableGlobalStack: Boolean,
    ...Ci()
  },
  emits: {
    "click:outside": (e) => !0,
    "update:modelValue": (e) => !0,
    afterEnter: () => !0,
    afterLeave: () => !0
  },
  setup(e, t) {
    let {
      slots: n,
      attrs: l,
      emit: a
    } = t;
    const i = ge("VOverlay"), o = H(), r = H(), s = H(), c = ve(e, "modelValue"), v = h({
      get: () => c.value,
      set: (N) => {
        N && e.disabled || (c.value = N);
      }
    }), {
      themeClasses: m
    } = Ae(e), {
      rtlClasses: f,
      isRtl: d
    } = Ze(), {
      hasContent: g,
      onAfterLeave: y
    } = ys(e, v), b = Xe(h(() => typeof e.scrim == "string" ? e.scrim : null)), {
      globalTop: S,
      localTop: A,
      stackStyles: E
    } = hs(v, z(e, "zIndex"), e._disableGlobalStack), {
      activatorEl: _,
      activatorRef: B,
      target: x,
      targetEl: I,
      targetRef: V,
      activatorEvents: R,
      contentEvents: D,
      scrimEvents: P
    } = fs(e, {
      isActive: v,
      isTop: A,
      contentEl: s
    }), {
      teleportTarget: k
    } = bs(() => {
      var te, ce, ye;
      const N = e.attach || e.contained;
      if (N)
        return N;
      const le = ((te = _ == null ? void 0 : _.value) == null ? void 0 : te.getRootNode()) || ((ye = (ce = i.proxy) == null ? void 0 : ce.$el) == null ? void 0 : ye.getRootNode());
      return le instanceof ShadowRoot ? le : !1;
    }), {
      dimensionStyles: O
    } = ct(e), L = ms(), {
      scopeId: M
    } = hi();
    U(() => e.disabled, (N) => {
      N && (v.value = !1);
    });
    const {
      contentStyles: q,
      updateLocation: Z
    } = Zr(e, {
      isRtl: d,
      contentEl: s,
      target: x,
      isActive: v
    });
    is(e, {
      root: o,
      contentEl: s,
      targetEl: I,
      isActive: v,
      updateLocation: Z
    });
    function W(N) {
      a("click:outside", N), e.persistent ? ne() : v.value = !1;
    }
    function C(N) {
      return v.value && S.value && // If using scrim, only close if clicking on it rather than anything opened on top
      (!e.scrim || N.target === r.value || N instanceof MouseEvent && N.shadowTarget === r.value);
    }
    me && U(v, (N) => {
      N ? window.addEventListener("keydown", p) : window.removeEventListener("keydown", p);
    }, {
      immediate: !0
    }), De(() => {
      me && window.removeEventListener("keydown", p);
    });
    function p(N) {
      var le, te;
      N.key === "Escape" && S.value && (e.persistent ? ne() : (v.value = !1, (le = s.value) != null && le.contains(document.activeElement) && ((te = _.value) == null || te.focus())));
    }
    const w = sr();
    rt(() => e.closeOnBack, () => {
      ur(w, (N) => {
        S.value && v.value ? (N(!1), e.persistent ? ne() : v.value = !1) : N();
      });
    });
    const $ = H();
    U(() => v.value && (e.absolute || e.contained) && k.value == null, (N) => {
      if (N) {
        const le = pa(o.value);
        le && le !== document.scrollingElement && ($.value = le.scrollTop);
      }
    });
    function ne() {
      e.noClickAnimation || s.value && mt(s.value, [{
        transformOrigin: "center"
      }, {
        transform: "scale(1.03)"
      }, {
        transformOrigin: "center"
      }], {
        duration: 150,
        easing: on
      });
    }
    function j() {
      a("afterEnter");
    }
    function ie() {
      y(), a("afterLeave");
    }
    return ee(() => {
      var N;
      return u(se, null, [(N = n.activator) == null ? void 0 : N.call(n, {
        isActive: v.value,
        targetRef: V,
        props: Q({
          ref: B
        }, R.value, e.activatorProps)
      }), L.value && g.value && u(ji, {
        disabled: !k.value,
        to: k.value
      }, {
        default: () => [u("div", Q({
          class: ["v-overlay", {
            "v-overlay--absolute": e.absolute || e.contained,
            "v-overlay--active": v.value,
            "v-overlay--contained": e.contained
          }, m.value, f.value, e.class],
          style: [E.value, {
            "--v-overlay-opacity": e.opacity,
            top: X($.value)
          }, e.style],
          ref: o
        }, M, l), [u(ws, Q({
          color: b,
          modelValue: v.value && !!e.scrim,
          ref: r
        }, P.value), null), u(Ke, {
          appear: !0,
          persisted: !0,
          transition: e.transition,
          target: x.value,
          onAfterEnter: j,
          onAfterLeave: ie
        }, {
          default: () => {
            var le;
            return [Fe(u("div", Q({
              ref: s,
              class: ["v-overlay__content", e.contentClass],
              style: [O.value, q.value]
            }, D.value, e.contentProps), [(le = n.default) == null ? void 0 : le.call(n, {
              isActive: v
            })]), [[Ct, v.value], [St("click-outside"), {
              handler: W,
              closeConditional: C,
              include: () => [_.value]
            }]])];
          }
        })])]
      })]);
    }), {
      activatorEl: _,
      scrimEl: r,
      target: x,
      animateClick: ne,
      contentEl: s,
      globalTop: S,
      localTop: A,
      updateLocation: Z
    };
  }
}), In = Symbol("Forwarded refs");
function _n(e, t) {
  let n = e;
  for (; n; ) {
    const l = Reflect.getOwnPropertyDescriptor(n, t);
    if (l)
      return l;
    n = Object.getPrototypeOf(n);
  }
}
function bn(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), l = 1; l < t; l++)
    n[l - 1] = arguments[l];
  return e[In] = n, new Proxy(e, {
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
          const c = _n(s.value, i) ?? ("_" in s.value ? _n((r = s.value._) == null ? void 0 : r.setupState, i) : void 0);
          if (c)
            return c;
        }
        for (const s of n) {
          const c = s.value && s.value[In];
          if (!c)
            continue;
          const v = c.slice();
          for (; v.length; ) {
            const m = v.shift(), f = _n(m.value, i);
            if (f)
              return f;
            const d = m.value && m.value[In];
            d && v.push(...d);
          }
        }
      }
    }
  });
}
const xs = F({
  // TODO
  // disableKeys: Boolean,
  id: String,
  submenu: Boolean,
  ...st(Ci({
    closeDelay: 250,
    closeOnContentClick: !0,
    locationStrategy: "connected",
    location: void 0,
    openDelay: 300,
    scrim: !1,
    scrollStrategy: "reposition",
    transition: {
      component: ka
    }
  }), ["absolute"])
}, "VMenu"), pi = K()({
  name: "VMenu",
  props: xs(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    let {
      slots: n
    } = t;
    const l = ve(e, "modelValue"), {
      scopeId: a
    } = hi(), {
      isRtl: i
    } = Ze(), o = je(), r = h(() => e.id || `v-menu-${o}`), s = H(), c = be(Dn, null), v = G(/* @__PURE__ */ new Set());
    Re(Dn, {
      register() {
        v.value.add(o);
      },
      unregister() {
        v.value.delete(o);
      },
      closeParents(b) {
        setTimeout(() => {
          var S;
          !v.value.size && !e.persistent && (b == null || (S = s.value) != null && S.contentEl && !ao(b, s.value.contentEl)) && (l.value = !1, c == null || c.closeParents());
        }, 40);
      }
    }), De(() => c == null ? void 0 : c.unregister()), qi(() => l.value = !1);
    async function m(b) {
      var E, _, B;
      const S = b.relatedTarget, A = b.target;
      await pe(), l.value && S !== A && ((E = s.value) != null && E.contentEl) && // We're the topmost menu
      ((_ = s.value) != null && _.globalTop) && // It isn't the document or the menu body
      ![document, s.value.contentEl].includes(A) && // It isn't inside the menu body
      !s.value.contentEl.contains(A) && ((B = nn(s.value.contentEl)[0]) == null || B.focus());
    }
    U(l, (b) => {
      b ? (c == null || c.register(), document.addEventListener("focusin", m, {
        once: !0
      })) : (c == null || c.unregister(), document.removeEventListener("focusin", m));
    });
    function f(b) {
      c == null || c.closeParents(b);
    }
    function d(b) {
      var S, A, E, _, B;
      if (!e.disabled)
        if (b.key === "Tab" || b.key === "Enter" && !e.closeOnContentClick) {
          if (b.key === "Enter" && (b.target instanceof HTMLTextAreaElement || b.target instanceof HTMLInputElement && b.target.closest("form")))
            return;
          b.key === "Enter" && b.preventDefault(), ga(nn((S = s.value) == null ? void 0 : S.contentEl, !1), b.shiftKey ? "prev" : "next", (I) => I.tabIndex >= 0) || (l.value = !1, (E = (A = s.value) == null ? void 0 : A.activatorEl) == null || E.focus());
        } else
          e.submenu && b.key === (i.value ? "ArrowRight" : "ArrowLeft") && (l.value = !1, (B = (_ = s.value) == null ? void 0 : _.activatorEl) == null || B.focus());
    }
    function g(b) {
      var A;
      if (e.disabled)
        return;
      const S = (A = s.value) == null ? void 0 : A.contentEl;
      S && l.value ? b.key === "ArrowDown" ? (b.preventDefault(), b.stopImmediatePropagation(), Et(S, "next")) : b.key === "ArrowUp" ? (b.preventDefault(), b.stopImmediatePropagation(), Et(S, "prev")) : e.submenu && (b.key === (i.value ? "ArrowRight" : "ArrowLeft") ? l.value = !1 : b.key === (i.value ? "ArrowLeft" : "ArrowRight") && (b.preventDefault(), Et(S, "first"))) : (e.submenu ? b.key === (i.value ? "ArrowLeft" : "ArrowRight") : ["ArrowDown", "ArrowUp"].includes(b.key)) && (l.value = !0, b.preventDefault(), setTimeout(() => setTimeout(() => g(b))));
    }
    const y = h(() => Q({
      "aria-haspopup": "menu",
      "aria-expanded": String(l.value),
      "aria-owns": r.value,
      onKeydown: g
    }, e.activatorProps));
    return ee(() => {
      const b = Jl.filterProps(e);
      return u(Jl, Q({
        ref: s,
        id: r.value,
        class: ["v-menu", e.class],
        style: e.style
      }, b, {
        modelValue: l.value,
        "onUpdate:modelValue": (S) => l.value = S,
        absolute: !0,
        activatorProps: y.value,
        location: e.location ?? (e.submenu ? "end" : "bottom"),
        "onClick:outside": f,
        onKeydown: d
      }, a), {
        activator: n.activator,
        default: function() {
          for (var S = arguments.length, A = new Array(S), E = 0; E < S; E++)
            A[E] = arguments[E];
          return u(Ce, {
            root: "VMenu"
          }, {
            default: () => {
              var _;
              return [(_ = n.default) == null ? void 0 : _.call(n, ...A)];
            }
          });
        }
      });
    }), bn({
      id: r,
      ΨopenChildren: v
    }, s);
  }
}), ks = F({
  active: Boolean,
  disabled: Boolean,
  max: [Number, String],
  value: {
    type: [Number, String],
    default: 0
  },
  ...ae(),
  ...xt({
    transition: {
      component: Va
    }
  })
}, "VCounter"), Vs = K()({
  name: "VCounter",
  functional: !0,
  props: ks(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const l = h(() => e.max ? `${e.value} / ${e.max}` : String(e.value));
    return ee(() => u(Ke, {
      transition: e.transition
    }, {
      default: () => [Fe(u("div", {
        class: ["v-counter", {
          "text-error": e.max && !e.disabled && parseFloat(e.value) > parseFloat(e.max)
        }, e.class],
        style: e.style
      }, [n.default ? n.default({
        counter: l.value,
        max: e.max,
        value: e.value
      }) : l.value]), [[Ct, e.active]])]
    })), {};
  }
}), Is = F({
  floating: Boolean,
  ...ae()
}, "VFieldLabel"), Yt = K()({
  name: "VFieldLabel",
  props: Is(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    return ee(() => u(Ga, {
      class: ["v-field-label", {
        "v-field-label--floating": e.floating
      }, e.class],
      style: e.style,
      "aria-hidden": e.floating || void 0
    }, n)), {};
  }
});
function wi(e, t) {
  const n = H(), l = G(!1);
  if (Wn) {
    const a = new IntersectionObserver((i) => {
      l.value = !!i.find((o) => o.isIntersecting);
    }, t);
    De(() => {
      a.disconnect();
    }), U(n, (i, o) => {
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
const Zl = {
  center: "center",
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, xi = F({
  location: String
}, "location");
function ki(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = arguments.length > 2 ? arguments[2] : void 0;
  const {
    isRtl: l
  } = Ze();
  return {
    locationStyles: h(() => {
      if (!e.location)
        return {};
      const {
        side: i,
        align: o
      } = Bn(e.location.split(" ").length > 1 ? e.location : `${e.location} center`, l.value);
      function r(c) {
        return n ? n(c) : 0;
      }
      const s = {};
      return i !== "center" && (t ? s[Zl[i]] = `calc(100% - ${r(i)}px)` : s[i] = 0), o !== "center" ? t ? s[Zl[o]] = `calc(100% - ${r(o)}px)` : s[o] = 0 : (i === "center" ? s.top = s.left = "50%" : s[{
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
const _s = F({
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
  bufferColor: String,
  bufferOpacity: [Number, String],
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
  opacity: [Number, String],
  reverse: Boolean,
  stream: Boolean,
  striped: Boolean,
  roundedBar: Boolean,
  ...ae(),
  ...xi({
    location: "top"
  }),
  ...qe(),
  ..._e(),
  ...Se()
}, "VProgressLinear"), As = K()({
  name: "VProgressLinear",
  props: _s(),
  emits: {
    "update:modelValue": (e) => !0
  },
  setup(e, t) {
    var P;
    let {
      slots: n
    } = t;
    const l = ve(e, "modelValue"), {
      isRtl: a,
      rtlClasses: i
    } = Ze(), {
      themeClasses: o
    } = Ae(e), {
      locationStyles: r
    } = ki(e), {
      textColorClasses: s,
      textColorStyles: c
    } = $e(e, "color"), {
      backgroundColorClasses: v,
      backgroundColorStyles: m
    } = Xe(h(() => e.bgColor || e.color)), {
      backgroundColorClasses: f,
      backgroundColorStyles: d
    } = Xe(h(() => e.bufferColor || e.bgColor || e.color)), {
      backgroundColorClasses: g,
      backgroundColorStyles: y
    } = Xe(e, "color"), {
      roundedClasses: b
    } = We(e), {
      intersectionRef: S,
      isIntersecting: A
    } = wi(), E = h(() => parseFloat(e.max)), _ = h(() => parseFloat(e.height)), B = h(() => Ye(parseFloat(e.bufferValue) / E.value * 100, 0, 100)), x = h(() => Ye(parseFloat(l.value) / E.value * 100, 0, 100)), I = h(() => a.value !== e.reverse), V = h(() => e.indeterminate ? "fade-transition" : "slide-x-transition"), R = me && ((P = window.matchMedia) == null ? void 0 : P.call(window, "(forced-colors: active)").matches);
    function D(k) {
      if (!S.value)
        return;
      const {
        left: O,
        right: L,
        width: M
      } = S.value.getBoundingClientRect(), q = I.value ? M - k.clientX + (L - M) : k.clientX - O;
      l.value = Math.round(q / M * E.value);
    }
    return ee(() => u(e.tag, {
      ref: S,
      class: ["v-progress-linear", {
        "v-progress-linear--absolute": e.absolute,
        "v-progress-linear--active": e.active && A.value,
        "v-progress-linear--reverse": I.value,
        "v-progress-linear--rounded": e.rounded,
        "v-progress-linear--rounded-bar": e.roundedBar,
        "v-progress-linear--striped": e.striped
      }, b.value, o.value, i.value, e.class],
      style: [{
        bottom: e.location === "bottom" ? 0 : void 0,
        top: e.location === "top" ? 0 : void 0,
        height: e.active ? X(_.value) : 0,
        "--v-progress-linear-height": X(_.value),
        ...e.absolute ? r.value : {}
      }, e.style],
      role: "progressbar",
      "aria-hidden": e.active ? "false" : "true",
      "aria-valuemin": "0",
      "aria-valuemax": e.max,
      "aria-valuenow": e.indeterminate ? void 0 : x.value,
      onClick: e.clickable && D
    }, {
      default: () => [e.stream && u("div", {
        key: "stream",
        class: ["v-progress-linear__stream", s.value],
        style: {
          ...c.value,
          [I.value ? "left" : "right"]: X(-_.value),
          borderTop: `${X(_.value / 2)} dotted`,
          opacity: parseFloat(e.bufferOpacity),
          top: `calc(50% - ${X(_.value / 4)})`,
          width: X(100 - B.value, "%"),
          "--v-progress-linear-stream-to": X(_.value * (I.value ? 1 : -1))
        }
      }, null), u("div", {
        class: ["v-progress-linear__background", R ? void 0 : v.value],
        style: [m.value, {
          opacity: parseFloat(e.bgOpacity),
          width: e.stream ? 0 : void 0
        }]
      }, null), u("div", {
        class: ["v-progress-linear__buffer", R ? void 0 : f.value],
        style: [d.value, {
          opacity: parseFloat(e.bufferOpacity),
          width: X(B.value, "%")
        }]
      }, null), u(ot, {
        name: V.value
      }, {
        default: () => [e.indeterminate ? u("div", {
          class: "v-progress-linear__indeterminate"
        }, [["long", "short"].map((k) => u("div", {
          key: k,
          class: ["v-progress-linear__indeterminate", k, R ? void 0 : g.value],
          style: y.value
        }, null))]) : u("div", {
          class: ["v-progress-linear__determinate", R ? void 0 : g.value],
          style: [y.value, {
            width: X(x.value, "%")
          }]
        }, null)]
      }), n.default && u("div", {
        class: "v-progress-linear__content"
      }, [n.default({
        value: x.value,
        buffer: B.value
      })])]
    })), {};
  }
}), Vi = F({
  loading: [Boolean, String]
}, "loader");
function Ii(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ne();
  return {
    loaderClasses: h(() => ({
      [`${t}--loading`]: e.loading
    }))
  };
}
function Ps(e, t) {
  var l;
  let {
    slots: n
  } = t;
  return u("div", {
    class: `${e.name}__loader`
  }, [((l = n.default) == null ? void 0 : l.call(n, {
    color: e.color,
    isActive: e.active
  })) || u(As, {
    absolute: e.absolute,
    active: e.active,
    color: e.color,
    height: "2",
    indeterminate: !0
  }, null)]);
}
const Es = ["underlined", "outlined", "filled", "solo", "solo-inverted", "solo-filled", "plain"], _i = F({
  appendInnerIcon: re,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: re,
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
  prependInnerIcon: re,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: "filled",
    validator: (e) => Es.includes(e)
  },
  "onClick:clear": Ve(),
  "onClick:appendInner": Ve(),
  "onClick:prependInner": Ve(),
  ...ae(),
  ...Vi(),
  ...qe(),
  ...Se()
}, "VField"), Ai = K()({
  name: "VField",
  inheritAttrs: !1,
  props: {
    id: String,
    ...Ja(),
    ..._i()
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
    } = Ae(e), {
      loaderClasses: o
    } = Ii(e), {
      focusClasses: r,
      isFocused: s,
      focus: c,
      blur: v
    } = Za(e), {
      InputIcon: m
    } = Qa(e), {
      roundedClasses: f
    } = We(e), {
      rtlClasses: d
    } = Ze(), g = h(() => e.dirty || e.active), y = h(() => !e.singleLine && !!(e.label || a.label)), b = je(), S = h(() => e.id || `input-${b}`), A = h(() => `${S.value}-messages`), E = H(), _ = H(), B = H(), x = h(() => ["plain", "underlined"].includes(e.variant)), {
      backgroundColorClasses: I,
      backgroundColorStyles: V
    } = Xe(z(e, "bgColor")), {
      textColorClasses: R,
      textColorStyles: D
    } = $e(h(() => e.error || e.disabled ? void 0 : g.value && s.value ? e.color : e.baseColor));
    U(g, (L) => {
      if (y.value) {
        const M = E.value.$el, q = _.value.$el;
        requestAnimationFrame(() => {
          const Z = Yn(M), W = q.getBoundingClientRect(), C = W.x - Z.x, p = W.y - Z.y - (Z.height / 2 - W.height / 2), w = W.width / 0.75, $ = Math.abs(w - Z.width) > 1 ? {
            maxWidth: X(w)
          } : void 0, ne = getComputedStyle(M), j = getComputedStyle(q), ie = parseFloat(ne.transitionDuration) * 1e3 || 150, N = parseFloat(j.getPropertyValue("--v-field-label-scale")), le = j.getPropertyValue("color");
          M.style.visibility = "visible", q.style.visibility = "hidden", mt(M, {
            transform: `translate(${C}px, ${p}px) scale(${N})`,
            color: le,
            ...$
          }, {
            duration: ie,
            easing: on,
            direction: L ? "normal" : "reverse"
          }).finished.then(() => {
            M.style.removeProperty("visibility"), q.style.removeProperty("visibility");
          });
        });
      }
    }, {
      flush: "post"
    });
    const P = h(() => ({
      isActive: g,
      isFocused: s,
      controlRef: B,
      blur: v,
      focus: c
    }));
    function k(L) {
      L.target !== document.activeElement && L.preventDefault();
    }
    function O(L) {
      var M;
      L.key !== "Enter" && L.key !== " " || (L.preventDefault(), L.stopPropagation(), (M = e["onClick:clear"]) == null || M.call(e, new MouseEvent("click")));
    }
    return ee(() => {
      var C, p, w;
      const L = e.variant === "outlined", M = !!(a["prepend-inner"] || e.prependInnerIcon), q = !!(e.clearable || a.clear), Z = !!(a["append-inner"] || e.appendInnerIcon || q), W = () => a.label ? a.label({
        ...P.value,
        label: e.label,
        props: {
          for: S.value
        }
      }) : e.label;
      return u("div", Q({
        class: ["v-field", {
          "v-field--active": g.value,
          "v-field--appended": Z,
          "v-field--center-affix": e.centerAffix ?? !x.value,
          "v-field--disabled": e.disabled,
          "v-field--dirty": e.dirty,
          "v-field--error": e.error,
          "v-field--flat": e.flat,
          "v-field--has-background": !!e.bgColor,
          "v-field--persistent-clear": e.persistentClear,
          "v-field--prepended": M,
          "v-field--reverse": e.reverse,
          "v-field--single-line": e.singleLine,
          "v-field--no-label": !W(),
          [`v-field--variant-${e.variant}`]: !0
        }, i.value, I.value, r.value, o.value, f.value, d.value, e.class],
        style: [V.value, e.style],
        onClick: k
      }, n), [u("div", {
        class: "v-field__overlay"
      }, null), u(Ps, {
        name: "v-field",
        active: !!e.loading,
        color: e.error ? "error" : typeof e.loading == "string" ? e.loading : e.color
      }, {
        default: a.loader
      }), M && u("div", {
        key: "prepend",
        class: "v-field__prepend-inner"
      }, [e.prependInnerIcon && u(m, {
        key: "prepend-icon",
        name: "prependInner"
      }, null), (C = a["prepend-inner"]) == null ? void 0 : C.call(a, P.value)]), u("div", {
        class: "v-field__field",
        "data-no-activator": ""
      }, [["filled", "solo", "solo-inverted", "solo-filled"].includes(e.variant) && y.value && u(Yt, {
        key: "floating-label",
        ref: _,
        class: [R.value],
        floating: !0,
        for: S.value,
        style: D.value
      }, {
        default: () => [W()]
      }), u(Yt, {
        ref: E,
        for: S.value
      }, {
        default: () => [W()]
      }), (p = a.default) == null ? void 0 : p.call(a, {
        ...P.value,
        props: {
          id: S.value,
          class: "v-field__input",
          "aria-describedby": A.value
        },
        focus: c,
        blur: v
      })]), q && u(Ia, {
        key: "clear"
      }, {
        default: () => [Fe(u("div", {
          class: "v-field__clearable",
          onMousedown: ($) => {
            $.preventDefault(), $.stopPropagation();
          }
        }, [u(Ce, {
          defaults: {
            VIcon: {
              icon: e.clearIcon
            }
          }
        }, {
          default: () => [a.clear ? a.clear({
            ...P.value,
            props: {
              onKeydown: O,
              onFocus: c,
              onBlur: v,
              onClick: e["onClick:clear"]
            }
          }) : u(m, {
            name: "clear",
            onKeydown: O,
            onFocus: c,
            onBlur: v
          }, null)]
        })]), [[Ct, e.dirty]])]
      }), Z && u("div", {
        key: "append",
        class: "v-field__append-inner"
      }, [(w = a["append-inner"]) == null ? void 0 : w.call(a, P.value), e.appendInnerIcon && u(m, {
        key: "append-icon",
        name: "appendInner"
      }, null)]), u("div", {
        class: ["v-field__outline", R.value],
        style: D.value
      }, [L && u(se, null, [u("div", {
        class: "v-field__outline__start"
      }, null), y.value && u("div", {
        class: "v-field__outline__notch"
      }, [u(Yt, {
        ref: _,
        floating: !0,
        for: S.value
      }, {
        default: () => [W()]
      })]), u("div", {
        class: "v-field__outline__end"
      }, null)]), x.value && y.value && u(Yt, {
        ref: _,
        floating: !0,
        for: S.value
      }, {
        default: () => [W()]
      })])]);
    }), {
      controlRef: B
    };
  }
});
function Os(e) {
  const t = Object.keys(Ai.props).filter((n) => !Gn(n) && n !== "class" && n !== "style");
  return ca(e, t);
}
const Bs = ["color", "file", "time", "date", "datetime-local", "week", "month"], ul = F({
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
  ...ei(),
  ..._i()
}, "VTextField"), it = K()({
  name: "VTextField",
  directives: {
    Intersect: Pa
  },
  inheritAttrs: !1,
  props: ul(),
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
    const i = ve(e, "modelValue"), {
      isFocused: o,
      focus: r,
      blur: s
    } = Za(e), c = h(() => typeof e.counterValue == "function" ? e.counterValue(i.value) : typeof e.counterValue == "number" ? e.counterValue : (i.value ?? "").toString().length), v = h(() => {
      if (n.maxlength)
        return n.maxlength;
      if (!(!e.counter || typeof e.counter != "number" && typeof e.counter != "string"))
        return e.counter;
    }), m = h(() => ["plain", "underlined"].includes(e.variant));
    function f(x, I) {
      var V, R;
      !e.autofocus || !x || (R = (V = I[0].target) == null ? void 0 : V.focus) == null || R.call(V);
    }
    const d = H(), g = H(), y = H(), b = h(() => Bs.includes(e.type) || e.persistentPlaceholder || o.value || e.active);
    function S() {
      var x;
      y.value !== document.activeElement && ((x = y.value) == null || x.focus()), o.value || r();
    }
    function A(x) {
      l("mousedown:control", x), x.target !== y.value && (S(), x.preventDefault());
    }
    function E(x) {
      S(), l("click:control", x);
    }
    function _(x) {
      x.stopPropagation(), S(), pe(() => {
        i.value = null, to(e["onClick:clear"], x);
      });
    }
    function B(x) {
      var V;
      const I = x.target;
      if (i.value = I.value, (V = e.modelModifiers) != null && V.trim && ["text", "search", "password", "tel", "url"].includes(e.type)) {
        const R = [I.selectionStart, I.selectionEnd];
        pe(() => {
          I.selectionStart = R[0], I.selectionEnd = R[1];
        });
      }
    }
    return ee(() => {
      const x = !!(a.counter || e.counter !== !1 && e.counter != null), I = !!(x || a.details), [V, R] = fa(n), {
        modelValue: D,
        ...P
      } = Wl.filterProps(e), k = Os(e);
      return u(Wl, Q({
        ref: d,
        modelValue: i.value,
        "onUpdate:modelValue": (O) => i.value = O,
        class: ["v-text-field", {
          "v-text-field--prefixed": e.prefix,
          "v-text-field--suffixed": e.suffix,
          "v-input--plain-underlined": m.value
        }, e.class],
        style: e.style
      }, V, P, {
        centerAffix: !m.value,
        focused: o.value
      }), {
        ...a,
        default: (O) => {
          let {
            id: L,
            isDisabled: M,
            isDirty: q,
            isReadonly: Z,
            isValid: W
          } = O;
          return u(Ai, Q({
            ref: g,
            onMousedown: A,
            onClick: E,
            "onClick:clear": _,
            "onClick:prependInner": e["onClick:prependInner"],
            "onClick:appendInner": e["onClick:appendInner"],
            role: e.role
          }, k, {
            id: L.value,
            active: b.value || q.value,
            dirty: q.value || e.dirty,
            disabled: M.value,
            focused: o.value,
            error: W.value === !1
          }), {
            ...a,
            default: (C) => {
              let {
                props: {
                  class: p,
                  ...w
                }
              } = C;
              const $ = Fe(u("input", Q({
                ref: y,
                value: i.value,
                onInput: B,
                autofocus: e.autofocus,
                readonly: Z.value,
                disabled: M.value,
                name: e.name,
                placeholder: e.placeholder,
                size: 1,
                type: e.type,
                onFocus: S,
                onBlur: s
              }, w, R), null), [[St("intersect"), {
                handler: f
              }, null, {
                once: !0
              }]]);
              return u(se, null, [e.prefix && u("span", {
                class: "v-text-field__prefix"
              }, [u("span", {
                class: "v-text-field__prefix__text"
              }, [e.prefix])]), a.default ? u("div", {
                class: p,
                "data-no-activator": ""
              }, [a.default(), $]) : Wi($, {
                class: p
              }), e.suffix && u("span", {
                class: "v-text-field__suffix"
              }, [u("span", {
                class: "v-text-field__suffix__text"
              }, [e.suffix])])]);
            }
          });
        },
        details: I ? (O) => {
          var L;
          return u(se, null, [(L = a.details) == null ? void 0 : L.call(a, O), x && u(se, null, [u("span", null, null), u(Vs, {
            active: e.persistentCounter || o.value,
            value: c.value,
            max: v.value,
            disabled: e.disabled
          }, a.counter)])]);
        } : void 0
      });
    }), bn({}, d, g, y);
  }
}), Ts = F({
  renderless: Boolean,
  ...ae()
}, "VVirtualScrollItem"), Ls = K()({
  name: "VVirtualScrollItem",
  inheritAttrs: !1,
  props: Ts(),
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
    } = Bt(void 0, "border");
    U(() => {
      var r;
      return (r = o.value) == null ? void 0 : r.height;
    }, (r) => {
      r != null && l("update:height", r);
    }), ee(() => {
      var r, s;
      return e.renderless ? u(se, null, [(r = a.default) == null ? void 0 : r.call(a, {
        itemRef: i
      })]) : u("div", Q({
        ref: i,
        class: ["v-virtual-scroll__item", e.class],
        style: e.style
      }, n), [(s = a.default) == null ? void 0 : s.call(a)]);
    });
  }
}), Fs = -1, Rs = 1, An = 100, Ms = F({
  itemHeight: {
    type: [Number, String],
    default: null
  },
  height: [Number, String]
}, "virtual");
function $s(e, t) {
  const n = Zn(), l = G(0);
  He(() => {
    l.value = parseFloat(e.itemHeight || 0);
  });
  const a = G(0), i = G(Math.ceil(
    // Assume 16px items filling the entire screen height if
    // not provided. This is probably incorrect but it minimises
    // the chance of ending up with empty space at the bottom.
    // The default value is set here to avoid poisoning getSize()
    (parseInt(e.height) || n.height.value) / (l.value || 16)
  ) || 1), o = G(0), r = G(0), s = H(), c = H();
  let v = 0;
  const {
    resizeRef: m,
    contentRect: f
  } = Bt();
  He(() => {
    m.value = s.value;
  });
  const d = h(() => {
    var C;
    return s.value === document.documentElement ? n.height.value : ((C = f.value) == null ? void 0 : C.height) || parseInt(e.height) || 0;
  }), g = h(() => !!(s.value && c.value && d.value && l.value));
  let y = Array.from({
    length: t.value.length
  }), b = Array.from({
    length: t.value.length
  });
  const S = G(0);
  let A = -1;
  function E(C) {
    return y[C] || l.value;
  }
  const _ = Zi(() => {
    const C = performance.now();
    b[0] = 0;
    const p = t.value.length;
    for (let w = 1; w <= p - 1; w++)
      b[w] = (b[w - 1] || 0) + E(w - 1);
    S.value = Math.max(S.value, performance.now() - C);
  }, S), B = U(g, (C) => {
    C && (B(), v = c.value.offsetTop, _.immediate(), M(), ~A && pe(() => {
      me && window.requestAnimationFrame(() => {
        Z(A), A = -1;
      });
    }));
  });
  Ie(() => {
    _.clear();
  });
  function x(C, p) {
    const w = y[C], $ = l.value;
    l.value = $ ? Math.min(l.value, p) : p, (w !== p || $ !== l.value) && (y[C] = p, _());
  }
  function I(C) {
    return C = Ye(C, 0, t.value.length - 1), b[C] || 0;
  }
  function V(C) {
    return Ds(b, C);
  }
  let R = 0, D = 0, P = 0;
  U(d, (C, p) => {
    p && (M(), C < p && requestAnimationFrame(() => {
      D = 0, M();
    }));
  });
  function k() {
    if (!s.value || !c.value)
      return;
    const C = s.value.scrollTop, p = performance.now();
    p - P > 500 ? (D = Math.sign(C - R), v = c.value.offsetTop) : D = C - R, R = C, P = p, M();
  }
  function O() {
    !s.value || !c.value || (D = 0, P = 0, M());
  }
  let L = -1;
  function M() {
    cancelAnimationFrame(L), L = requestAnimationFrame(q);
  }
  function q() {
    if (!s.value || !d.value)
      return;
    const C = R - v, p = Math.sign(D), w = Math.max(0, C - An), $ = Ye(V(w), 0, t.value.length), ne = C + d.value + An, j = Ye(V(ne) + 1, $ + 1, t.value.length);
    if (
      // Only update the side we're scrolling towards,
      // the other side will be updated incidentally
      (p !== Fs || $ < a.value) && (p !== Rs || j > i.value)
    ) {
      const ie = I(a.value) - I($), N = I(j) - I(i.value);
      Math.max(ie, N) > An ? (a.value = $, i.value = j) : ($ <= 0 && (a.value = $), j >= t.value.length && (i.value = j));
    }
    o.value = I(a.value), r.value = I(t.value.length) - I(i.value);
  }
  function Z(C) {
    const p = I(C);
    !s.value || C && !p ? A = C : s.value.scrollTop = p;
  }
  const W = h(() => t.value.slice(a.value, i.value).map((C, p) => ({
    raw: C,
    index: p + a.value
  })));
  return U(t, () => {
    y = Array.from({
      length: t.value.length
    }), b = Array.from({
      length: t.value.length
    }), _.immediate(), M();
  }, {
    deep: !0
  }), {
    calculateVisibleItems: M,
    containerRef: s,
    markerRef: c,
    computedItems: W,
    paddingTop: o,
    paddingBottom: r,
    scrollToIndex: Z,
    handleScroll: k,
    handleScrollend: O,
    handleItemResize: x
  };
}
function Ds(e, t) {
  let n = e.length - 1, l = 0, a = 0, i = null, o = -1;
  if (e[n] < t)
    return n;
  for (; l <= n; )
    if (a = l + n >> 1, i = e[a], i > t)
      n = a - 1;
    else if (i < t)
      o = a, l = a + 1;
    else
      return i === t ? a : l;
  return o;
}
const Ns = F({
  items: {
    type: Array,
    default: () => []
  },
  renderless: Boolean,
  ...Ms(),
  ...ae(),
  ...ut()
}, "VVirtualScroll"), Pi = K()({
  name: "VVirtualScroll",
  props: Ns(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const l = ge("VVirtualScroll"), {
      dimensionStyles: a
    } = ct(e), {
      calculateVisibleItems: i,
      containerRef: o,
      markerRef: r,
      handleScroll: s,
      handleScrollend: c,
      handleItemResize: v,
      scrollToIndex: m,
      paddingTop: f,
      paddingBottom: d,
      computedItems: g
    } = $s(e, z(e, "items"));
    return rt(() => e.renderless, () => {
      function y() {
        var A, E;
        const S = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1) ? "addEventListener" : "removeEventListener";
        o.value === document.documentElement ? (document[S]("scroll", s, {
          passive: !0
        }), document[S]("scrollend", c)) : ((A = o.value) == null || A[S]("scroll", s, {
          passive: !0
        }), (E = o.value) == null || E[S]("scrollend", c));
      }
      pt(() => {
        o.value = pa(l.vnode.el, !0), y(!0);
      }), Ie(y);
    }), ee(() => {
      const y = g.value.map((b) => u(Ls, {
        key: b.index,
        renderless: e.renderless,
        "onUpdate:height": (S) => v(b.index, S)
      }, {
        default: (S) => {
          var A;
          return (A = n.default) == null ? void 0 : A.call(n, {
            item: b.raw,
            index: b.index,
            ...S
          });
        }
      }));
      return e.renderless ? u(se, null, [u("div", {
        ref: r,
        class: "v-virtual-scroll__spacer",
        style: {
          paddingTop: X(f.value)
        }
      }, null), y, u("div", {
        class: "v-virtual-scroll__spacer",
        style: {
          paddingBottom: X(d.value)
        }
      }, null)]) : u("div", {
        ref: o,
        class: ["v-virtual-scroll", e.class],
        onScrollPassive: s,
        onScrollend: c,
        style: [a.value, e.style]
      }, [u("div", {
        ref: r,
        class: "v-virtual-scroll__container",
        style: {
          paddingTop: X(f.value),
          paddingBottom: X(d.value)
        }
      }, [y])]);
    }), {
      calculateVisibleItems: i,
      scrollToIndex: m
    };
  }
});
function Ei(e, t) {
  const n = G(!1);
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
        const s = U(n, () => {
          s(), r();
        });
      } else
        r();
    });
  }
  async function o(r) {
    var v, m;
    if (r.key === "Tab" && ((v = t.value) == null || v.focus()), !["PageDown", "PageUp", "Home", "End"].includes(r.key))
      return;
    const s = (m = e.value) == null ? void 0 : m.$el;
    if (!s)
      return;
    (r.key === "Home" || r.key === "End") && s.scrollTo({
      top: r.key === "Home" ? 0 : s.scrollHeight,
      behavior: "smooth"
    }), await i();
    const c = s.querySelectorAll(":scope > :not(.v-virtual-scroll__spacer)");
    if (r.key === "PageDown" || r.key === "Home") {
      const f = s.getBoundingClientRect().top;
      for (const d of c)
        if (d.getBoundingClientRect().top >= f) {
          d.focus();
          break;
        }
    } else {
      const f = s.getBoundingClientRect().bottom;
      for (const d of [...c].reverse())
        if (d.getBoundingClientRect().bottom <= f) {
          d.focus();
          break;
        }
    }
  }
  return {
    onScrollPassive: a,
    onKeydown: o
  };
}
const Oi = F({
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
  listProps: {
    type: Object
  },
  menu: Boolean,
  menuIcon: {
    type: re,
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
  ...ui({
    itemChildren: !1
  })
}, "Select"), zs = F({
  ...Oi(),
  ...st(ul({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...xt({
    transition: {
      component: ka
    }
  })
}, "VSelect"), Nn = K()({
  name: "VSelect",
  props: zs(),
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
    } = yn(), a = H(), i = H(), o = H(), r = ve(e, "menu"), s = h({
      get: () => r.value,
      set: (C) => {
        var p;
        r.value && !C && ((p = i.value) != null && p.ΨopenChildren.size) || (r.value = C);
      }
    }), {
      items: c,
      transformIn: v,
      transformOut: m
    } = di(e), f = ve(e, "modelValue", [], (C) => v(C === null ? [null] : ke(C)), (C) => {
      const p = m(C);
      return e.multiple ? p : p[0] ?? null;
    }), d = h(() => typeof e.counterValue == "function" ? e.counterValue(f.value) : typeof e.counterValue == "number" ? e.counterValue : f.value.length), g = ol(), y = h(() => f.value.map((C) => C.value)), b = G(!1), S = h(() => s.value ? e.closeText : e.openText);
    let A = "", E;
    const _ = h(() => e.hideSelected ? c.value.filter((C) => !f.value.some((p) => e.valueComparator(p, C))) : c.value), B = h(() => e.hideNoData && !_.value.length || e.readonly || (g == null ? void 0 : g.isReadonly.value)), x = h(() => {
      var C;
      return {
        ...e.menuProps,
        activatorProps: {
          ...((C = e.menuProps) == null ? void 0 : C.activatorProps) || {},
          "aria-haspopup": "listbox"
          // Set aria-haspopup to 'listbox'
        }
      };
    }), I = H(), V = Ei(I, a);
    function R(C) {
      e.openOnClear && (s.value = !0);
    }
    function D() {
      B.value || (s.value = !s.value);
    }
    function P(C) {
      On(C) && k(C);
    }
    function k(C) {
      var ne, j;
      if (!C.key || e.readonly || g != null && g.isReadonly.value)
        return;
      ["Enter", " ", "ArrowDown", "ArrowUp", "Home", "End"].includes(C.key) && C.preventDefault(), ["Enter", "ArrowDown", " "].includes(C.key) && (s.value = !0), ["Escape", "Tab"].includes(C.key) && (s.value = !1), C.key === "Home" ? (ne = I.value) == null || ne.focus("first") : C.key === "End" && ((j = I.value) == null || j.focus("last"));
      const p = 1e3;
      if (e.multiple || !On(C))
        return;
      const w = performance.now();
      w - E > p && (A = ""), A += C.key.toLowerCase(), E = w;
      const $ = c.value.find((ie) => ie.title.toLowerCase().startsWith(A));
      if ($ !== void 0) {
        f.value = [$];
        const ie = _.value.indexOf($);
        me && window.requestAnimationFrame(() => {
          var N;
          ie >= 0 && ((N = o.value) == null || N.scrollToIndex(ie));
        });
      }
    }
    function O(C) {
      let p = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!C.props.disabled)
        if (e.multiple) {
          const w = f.value.findIndex((ne) => e.valueComparator(ne.value, C.value)), $ = p ?? !~w;
          if (~w) {
            const ne = $ ? [...f.value, C] : [...f.value];
            ne.splice(w, 1), f.value = ne;
          } else
            $ && (f.value = [...f.value, C]);
        } else {
          const w = p !== !1;
          f.value = w ? [C] : [], pe(() => {
            s.value = !1;
          });
        }
    }
    function L(C) {
      var p;
      (p = I.value) != null && p.$el.contains(C.relatedTarget) || (s.value = !1);
    }
    function M() {
      var C;
      e.eager && ((C = o.value) == null || C.calculateVisibleItems());
    }
    function q() {
      var C;
      b.value && ((C = a.value) == null || C.focus());
    }
    function Z(C) {
      b.value = !0;
    }
    function W(C) {
      if (C == null)
        f.value = [];
      else if (ln(a.value, ":autofill") || ln(a.value, ":-webkit-autofill")) {
        const p = c.value.find((w) => w.title === C);
        p && O(p);
      } else
        a.value && (a.value.value = "");
    }
    return U(s, () => {
      if (!e.hideSelected && s.value && f.value.length) {
        const C = _.value.findIndex((p) => f.value.some((w) => e.valueComparator(w.value, p.value)));
        me && window.requestAnimationFrame(() => {
          var p;
          C >= 0 && ((p = o.value) == null || p.scrollToIndex(C));
        });
      }
    }), U(() => e.items, (C, p) => {
      s.value || b.value && !p.length && C.length && (s.value = !0);
    }), ee(() => {
      const C = !!(e.chips || n.chip), p = !!(!e.hideNoData || _.value.length || n["prepend-item"] || n["append-item"] || n["no-data"]), w = f.value.length > 0, $ = it.filterProps(e), ne = w || !b.value && e.label && !e.persistentPlaceholder ? void 0 : e.placeholder;
      return u(it, Q({
        ref: a
      }, $, {
        modelValue: f.value.map((j) => j.props.value).join(", "),
        "onUpdate:modelValue": W,
        focused: b.value,
        "onUpdate:focused": (j) => b.value = j,
        validationValue: f.externalValue,
        counterValue: d.value,
        dirty: w,
        class: ["v-select", {
          "v-select--active-menu": s.value,
          "v-select--chips": !!e.chips,
          [`v-select--${e.multiple ? "multiple" : "single"}`]: !0,
          "v-select--selected": f.value.length,
          "v-select--selection-slot": !!n.selection
        }, e.class],
        style: e.style,
        inputmode: "none",
        placeholder: ne,
        "onClick:clear": R,
        "onMousedown:control": D,
        onBlur: L,
        onKeydown: k,
        "aria-label": l(S.value),
        title: l(S.value)
      }), {
        ...n,
        default: () => u(se, null, [u(pi, Q({
          ref: i,
          modelValue: s.value,
          "onUpdate:modelValue": (j) => s.value = j,
          activator: "parent",
          contentClass: "v-select__content",
          disabled: B.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: M,
          onAfterLeave: q
        }, x.value), {
          default: () => [p && u(vi, Q({
            ref: I,
            selected: y.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (j) => j.preventDefault(),
            onKeydown: P,
            onFocusin: Z,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, V, e.listProps), {
            default: () => {
              var j, ie, N;
              return [(j = n["prepend-item"]) == null ? void 0 : j.call(n), !_.value.length && !e.hideNoData && (((ie = n["no-data"]) == null ? void 0 : ie.call(n)) ?? u(bt, {
                title: l(e.noDataText)
              }, null)), u(Pi, {
                ref: o,
                renderless: !0,
                items: _.value
              }, {
                default: (le) => {
                  var It;
                  let {
                    item: te,
                    index: ce,
                    itemRef: ye
                  } = le;
                  const jt = Q(te.props, {
                    ref: ye,
                    key: ce,
                    onClick: () => O(te, null)
                  });
                  return ((It = n.item) == null ? void 0 : It.call(n, {
                    item: te,
                    index: ce,
                    props: jt
                  })) ?? u(bt, Q(jt, {
                    role: "option"
                  }), {
                    prepend: (T) => {
                      let {
                        isSelected: Y
                      } = T;
                      return u(se, null, [e.multiple && !e.hideSelected ? u(Xa, {
                        key: te.value,
                        modelValue: Y,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, te.props.prependAvatar && u(ht, {
                        image: te.props.prependAvatar
                      }, null), te.props.prependIcon && u(fe, {
                        icon: te.props.prependIcon
                      }, null)]);
                    }
                  });
                }
              }), (N = n["append-item"]) == null ? void 0 : N.call(n)];
            }
          })]
        }), f.value.map((j, ie) => {
          function N(ye) {
            ye.stopPropagation(), ye.preventDefault(), O(j, !1);
          }
          const le = {
            "onClick:close": N,
            onKeydown(ye) {
              ye.key !== "Enter" && ye.key !== " " || (ye.preventDefault(), ye.stopPropagation(), N(ye));
            },
            onMousedown(ye) {
              ye.preventDefault(), ye.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, te = C ? !!n.chip : !!n.selection, ce = te ? Kn(C ? n.chip({
            item: j,
            index: ie,
            props: le
          }) : n.selection({
            item: j,
            index: ie
          })) : void 0;
          if (!(te && !ce))
            return u("div", {
              key: j.value,
              class: "v-select__selection"
            }, [C ? n.chip ? u(Ce, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: j.title
                }
              }
            }, {
              default: () => [ce]
            }) : u(il, Q({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: j.title,
              disabled: j.props.disabled
            }, le), null) : ce ?? u("span", {
              class: "v-select__selection-text"
            }, [j.title, e.multiple && ie < f.value.length - 1 && u("span", {
              class: "v-select__selection-comma"
            }, [en(",")])])]);
        })]),
        "append-inner": function() {
          var le;
          for (var j = arguments.length, ie = new Array(j), N = 0; N < j; N++)
            ie[N] = arguments[N];
          return u(se, null, [(le = n["append-inner"]) == null ? void 0 : le.call(n, ...ie), e.menuIcon ? u(fe, {
            class: "v-select__menu-icon",
            icon: e.menuIcon
          }, null) : void 0]);
        }
      });
    }), bn({
      isFocused: b,
      menu: s,
      select: O
    }, a);
  }
}), Hs = (e, t, n) => e == null || t == null ? -1 : e.toString().toLocaleLowerCase().indexOf(t.toString().toLocaleLowerCase()), js = F({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function qs(e, t, n) {
  var r;
  const l = [], a = (n == null ? void 0 : n.default) ?? Hs, i = n != null && n.filterKeys ? ke(n.filterKeys) : !1, o = Object.keys((n == null ? void 0 : n.customKeyFilter) ?? {}).length;
  if (!(e != null && e.length))
    return l;
  e:
    for (let s = 0; s < e.length; s++) {
      const [c, v = c] = ke(e[s]), m = {}, f = {};
      let d = -1;
      if ((t || o > 0) && !(n != null && n.noFilter)) {
        if (typeof c == "object") {
          const b = i || Object.keys(v);
          for (const S of b) {
            const A = Me(v, S), E = (r = n == null ? void 0 : n.customKeyFilter) == null ? void 0 : r[S];
            if (d = E ? E(A, t, c) : a(A, t, c), d !== -1 && d !== !1)
              E ? m[S] = d : f[S] = d;
            else if ((n == null ? void 0 : n.filterMode) === "every")
              continue e;
          }
        } else
          d = a(c, t, c), d !== -1 && d !== !1 && (f.title = d);
        const g = Object.keys(f).length, y = Object.keys(m).length;
        if (!g && !y || (n == null ? void 0 : n.filterMode) === "union" && y !== o && !g || (n == null ? void 0 : n.filterMode) === "intersection" && (y !== o || !g))
          continue;
      }
      l.push({
        index: s,
        matches: {
          ...f,
          ...m
        }
      });
    }
  return l;
}
function Ws(e, t, n, l) {
  const a = H([]), i = H(/* @__PURE__ */ new Map()), o = h(() => xe(t));
  He(() => {
    const s = typeof n == "function" ? n() : xe(n), c = typeof s != "string" && typeof s != "number" ? "" : String(s), v = qs(o.value, c, {
      customKeyFilter: {
        ...e.customKeyFilter,
        ...xe(l == null ? void 0 : l.customKeyFilter)
      },
      default: e.customFilter,
      filterKeys: e.filterKeys,
      filterMode: e.filterMode,
      noFilter: e.noFilter
    }), m = xe(t), f = [], d = /* @__PURE__ */ new Map();
    v.forEach((g) => {
      let {
        index: y,
        matches: b
      } = g;
      const S = m[y];
      f.push(S), d.set(S.value, b);
    }), a.value = f, i.value = d;
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
function Gs(e, t, n) {
  if (t == null)
    return e;
  if (Array.isArray(t))
    throw new Error("Multiple matches is not implemented");
  return typeof t == "number" && ~t ? u(se, null, [u("span", {
    class: "v-combobox__unmask"
  }, [e.substr(0, t)]), u("span", {
    class: "v-combobox__mask"
  }, [e.substr(t, n)]), u("span", {
    class: "v-combobox__unmask"
  }, [e.substr(t + n)])]) : e;
}
const Us = F({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: {
    type: Boolean,
    default: !0
  },
  delimiters: Array,
  ...js({
    filterKeys: ["title"]
  }),
  ...Oi({
    hideNoData: !0,
    returnObject: !0
  }),
  ...st(ul({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...xt({
    transition: !1
  })
}, "VCombobox"), Ks = K()({
  name: "VCombobox",
  props: Us(),
  emits: {
    "update:focused": (e) => !0,
    "update:modelValue": (e) => !0,
    "update:search": (e) => !0,
    "update:menu": (e) => !0
  },
  setup(e, t) {
    var It;
    let {
      emit: n,
      slots: l
    } = t;
    const {
      t: a
    } = yn(), i = H(), o = G(!1), r = G(!0), s = G(!1), c = H(), v = H(), m = ve(e, "menu"), f = h({
      get: () => m.value,
      set: (T) => {
        var Y;
        m.value && !T && ((Y = c.value) != null && Y.ΨopenChildren.size) || (m.value = T);
      }
    }), d = G(-1);
    let g = !1;
    const y = h(() => {
      var T;
      return (T = i.value) == null ? void 0 : T.color;
    }), b = h(() => f.value ? e.closeText : e.openText), {
      items: S,
      transformIn: A,
      transformOut: E
    } = di(e), {
      textColorClasses: _,
      textColorStyles: B
    } = $e(y), x = ve(e, "modelValue", [], (T) => A(ke(T)), (T) => {
      const Y = E(T);
      return e.multiple ? Y : Y[0] ?? null;
    }), I = ol(), V = h(() => !!(e.chips || l.chip)), R = h(() => V.value || !!l.selection), D = G(!e.multiple && !R.value ? ((It = x.value[0]) == null ? void 0 : It.title) ?? "" : ""), P = h({
      get: () => D.value,
      set: (T) => {
        var Y;
        if (D.value = T ?? "", !e.multiple && !R.value && (x.value = [Ge(e, T)]), T && e.multiple && ((Y = e.delimiters) != null && Y.length)) {
          const de = T.split(new RegExp(`(?:${e.delimiters.join("|")})+`));
          de.length > 1 && (de.forEach((J) => {
            J = J.trim(), J && te(Ge(e, J));
          }), D.value = "");
        }
        T || (d.value = -1), r.value = !T;
      }
    }), k = h(() => typeof e.counterValue == "function" ? e.counterValue(x.value) : typeof e.counterValue == "number" ? e.counterValue : e.multiple ? x.value.length : P.value.length);
    U(D, (T) => {
      g ? pe(() => g = !1) : o.value && !f.value && (f.value = !0), n("update:search", T);
    }), U(x, (T) => {
      var Y;
      !e.multiple && !R.value && (D.value = ((Y = T[0]) == null ? void 0 : Y.title) ?? "");
    });
    const {
      filteredItems: O,
      getMatches: L
    } = Ws(e, S, () => r.value ? "" : P.value), M = h(() => e.hideSelected ? O.value.filter((T) => !x.value.some((Y) => Y.value === T.value)) : O.value), q = h(() => x.value.map((T) => T.value)), Z = h(() => {
      var Y;
      return (e.autoSelectFirst === !0 || e.autoSelectFirst === "exact" && P.value === ((Y = M.value[0]) == null ? void 0 : Y.title)) && M.value.length > 0 && !r.value && !s.value;
    }), W = h(() => e.hideNoData && !M.value.length || e.readonly || (I == null ? void 0 : I.isReadonly.value)), C = H(), p = Ei(C, i);
    function w(T) {
      g = !0, e.openOnClear && (f.value = !0);
    }
    function $() {
      W.value || (f.value = !0);
    }
    function ne(T) {
      W.value || (o.value && (T.preventDefault(), T.stopPropagation()), f.value = !f.value);
    }
    function j(T) {
      var Y;
      On(T) && ((Y = i.value) == null || Y.focus());
    }
    function ie(T) {
      var J;
      if (Ji(T) || e.readonly || I != null && I.isReadonly.value)
        return;
      const Y = i.value.selectionStart, de = x.value.length;
      if ((d.value > -1 || ["Enter", "ArrowDown", "ArrowUp"].includes(T.key)) && T.preventDefault(), ["Enter", "ArrowDown"].includes(T.key) && (f.value = !0), ["Escape"].includes(T.key) && (f.value = !1), ["Enter", "Escape", "Tab"].includes(T.key) && (Z.value && ["Enter", "Tab"].includes(T.key) && !x.value.some((oe) => {
        let {
          value: Be
        } = oe;
        return Be === M.value[0].value;
      }) && te(O.value[0]), r.value = !0), T.key === "ArrowDown" && Z.value && ((J = C.value) == null || J.focus("next")), T.key === "Enter" && P.value && (te(Ge(e, P.value)), R.value && (D.value = "")), ["Backspace", "Delete"].includes(T.key)) {
        if (!e.multiple && R.value && x.value.length > 0 && !P.value)
          return te(x.value[0], !1);
        if (~d.value) {
          const oe = d.value;
          te(x.value[d.value], !1), d.value = oe >= de - 1 ? de - 2 : oe;
        } else
          T.key === "Backspace" && !P.value && (d.value = de - 1);
      }
      if (e.multiple) {
        if (T.key === "ArrowLeft") {
          if (d.value < 0 && Y > 0)
            return;
          const oe = d.value > -1 ? d.value - 1 : de - 1;
          x.value[oe] ? d.value = oe : (d.value = -1, i.value.setSelectionRange(P.value.length, P.value.length));
        }
        if (T.key === "ArrowRight") {
          if (d.value < 0)
            return;
          const oe = d.value + 1;
          x.value[oe] ? d.value = oe : (d.value = -1, i.value.setSelectionRange(0, 0));
        }
      }
    }
    function N() {
      var T;
      e.eager && ((T = v.value) == null || T.calculateVisibleItems());
    }
    function le() {
      var T;
      o.value && (r.value = !0, (T = i.value) == null || T.focus());
    }
    function te(T) {
      let Y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      if (!(!T || T.props.disabled))
        if (e.multiple) {
          const de = x.value.findIndex((oe) => e.valueComparator(oe.value, T.value)), J = Y ?? !~de;
          if (~de) {
            const oe = J ? [...x.value, T] : [...x.value];
            oe.splice(de, 1), x.value = oe;
          } else
            J && (x.value = [...x.value, T]);
          e.clearOnSelect && (P.value = "");
        } else {
          const de = Y !== !1;
          x.value = de ? [T] : [], D.value = de && !R.value ? T.title : "", pe(() => {
            f.value = !1, r.value = !0;
          });
        }
    }
    function ce(T) {
      o.value = !0, setTimeout(() => {
        s.value = !0;
      });
    }
    function ye(T) {
      s.value = !1;
    }
    function jt(T) {
      (T == null || T === "" && !e.multiple && !R.value) && (x.value = []);
    }
    return U(o, (T, Y) => {
      if (!(T || T === Y) && (d.value = -1, f.value = !1, P.value)) {
        if (e.multiple) {
          te(Ge(e, P.value));
          return;
        }
        if (!R.value)
          return;
        x.value.some((de) => {
          let {
            title: J
          } = de;
          return J === P.value;
        }) ? D.value = "" : te(Ge(e, P.value));
      }
    }), U(f, () => {
      if (!e.hideSelected && f.value && x.value.length) {
        const T = M.value.findIndex((Y) => x.value.some((de) => e.valueComparator(de.value, Y.value)));
        me && window.requestAnimationFrame(() => {
          var Y;
          T >= 0 && ((Y = v.value) == null || Y.scrollToIndex(T));
        });
      }
    }), U(() => e.items, (T, Y) => {
      f.value || o.value && !Y.length && T.length && (f.value = !0);
    }), ee(() => {
      const T = !!(!e.hideNoData || M.value.length || l["prepend-item"] || l["append-item"] || l["no-data"]), Y = x.value.length > 0, de = it.filterProps(e);
      return u(it, Q({
        ref: i
      }, de, {
        modelValue: P.value,
        "onUpdate:modelValue": [(J) => P.value = J, jt],
        focused: o.value,
        "onUpdate:focused": (J) => o.value = J,
        validationValue: x.externalValue,
        counterValue: k.value,
        dirty: Y,
        class: ["v-combobox", {
          "v-combobox--active-menu": f.value,
          "v-combobox--chips": !!e.chips,
          "v-combobox--selection-slot": !!R.value,
          "v-combobox--selecting-index": d.value > -1,
          [`v-combobox--${e.multiple ? "multiple" : "single"}`]: !0
        }, e.class],
        style: e.style,
        readonly: e.readonly,
        placeholder: Y ? void 0 : e.placeholder,
        "onClick:clear": w,
        "onMousedown:control": $,
        onKeydown: ie
      }), {
        ...l,
        default: () => u(se, null, [u(pi, Q({
          ref: c,
          modelValue: f.value,
          "onUpdate:modelValue": (J) => f.value = J,
          activator: "parent",
          contentClass: "v-combobox__content",
          disabled: W.value,
          eager: e.eager,
          maxHeight: 310,
          openOnClick: !1,
          closeOnContentClick: !1,
          transition: e.transition,
          onAfterEnter: N,
          onAfterLeave: le
        }, e.menuProps), {
          default: () => [T && u(vi, Q({
            ref: C,
            selected: q.value,
            selectStrategy: e.multiple ? "independent" : "single-independent",
            onMousedown: (J) => J.preventDefault(),
            onKeydown: j,
            onFocusin: ce,
            onFocusout: ye,
            tabindex: "-1",
            "aria-live": "polite",
            color: e.itemColor ?? e.color
          }, p, e.listProps), {
            default: () => {
              var J, oe, Be;
              return [(J = l["prepend-item"]) == null ? void 0 : J.call(l), !M.value.length && !e.hideNoData && (((oe = l["no-data"]) == null ? void 0 : oe.call(l)) ?? u(bt, {
                title: a(e.noDataText)
              }, null)), u(Pi, {
                ref: v,
                renderless: !0,
                items: M.value
              }, {
                default: (et) => {
                  var dl;
                  let {
                    item: we,
                    index: tt,
                    itemRef: Pe
                  } = et;
                  const cl = Q(we.props, {
                    ref: Pe,
                    key: tt,
                    active: Z.value && tt === 0 ? !0 : void 0,
                    onClick: () => te(we, null)
                  });
                  return ((dl = l.item) == null ? void 0 : dl.call(l, {
                    item: we,
                    index: tt,
                    props: cl
                  })) ?? u(bt, Q(cl, {
                    role: "option"
                  }), {
                    prepend: (qt) => {
                      let {
                        isSelected: Wt
                      } = qt;
                      return u(se, null, [e.multiple && !e.hideSelected ? u(Xa, {
                        key: we.value,
                        modelValue: Wt,
                        ripple: !1,
                        tabindex: "-1"
                      }, null) : void 0, we.props.prependAvatar && u(ht, {
                        image: we.props.prependAvatar
                      }, null), we.props.prependIcon && u(fe, {
                        icon: we.props.prependIcon
                      }, null)]);
                    },
                    title: () => {
                      var qt, Wt;
                      return r.value ? we.title : Gs(we.title, (qt = L(we)) == null ? void 0 : qt.title, ((Wt = P.value) == null ? void 0 : Wt.length) ?? 0);
                    }
                  });
                }
              }), (Be = l["append-item"]) == null ? void 0 : Be.call(l)];
            }
          })]
        }), x.value.map((J, oe) => {
          function Be(Pe) {
            Pe.stopPropagation(), Pe.preventDefault(), te(J, !1);
          }
          const et = {
            "onClick:close": Be,
            onKeydown(Pe) {
              Pe.key !== "Enter" && Pe.key !== " " || (Pe.preventDefault(), Pe.stopPropagation(), Be(Pe));
            },
            onMousedown(Pe) {
              Pe.preventDefault(), Pe.stopPropagation();
            },
            modelValue: !0,
            "onUpdate:modelValue": void 0
          }, we = V.value ? !!l.chip : !!l.selection, tt = we ? Kn(V.value ? l.chip({
            item: J,
            index: oe,
            props: et
          }) : l.selection({
            item: J,
            index: oe
          })) : void 0;
          if (!(we && !tt))
            return u("div", {
              key: J.value,
              class: ["v-combobox__selection", oe === d.value && ["v-combobox__selection--selected", _.value]],
              style: oe === d.value ? B.value : {}
            }, [V.value ? l.chip ? u(Ce, {
              key: "chip-defaults",
              defaults: {
                VChip: {
                  closable: e.closableChips,
                  size: "small",
                  text: J.title
                }
              }
            }, {
              default: () => [tt]
            }) : u(il, Q({
              key: "chip",
              closable: e.closableChips,
              size: "small",
              text: J.title,
              disabled: J.props.disabled
            }, et), null) : tt ?? u("span", {
              class: "v-combobox__selection-text"
            }, [J.title, e.multiple && oe < x.value.length - 1 && u("span", {
              class: "v-combobox__selection-comma"
            }, [en(",")])])]);
        })]),
        "append-inner": function() {
          var et;
          for (var J = arguments.length, oe = new Array(J), Be = 0; Be < J; Be++)
            oe[Be] = arguments[Be];
          return u(se, null, [(et = l["append-inner"]) == null ? void 0 : et.call(l, ...oe), (!e.hideNoData || e.items.length) && e.menuIcon ? u(fe, {
            class: "v-combobox__menu-icon",
            icon: e.menuIcon,
            onMousedown: ne,
            onClick: no,
            "aria-label": a(b.value),
            title: a(b.value),
            tabindex: "-1"
          }, null) : void 0]);
        }
      });
    }), bn({
      isFocused: o,
      isPristine: r,
      menu: f,
      search: P,
      selectionIndex: d,
      filteredItems: O,
      select: te
    }, i);
  }
}), Ys = { key: 0 }, Xs = {
  key: 1,
  style: { color: "grey", "font-size": "small" }
}, Qs = /* @__PURE__ */ Le("img", {
  src: oa,
  alt: "delete",
  height: "20"
}, null, -1);
function Js(e, t, n, l, a, i) {
  return he(), Te("div", {
    class: "rule-hover",
    style: Gi(n.id === 0 ? "margin-top: 20px" : "margin-top: 0px")
  }, [
    Le("div", null, [
      u(Nn, {
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
    Le("div", null, [
      u(Nn, {
        style: { width: "200px" },
        label: "operator",
        variant: "outlined",
        density: "compact",
        "hide-details": "",
        "item-title": "text",
        "item-value": "text",
        "return-object": "",
        items: n.operators,
        modelValue: a.operator,
        "onUpdate:modelValue": t[1] || (t[1] = (o) => a.operator = o)
      }, null, 8, ["items", "modelValue"])
    ]),
    i.hideValue ? Ue("", !0) : (he(), Te("div", Ys, [
      i.showTextField ? (he(), vt(it, {
        key: 0,
        label: "value",
        variant: "outlined",
        density: "compact",
        "hide-details": "",
        modelValue: i.value,
        "onUpdate:modelValue": t[2] || (t[2] = (o) => i.value = o),
        clearable: "",
        style: { "min-width": "200px" }
      }, null, 8, ["modelValue"])) : i.showPlaceHolder ? (he(), vt(it, {
        key: 1,
        lable: "value",
        variant: "outlined",
        density: "compact",
        "hide-details": "",
        modelValue: i.value,
        "onUpdate:modelValue": t[3] || (t[3] = (o) => i.value = o),
        clearable: "",
        style: { "min-width": "200px" }
      }, null, 8, ["modelValue"])) : i.showRegexpField ? (he(), vt(it, {
        key: 2,
        lable: "value",
        variant: "outlined",
        density: "compact",
        "hide-details": "",
        modelValue: i.value,
        "onUpdate:modelValue": t[4] || (t[4] = (o) => i.value = o),
        clearable: "",
        style: { "min-width": "200px" },
        prefix: "/",
        suffix: "/g",
        rules: [i.validRegexpInput]
      }, null, 8, ["modelValue", "rules"])) : i.showCombobox ? (he(), vt(Ks, {
        key: 3,
        items: i.value,
        modelValue: i.value,
        "onUpdate:modelValue": t[5] || (t[5] = (o) => i.value = o),
        label: "value",
        multiple: "",
        clearable: "",
        variant: "outlined",
        density: "compact",
        "hide-details": "",
        style: { "max-height": "100px", "min-width": "250px" }
      }, {
        selection: gt(({ item: o, index: r }) => [
          r < 2 ? (he(), vt(il, {
            key: 0,
            small: ""
          }, {
            default: gt(() => [
              Le("span", null, fl(o.title), 1)
            ]),
            _: 2
          }, 1024)) : Ue("", !0),
          r === 2 ? (he(), Te("span", Xs, "(+" + fl(i.value.length - 2) + " others)", 1)) : Ue("", !0)
        ]),
        _: 1
      }, 8, ["items", "modelValue"])) : Ue("", !0)
    ])),
    Le("div", null, [
      u(fe, {
        onClick: t[6] || (t[6] = (o) => i.removeRule())
      }, {
        default: gt(() => [
          Qs
        ]),
        _: 1
      })
    ])
  ], 4);
}
const Zs = /* @__PURE__ */ ra(Ui, [["render", Js]]);
class Zt {
  constructor(t, n = "query-builder-group", l = 1) {
    Gt(this, "query");
    Gt(this, "type");
    Gt(this, "originalIndex");
    this.query = t, this.type = n, this.originalIndex = l;
  }
}
const eu = zn({
  name: "QueryBuilderGroup",
  components: {
    QueryBuilderRule: Zs
  },
  props: {
    group: {
      type: Zt,
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
    },
    operators: {
      type: Object,
      required: !0
    }
  },
  computed: {
    sortedRules() {
      var e;
      return (e = this.group.query.children) == null ? void 0 : e.filter((t, n) => (t.originalIndex = n, t.type === "query-builder-rule")).map((t) => new Zt(
        t.query,
        t.type,
        t.originalIndex
      ));
    },
    sortedGroups() {
      var e;
      return (e = this.group.query.children) == null ? void 0 : e.filter((t) => t.type === "query-builder-group").map((t) => new Zt(t.query, t.type, t.originalIndex));
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
}), Bi = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z'%20/%3e%3c/svg%3e", Ti = F({
  baseColor: String,
  divided: Boolean,
  ...kt(),
  ...ae(),
  ...Qe(),
  ...zt(),
  ...qe(),
  ..._e(),
  ...Se(),
  ...dt()
}, "VBtnGroup"), ea = K()({
  name: "VBtnGroup",
  props: Ti(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const {
      themeClasses: l
    } = Ae(e), {
      densityClasses: a
    } = Je(e), {
      borderClasses: i
    } = Vt(e), {
      elevationClasses: o
    } = Ht(e), {
      roundedClasses: r
    } = We(e);
    Mt({
      VBtn: {
        height: "auto",
        baseColor: z(e, "baseColor"),
        color: z(e, "color"),
        density: z(e, "density"),
        flat: !0,
        variant: z(e, "variant")
      }
    }), ee(() => u(e.tag, {
      class: ["v-btn-group", {
        "v-btn-group--divided": e.divided
      }, l.value, i.value, a.value, o.value, r.value, e.class],
      style: e.style
    }, n));
  }
}), Li = Symbol.for("vuetify:v-btn-toggle"), tu = F({
  ...Ti(),
  ...tl()
}, "VBtnToggle");
K()({
  name: "VBtnToggle",
  props: tu(),
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
    } = nl(e, Li);
    return ee(() => {
      const s = ea.filterProps(e);
      return u(ea, Q({
        class: ["v-btn-toggle", e.class]
      }, s, {
        style: e.style
      }), {
        default: () => {
          var c;
          return [(c = n.default) == null ? void 0 : c.call(n, {
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
const nu = F({
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
  ...ae(),
  ...Dt(),
  ..._e({
    tag: "div"
  }),
  ...Se()
}, "VProgressCircular"), lu = K()({
  name: "VProgressCircular",
  props: nu(),
  setup(e, t) {
    let {
      slots: n
    } = t;
    const l = 20, a = 2 * Math.PI * l, i = H(), {
      themeClasses: o
    } = Ae(e), {
      sizeClasses: r,
      sizeStyles: s
    } = Nt(e), {
      textColorClasses: c,
      textColorStyles: v
    } = $e(z(e, "color")), {
      textColorClasses: m,
      textColorStyles: f
    } = $e(z(e, "bgColor")), {
      intersectionRef: d,
      isIntersecting: g
    } = wi(), {
      resizeRef: y,
      contentRect: b
    } = Bt(), S = h(() => Math.max(0, Math.min(100, parseFloat(e.modelValue)))), A = h(() => Number(e.width)), E = h(() => s.value ? Number(e.size) : b.value ? b.value.width : Math.max(A.value, 32)), _ = h(() => l / (1 - A.value / E.value) * 2), B = h(() => A.value / E.value * _.value), x = h(() => X((100 - S.value) / 100 * a));
    return He(() => {
      d.value = i.value, y.value = i.value;
    }), ee(() => u(e.tag, {
      ref: i,
      class: ["v-progress-circular", {
        "v-progress-circular--indeterminate": !!e.indeterminate,
        "v-progress-circular--visible": g.value,
        "v-progress-circular--disable-shrink": e.indeterminate === "disable-shrink"
      }, o.value, r.value, c.value, e.class],
      style: [s.value, v.value, e.style],
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
        viewBox: `0 0 ${_.value} ${_.value}`
      }, [u("circle", {
        class: ["v-progress-circular__underlay", m.value],
        style: f.value,
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: l,
        "stroke-width": B.value,
        "stroke-dasharray": a,
        "stroke-dashoffset": 0
      }, null), u("circle", {
        class: "v-progress-circular__overlay",
        fill: "transparent",
        cx: "50%",
        cy: "50%",
        r: l,
        "stroke-width": B.value,
        "stroke-dasharray": a,
        "stroke-dashoffset": x.value
      }, null)]), n.default && u("div", {
        class: "v-progress-circular__content"
      }, [n.default({
        value: S.value
      })])]
    })), {};
  }
}), au = ["static", "relative", "fixed", "absolute", "sticky"], iu = F({
  position: {
    type: String,
    validator: (
      /* istanbul ignore next */
      (e) => au.includes(e)
    )
  }
}, "position");
function ou(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ne();
  return {
    positionClasses: h(() => e.position ? `${t}--${e.position}` : void 0)
  };
}
function ru(e, t) {
  U(() => {
    var n;
    return (n = e.isActive) == null ? void 0 : n.value;
  }, (n) => {
    e.isLink.value && n && t && pe(() => {
      t(!0);
    });
  }, {
    immediate: !0
  });
}
const su = F({
  active: {
    type: Boolean,
    default: void 0
  },
  activeColor: String,
  baseColor: String,
  symbol: {
    type: null,
    default: Li
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object],
  prependIcon: re,
  appendIcon: re,
  block: Boolean,
  readonly: Boolean,
  slim: Boolean,
  stacked: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: !0
  },
  text: String,
  ...kt(),
  ...ae(),
  ...Qe(),
  ...ut(),
  ...zt(),
  ...Oa(),
  ...Vi(),
  ...xi(),
  ...iu(),
  ...qe(),
  ...al(),
  ...Dt(),
  ..._e({
    tag: "button"
  }),
  ...Se(),
  ...dt({
    variant: "elevated"
  })
}, "VBtn"), ta = K()({
  name: "VBtn",
  props: su(),
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
    } = Ae(e), {
      borderClasses: i
    } = Vt(e), {
      densityClasses: o
    } = Je(e), {
      dimensionStyles: r
    } = ct(e), {
      elevationClasses: s
    } = Ht(e), {
      loaderClasses: c
    } = Ii(e), {
      locationStyles: v
    } = ki(e), {
      positionClasses: m
    } = ou(e), {
      roundedClasses: f
    } = We(e), {
      sizeClasses: d,
      sizeStyles: g
    } = Nt(e), y = Ba(e, e.symbol, !1), b = ll(e, n), S = h(() => {
      var P;
      return e.active !== void 0 ? e.active : b.isLink.value ? (P = b.isActive) == null ? void 0 : P.value : y == null ? void 0 : y.isSelected.value;
    }), A = h(() => S.value ? e.activeColor ?? e.color : e.color), E = h(() => {
      var k, O;
      return {
        color: (y == null ? void 0 : y.isSelected.value) && (!b.isLink.value || ((k = b.isActive) == null ? void 0 : k.value)) || !y || ((O = b.isActive) == null ? void 0 : O.value) ? A.value ?? e.baseColor : e.baseColor,
        variant: e.variant
      };
    }), {
      colorClasses: _,
      colorStyles: B,
      variantClasses: x
    } = gn(E), I = h(() => (y == null ? void 0 : y.disabled.value) || e.disabled), V = h(() => e.variant === "elevated" && !(e.disabled || e.flat || e.border)), R = h(() => {
      if (!(e.value === void 0 || typeof e.value == "symbol"))
        return Object(e.value) === e.value ? JSON.stringify(e.value, null, 0) : e.value;
    });
    function D(P) {
      var k;
      I.value || b.isLink.value && (P.metaKey || P.ctrlKey || P.shiftKey || P.button !== 0 || n.target === "_blank") || ((k = b.navigate) == null || k.call(b, P), y == null || y.toggle());
    }
    return ru(b, y == null ? void 0 : y.select), ee(() => {
      const P = b.isLink.value ? "a" : e.tag, k = !!(e.prependIcon || l.prepend), O = !!(e.appendIcon || l.append), L = !!(e.icon && e.icon !== !0);
      return Fe(u(P, {
        type: P === "a" ? void 0 : "button",
        class: ["v-btn", y == null ? void 0 : y.selectedClass.value, {
          "v-btn--active": S.value,
          "v-btn--block": e.block,
          "v-btn--disabled": I.value,
          "v-btn--elevated": V.value,
          "v-btn--flat": e.flat,
          "v-btn--icon": !!e.icon,
          "v-btn--loading": e.loading,
          "v-btn--readonly": e.readonly,
          "v-btn--slim": e.slim,
          "v-btn--stacked": e.stacked
        }, a.value, i.value, _.value, o.value, s.value, c.value, m.value, f.value, d.value, x.value, e.class],
        style: [B.value, r.value, v.value, g.value, e.style],
        "aria-busy": e.loading ? !0 : void 0,
        disabled: I.value || void 0,
        href: b.href.value,
        tabindex: e.loading || e.readonly ? -1 : void 0,
        onClick: D,
        value: R.value
      }, {
        default: () => {
          var M;
          return [mn(!0, "v-btn"), !e.icon && k && u("span", {
            key: "prepend",
            class: "v-btn__prepend"
          }, [l.prepend ? u(Ce, {
            key: "prepend-defaults",
            disabled: !e.prependIcon,
            defaults: {
              VIcon: {
                icon: e.prependIcon
              }
            }
          }, l.prepend) : u(fe, {
            key: "prepend-icon",
            icon: e.prependIcon
          }, null)]), u("span", {
            class: "v-btn__content",
            "data-no-activator": ""
          }, [!l.default && L ? u(fe, {
            key: "content-icon",
            icon: e.icon
          }, null) : u(Ce, {
            key: "content-defaults",
            disabled: !L,
            defaults: {
              VIcon: {
                icon: e.icon
              }
            }
          }, {
            default: () => {
              var q;
              return [((q = l.default) == null ? void 0 : q.call(l)) ?? e.text];
            }
          })]), !e.icon && O && u("span", {
            key: "append",
            class: "v-btn__append"
          }, [l.append ? u(Ce, {
            key: "append-defaults",
            disabled: !e.appendIcon,
            defaults: {
              VIcon: {
                icon: e.appendIcon
              }
            }
          }, l.append) : u(fe, {
            key: "append-icon",
            icon: e.appendIcon
          }, null)]), !!e.loading && u("span", {
            key: "loader",
            class: "v-btn__loader"
          }, [((M = l.loader) == null ? void 0 : M.call(l)) ?? u(lu, {
            color: typeof e.loading == "boolean" ? void 0 : e.loading,
            indeterminate: !0,
            width: "2"
          }, null)])];
        }
      }), [[hn, !I.value && e.ripple, "", {
        center: !!e.icon
      }]]);
    }), {
      group: y
    };
  }
}), uu = { class: "group-wrap" }, cu = {
  key: 0,
  class: "group-header"
}, du = /* @__PURE__ */ Le("img", {
  src: Bi,
  alt: "add",
  height: "20"
}, null, -1), fu = /* @__PURE__ */ Le("img", {
  src: Bi,
  alt: "add",
  height: "20"
}, null, -1), vu = {
  key: 0,
  style: { "margin-left": "auto" }
}, mu = /* @__PURE__ */ Le("img", {
  src: oa,
  alt: "delete",
  height: "20"
}, null, -1), gu = { class: "child-wrap" }, yu = { class: "child-wrap" };
function hu(e, t, n, l, a, i) {
  const o = vl("query-builder-rule"), r = vl("query-builder-group", !0);
  return he(), Te("div", uu, [
    e.group.query ? (he(), Te("div", cu, [
      Le("div", null, [
        u(ta, {
          class: "mr-2",
          onClick: e.addGroup
        }, {
          default: gt(() => [
            du,
            en("group ")
          ]),
          _: 1
        }, 8, ["onClick"])
      ]),
      Le("div", null, [
        u(ta, {
          class: "mr-2",
          onClick: e.addRule
        }, {
          default: gt(() => [
            fu,
            en(" rule ")
          ]),
          _: 1
        }, 8, ["onClick"])
      ]),
      Le("div", null, [
        e.group.query.children.length > 1 ? (he(), vt(Nn, {
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
        }, null, 8, ["modelValue"])) : Ue("", !0)
      ]),
      e.removable ? (he(), Te("div", vu, [
        u(fe, { onClick: e.removeGroup }, {
          default: gt(() => [
            mu
          ]),
          _: 1
        }, 8, ["onClick"])
      ])) : Ue("", !0)
    ])) : Ue("", !0),
    Le("div", null, [
      (he(!0), Te(se, null, ml(e.sortedRules, (s) => (he(), Te("div", gu, [
        u(o, {
          rule: s,
          id: s.originalIndex ?? 0,
          fields: e.fields,
          onRemoveRule: e.removeNestedRule,
          operators: e.operators
        }, null, 8, ["rule", "id", "fields", "onRemoveRule", "operators"])
      ]))), 256)),
      (he(!0), Te(se, null, ml(e.sortedGroups, (s) => (he(), Te("div", yu, [
        u(r, {
          group: s,
          id: s.originalIndex ?? 0,
          fields: e.fields,
          onRemoveGroup: e.removeNestedGroup,
          operators: e.operators
        }, null, 8, ["group", "id", "fields", "onRemoveGroup", "operators"])
      ]))), 256))
    ])
  ]);
}
const bu = /* @__PURE__ */ ra(eu, [["render", hu]]), Su = [
  { value: "eq", text: "=", type: "string" },
  { value: "ne", text: "!=", type: "string" },
  { value: "gt", text: ">", type: "string" },
  { value: "lt", text: "<", type: "string" },
  { value: "gte", text: ">=", type: "string" },
  { value: "lte", text: "<=", type: "string" },
  { value: "regexp", text: "regexp", type: "regexp" },
  { value: "not regexp", text: "not regexp", type: "regexp" },
  { value: "like", text: "like", type: "string" },
  { value: "not like", text: "not like", type: "string" },
  { value: "exists", text: "exists", type: "none" },
  { value: "not exists", text: "not exists", type: "none" },
  { value: "is null", text: "is null", type: "none" },
  { value: "not null", text: "not null", type: "none" },
  { value: "in", text: "in", type: "array" },
  { value: "not in", text: "not in", type: "array" },
  { value: "in", text: "in placeholder", type: "placeholder" },
  { value: "not in", text: "not in placeholder", type: "placeholder" }
], Cu = { key: 0 }, xu = /* @__PURE__ */ zn({
  __name: "QueryBuilder",
  props: {
    filterFields: {
      type: Array,
      required: !0
    },
    modelValue: { type: Object, required: !0 },
    color: {
      type: String
    },
    operators: {
      type: Object,
      required: !1,
      default: Su
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, l = t;
    function a(o) {
      n.modelValue.children.splice(o, 1);
    }
    const i = h(function() {
      return new Zt(n.modelValue);
    });
    return pt(() => {
      var o;
      ((o = n.modelValue) == null ? void 0 : o.children) === void 0 && l("update:modelValue", { children: [], logicalOperator: "AND" });
    }), (o, r) => (he(), Te("div", null, [
      e.modelValue.children ? (he(), Te("div", Cu, [
        u(bu, {
          group: i.value,
          id: i.value.originalIndex ?? 0,
          fields: e.filterFields,
          removable: !1,
          onRemoveGroup: a,
          color: e.color,
          operators: e.operators
        }, null, 8, ["group", "id", "fields", "color", "operators"])
      ])) : Ue("", !0)
    ]));
  }
});
export {
  xu as default
};
