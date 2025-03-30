document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.calculator');
    const protLiquidaInput = document.getElementById('ProtLiquida');
    const proteinaInput = document.getElementById('Proteina');
    const choInput = document.getElementById('CHO');
    const lipidiosInput = document.getElementById('Lipidios');
    const clearButton = document.querySelector('.clear-button');
    const calculateButton = document.querySelector('.calculate-button');
    const resultsSection = document.querySelector('.results');
    const resultsImage = resultsSection.querySelector('img');
    const resultsTitle = resultsSection.querySelector('h1');
    const resultsText = resultsSection.querySelector('p');

    function validateInput(input, minValue = 0) {
        const value = parseFloat(input.value.replace(/[^0-9.]/g, ''));
        const errorMessage = input.nextElementSibling;

        // Remove mensagens de erro anteriores
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }

        // Verifica se é um número válido
        if (isNaN(value)) {
            showError(input, "Por favor, insira um número válido");
            return false;
        }

        // Verifica se é maior que o valor mínimo
        if (value < minValue) {
            showError(input, `O valor deve ser pelo menos ${minValue}`);
            return false;
        }

        input.classList.remove('invalid');
        return true;
    }

    function calculateNutritionalValue() {
        const isProtLiquidaValid = validateInput(protLiquidaInput);
        const isProteinaValid = validateInput(proteinaInput);
        const isCHOValid = validateInput(choInput);
        const isLipidiosValid = validateInput(lipidiosInput);

        if (!isProtLiquidaValid || !isProteinaValid || !isCHOValid || !isLipidiosValid) return;

        const protLiquida = parseFloat(protLiquidaInput.value.replace(/[^0-9.,]/g, '').replace(',', '.')
        );
        const proteina = parseFloat(proteinaInput.value.replace(/[^0-9.,]/g, '').replace(',', '.')
        );
        const cho = parseFloat(choInput.value.replace(/[^0-9.,]/g, '').replace(',', '.')
        );
        const lipidios = parseFloat(lipidiosInput.value.replace(/[^0-9.,]/g, '').replace(',', '.')
        );

        const numerator = protLiquida * 4;
        const denominator = (proteina * 4) + (cho * 4) + (lipidios * 9);
        const result = (numerator / denominator) * 100;

        resultsImage.src = 'assets/illustration-calculated.svg';
        resultsTitle.textContent = `Valor Nutricional: ${result.toFixed(2)}%`;
        resultsText.textContent = `Fórmula: ((${protLiquida} * 4) / (${proteina} * 4 + ${cho} * 4 + ${lipidios} * 9)) * 100`;
    }

    function clearForm() {
        protLiquidaInput.value = '';
        proteinaInput.value = '';
        choInput.value = '';
        lipidiosInput.value = '';
        resultsImage.src = 'assets/illustration-empty.svg';
        resultsTitle.textContent = 'Resultados serão mostrados aqui';
        resultsText.textContent = 'Complete o formulário e clique em "CALCULAR" para ver o valor nutricional.';
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        protLiquidaInput.classList.remove('invalid');
        proteinaInput.classList.remove('invalid');
        choInput.classList.remove('invalid');
        lipidiosInput.classList.remove('invalid');
    }

    calculateButton.addEventListener('click', function (e) {
        e.preventDefault();
        calculateNutritionalValue();
    });

    clearButton.addEventListener('click', function (e) {
        e.preventDefault();
        clearForm();
    });

    protLiquidaInput.addEventListener('input', function () {
        validateInput(this);
    });

    proteinaInput.addEventListener('input', function () {
        validateInput(this);
    });

    choInput.addEventListener('input', function () {
        validateInput(this);
    });

    lipidiosInput.addEventListener('input', function () {
        validateInput(this);
    });

    form.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            calculateNutritionalValue();
        }
    });
});