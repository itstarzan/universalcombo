// Table Data Fill
const models = [
    "coming soon",

    // Add more models as needed
];

document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('modelsTableBody');
    
    models.forEach((model, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${model}</td>
        `;
        tableBody.appendChild(row);
    });
});