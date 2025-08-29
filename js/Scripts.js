const updateIcon = (theme) => {
    const icon = document.getElementById('theme-icon');
    if (theme === 'light') {
        icon.className = 'bi bi-sun-fill';
    } else if (theme === 'dark') {
        icon.className = 'bi bi-moon-fill';
    } else {
        icon.className = 'bi bi-circle-half';
    }
};

const applyTheme = (theme) => {
    if (theme === 'auto') {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-bs-theme', systemDark ? 'dark' : 'light');
    } else {
        document.documentElement.setAttribute('data-bs-theme', theme);
    }
    updateIcon(theme);
    localStorage.setItem('theme', theme);
};

document.addEventListener('DOMContentLoaded', () => {
    const storedTheme = localStorage.getItem('theme') || 'auto';
    applyTheme(storedTheme);

    document.querySelectorAll('[data-bs-theme-value]').forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-bs-theme-value');
            applyTheme(theme);

            document.querySelectorAll('[data-bs-theme-value]').forEach(btn =>
                btn.classList.remove('active')
            );
            button.classList.add('active');
        });
    });
});

AOS.init();

(() => {
    'use strict'

    const storedTheme = localStorage.getItem('theme')

    const getPreferredTheme = () => {
        if (storedTheme) return storedTheme
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const setTheme = (theme) => {
        if (theme === 'auto') {
            document.documentElement.setAttribute('data-bs-theme',
                window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    }

    setTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-bs-theme-value')
            localStorage.setItem('theme', theme)
            setTheme(theme)
        })
    })
})()


