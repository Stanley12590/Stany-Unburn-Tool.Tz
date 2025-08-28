document.getElementById("complaintForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const number = document.getElementById("number").value.trim();
  const type = document.getElementById("type").value;
  const subject = document.getElementById("subject").value.trim();
  const messageField = document.getElementById("message");

  if (!name || !number || !type || !subject) {
    alert("Please fill all required fields!");
    return;
  }

  // Load messages with cache-busting
  fetch(`content.json?v=${new Date().getTime()}`)
    .then(res => res.json())
    .then(data => {
      let chosenMessage = "";
      if (type === "permanent") {
        chosenMessage = data.permanent[Math.floor(Math.random() * data.permanent.length)];
      } else {
        chosenMessage = data.temporary[Math.floor(Math.random() * data.temporary.length)];
      }

      const finalMessage = 
        `Hello WhatsApp Support,\n\n` +
        messageField.value + "\n\n" +
        `Additional Concern:\n${chosenMessage}\n\n` +
        `Name: ${name}\nWhatsApp Number: ${number}`;

      const mailtoLink = `mailto:support@whatsapp.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(finalMessage)}`;
      window.location.href = mailtoLink;
    });
});
