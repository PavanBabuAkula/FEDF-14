/* -------------------- STUDENT PROFILE SAVE -------------------- */
function saveProfile() {
  let name = document.getElementById("stuName").value;
  let skills = document.getElementById("stuSkills").value;
  let resume = document.getElementById("stuResume").value;

  if (!name || !skills || !resume) {
    alert("Please fill all fields");
    return;
  }

  localStorage.setItem("studentProfile", JSON.stringify({
    name,
    skills,
    resume
  }));

  alert("Profile Saved Successfully!");
  displayApplications();
}

/* -------------------- ADMIN ADD JOB -------------------- */
function addJob() {
  let title = document.getElementById("jobTitle").value;
  let company = document.getElementById("jobCompany").value;
  let desc = document.getElementById("jobDesc").value;

  if (!title || !company || !desc) {
    alert("Fill all job fields");
    return;
  }

  let jobs = JSON.parse(localStorage.getItem("jobs") || "[]");

  jobs.push({ title, company, desc });
  localStorage.setItem("jobs", JSON.stringify(jobs));

  alert("Job Added Successfully!");
  loadAdminJobs();
}

/* -------------------- LOAD JOBS FOR STUDENT -------------------- */
function loadJobsForStudent() {
  let jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
  let place = document.getElementById("jobsList");

  if (!place) return;

  place.innerHTML = "";

  jobs.forEach((job, index) => {
    place.innerHTML += `
      <div style="border:1px solid #3b82f6; padding:1rem; margin-bottom:1rem; border-radius:8px;">
        <h3>${job.title} — ${job.company}</h3>
        <p>${job.desc}</p>
        <button class="btn" onclick="applyJob(${index})">Apply</button>
      </div>
    `;
  });
}

/* -------------------- STUDENT APPLY FOR JOB -------------------- */
function applyJob(jobIndex) {
  let profile = JSON.parse(localStorage.getItem("studentProfile"));
  if (!profile) {
    alert("Save your profile first!");
    return;
  }

  let jobs = JSON.parse(localStorage.getItem("jobs"));
  let job = jobs[jobIndex];

  let apps = JSON.parse(localStorage.getItem("applications") || "[]");

  apps.push({
    studentName: profile.name,
    jobTitle: job.title
  });

  localStorage.setItem("applications", JSON.stringify(apps));

  alert("Application Sent!");
  displayApplications();
}

/* -------------------- DISPLAY STUDENT APPLICATIONS -------------------- */
function displayApplications() {
  let apps = JSON.parse(localStorage.getItem("applications") || "[]");
  let place = document.getElementById("appsList");

  if (!place) return;

  place.innerHTML = "";

  apps.forEach(app => {
    place.innerHTML += `<p>Applied for <b>${app.jobTitle}</b></p>`;
  });
}

/* -------------------- ADMIN VIEW STUDENTS -------------------- */
function loadStudents() {
  let profile = JSON.parse(localStorage.getItem("studentProfile") || "{}");
  let list = document.getElementById("studentList");
  if (!list) return;

  if (!profile.name) {
    list.innerHTML = "<p>No student registered yet.</p>";
    return;
  }

  list.innerHTML = `
    <p><b>Name:</b> ${profile.name}</p>
    <p><b>Skills:</b> ${profile.skills}</p>
    <p><b>Resume:</b> <a href="${profile.resume}" target="_blank">View Resume</a></p>
  `;
}

/* -------------------- ADMIN VIEW APPLICATIONS -------------------- */
function loadAdminJobs() {
  let apps = JSON.parse(localStorage.getItem("applications") || "[]");
  let place = document.getElementById("adminAppList");

  if (!place) return;

  place.innerHTML = "";

  apps.forEach(app => {
    place.innerHTML += `
      <p><b>${app.studentName}</b> applied for <b>${app.jobTitle}</b></p>
    `;
  });
}

/* -------------------- AUTO LOAD DATA -------------------- */
window.onload = () => {
  loadJobsForStudent();
  displayApplications();
  loadStudents();
  loadAdminJobs();
};
