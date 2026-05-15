"use client"

import { useState } from "react"
import { RELATED_LINKS as RELATED } from "./lib/links"

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f4; font-family: 'DM Mono', monospace; color: #1a1a1a; }
  .sub-wrap { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem; }
  .sub-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .sub-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .sub-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1; }
  .sub-title em { font-style: italic; color: #0e7490; }
  .sub-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .sub-section-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; margin-bottom: 1rem; color: #1a1a1a; }

  .sub-col-header { display: grid; grid-template-columns: 2fr 1fr 1.2fr 1fr 32px; gap: .6rem; margin-bottom: .4rem; padding: 0 .1rem; }
  .sub-col-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #aaa; }
  .sub-row { display: grid; grid-template-columns: 2fr 1fr 1.2fr 1fr 32px; gap: .6rem; margin-bottom: .5rem; align-items: end; }
  .sub-name-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: .95rem; color: #1a1a1a; padding: .35rem 0; outline: none; transition: border-color .2s; }
  .sub-name-input:focus { border-color: #0e7490; }
  .sub-name-input::placeholder { color: #ccc; }
  .sub-num-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: .95rem; color: #1a1a1a; padding: .35rem 0; outline: none; transition: border-color .2s; text-align: right; }
  .sub-num-input:focus { border-color: #0e7490; }
  .sub-freq-select { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: .85rem; color: #555; padding: .35rem 0; outline: none; cursor: pointer; appearance: none; }
  .sub-freq-select:focus { border-color: #0e7490; }
  .sub-monthly-val { font-size: 12px; color: #888; text-align: right; padding-bottom: .4rem; align-self: end; }
  .sub-remove-btn { background: none; border: none; cursor: pointer; color: #ddd; font-size: .9rem; padding: .2rem; transition: color .15s; align-self: end; padding-bottom: .45rem; }
  .sub-remove-btn:hover { color: #b91c1c; }

  .sub-add-btn { display: flex; align-items: center; gap: .5rem; background: none; border: 1px dashed #e0dbd3; border-radius: 3px; width: 100%; padding: .65rem 1rem; font-family: 'DM Mono', monospace; font-size: 12px; color: #aaa; cursor: pointer; transition: all .15s; margin-bottom: 1.5rem; margin-top: .25rem; }
  .sub-add-btn:hover { border-color: #0e7490; color: #0e7490; }

  .sub-result-hero { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.5rem; }
  .sub-result-cell { background: #fff; padding: 1rem; }
  .sub-result-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .sub-result-val { font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: #1a1a1a; }
  .sub-result-val.teal { color: #0e7490; }
  .sub-result-val.amber { color: #92400e; }

  .sub-category-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
  .sub-category-cell { background: #faf8f4; border: 1px solid #e0dbd3; border-radius: 3px; padding: .9rem 1rem; }
  .sub-category-name { font-size: 11px; letter-spacing: .06em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .sub-category-val { font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: #1a1a1a; }
  .sub-category-bar-wrap { height: 3px; background: #e0dbd3; border-radius: 2px; margin-top: .5rem; overflow: hidden; }
  .sub-category-bar { height: 100%; border-radius: 2px; transition: width .5s; }

  .sub-breakdown { margin-bottom: 1.5rem; }
  .sub-breakdown-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .6rem; }
  .sub-breakdown-list { display: flex; flex-direction: column; gap: .35rem; }
  .sub-breakdown-row { display: flex; align-items: center; gap: .75rem; padding: .6rem .9rem; background: #faf8f4; border-radius: 2px; font-size: 12px; }
  .sub-breakdown-name { flex: 1; color: #1a1a1a; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .sub-breakdown-freq { font-size: 11px; color: #aaa; min-width: 60px; }
  .sub-breakdown-bar-wrap { flex: 1; height: 3px; background: #e0dbd3; border-radius: 2px; overflow: hidden; }
  .sub-breakdown-bar { height: 100%; border-radius: 2px; background: #0e7490; }
  .sub-breakdown-monthly { color: #888; min-width: 60px; text-align: right; }
  .sub-breakdown-annual { color: #1a1a1a; min-width: 60px; text-align: right; font-weight: 500; }

  .sub-worth-section { border: 1.5px dashed #a5f3fc; border-radius: 4px; padding: 1.25rem; margin-bottom: 1rem; }
  .sub-worth-title { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #0e7490; margin-bottom: .75rem; }
  .sub-worth-list { display: flex; flex-direction: column; gap: .5rem; margin-bottom: .75rem; }
  .sub-worth-row { display: flex; align-items: center; gap: .75rem; font-size: 12px; }
  .sub-worth-name { color: #1a1a1a; flex: 1; }
  .sub-worth-cost { color: #888; min-width: 70px; text-align: right; }
  .sub-worth-saving { font-size: 12px; color: #0e7490; margin-top: .25rem; min-height: 1.2em; }

  .sub-invest-section { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 4px; padding: 1.25rem; margin-top: 1rem; }
  .sub-invest-title { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #0369a1; margin-bottom: .25rem; }
  .sub-invest-subtitle { font-size: 12px; color: #0369a1; margin-bottom: 1rem; opacity: .8; }
  .sub-invest-rate-row { display: flex; align-items: center; gap: .75rem; margin-bottom: 1rem; }
  .sub-invest-rate-label { font-size: 12px; color: #555; white-space: nowrap; }
  .sub-invest-rate-input { width: 60px; border: none; border-bottom: 1.5px solid #bae6fd; background: transparent; font-family: 'DM Mono', monospace; font-size: 1rem; color: #1a1a1a; padding: .2rem .3rem; outline: none; text-align: center; transition: border-color .2s; }
  .sub-invest-rate-input:focus { border-color: #0369a1; }
  .sub-invest-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: #bae6fd; border: 1px solid #bae6fd; border-radius: 2px; overflow: hidden; }
  .sub-invest-cell { background: #f0f9ff; padding: .9rem 1rem; text-align: center; }
  .sub-invest-cell-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #0369a1; margin-bottom: .3rem; opacity: .8; }
  .sub-invest-cell-val { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: #0c4a6e; }
  .sub-invest-note { font-size: 11px; color: #0369a1; margin-top: .75rem; opacity: .7; line-height: 1.5; }

  .sub-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .sub-info-item { padding: .75rem; border-left: 2px solid #a5f3fc; }
  .sub-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .sub-info-body { font-size: 12px; color: #888; line-height: 1.5; }

  .sub-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .sub-prose p:last-child { margin-bottom: 0; }
  .sub-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .sub-prose ul li { margin-bottom: .3rem; }

  .sub-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .sub-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #a5f3fc; line-height: 1; margin-bottom: .4rem; }
  .sub-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .sub-tip-body { font-size: 12px; color: #888; line-height: 1.5; }

  .sub-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .sub-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .sub-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .sub-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .sub-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .sub-footer-links a { color: #888; text-decoration: underline; }

  @media (max-width: 640px) {
    .sub-col-header, .sub-row { grid-template-columns: 2fr 1fr 1fr 28px; }
    .sub-col-header .sub-col-label:nth-child(4),
    .sub-row > .sub-monthly-val { display: none; }
    .sub-result-hero { grid-template-columns: 1fr 1fr; }
    .sub-category-grid, .sub-info-grid, .sub-tip-grid { grid-template-columns: 1fr; }
    .sub-invest-grid { grid-template-columns: 1fr; }
  }
`

const FREQ_OPTIONS = [
  { value: "weekly",    label: "Weekly",    perMonth: 52 / 12 },
  { value: "monthly",   label: "Monthly",   perMonth: 1 },
  { value: "quarterly", label: "Quarterly", perMonth: 1 / 3 },
  { value: "annual",    label: "Annual",    perMonth: 1 / 12 },
]

const CATEGORIES = [
  { key: "streaming", label: "Streaming",       color: "#0e7490" },
  { key: "software",  label: "Software",         color: "#7c3aed" },
  { key: "fitness",   label: "Fitness",          color: "#166534" },
  { key: "news",      label: "News & Media",     color: "#92400e" },
  { key: "food",      label: "Food & Delivery",  color: "#b91c1c" },
  { key: "other",     label: "Other",            color: "#888"    },
]

function toMonthly(cost, freq) {
  const f = FREQ_OPTIONS.find(o => o.value === freq)
  return (parseFloat(cost) || 0) * (f ? f.perMonth : 1)
}

function fmtK(n) {
  if (n >= 1000000) return "$" + (n / 1000000).toFixed(2) + "M"
  if (n >= 1000)    return "$" + (n / 1000).toFixed(1) + "K"
  return "$" + Math.round(n)
}

function investGrowth(annualSaving, returnRate, years) {
  const monthly = annualSaving / 12
  const mr = returnRate / 100 / 12
  const n  = years * 12
  if (mr === 0) return monthly * n
  return monthly * ((Math.pow(1 + mr, n) - 1) / mr)
}

let _id = 10
export default function Page() {
  const [subs, setSubs] = useState([
    { id: 1, name: "Netflix",       cost: "15.49", freq: "monthly",   category: "streaming" },
    { id: 2, name: "Spotify",       cost: "10.99", freq: "monthly",   category: "streaming" },
    { id: 3, name: "iCloud+",       cost: "2.99",  freq: "monthly",   category: "software"  },
    { id: 4, name: "Gym",           cost: "40.00", freq: "monthly",   category: "fitness"   },
    { id: 5, name: "Microsoft 365", cost: "99.99", freq: "annual",    category: "software"  },
  ])
  const [worthIt,    setWorthIt]    = useState({})
  const [returnRate, setReturnRate] = useState("7")

  const addSub = () => {
    setSubs(prev => [...prev, { id: _id++, name: "", cost: "", freq: "monthly", category: "other" }])
  }
  const removeSub = (id) => {
    if (subs.length === 1) return
    setSubs(prev => prev.filter(s => s.id !== id))
  }
  const update = (id, field, value) => {
    setSubs(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  const valid       = subs.filter(s => s.name && parseFloat(s.cost) > 0)
  const monthly     = valid.reduce((sum, s) => sum + toMonthly(s.cost, s.freq), 0)
  const annual      = monthly * 12
  const daily       = monthly / 30.44
  const sorted      = [...valid].sort((a, b) => toMonthly(b.cost, b.freq) - toMonthly(a.cost, a.freq))
  const maxMonthly  = sorted.length > 0 ? toMonthly(sorted[0].cost, sorted[0].freq) : 1

  const cancelSubs        = valid.filter(s => worthIt[s.id] === false)
  const cancelCount       = cancelSubs.length
  const cancelMonthly     = cancelSubs.reduce((sum, s) => sum + toMonthly(s.cost, s.freq), 0)
  const cancelAnnual      = cancelMonthly * 12

  const rr     = parseFloat(returnRate) || 7
  const inv5   = cancelAnnual > 0 ? investGrowth(cancelAnnual, rr, 5)  : 0
  const inv10  = cancelAnnual > 0 ? investGrowth(cancelAnnual, rr, 10) : 0
  const inv20  = cancelAnnual > 0 ? investGrowth(cancelAnnual, rr, 20) : 0

  const catTotals = CATEGORIES.map(cat => ({
    ...cat,
    monthly: valid.filter(s => s.category === cat.key).reduce((sum, s) => sum + toMonthly(s.cost, s.freq), 0),
  })).filter(c => c.monthly > 0).sort((a, b) => b.monthly - a.monthly)
  const maxCat = catTotals.length > 0 ? catTotals[0].monthly : 1

  return (
    <>
      <style>{css}</style>
      <main className="sub-wrap">

        <div className="sub-header">
          <p className="sub-eyebrow">Personal Finance</p>
          <h1 className="sub-title">Subscription<br /><em>Cost Calculator</em></h1>
        </div>

        <div className="sub-card">
          <div className="sub-col-header">
            <span className="sub-col-label">Service</span>
            <span className="sub-col-label" style={{ textAlign: "right" }}>Cost</span>
            <span className="sub-col-label">Frequency</span>
            <span className="sub-col-label" style={{ textAlign: "right" }}>Per month</span>
            <span />
          </div>

          {subs.map(s => {
            const mo = toMonthly(s.cost, s.freq)
            return (
              <div className="sub-row" key={s.id}>
                <input className="sub-name-input" placeholder="e.g. Netflix, Gym…"
                  value={s.name} onChange={e => update(s.id, "name", e.target.value)} />
                <input className="sub-num-input" type="number" min="0" step="0.01" placeholder="0.00"
                  value={s.cost} onChange={e => update(s.id, "cost", e.target.value)} />
                <select className="sub-freq-select" value={s.freq}
                  onChange={e => update(s.id, "freq", e.target.value)}>
                  {FREQ_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <span className="sub-monthly-val">{mo > 0 ? "$" + mo.toFixed(2) : "—"}</span>
                <button className="sub-remove-btn" onClick={() => removeSub(s.id)}>✕</button>
              </div>
            )
          })}

          <button className="sub-add-btn" onClick={addSub}>+ Add subscription</button>

          {valid.length > 0 && (
            <>
              <div className="sub-result-hero">
                <div className="sub-result-cell">
                  <p className="sub-result-label">Per month</p>
                  <p className="sub-result-val teal">${monthly.toFixed(2)}</p>
                </div>
                <div className="sub-result-cell">
                  <p className="sub-result-label">Per year</p>
                  <p className="sub-result-val amber">${Math.round(annual).toLocaleString("en-US")}</p>
                </div>
                <div className="sub-result-cell">
                  <p className="sub-result-label">Per day</p>
                  <p className="sub-result-val">${daily.toFixed(2)}</p>
                </div>
                <div className="sub-result-cell">
                  <p className="sub-result-label">Subscriptions</p>
                  <p className="sub-result-val">{valid.length}</p>
                </div>
              </div>

              {catTotals.length > 0 && (
                <div className="sub-category-grid">
                  {catTotals.map((cat, i) => (
                    <div className="sub-category-cell" key={i}>
                      <p className="sub-category-name">{cat.label}</p>
                      <p className="sub-category-val">${Math.round(cat.monthly * 12)}/yr</p>
                      <div className="sub-category-bar-wrap">
                        <div className="sub-category-bar" style={{ width: Math.round(cat.monthly / maxCat * 100) + "%", background: cat.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="sub-breakdown">
                <p className="sub-breakdown-label">Sorted by cost — highest first</p>
                <div className="sub-breakdown-list">
                  {sorted.map(s => {
                    const mo = toMonthly(s.cost, s.freq)
                    const freqLabel = FREQ_OPTIONS.find(o => o.value === s.freq)?.label || ""
                    return (
                      <div className="sub-breakdown-row" key={s.id}>
                        <span className="sub-breakdown-name">{s.name}</span>
                        <span className="sub-breakdown-freq">{freqLabel}</span>
                        <div className="sub-breakdown-bar-wrap">
                          <div className="sub-breakdown-bar" style={{ width: Math.round(mo / maxMonthly * 100) + "%" }} />
                        </div>
                        <span className="sub-breakdown-monthly">${mo.toFixed(2)}/mo</span>
                        <span className="sub-breakdown-annual">${Math.round(mo * 12)}/yr</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* WORTH IT AUDIT */}
              <div className="sub-worth-section">
                <p className="sub-worth-title">Worth-it audit — keep or cancel?</p>
                <div className="sub-worth-list">
                  {valid.map(s => {
                    const mo    = toMonthly(s.cost, s.freq)
                    const state = worthIt[s.id]
                    return (
                      <div className="sub-worth-row" key={s.id}>
                        <div style={{ display: "flex", gap: ".6rem", flex: 1, alignItems: "center" }}>
                          <button onClick={() => setWorthIt(prev => ({ ...prev, [s.id]: true }))}
                            style={{ fontSize: "12px", padding: ".2rem .6rem", border: "1px solid", borderRadius: "2px", cursor: "pointer", fontFamily: "inherit", transition: "all .15s",
                              background: state === true ? "#eaf5ee" : "none",
                              borderColor: state === true ? "#166534" : "#e0dbd3",
                              color: state === true ? "#166534" : "#aaa" }}>Keep</button>
                          <button onClick={() => setWorthIt(prev => ({ ...prev, [s.id]: false }))}
                            style={{ fontSize: "12px", padding: ".2rem .6rem", border: "1px solid", borderRadius: "2px", cursor: "pointer", fontFamily: "inherit", transition: "all .15s",
                              background: state === false ? "#fff8f8" : "none",
                              borderColor: state === false ? "#b91c1c" : "#e0dbd3",
                              color: state === false ? "#b91c1c" : "#aaa" }}>Cancel</button>
                          <span style={{ fontSize: "12px", color: "#1a1a1a", flex: 1 }}>{s.name}</span>
                        </div>
                        <span className="sub-worth-cost">${mo.toFixed(2)}/mo</span>
                      </div>
                    )
                  })}
                </div>

                {cancelCount > 0 && (
                  <>
                    <p className="sub-worth-saving">
                      Cancelling {cancelCount} subscription{cancelCount !== 1 ? "s" : ""} saves{" "}
                      <strong style={{ fontWeight: 500 }}>${Math.round(cancelAnnual).toLocaleString("en-US")}/year</strong>.
                    </p>

                    {/* INVESTMENT CALCULATOR */}
                    <div className="sub-invest-section">
                      <p className="sub-invest-title">What if you invested those savings instead?</p>
                      <p className="sub-invest-subtitle">
                        ${cancelMonthly.toFixed(2)}/month invested at a compound annual return of:
                      </p>
                      <div className="sub-invest-rate-row">
                        <span className="sub-invest-rate-label">Annual return</span>
                        <input className="sub-invest-rate-input" type="number" min="0" max="30" step="0.5"
                          value={returnRate} onChange={e => setReturnRate(e.target.value)} />
                        <span style={{ fontSize: "12px", color: "#555" }}>%</span>
                        <span style={{ fontSize: "11px", color: "#0369a1", marginLeft: ".5rem", opacity: .7 }}>
                          (historical stock market avg ~7% after inflation)
                        </span>
                      </div>
                      <div className="sub-invest-grid">
                        <div className="sub-invest-cell">
                          <p className="sub-invest-cell-label">After 5 years</p>
                          <p className="sub-invest-cell-val">{fmtK(inv5)}</p>
                        </div>
                        <div className="sub-invest-cell">
                          <p className="sub-invest-cell-label">After 10 years</p>
                          <p className="sub-invest-cell-val">{fmtK(inv10)}</p>
                        </div>
                        <div className="sub-invest-cell">
                          <p className="sub-invest-cell-label">After 20 years</p>
                          <p className="sub-invest-cell-val">{fmtK(inv20)}</p>
                        </div>
                      </div>
                      <p className="sub-invest-note">
                        Total contributed over 20 years: ${Math.round(cancelAnnual * 20).toLocaleString("en-US")} · 
                        Investment growth adds: {fmtK(inv20 - cancelAnnual * 20)} · 
                        Assumes monthly contributions and compound growth. Does not account for taxes or fees.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* HOW IT WORKS */}
        <div className="sub-card">
          <p className="sub-section-title">How this calculator works</p>
          <div className="sub-prose">
            <p>Add each subscription with its cost and billing frequency. The calculator normalizes everything to a monthly equivalent — annual subscriptions are divided by 12, quarterly by 3 — so you can compare services billed on different schedules side by side. Results update live as you type.</p>
            <p>The worth-it audit lets you mark each subscription as keep or cancel. For anything marked cancel, the investment calculator shows what those freed-up dollars could grow into if invested monthly at a compound annual return — defaulting to 7%, a commonly cited long-term average for a diversified stock portfolio after inflation.</p>
            <p>The investment projection uses the standard future value of an annuity formula, treating cancelled subscription costs as regular monthly contributions. It's the same math used in retirement calculators — because the principle is identical: small consistent amounts, compounded over time, become surprisingly large numbers.</p>
          </div>
          <div className="sub-info-grid">
            <div className="sub-info-item">
              <p className="sub-info-title">Annual billing trap</p>
              <p className="sub-info-body">Annual subscriptions feel cheaper at signup but are easy to forget. A $99/year charge is $8.25/month — invisible until it hits your card. This calculator shows the true monthly cost of every billing cycle.</p>
            </div>
            <div className="sub-info-item">
              <p className="sub-info-title">Subscription creep</p>
              <p className="sub-info-body">Most people underestimate their total subscription spend by 40–50%. Each charge feels small individually; the cumulative annual total typically surprises. Seeing everything in one place is often the first time the real number becomes visible.</p>
            </div>
            <div className="sub-info-item">
              <p className="sub-info-title">The investment comparison</p>
              <p className="sub-info-body">The 7% default return reflects historical stock market averages adjusted for inflation. Adjust it to match your actual investment approach — a high-yield savings account might use 4–5%, while an aggressive equity portfolio might use 8–10%.</p>
            </div>
            <div className="sub-info-item">
              <p className="sub-info-title">Shared subscriptions</p>
              <p className="sub-info-body">If you share a subscription with others, enter your share of the cost. Family plans and shared streaming accounts have a lower per-person cost worth reflecting accurately in your totals.</p>
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="sub-card">
          <p className="sub-section-title">Why subscription spending deserves a closer look</p>
          <div className="sub-prose">
            <p>Subscription spending has a unique psychological characteristic: it feels smaller than it is. A $15 charge doesn't trigger the same scrutiny as a $180 purchase, even though over a year they cost the same. Multiply that across a dozen subscriptions and the total often exceeds what people spend on clothing, dining out, or other categories they actively budget for.</p>
            <p>The average American household now spends over $900 per year on streaming services alone — before accounting for software, fitness memberships, food delivery, news, and the dozens of other recurring charges that have quietly become part of everyday life. The total figure, when tallied, is frequently double or triple what people estimate.</p>
            <p>What makes the investment angle particularly striking is how small amounts behave over time. Cancelling $30/month in forgotten subscriptions and investing it instead doesn't just save $360/year — at 7% annual return over 20 years, it becomes over $18,000. The subscriptions aren't just costing you what they charge. They're costing you what that money could have become.</p>
          </div>
        </div>

        {/* TIPS */}
        <div className="sub-card">
          <p className="sub-section-title">How to audit and manage your subscriptions</p>
          <div className="sub-tip-grid">
            <div>
              <p className="sub-tip-num">01</p>
              <p className="sub-tip-title">Find every subscription first</p>
              <p className="sub-tip-body">Check your bank and credit card statements for recurring charges going back 13 months — annual subscriptions only show up once a year. Search your email inbox for "receipt" or "subscription" to catch anything you missed on statements.</p>
            </div>
            <div>
              <p className="sub-tip-num">02</p>
              <p className="sub-tip-title">Ask when you last used it</p>
              <p className="sub-tip-body">For each subscription, ask: when did I last use this, and would I notice if it disappeared? If you can't remember the last time you opened an app or visited a site, that's a reliable signal it isn't earning its cost.</p>
            </div>
            <div>
              <p className="sub-tip-num">03</p>
              <p className="sub-tip-title">Rotate streaming services</p>
              <p className="sub-tip-body">Subscribe to one streaming service, watch what you want over a month or two, then cancel and rotate to the next. Most have no cancellation penalty, and the content isn't going anywhere. You get access to everything for the price of one.</p>
            </div>
            <div>
              <p className="sub-tip-num">04</p>
              <p className="sub-tip-title">Set renewal reminders</p>
              <p className="sub-tip-body">For any annual subscription you keep, set a calendar reminder 2–3 weeks before the renewal date. This gives you time to decide whether another year is worth it — and to cancel if not, rather than being auto-charged out of inertia.</p>
            </div>
          </div>
        </div>

{/* ========== MONEYWISE LINK — START ========== */}
        <div style={{ background: "#fff", border: "1px solid #e0dbd3", borderRadius: "4px", padding: "1rem 1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#888" }}>
            Looking for more free financial tools?{" "}
            <a href="https://moneywisecalculator.com" style={{ color: "#b45309", textDecoration: "underline" }}>
              Visit MoneyWiseCalculator.com
            </a>
          </p>
        </div>
        {/* ========== MONEYWISE LINK — END ========== */}

        {/* RELATED */}
        <div className="dr-card">
          <p className="dr-section-title">Related tools</p>
          <div className="dr-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="dr-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="dr-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute financial advice. Results assume a fixed interest rate and fixed monthly payment for the full repayment period. This site may use cookies and analytics. By using this site, you agree to our Privacy Policy and Terms of Service.
            <div className="dr-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}