document.querySelector('.generate-btn').addEventListener('click', async () => {
    const options = {
        special: document.getElementById('special').checked,
        numbers: document.getElementById('numbers').checked,
        lowercase: document.getElementById('lowercase').checked,
        uppercase: document.getElementById('uppercase').checked,
        length: parseInt(document.getElementById('length').value, 10) || 8,
        specific_letters: document.getElementById('specific_letters').value || '',
        specific_numbers: document.getElementById('specific_numbers').value || ''
    };

    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options)
        });

        if (!response.ok) {
            throw new Error('Erro na resposta do servidor');
        }

        const data = await response.json();
        document.getElementById('password-result').value = data.password || 'Erro ao gerar senha';
    } catch (error) {
        console.error('Erro ao conectar ao servidor:', error.message);
    }
});

document.getElementById('copy-btn').addEventListener('click', () => {
    const passwordField = document.getElementById('password-result');
    const password = passwordField.value;

    if (password) {
        navigator.clipboard.writeText(password)
            .then(() => {
                alert('Senha copiada para a área de transferência!');
            })
            .catch(err => {
                console.error('Erro ao copiar senha:', err);
                alert('Não foi possível copiar a senha.');
            });
    } else {
        alert('Nenhuma senha para copiar!');
    }
});