document.getElementById('userForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });

        const result = await response.json();
        if (response.ok) {
            populateUserSelect();
            alert('Korisnik uspešno dodat!');
        } else {
            alert('Greška: ' + (result.error || 'Neuspešno dodavanje.'));
        }
    } catch (error) {
        alert('Greška: ' + error.message);
    }
});

populateUserSelect();
async function populateUserSelect() {
    const res = await fetch('/users');
    const users = await res.json();
    const select = document.getElementById('userSelect');
    select.innerHTML = '';
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = `${user.name} (${user.email})`;
        select.appendChild(option);
    });
}

document.getElementById('taskForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const userId = document.getElementById('userSelect').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    try {
        const response = await fetch('/createTask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                title,
                description
            })
        });

        const result = await response.json();
        if (response.ok) {
            populateTaskTable();
            alert('Task uspešno dodat korisnicima!');
        } else {
            alert('Greška: ' + (result.error || 'Neuspešno dodavanje.'));
        }
    } catch (error) {
        alert('Greška: ' + error.message);
    }
});

populateTaskTable();
async function populateTaskTable() {
    const res = await fetch('/tasks');
    const tasks = await res.json();
    const tbody = document.getElementById('taskTableBody');
    tbody.innerHTML = '';

    tasks.forEach(task => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${task.id}</td>
            <td>${task.user ? `${task.user.name} (${task.user.email})` : 'Nepoznat korisnik'}</td>
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${new Date(task.created_at).toLocaleString()}</td>
            <td><button onclick="deleteTask(${task.id})">Obrisi</button></td>
        `;
        tbody.appendChild(tr);
    });
}

async function deleteTask(taskId) {
    try {
        const response = await fetch(`/deleteTask/${taskId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            populateTaskTable();
            alert('Task uspešno obrisan!');
        } else {
            const result = await response.json();
            alert('Greška: ' + (result.error || 'Neuspešno brisanje.'));
        }
    } catch (error) {
        alert('Greška: ' + error.message);
    }
}