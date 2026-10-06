import { useEffect, useState } from 'react';
import { estimate } from '../lib/pricing';
export default function PricingCalculator({monthlyRate}:{monthlyRate:number}) {
  const [ready,setReady]=useState(false);
  const [seats,setSeats]=useState('10');
  const [copied,setCopied]=useState('');
  useEffect(()=>{setReady(true);},[]);
  const result=estimate(seats,monthlyRate);
  const money=(value:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value);
  return <div className="calculator">
    <div className="island-label"><span className="pulse"/>{ready?'Interactive island ready':'Static estimate · loading controls'}<code>client:load</code></div>
    <h3>Size your team. See your cost.</h3><p>Illustrative pricing: {money(monthlyRate)} per seat, per month.</p>
    <fieldset disabled={!ready}><label htmlFor="seats">Team seats</label><div className="seat-input"><input id="seats" inputMode="numeric" type="text" value={seats} aria-invalid={'error' in result} aria-describedby="price-feedback" onChange={e=>{setSeats(e.target.value);setCopied('');}}/><span>1–1,000 seats</span></div></fieldset>
    <div id="price-feedback" aria-live="polite" className="estimate">{'error' in result?<p className="error">{result.error}</p>:<><span className="total">{money(result.total)}<small>/ month</small></span><span>{result.seats} seats × {money(monthlyRate)} · taxes excluded</span></>}</div>
    <button disabled={!ready||'error' in result} onClick={async()=>{if('error' in result)return;try{await navigator.clipboard.writeText(`${result.seats} seats at ${money(monthlyRate)}/seat: ${money(result.total)}/month (illustrative estimate)`);setCopied('Estimate copied.');}catch{setCopied('Clipboard unavailable. Select the estimate above to copy it.');}}}>Copy estimate ↗</button><small role="status">{copied}</small>
    <div className="scope">This island owns the seat input, validation, estimate, and copy feedback. It never changes the reading control.</div>
  </div>;
}
