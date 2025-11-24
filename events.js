 const hasEvents = true;   // ← change to false to hide events

  const eventsGrid = document.getElementById("eventsGrid");
  const noEventsMessage = document.getElementById("noEventsMessage");

  if (!hasEvents) {
    eventsGrid.style.display = "none";
    noEventsMessage.style.display = "block";
  }

  /* POPUP LOGIC */
  const popup = document.getElementById("popup");
  const popupBox = document.getElementById("popupBox");

  document.querySelectorAll(".join-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      popup.style.display = "flex";
      popupBox.innerHTML = `
        <h2>Register for Event</h2>
        <input type="text" id="nameField" placeholder="Enter your name">
        <input type="text" id="mobileField" placeholder="Enter mobile number">
        <div class="popup-submit" id="submitBtn">Submit</div>
      `;
      document.getElementById("submitBtn").onclick = submitForm;
    });
  });

  function submitForm() {
    const name = document.getElementById("nameField").value.trim();
    const mobile = document.getElementById("mobileField").value.trim();

    if (!name || !mobile) {
      alert("Please fill out all fields!");
      return;
    }

    popupBox.innerHTML = `
      <div class="confirmation">
        🎉 Thank you, ${name}!<br>
        You are successfully registered!
      </div>
      <div class="close-btn" onclick="popup.style.display='none'">Close</div>
    `;
  }

  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
  });
