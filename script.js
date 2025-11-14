document.addEventListener("DOMContentLoaded", () => {

  // Storage Keys
  const KEY_DONORS = "donors";                     // approved donors
  const KEY_CAMPS = "camps";                       // approved camps
  const KEY_HOSPITALS = "hospitals";               // approved hospitals

  const KEY_PENDING_CAMPS = "pending_camps";       // pending camps
  const KEY_PENDING_HOSPITALS = "pending_hospitals"; // pending hospitals

  // ---------- 1. DONOR REGISTRATION ----------
  const donorForm = document.getElementById("donorForm");
  if (donorForm) {
    donorForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const age = parseInt(donorForm.age.value);
      if (isNaN(age) || age < 18) {
        alert("⚠ Donor must be at least 18 years old.");
        return;
      }

      const donor = {
        name: donorForm.name.value,
        age: donorForm.age.value,
        bloodGroup: donorForm.bloodGroup.value,
        city: donorForm.city.value,
        contact: donorForm.contact.value,
        availability: donorForm.availability.value
      };

      let donors = JSON.parse(localStorage.getItem(KEY_DONORS)) || [];
      donors.push(donor);
      localStorage.setItem(KEY_DONORS, JSON.stringify(donors));

      alert("✅ Donor registered successfully!");
      donorForm.reset();
    });
  }

  // ---------- 2. FIND DONOR ----------
  const findForm = document.getElementById("findForm");
  if (findForm) {
    findForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const group = document.getElementById("find_group").value;
      const donors = JSON.parse(localStorage.getItem(KEY_DONORS)) || [];
      const resultDiv = document.getElementById("find_results");
      resultDiv.innerHTML = "";

      const matches = donors.filter(d => d.bloodGroup === group);

      if (matches.length === 0) {
        resultDiv.innerHTML = "<p>No donors found for this blood group.</p>";
      } else {
        matches.forEach(d => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
            <h3>${d.name}</h3>
            <p>Age: ${d.age}</p>
            <p>City: ${d.city}</p>
            <p>Contact: ${d.contact}</p>
            <p>Status: ${d.availability}</p>
            <a href="tel:${d.contact}" class="btn">Call Now</a>
          `;
          resultDiv.appendChild(card);
        });
      }
    });
  }

  // ---------- 3. EMERGENCY SEARCH ----------
  const emForm = document.getElementById("emForm");
  if (emForm) {
    emForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const city = document.getElementById("em_city").value.trim().toLowerCase();
      const donors = JSON.parse(localStorage.getItem(KEY_DONORS)) || [];
      const resultDiv = document.getElementById("em_results");
      resultDiv.innerHTML = "";

      const available = donors.filter(
        d => d.city.toLowerCase() === city && d.availability === "Available"
      );

      if (available.length === 0) {
        resultDiv.innerHTML = "<p>No available donors found in this city.</p>";
      } else {
        available.forEach(d => {
          resultDiv.innerHTML += `
            <div class="card">
              <h3>${d.name}</h3>
              <p>Blood Group: ${d.bloodGroup}</p>
              <p>Contact: ${d.contact}</p>
              <a href="tel:${d.contact}" class="btn">Call Now</a>
            </div>
          `;
        });
      }
    });
  }

  // ---------- 4. BLOOD CAMP — USER SENDS REQUEST (NOT APPROVED) ----------
  const campForm = document.getElementById("campForm");
  if (campForm) {
    const campList = document.getElementById("camp_list");
    const camps = JSON.parse(localStorage.getItem(KEY_CAMPS)) || [];

    // Show only approved camps
    const displayCamps = () => {
      campList.innerHTML = "";
      camps.forEach(camp => {
        campList.innerHTML += `
          <div class="card">
            <h3>${camp.org}</h3>
            <p>📍 ${camp.venue}</p>
            <p>📅 ${camp.date}</p>
            <p>☎ ${camp.contact}</p>
          </div>`;
      });
    };
    displayCamps();

    campForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const newCamp = {
        org: campForm.camp_org.value,
        date: campForm.camp_date.value,
        venue: campForm.camp_venue.value,
        contact: campForm.camp_contact.value
      };

      // Save to pending
      const pending = JSON.parse(localStorage.getItem(KEY_PENDING_CAMPS)) || [];
      pending.push(newCamp);
      localStorage.setItem(KEY_PENDING_CAMPS, JSON.stringify(pending));

      alert("⏳ Camp request submitted! Admin approval required.");
      campForm.reset();
    });
  }

  // ---------- 5. HOSPITAL — USER SENDS REQUEST ----------
  const hForm = document.getElementById("hForm");
  if (hForm) {
    const hList = document.getElementById("hosp_list");
    const hospitals = JSON.parse(localStorage.getItem(KEY_HOSPITALS)) || [];

    const displayHospitals = () => {
      hList.innerHTML = "";
      hospitals.forEach(h => {
        hList.innerHTML += `
          <div class="card">
            <h3>${h.name}</h3>
            <p>📍 ${h.city}</p>
            <p>☎ ${h.contact}</p>
            <p>💉 ${h.groups}</p>
            <a href="tel:${h.contact}" class="btn">Call Now</a>
          </div>`;
      });
    };
    displayHospitals();

    hForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const newHospital = {
        name: hForm.h_name.value,
        city: hForm.h_city.value,
        contact: hForm.h_contact.value,
        groups: hForm.h_groups.value
      };

      // Save to pending list
      const pending = JSON.parse(localStorage.getItem(KEY_PENDING_HOSPITALS)) || [];
      pending.push(newHospital);
      localStorage.setItem(KEY_PENDING_HOSPITALS, JSON.stringify(pending));

      alert("⏳ Hospital request submitted! Admin approval required.");
      hForm.reset();
    });
  }

});
