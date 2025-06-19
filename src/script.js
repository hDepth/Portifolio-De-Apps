// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scroll para links de navegação
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Ajusta para a altura do cabeçalho fixo
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lógica para os modais de vídeo
    const openModalButtons = document.querySelectorAll('.open-modal-btn');
    const closeModalButtons = document.querySelectorAll('.close-modal-btn');
    const videoModals = document.querySelectorAll('.modal-overlay');

    openModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalTargetId = this.dataset.modalTarget; // Obtém o ID do modal alvo
            const videoUrl = this.dataset.videoUrl; // Obtém a URL do vídeo
            const targetModal = document.getElementById(modalTargetId);
            const videoIframe = targetModal.querySelector('iframe');

            // Define a URL do vídeo no iframe e adiciona autoplay (silenciado)
            videoIframe.src = videoUrl;

            // Mostra o modal
            targetModal.classList.remove('hidden');
            targetModal.classList.add('flex'); // Garante que flexbox é usado para centralizar
            document.body.style.overflow = 'hidden'; // Evita rolagem da página principal
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay'); // Encontra o modal pai
            const videoIframe = modal.querySelector('iframe');

            // Pausa o vídeo limpando o src do iframe
            videoIframe.src = '';

            // Esconde o modal
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = ''; // Restaura a rolagem da página principal
        });
    });

    // Fechar modal clicando fora do conteúdo do modal
    videoModals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            // Se o clique foi diretamente no overlay (não no conteúdo do modal)
            if (e.target === modal) {
                const videoIframe = modal.querySelector('iframe');
                videoIframe.src = ''; // Pausa o vídeo
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                document.body.style.overflow = '';
            }
        });
    });
});
