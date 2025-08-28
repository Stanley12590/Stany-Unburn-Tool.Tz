// Load dynamic messages from content.json
async function loadContent() {
  try {
    const res = await fetch('content.json', {cache: "no-store"});
    const data = await res.json();
    const container = document.getElementById('dynamic-content');
    container.innerHTML = '';
    data.messages.forEach((msg, idx) => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${escapeHtml(msg.title)}</strong><p>${escapeHtml(msg.body)}</p><small>Pressure: ${escapeHtml(msg.pressure)} • Type: ${escapeHtml(msg.burnType)}</small>`;
      container.appendChild(div);
    });
  } catch (e) {
    console.error('Failed to load content.json', e);
  }
}

loadContent();
setInterval(loadContent, 60000); // refresh every 60s

// Helper: find best matching message by pressure + burnType
async function findMessage(pressure, burnType) {
  try {
    const res = await fetch('content.json', {cache: "no-store"});
    const data = await res.json();
    // try exact match
    let match = data.messages.find(m => m.pressure === pressure && m.burnType === burnType);
    if(match) return match;
    // fallback: match pressure
    match = data.messages.find(m => m.pressure === pressure);
    if(match) return match;
    // fallback: match burnType
    match = data.messages.find(m => m.burnType === burnType);
    if(match) return match;
    // default to first
    return data.messages[0];
  } catch (e) {
    console.error('findMessage error', e);
    return {title:'Complaint','body':'My account was affected unfairly. I request immediate review and restoration.'};
  }
}

// Basic HTML escape to avoid injection
function escapeHtml(str){
  if(!str) return '';
  return String(str).replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m]; });
}

// Request Unburn (mailto)
document.getElementById('requestBtn').addEventListener('click', async () => {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const pressure = document.getElementById('pressure').value;
  const burnType = document.getElementById('burnType').value;
  const status = document.getElementById('status');

  if(!name || !phone) {
    alert('Please enter your full name and phone number.');
    return;
  }

  status.textContent = 'Preparing request...';
  const msg = await findMessage(pressure, burnType);

  const subject = `Urgent Complaint – ${burnType} Ban (${pressure})`;
  const bodyLines = [];
  bodyLines.push(`Hello WhatsApp Support,`);
  bodyLines.push('');
  bodyLines.push(`My name is ${name} and my account (${phone}) has been affected by a ${burnType.toLowerCase()} action.`);
  bodyLines.push('');
  bodyLines.push(msg.body);
  bodyLines.push('');
  bodyLines.push(`Pressure Level: ${pressure}`);
  bodyLines.push('');
  bodyLines.push('I demand an urgent review and full restoration of my account.');
  bodyLines.push('');
  bodyLines.push(`Regards,`);
  bodyLines.push(`${name}`);

  const body = encodeURIComponent(bodyLines.join('\n'));
  const mailto = `mailto:support@whatsapp.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  // Open mailto (user will send from their email client)
  window.location.href = mailto;
  status.textContent = 'Email opened in your mail client. Please review and send.';
});
