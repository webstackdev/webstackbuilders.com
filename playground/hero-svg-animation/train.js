/**
 *
 */
function focusMainContent() {
  document.getElementById("main").focus();
}
/**
 *
 */
function focusContactUsSection() {
  document.getElementById("contact").focus();
}
/**
 *
 * @param t
 * @param o
 */
function toggleAccordion(t, o) {
  toggleAccordionTab(t, o), toggleAccordionPanel(t, o);
}
/**
 *
 * @param t
 * @param o
 */
function keyboardToggleAccordion(t, o) {
  13 === event.keyCode && toggleAccordion(t, o);
}
/**
 *
 * @param t
 * @param o
 */
function toggleAccordionTab(t, o) {
  var e = document.getElementById("accordion-tab-" + t.toString() + "-" + o),
    c = "true" === e.getAttribute("aria-selected");
  e.setAttribute("aria-selected", !c), toggleAccordionIcon(t, o, c);
}
/**
 *
 * @param t
 * @param o
 */
function toggleAccordionPanel(t, o) {
  var e = document.getElementById("accordion-panel-" + t.toString() + "-" + o),
    c = "true" === e.getAttribute("aria-hidden");
  e.setAttribute("aria-hidden", !c);
}
/**
 *
 * @param t
 * @param o
 * @param e
 */
function toggleAccordionIcon(t, o, e) {
  var c = document.getElementById("accordion-icon-" + t.toString() + "-" + o);
  return e ? c.classList.remove("accordion__item-container__tab__icon--active") : c.classList.add("accordion__item-container__tab__icon--active");
}
/**
 *
 * @param e
 */
function toggleCaseStudyContentVisibility(e) {
  const t = document.getElementsByClassName("case-studies__case__card__brief__expand-button")[e];
  t.classList.toggle("case-studies__case__card__brief__expand-button--active");
  const s = document.getElementsByClassName("case-studies__case__content")[e];
  t.classList.contains("case-studies__case__card__brief__expand-button--active") &&
    ga("send", { hitType: "event", eventCategory: "Case study", eventAction: "expand", eventLabel: document.getElementsByClassName("case-studies__case")[e].getAttribute("id") });
  const a = t.getAttribute("aria-label");
  s.classList.contains("case-studies__case__content--hidden")
    ? (t.setAttribute("aria-expanded", "true"), t.setAttribute("aria-label", a.replace("Expand", "Collapse")), s.classList.toggle("case-studies__case__content--hidden"), s.focus())
    : (t.setAttribute("aria-expanded", "false"),
      t.setAttribute("aria-label", a.replace("Collapse", "Expand")),
      t.focus(),
      setTimeout(function () {
        s.classList.toggle("case-studies__case__content--hidden");
      }, 500)),
    s.style.maxHeight ? (s.style.maxHeight = null) : (s.style.maxHeight = s.scrollHeight + "px");
}
/**
 *
 */
function submitContact() {
  ga("send", { hitType: "event", eventCategory: "Contact form", eventAction: "submit" }),
    (document.getElementById("submitButton").value = "Sending..."),
    (document.getElementById("submitButton").disabled = !0),
    document.getElementById("submitButton").setAttribute("aria-busy", "true"),
    (document.getElementById("contact-form-status-message").innerHTML = ""),
    (document.getElementById("contact-form-error-message").innerHTML = "");
  var e = document.getElementById("firstname").value,
    t = document.getElementById("lastname").value,
    n = document.getElementById("email").value,
    m = document.getElementById("phone").value,
    a = document.getElementById("message").value,
    u = "Message from Finweb",
    o = "Message from " + e + " " + t + ". Email: " + n + " Phone: " + m + " Message: " + a;
  xmlhttp = new XMLHttpRequest();
  var s = "https://prophesy-server.herokuapp.com/api/contact";
  xmlhttp.open("POST", s, !0),
    xmlhttp.setRequestHeader("Content-type", "application/json"),
    (xmlhttp.onreadystatechange = function () {
      4 == xmlhttp.readyState &&
        (200 == xmlhttp.status
          ? ((document.getElementById("contact-form-status-message").innerHTML = "Submitted message, we will get back to you shortly."),
            (document.getElementById("firstname").value = ""),
            (document.getElementById("lastname").value = ""),
            (document.getElementById("email").value = ""),
            (document.getElementById("phone").value = ""),
            (document.getElementById("message").value = ""))
          : (document.getElementById("contact-form-error-message").innerHTML = "Error sending message. Please try again."),
        (document.getElementById("submitButton").value = "Submit"),
        (document.getElementById("submitButton").disabled = !1),
        document.getElementById("submitButton").setAttribute("aria-busy", "false"));
    });
  var d = { subject: u, body: o };
  return xmlhttp.send(JSON.stringify(d)), !1;
}
/**
 *
 * @param e
 */
function openCase(e) {
  collapseAllOtherOpenCases(e), toggleCaseARIAExpanded(e), showOverlay(e), showContent(e), growTile(e), autoScroll();
}
/**
 *
 * @param e
 */
function closeCase(e) {
  toggleCaseARIAExpanded(e),
    fadeOut("overlay", e),
    shrinkTile(e),
    hideOverlay(e),
    setTimeout(function () {
      resetCase("case", e);
    }, 300),
    hide("backdrop", ""),
    setTimeout(function () {
      remove("case_" + e, "shrink-case_" + e), remove("body", "no-scroll");
    }, 300);
}
/**
 *
 * @param e
 */
function openMobileCase(e) {
  showOverlay(e),
    showContent(e),
    isGreaterThanWidth(48) ? growMobileTile(e) : slideInTile(e),
    scrollDown(),
    listenForEscape(e),
    setTimeout(function () {
      add("body", "no-scroll"), hideAllItemsBehindDialog(e), show("backdrop", ""), shiftFocusIntoDialog(e);
    }, 300);
}
/**
 *
 * @param e
 */
function closeMobileCase(e) {
  document.removeEventListener("keyup", escapeKeyHandler),
    fadeOut("mobile_overlay", e),
    shrinkMobileTile(e),
    setTimeout(function () {
      hideOverlay(e);
    }, 300),
    resetCase("mobile_case", e),
    showAllHiddenItemsBehindDialog(e),
    hide("backdrop", ""),
    shiftFocusBackToButton(e),
    setTimeout(function () {
      remove("mobile_case_" + e, "shrink-case_" + e), remove("body", "no-scroll");
    }, 300);
}
/**
 *
 * @param e
 */
function toggleCase(e) {
  var o = document.getElementById("case_" + e),
    t = o.getAttribute("aria-expanded");
  "true" === t ? closeCase(e) : openCase(e);
}
/**
 *
 * @param e
 */
function collapseAllOtherOpenCases(e) {
  for (var o = document.querySelectorAll('button[id^="case_"]'), t = 0; t < o.length; t++) {
    var i = o[t];
    "true" === i.getAttribute("aria-expanded") && closeCase(t + 1);
  }
}
/**
 *
 * @param e
 * @param o
 */
function add(e, o) {
  document.getElementById(e).classList.add(o);
}
/**
 *
 * @param e
 * @param o
 */
function remove(e, o) {
  document.getElementById(e).classList.remove(o);
}
/**
 *
 * @param e
 * @param o
 */
function moveToRoot(e, o) {
  var t = document.getElementById("body"),
    i = document.getElementById(e + "_" + o);
  t.appendChild(i);
}
/**
 *
 * @param e
 * @param o
 */
function insertBefore(e, o) {
  var t = document.getElementById(e),
    i = document.getElementById(o);
  i.parentNode.insertBefore(t, i);
}
/**
 *
 * @param e
 * @param o
 */
function insertAfter(e, o) {
  var t = document.getElementById(e),
    i = document.getElementById(o);
  i.parentNode.insertBefore(t, i.nextSibling);
}
/**
 *
 * @param e
 * @param o
 */
function fadeIn(e, o) {
  remove(e + "_" + o, "fade-out"), add(e + "_" + o, "fade-in");
}
/**
 *
 * @param e
 * @param o
 */
function fadeOut(e, o) {
  remove(e + "_" + o, "fade-in"), add(e + "_" + o, "fade-out");
}
/**
 *
 * @param e
 * @param o
 */
function show(e, o) {
  remove(e + "_" + o, "hide"), add(e + "_" + o, "show");
}
/**
 *
 * @param e
 * @param o
 */
function showFlex(e, o) {
  remove(e + "_" + o, "hide"), add(e + "_" + o, "show-flex");
}
/**
 *
 * @param e
 * @param o
 */
function hide(e, o) {
  remove(e + "_" + o, "show"), add(e + "_" + o, "hide");
}
/**
 *
 * @param e
 * @param o
 */
function hideFlex(e, o) {
  remove(e + "_" + o, "show-flex"), add(e + "_" + o, "hide");
}
/**
 *
 * @param e
 * @param o
 */
function grow(e, o) {
  var t = e + "_" + o;
  remove(t, "reset-" + e), remove(t, "shrink-" + t), add(t, "grow-" + t);
}
/**
 *
 * @param e
 */
function growMobile(e) {
  var o = "mobile_case_" + e;
  remove(o, "reset-case"), remove(o, "shrink-case_" + e), add(o, "grow-mobile-case_" + e);
}
/**
 *
 * @param e
 */
function slideIn(e) {
  var o = "mobile_case_" + e;
  remove(o, "reset-case"), remove(o, "shrink-case_" + e), add(o, "slide-in-case_" + e);
}
/**
 *
 * @param e
 * @param o
 */
function shrink(e, o) {
  var t = e + "_" + o;
  remove(t, "grow-" + t), add(t, "shrink-" + t);
}
/**
 *
 * @param e
 * @param o
 */
function resetCase(e, o) {
  var t = e + "_" + o;
  add(t, "reset-case");
}
/**
 *
 * @param e
 */
function growTile(e) {
  hide("desc", e), grow("case", e);
}
/**
 *
 * @param e
 */
function growMobileTile(e) {
  moveToRoot("mobile_case_header", e), hide("mobile_desc", e), growMobile(e);
}
/**
 *
 * @param e
 */
function slideInTile(e) {
  moveToRoot("mobile_case_header", e), hide("mobile_desc", e), slideIn(e);
}
/**
 *
 * @param e
 */
function shrinkTile(e) {
  show("desc", e), shrink("case", e), isAtRoot("case", e) && (insertBefore("case_" + e, "overlay_" + (parseInt(e) + 1)), scrollDown());
}
/**
 *
 * @param e
 */
function shrinkMobileTile(e) {
  show("mobile_desc", e),
    remove("mobile_case_" + e, "grow-case_" + e),
    remove("mobile_case_" + e, "grow-mobile-case_" + e),
    remove("mobile_case_" + e, "slide-in-case_" + e),
    isAtRoot("mobile_case_header", e) && (insertAfter("mobile_case_header_" + e, "mobile_overlay_" + (parseInt(e) - 1)), scrollDown());
}
/**
 *
 * @param e
 */
function showOverlay(e) {
  isGreaterThanWidth(64)
    ? setTimeout(function () {
        showFlex("overlay", e);
      }, 300)
    : (moveToRoot("mobile_overlay", e),
      setTimeout(function () {
        showFlex("mobile_overlay", e);
      }, 300));
}
/**
 *
 * @param e
 */
function hideOverlay(e) {
  isGreaterThanWidth(64)
    ? (hideFlex("overlay", e),
      remove("case_" + e, "slide-in-case_" + e),
      remove("case_" + e, "grow-mobile-case_" + e),
      isAtRoot("overlay", e) &&
        setTimeout(function () {
          insertBefore("overlay_" + e, "case_header_" + (parseInt(e) + 1));
        }, 50))
    : (hideFlex("mobile_overlay", e),
      remove("mobile_case_" + e, "slide-in-case_" + e),
      remove("mobile_case_" + e, "grow-mobile-case_" + e),
      isAtRoot("mobile_overlay", e) &&
        setTimeout(function () {
          insertBefore("mobile_overlay_" + e, "mobile_case_header_" + (parseInt(e) + 1));
        }, 50));
}
/**
 *
 * @param e
 */
function showContent(e) {
  isGreaterThanWidth(64)
    ? (fadeIn("overlay", e),
      setTimeout(function () {
        fadeIn("full-desc", e), fadeIn("preview", e);
      }, 400))
    : (fadeIn("mobile_overlay", e),
      setTimeout(function () {
        fadeIn("mobile_full-desc", e), fadeIn("mobile_preview", e);
      }, 400));
}
/**
 *
 * @param e
 */
function hideContent(e) {
  fadeOut("overlay", e), fadeOut("full-desc", e), fadeOut("preview", e);
}
/**
 *
 */
function autoScroll() {
  return window.pageYOffset < 530 ? window.scrollTo(0, 530) : window.pageYOffset > 1050 ? window.scrollTo(0, 1050) : void 0;
}
/**
 *
 */
function scrollDown() {
  if (window.pageYOffset < 780) return window.scrollTo(0, 780);
}
/**
 *
 * @param e
 */
function isGreaterThanWidth(e) {
  var o = window.innerWidth / parseFloat(getComputedStyle(document.querySelector("html"))["font-size"]);
  return o > e;
}
/**
 *
 * @param e
 * @param o
 */
function isAtRoot(e, o) {
  var t = document.getElementById(e + "_" + o);
  return "BODY" === t.parentNode.nodeName;
}
/**
 *
 * @param e
 */
function toggleCaseARIAExpanded(e) {
  var o = document.getElementById("case_" + e),
    t = o.getAttribute("aria-expanded");
  o.setAttribute("aria-expanded", "true" === t ? "false" : "true");
}
/**
 *
 * @param e
 */
function shiftFocusIntoDialog(e) {
  var o = document.getElementById("mobile_full-desc_" + e);
  o.focus();
}
/**
 *
 * @param e
 */
function shiftFocusBackToButton(e) {
  var o = document.getElementById("mobile_case_" + e);
  o.focus();
}
/**
 *
 * @param e
 */
function hideAllItemsBehindDialog(e) {
  document.getElementById("content").setAttribute("style", "visibility: hidden"),
    document.getElementById("skip-to-main").setAttribute("style", "visibility: hidden"),
    document.getElementById("mobile_case_header_" + e).setAttribute("style", "visibility: hidden");
}
/**
 *
 * @param e
 */
function showAllHiddenItemsBehindDialog(e) {
  document.getElementById("content").setAttribute("style", "visibility: initial"),
    document.getElementById("skip-to-main").setAttribute("style", "visibility: initial"),
    document.getElementById("mobile_case_header_" + e).setAttribute("style", "visibility: initial");
}
/**
 *
 * @param e
 */
function listenForEscape(e) {
  (escapeKeyHandler = function (o) {
    "Escape" === o.key && closeMobileCase(e);
  }),
    document.addEventListener("keyup", escapeKeyHandler);
}
var escapeKeyHandler = null;
/**
 *
 * @param e
 */
function toggleSubMenu(e) {
  window.matchMedia("(max-width: 48em)").matches && event && event.preventDefault();
  var n = document.getElementById(e),
    u = n.getElementsByClassName("navbar__menu__sub-menu__popup")[0];
  u.classList.toggle("navbar__menu__sub-menu__popup--active");
}
/**
 *
 * @param e
 */
function hideSubMenu(e) {
  var n = document.getElementById(e),
    u = n.getElementsByClassName("navbar__menu__sub-menu__popup")[0];
  u.classList.remove("navbar__menu__sub-menu__popup--active");
}
/**
 *
 * @param e
 */
function showSubMenu(e) {
  var n = document.getElementById(e),
    u = n.getElementsByClassName("navbar__menu__sub-menu__popup")[0];
  return u.classList.add("navbar__menu__sub-menu__popup--active"), { menu: n, subMenu: u };
}
/**
 *
 */
function hideAllSubMenu() {
  var e = document.getElementsByClassName("navbar__menu__sub-menu");
  if (e && e.length > 0)
    for (var n = 0; n < e.length; n++) {
      var u = e[n].getElementsByClassName("navbar__menu__sub-menu__popup")[0];
      u.classList.remove("navbar__menu__sub-menu__popup--active");
    }
}
/**
 *
 * @param e
 */
function focusOnPreviousSubMenu(e) {
  var n = event.shiftKey && 9 == event.keyCode;
  if ((console.log("shiftKeyAndTabPressed", n), n)) {
    var u = showSubMenu(e),
      t = u.subMenu;
    t.lastElementChild.firstElementChild.focus();
  }
}
