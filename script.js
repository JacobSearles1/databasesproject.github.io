    // script.js
    fetch('data.json') // Or directly use a JSON string: const jsonData = '[{"name": "Alice", ...}]';
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('data-table');
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td><a href="mailto${user.email}">${user.email}</a></td>
                    <td>${user.address.city}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));