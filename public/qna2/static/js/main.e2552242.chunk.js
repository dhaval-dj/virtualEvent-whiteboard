var qnaCollectionName='qnal2';

(this["webpackJsonpkeeper-app-part-1-starting"] = this["webpackJsonpkeeper-app-part-1-starting"] || []).push([
	[0], {
		13: function (e, t, a) {
			e.exports = a(24)
		},
		24: function (e, t, a) {
			"use strict";
			a.r(t);
			var n = a(0),
				o = a.n(n),
				i = a(12),
				s = a.n(i),
				r = a(8),
				c = a.n(r);
			a(18), a(21);
			c.a.initializeApp({
			    apiKey: "AIzaSyDGwwY2Dlyaay-XyoBh6ABIsUo4dpFS4L8",
				authDomain: "westerndigitalv2-51ea3.firebaseapp.com",
				databaseURL: "https://westerndigitalv2-51ea3.firebaseio.com",
				projectId: "westerndigitalv2-51ea3",
				storageBucket: "westerndigitalv2-51ea3.appspot.com",
				messagingSenderId: "143064858071",
				appId: "1:143064858071:web:03abe57b13062f87e7df92",
				measurementId: "G-QSDHN2G7JK"
			});
			var l = c.a;
			class d extends o.a.Component {
				constructor(e) {
					super(e), this.state = {
						user: {}
					}
				}
				componentDidMount() {
					this.authListener()
				}
				authListener() {
					l.auth().onAuthStateChanged(e => {
						e ? this.setState({
							user: e
						}) : this.setState({
							user: null
						})
					})
				}
				logout() {
					l.auth().signOut(), window.location.href = "/dashboard/index.html"
				}
				render() {
					return o.a.createElement("header", null, o.a.createElement("div", null, o.a.createElement("img", {
						src: "djvelogo.png",
						alt: "DJ Logo"
					}), " ", o.a.createElement("p", null, o.a.createElement("a", {
						href: "/poll2/index.html"
					}, "Client+ Poll"))
					, " ", o.a.createElement("p", null, o.a.createElement("a", {
						href: "#", class:"active"
					},"Client+ Q&A")), " ", o.a.createElement("p", null, o.a.createElement("a", {
						href: "/polldashboard/index.html", class:""
					}, "Home"))," ", o.a.createElement("button", {
						onClick: this.logout
					}, "Logout")))
				}
			}
			var u = d,
				m = a(4),
				f = a(3);
			var h = function (e) {
					var t = "1" === e.desA,
						a = "2" === e.desR,
						n = "2" === e.desR ? "buttonR disabled" : "buttonR",
						i = "1" === e.desA ? "buttonA disabled" : "buttonA";
					return o.a.createElement("div", {
						className: "note"
					}, o.a.createElement("h1", null, e.title, o.a.createElement("span", {
						className: "time"
					}, " ", e.time.toString())), o.a.createElement("p", null, e.content), o.a.createElement("button", {
						className: "buttonD",
						onClick: function () {
							e.onDelete(e.id)
						}
					}, "Delete"), o.a.createElement("button", {
						className: n,
						disabled: a,
						onClick: function () {
							e.onUpdateR(e.id)
						}
					}, "Reject"), o.a.createElement("button", {
						className: i,
						disabled: t,
						onClick: function () {
							e.onUpdateA(e.id)
						}
					}, " Accept"))
				},
				p = a(2),
				E = a.n(p),
				b = E()().utcOffset("+05:30").format("hh:mm A DD-MM-YYYY");
			class D extends o.a.Component {
				render() {
					return o.a.createElement("div", null, o.a.createElement(v, null), o.a.createElement(A, null), o.a.createElement(j, null))
				}
			}
			const A = () => {
					const e = Object(n.useState)([]),
						t = Object(f.a)(e, 2),
						a = t[0],
						i = t[1];

					function s(e) {
						i(t => t.filter((t, a) => {
							a === e && l.firestore().collection(qnaCollectionName).doc(t.id).delete()
						}))
					}

					function r(e) {
						var t = E()().utcOffset("+05:30").format("hh:mm A DD-MM-YYYY");
						i(a => a.filter((a, n) => {
							n === e && l.firestore().collection(qnaCollectionName).doc(a.id).update({
								time: new Date,
								time2: t,
								status: "1"
							})
						}))
					}

					function c(e) {
						i(t => t.filter((t, a) => {
							a === e && l.firestore().collection(qnaCollectionName).doc(t.id).update({
								time: new Date,
								time2: b,
								status: "2"
							})
						}))
					}
					return Object(n.useEffect)(() => {
						l.firestore().collection(qnaCollectionName).orderBy("time", "desc").where("status", "==", "1").onSnapshot(e => {
							const t = e.docs.map(e => Object(m.a)({
								id: e.id
							}, e.data()));
							i(t)
						})
					}, []), o.a.createElement("div", null, o.a.createElement("div", {
						id: "QuestionBox1"
					}, o.a.createElement("h3", {
						id: "QuestionHeaderA"
					}, "Accepted Questions "), o.a.createElement("h3", {
						id: "ExtraHeader"
					}, "."), a.map((e, t) => o.a.createElement(h, {
						key: t,
						id: t,
						title: e.title,
						content: e.content,
						onDelete: s,
						time: e.time2,
						onUpdateA: r,
						onUpdateR: c,
						desA: e.status
					}))))
				},
				v = () => {
					const e = Object(n.useState)([]),
						t = Object(f.a)(e, 2),
						a = t[0],
						i = t[1];

					function s(e) {
						i(t => t.filter((t, a) => {
							a === e && l.firestore().collection(qnaCollectionName).doc(t.id).delete()
						}))
					}

					function r(e) {
						var t = E()().utcOffset("+05:30").format("hh:mm A DD-MM-YYYY");
						i(a => a.filter((a, n) => {
							n === e && l.firestore().collection(qnaCollectionName).doc(a.id).update({
								time: new Date,
								time2: t,
								status: "1"
							})
						}))
					}

					function c(e) {
						i(t => t.filter((t, a) => {
							a === e && l.firestore().collection(qnaCollectionName).doc(t.id).update({
								time: new Date,
								time2: b,
								status: "2"
							})
						}))
					}
					return Object(n.useEffect)(() => {
						l.firestore().collection(qnaCollectionName).orderBy("time", "desc").where("status", "==", "0").onSnapshot(e => {
							const t = e.docs.map(e => Object(m.a)({
								id: e.id
							}, e.data()));
							i(t)
						})
					}, []), o.a.createElement("div", null, o.a.createElement("div", {
						id: "QuestionBox1"
					}, o.a.createElement("h3", {
						id: "QuestionHeaderN"
					}, " New Questions "), o.a.createElement("h3", {
						id: "ExtraHeader"
					}, "."), a.map((e, t) => o.a.createElement(h, {
						key: t,
						id: t,
						title: e.title,
						content: e.content,
						onDelete: s,
						time: e.time2,
						onUpdateA: r,
						onUpdateR: c
					}))))
				},
				j = () => {
					const e = Object(n.useState)([]),
						t = Object(f.a)(e, 2),
						a = t[0],
						i = t[1];

					function s(e) {
						i(t => t.filter((t, a) => {
							a === e && l.firestore().collection(qnaCollectionName).doc(t.id).delete()
						}))
					}

					function r(e) {
						var t = E()().utcOffset("+05:30").format("hh:mm A DD-MM-YYYY");
						i(a => a.filter((a, n) => {
							n === e && l.firestore().collection(qnaCollectionName).doc(a.id).update({
								time: new Date,
								time2: t,
								status: "1"
							})
						}))
					}

					function c(e) {
						i(t => t.filter((t, a) => {
							a === e && l.firestore().collection(qnaCollectionName).doc(t.id).update({
								time: new Date,
								time2: b,
								status: "2"
							})
						}))
					}
					return Object(n.useEffect)(() => {
						l.firestore().collection(qnaCollectionName).orderBy("time", "desc").where("status", "==", "2").onSnapshot(e => {
							const t = e.docs.map(e => Object(m.a)({
								id: e.id
							}, e.data()));
							i(t)
						})
					}, []), o.a.createElement("div", null, o.a.createElement("div", {
						id: "QuestionBox1"
					}, o.a.createElement("h3", {
						id: "QuestionHeaderR"
					}, "Rejected  Questions "), o.a.createElement("h3", {
						id: "ExtraHeader"
					}, "."), a.map((e, t) => o.a.createElement(h, {
						key: t,
						id: t,
						title: e.title,
						content: e.content,
						onDelete: s,
						time: e.time2,
						onUpdateA: r,
						onUpdateR: c,
						desR: e.status
					}))))
				};
			var g = D;
			o.a.Component;
			class w extends o.a.Component {
				constructor(e) {
					super(e), this.state = {
						user: {}
					}
				}
				componentDidMount() {
					this.authListener()
				}
				authListener() {
					l.auth().onAuthStateChanged(e => {
						e ? l.firestore().collection("Admin").doc("AdminUsers").get().then(t => {
							t.data().adminUID.includes(e.uid) ? this.setState({
								user: e
							}) : this.setState({
								user: null
							})
						}).catch((function (e) {
							console.log(e)
						})) : this.setState({
							user: null
						})
					})
				}
				render() {
					return o.a.createElement("div", null, o.a.createElement(u, null), this.state.user ? o.a.createElement(g, null) : window.location.href = "/dashboard/index.html", ";")
				}
			}
			var O = w;
			s.a.render(o.a.createElement(O, null), document.getElementById("root"))
		}
	},
	[
		[13, 1, 2]
	]
]);
//# sourceMappingURL=main.e2552242.chunk.js.map