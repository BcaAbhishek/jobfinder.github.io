
document.getElementById('resumeForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = document.getElementById('resume').files[0];
  const formData = new FormData();
  formData.append('resume', file);

  const res = await fetch('/api/match', {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  document.getElementById('matchResult').innerText = data.message || 'Uploaded!';
});


const form = document.getElementById('resumeForm');
const result = document.getElementById('matchResult');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById('resume');
  const formData = new FormData();
  formData.append('resume', fileInput.files[0]);

  const res = await fetch('http://localhost:3000/api/resume-match', {
    method: 'POST',
    credentials: 'include', // important for sending session cookie
    body: formData
  });

  const data = await res.json();
  if (res.status === 200) {
    result.textContent = `✅ Your resume score is: ${data.score}`;
    result.classList.remove('text-danger');
    result.classList.add('text-success');
  } else {
    result.textContent = `❌ ${data.message}`;
    result.classList.remove('text-success');
    result.classList.add('text-danger');
  }
});

