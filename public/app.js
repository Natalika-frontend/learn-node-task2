// это клиентский js

document.addEventListener('click', async event => {

    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id;

        remove(id).then(() => {
            event.target.closest('li').remove();
        });
    }

    if (event.target.dataset.type === 'change') {
        const id = event.target.dataset.id;
        const newTitle = prompt("Введите новое значение: ");

        if (newTitle !== null) {
            const response = await fetch(`/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({ title: newTitle }),
            });

            if (response.ok) {
                const noteElement = event.target.closest('li').querySelector('.note-title');
                if (noteElement) {
                    noteElement.textContent = newTitle;
                }
            }
        }
    }
});

async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE'});
};

document.addEventListener('DOMContentLoaded', function() {
    const alert = document.querySelector('.alert-success');
    if (alert) {
        setTimeout(() => {
            alert.style.display = 'none';
        }, 3000);
    }
});
