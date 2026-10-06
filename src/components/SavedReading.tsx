import { useEffect, useState } from 'react';
export default function SavedReading({articleId}:{articleId:string}) {
  const [ready,setReady]=useState(false),[saved,setSaved]=useState(false),[message,setMessage]=useState('');
  const key=`feature-lab:saved:${articleId}`;
  useEffect(()=>{try{setSaved(localStorage.getItem(key)==='yes');}catch{setMessage('Browser storage unavailable. Changes will last only on this page.');}setReady(true);},[key]);
  function toggle(){const next=!saved;setSaved(next);try{if(next)localStorage.setItem(key,'yes');else localStorage.removeItem(key);setMessage(next?'Saved on this browser.':'Removed from your reading list.');}catch{setMessage('Storage blocked. This change lasts only on this page.');}}
  return <div className="reading-island"><div className="island-label"><span className="pulse"/>{ready?'Interactive island ready':'Controls activate when visible'}<code>client:visible</code></div><h3>Keep this field note handy.</h3><p>Mark the guide for another visit. Your choice stays on this browser.</p><button disabled={!ready} aria-pressed={saved} onClick={toggle}>{saved?'✓ Saved for later':'＋ Save for later'}</button><p role="status" className="storage-status">{message||'No account. No server write. Browser-local preference.'}</p><div className="scope">This island owns one saved preference. Its state stays separate from the calculator.</div></div>;
}
