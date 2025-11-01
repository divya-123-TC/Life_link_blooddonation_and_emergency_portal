document.addEventListener("DOMContentLoaded", () => {
  // ---------- Donor Registration ----------
  const donorForm = document.getElementById("donorForm");
  if (donorForm) {
    donorForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const donor = {
        name: donorForm.name.value,
        age: donorForm.age.value,
        bloodGroup: donorForm.bloodGroup.value,
        city: donorForm.city.value,
        contact: donorForm.contact.value,
        availability: donorForm.availability.value
      };

      let donors = JSON.parse(localStorage.getItem("donors")) || [];
      donors.push(donor);
      localStorage.setItem("donors", JSON.stringify(donors));

      alert("✅ Donor registered successfully!");
      donorForm.reset();
    });
  }

  // ---------- Find Donor ----------
  const findForm = document.getElementById("findForm");
  if (findForm) {
    findForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const group = document.getElementById("find_group").value;
      const donors = JSON.parse(localStorage.getItem("donors")) || [];
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
            <p>Status: ${d.availability}</p>`;
          resultDiv.appendChild(card);
        });
      }
    });
  }

  // ---------- Emergency Search ----------
  const emForm = document.getElementById("emForm");
  if (emForm) {
    emForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const city = document.getElementById("em_city").value.trim().toLowerCase();
      const donors = JSON.parse(localStorage.getItem("donors")) || [];
      const resultDiv = document.getElementById("em_results");
      resultDiv.innerHTML = "";

      const available = donors.filter(
        d => d.city.toLowerCase() === city && d.availability === "Available"
      );

      if (available.length === 0) {
        resultDiv.innerHTML = "<p>No available donors found in this city.</p>";
      } else {
        available.forEach(d => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
            <h3>${d.name}</h3>
            <p>Blood Group: ${d.bloodGroup}</p>
            <p>Contact: ${d.contact}</p>`;
          resultDiv.appendChild(card);
        });
      }
    });
  }

  // ---------- Blood Camp Registration ----------
  const campForm = document.getElementById("campForm");
  if (campForm) {
    const campList = document.getElementById("camp_list");
    let camps = JSON.parse(localStorage.getItem("camps")) || [];

    // Display saved camps on load
    const displayCamps = () => {
      campList.innerHTML = "";
      camps.forEach(camp => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <h3>${camp.org}</h3>
          <p>📍 ${camp.venue}</p>
          <p>📅 ${camp.date}</p>
          <p>☎ ${camp.contact}</p>`;
        campList.appendChild(card);
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

      camps.push(newCamp);
      localStorage.setItem("camps", JSON.stringify(camps));
      displayCamps();

      alert("✅ Camp added successfully!");
      campForm.reset();
    });
  }

  // ---------- Hospital Registration ----------
  const hForm = document.getElementById("hForm");
  if (hForm) {
    const hList = document.getElementById("hosp_list");
    let hospitals = JSON.parse(localStorage.getItem("hospitals")) || [];

    // Display saved hospitals on load
    const displayHospitals = () => {
      hList.innerHTML = "";
      hospitals.forEach(h => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <h3>${h.name}</h3>
          <p>📍 ${h.city}</p>
          <p>☎ ${h.contact}</p>
          <p>💉 ${h.groups}</p>
          <button class="btn" onclick="window.location.href='tel:${h.contact}'">Call Now</button>`;
        hList.appendChild(card);
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

      hospitals.push(newHospital);
      localStorage.setItem("hospitals", JSON.stringify(hospitals));
      displayHospitals();

      alert("✅ Hospital added successfully!");
      hForm.reset();
    });
  }
});